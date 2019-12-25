import _ from 'lodash';

document.addEventListener('DOMContentLoaded', () => {
	const generatorId = (n) => {
		return () => {
			return ++n;
		};
	};

	const generate = generatorId(5);

	class Updater {
		constructor (selector) {
			this.selector = selector;
		}

		update (html) {
			const active = document.activeElement;
			this.selector.innerHTML = html;

			if (active && active.id) {
				var newActive = document.getElementById(active.id);
				if (newActive && newActive.setSelectionRange) {
					const strLength = newActive.value.length;
					newActive.setSelectionRange(strLength, strLength);
				}
				newActive.focus();
			}
		}
	}

	class DOM {
		static render (component, selector) {
			const updater = new Updater(selector);
			component.updater = updater;
			updater.update(component.render());
		}
	}

	class Component {
		getInitialState () {
			return null;
		}

		constructor (props, updater) {
			this.props = props;
			this.updater = updater;
			this.state = this.getInitialState();
		}

		stateUpdate (newState) {
			_.forEach(newState, (value, key) => {
				this.state[key] = value;
			}, this);
			this.updater.update(this.render());
		}
	}

	class TodoList extends Component {
		getInitialState () {
			return { currentText: '', tasks: this.props.tasks };
		}

		deleteItem (id) {
			const copy = _.clone(this.state.tasks);
			delete copy[id];
			this.stateUpdate({ tasks: copy });
		}

		handleTaskInput (e) {
			e.preventDefault();
			this.stateUpdate({ currentText: e.target.value });
		}

		handleAddTask () {
			const copy = _.clone(this.state.tasks);
			const newId = generate();
			copy[newId] = {
				text: this.state.currentText,
				id: newId
			};
			this.stateUpdate({ currentText: '', tasks: copy });
		}

		render () {
			const tasksToString = Object.values(this.state.tasks).map(task => `<li class="item">
				<div>${task.text}</div>
				<button onclick="component.deleteItem(${task.id})">delete</button>
			</li>`).join('');

			const currentValue = this.state.currentText;

			return (
				`<input id="input" value="${currentValue}" onkeyup="component.handleTaskInput(window.event)" type="text"/> <button onclick="component.handleAddTask()">add</button>` +
			'<ul>' + tasksToString + '</ul>'
			);
		}
	}

	window.component = new TodoList({
		tasks: {
			1: { text: 'task 1', id: 1 },
			2: { text: 'task 2', id: 2 },
			3: { text: 'task 3', id: 3 },
			4: { text: 'task 4', id: 4 },
			5: { text: 'task 5', id: 5 }
		}
	});

	DOM.render(
		component, // eslint-disable-line
		document.querySelector('.app')
	);
});