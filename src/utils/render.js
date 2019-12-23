export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

/**
 * Создает дом-элементы на основании разметки
 * @param {String} template - разметка
 * @return {Object} - созданный дом-элемент
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

/**
 * Рендеринг компонентов
 * @param {Oblect} container - ссылка на дом-ноду, в которую рендерим
 * @param {String} component - компонент, который рендерим
 * @param {String} place - указывает на место в дом-ноде, в которое вставляем
 */
export const render = (container, component, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

/**
 * Удаление элемента из ДОМ
 * @param {Object} component - ссылка на удаляемый компонент
 */
export const unrender = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};
