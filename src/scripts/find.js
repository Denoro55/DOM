const highlightElements = (parent, tag) => {
	const children = [...parent.children];
	const initAcc = children.filter(child => child.tagName.toLowerCase() === tag);
	return [...parent.children].reduce((acc, child) => {
		return [...acc, ...highlightElements(child, tag)];
	}, initAcc);
};

export default highlightElements;