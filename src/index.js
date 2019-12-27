import find from './scripts/find';
import filter from './scripts/filter';
import virtualDOM from './scripts/virtualDOM';

document.addEventListener('DOMContentLoaded', () => {
	(() => {
		virtualDOM();
		console.log(find(document.querySelector('.content'), 'li'));
		filter();
	})();
});