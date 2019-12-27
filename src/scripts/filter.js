const initFilter = () => {
	const notebooks = [
		{
			model: 'v1', processor: 'intel', frequency: 1.7, memory: 16
		},
		{
			model: 'd3', processor: 'intel', frequency: 3.5, memory: 8
		},
		{
			model: 'd2', processor: 'amd', frequency: 2.5, memory: 16
		}
	];

	const predicates = {
		eq: (value) => (el) => String(value) === String(el),
		gt: (value) => (el) => Number(value) <= Number(el),
		lt: (value) => (el) => Number(value) >= Number(el)
	};

	const state = {
		filters: {
			processor_eq: null,
			memory_eq: null,
			frequency_gt: null,
			frequency_lt: null
		}
	};

	const filters = [
		{ name: 'processor_eq', eventType: 'change' },
		{ name: 'memory_eq', eventType: 'change' },
		{ name: 'frequency_gt', eventType: 'input' },
		{ name: 'frequency_lt', eventType: 'input' }
	];

	filters.forEach(({ name, eventType }) => {
		const element = document.querySelector(`[name="${name}"]`);
		element.addEventListener(eventType, ({ target }) => {
			state.filters[target.name] = target.value !== '' ? target.value : null;
			render(state);
		});
	});

	const filterItems = (stateFilters, items) => {
		const activeFilters = Object.keys(stateFilters).filter(e => stateFilters[e]);
		return activeFilters.reduce((acc, filter) => {
			const [name, predicateName] = filter.split('_');
			const match = predicates[predicateName];
			return acc.filter(item => match(stateFilters[filter])(item[name]));
		}, items);
	};

	const render = (state) => {
		const result = document.querySelector('.result');
		const filtered = filterItems(state.filters, notebooks);
		if (filtered.length < 1) {
			result.innerHTML = '';
			return;
		}
		result.innerHTML = `<ul>${filtered.map(e => `<li>${e.model}</li>`).join('')}</ul>`;
	};

	render(state);
};

export default initFilter;