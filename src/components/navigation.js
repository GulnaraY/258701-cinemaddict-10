const createFilterMarkup = (filter, isChecked, isStats) => {
  const {name, count} = filter;
  return `<a href="#${name}" class="main-navigation__item
  ${isChecked ? `main-navigation__item--active` : ``}
  ${isStats ? `main-navigation__item--additional` : ``}">${name}
  ${isChecked || isStats ? `` : `<span class="main-navigation__item-count">${count}</span>`}
   </a>`;
};

export const createMainNavigation = (filters) => {
  const filtersMarkup = filters.map((filter, i) => createFilterMarkup(filter, i === 0, i === filters.length - 1)).join(``);
  return (`<nav class="main-navigation">
    ${filtersMarkup}
  </nav>`);
};
