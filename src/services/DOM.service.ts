import { DOM } from "../constants/dom.constants";
import { GUI_ELEMENTS } from "../constants/element.constants";
import { generateHash } from "../utilities/random";

class DOMService {
  public create(type: string): HTMLElement {
    let element: HTMLElement;
    switch (type) {
      case GUI_ELEMENTS.TEXT:
      case GUI_ELEMENTS.HEADING:
        element = this.createText(type);
        break;
      case GUI_ELEMENTS.BUTTON:
        element = document.createElement('button');
        element.innerText = DOM.DEFAULTS.BUTTON_LABEL;
        element.classList.add(DOM.CLASSES.BUTTON);
        break;
      case GUI_ELEMENTS.TEXT_INPUT:
        element = this.createInput();
        break;
      case GUI_ELEMENTS.IMAGE:
        element = this.createImage();
        break;
      default:
        throw Error('Invalid element type');
    }
    element.id = this.generateID();
    element.dataset.type = type;
    element.draggable = true;

    return element;
  }

  public copy(ref: HTMLElement) {
    const _ref = ref.cloneNode(true) as HTMLElement;
    _ref.id = this.generateID();
    if (ref.parentElement !== null) {
      ref.parentElement.appendChild(_ref);
    }
  }

  private createText(type: string) {
    const wrapper = document.createElement('div');
    const text = document.createElement(GUI_ELEMENTS.HEADING === type ? 'h1' : 'p')
    text.innerText = DOM.DEFAULTS.TEXT;
    wrapper.appendChild(text);
    wrapper.classList.add(DOM.CLASSES.TEXT);
    return wrapper;
  }

  private createInput() {
    const wrapper = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');

    label.classList.add(DOM.CLASSES.TEXT_INPUT_LABEL);
    label.innerText = DOM.DEFAULTS.INPUT_LABEL;
    input.placeholder = DOM.DEFAULTS.INPUT_PLACEHOLDER;
    input.type = 'text';
    input.classList.add(DOM.CLASSES.TEXT_INPUT);
    input.id = this.generateID();
    label.htmlFor = input.id;
    wrapper.append(label, input);

    return wrapper;
  }

  private createImage(): HTMLImageElement {
    const image = document.createElement('img');
    image.src = DOM.DEFAULTS.IMAGE_SRC;
    image.style.width = image.style.height = '300px';
    image.style.objectFit = 'contain';
    return image;
  }

  private generateID() {
    let id = generateHash();
    while (document.getElementById(id)) {
      id = generateHash();
    }

    return id;
  }
}

export const dom = new DOMService();
