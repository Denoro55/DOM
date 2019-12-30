import find from './scripts/find';
import filter from './scripts/filter';
import states from './scripts/states';
import tasks from './scripts/tasks';
import virtualDOM from './scripts/virtualDOM';

document.addEventListener('DOMContentLoaded', () => {
	(() => {
		virtualDOM();
		states();
		tasks();
		console.log(find(document.querySelector('.content'), 'li'));
		filter();
	})();
});