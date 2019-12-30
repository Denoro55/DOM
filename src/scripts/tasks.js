import _ from 'lodash';

const render = (state, elements) => {
	const { formListContent, formTaskContent } = elements;

	formListContent.innerHTML = '';
	formTaskContent.innerHTML = '';

	// lists
	const ulForList = document.createElement('ul');
	let nameContainer;

	state.lists.forEach((list) => {
		const li = document.createElement('li');
		if (list.id === state.activeListId) {
			nameContainer = document.createElement('b');
		} else {
			nameContainer = document.createElement('a');
			nameContainer.href = `#${list}`;
			li.addEventListener('click', (e) => {
				state.activeListId = list.id;
				render(state, elements);
				e.preventDefault();
			});
		}
		nameContainer.textContent = list.name;
		li.appendChild(nameContainer);
		ulForList.appendChild(li);
	});

	formListContent.appendChild(ulForList);

	// tasks
	const ulForTasks = document.createElement('ul');
	const tasksForRendering = state.tasks.filter(task => task.listId === state.activeListId);

	tasksForRendering.forEach((task) => {
		const li = document.createElement('li');
		li.textContent = task.text;
		ulForTasks.appendChild(li);
	});

	formTaskContent.appendChild(ulForTasks);
};

export default () => {
	const generalList = { id: _.uniqueId(), name: 'general' };
	const state = {
		activeListId: generalList.id,
		lists: [
			generalList
		],
		tasks: []
	};

	const elements = {
		formList: document.querySelector('form[data-container="new-list-form"]'),
		formTask: document.querySelector('form[data-container="new-task-form"]'),
		formListContent: document.querySelector('[data-container="lists"]'),
		formTaskContent: document.querySelector('[data-container="tasks"]')
	};

	elements.formList.addEventListener('submit', e => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const value = formData.get('name');
		if (value !== '') {
			state.lists.push({ id: _.uniqueId(), name: formData.get('name') });
			render(state, elements);
		} else {
			// error
		}
	});

	elements.formTask.addEventListener('submit', e => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const value = formData.get('name');
		if (value !== '') {
			state.tasks.push({ listId: state.activeListId, text: value });
			render(state, elements);
		} else {
			// error
		}
	});

	render(state, elements);
};