document.addEventListener('DOMContentLoaded', () => {
	// выбрать элементы с дерева
	const highlightElements = (parent, tag) => {
		const children = [...parent.children];
		const initAcc = children.filter(child => child.tagName.toLowerCase() === tag);
		return [...parent.children].reduce((acc, child) => {
			return [...acc, ...highlightElements(child, tag)];
		}, initAcc);
	};

	console.log(highlightElements(document.querySelector('.content'), 'li'));
});