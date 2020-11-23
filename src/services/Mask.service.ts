import { DOM } from "../constants/dom.constants";
import { drawOver } from "../utilities/ui";

class MaskService {
  private click: HTMLElement;
  private hover: HTMLElement;

  constructor() {
    this.click = document.createElement('div');
    this.click.id = DOM.MASK.CLICK;
    this.hover = document.createElement('div');
    this.hover.id = DOM.MASK.HOVER;

    this.hideClickMask();
    this.hideHoverMask();

    document.body.append(this.click, this.hover);
  }

  paintClickMask(ref: HTMLElement) {
    this.click.style.display = 'block';
    drawOver(this.click, ref);
  }

  hideClickMask() {
    this.click.style.display = 'none';
  }

  paintHoverMask(ref: HTMLElement) {
    this.hover.style.display = 'block';
    drawOver(this.hover, ref);
  }

  hideHoverMask() {
    this.hover.style.display = 'none';
  }
}

export const mask = new MaskService();