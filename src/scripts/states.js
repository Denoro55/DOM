const buildText = (el, name, state) => {
	if (state.value === '') {
		const i = document.createElement('i');
		i.textContent = name;
		return i;
	}
	return document.createTextNode(state.value);
};

const buildForm = (el, name, state, rerender) => {
	const form = document.createElement('form');
	const input = document.createElement('input');
	input.name = 'name';
	input.type = 'text';
	input.setAttribute('value', state.value);
	const submit = document.createElement('input');
	submit.type = 'submit';
	submit.setAttribute('value', 'Save');
	form.appendChild(input);
	form.appendChild(submit);
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		state.value = formData.get('name');
		state.mode = 'text';
		rerender(el, name, state);
	});
	return form;
};

const render = (el, name, state) => {
	el.innerHTML = '';
	if (state.mode === 'form') {
		const form = buildForm(el, name, state, render);
		el.appendChild(form);
	} else {
		el.appendChild(buildText(el, name, state));
	}
};

const handle = (el, name, state) => () => {
	if (state.mode === 'text') {
		state.mode = 'form';
		render(el, name, state);
	}
};

export default () => {
	const elements = document.querySelectorAll('[data-editable-target]');
	elements.forEach((el) => {
		const state = {
			mode: 'text',
			value: ''
		};
		const name = el.dataset.editableTarget;
		el.addEventListener('click', handle(el, name, state));
	});
};