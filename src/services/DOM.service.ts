import { DOM } from "../constants/dom.constants";
import { GUI_ELEMENTS } from "../constants/element.constants";
import { generateHash } from "../utilities/random";

class DOMService {
  public create(type: string): HTMLElement {
    let element: HTMLElement;
    switch (type) {
      case GUI_ELEMENTS.TEXT:
        element = document.createElement('p');
        element.innerText = DOM.DEFAULTS.TEXT;
        element.classList.add(DOM.CLASSES.TEXT);
        break;
      case GUI_ELEMENTS.BUTTON:
        element = document.createElement('button');
        element.innerText = DOM.DEFAULTS.BUTTON_LABEL;
        element.classList.add(DOM.CLASSES.BUTTON);
        break;
      case GUI_ELEMENTS.TEXT_INPUT:
        element = this.createInput();
        break;
      default:
        throw Error('Invalid element type');
    }
    element.id = this.generateID();
    element.dataset.type = type;
    element.draggable = true;

    return element;
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

  private generateID() {
    let id = generateHash();
    while (document.getElementById(id)) {
      id = generateHash();
    }

    return id;
  }
}

export const dom = new DOMService();
