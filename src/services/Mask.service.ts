import { DOM } from "../constants/dom.constants";
import { drawOver } from "../utilities/ui";
import { ResizeObserver } from 'resize-observer';
import { ResizeObserverEntry } from "resize-observer/lib/ResizeObserverEntry";

class MaskService {
  private click: HTMLElement;
  private hover: HTMLElement;
  private rObserver: ResizeObserver;

  constructor() {
    this.click = document.createElement('div');
    this.click.id = DOM.MASK.CLICK;
    this.hover = document.createElement('div');
    this.hover.id = DOM.MASK.HOVER;
    this.handleResize = this.handleResize.bind(this);
    this.rObserver = new ResizeObserver(this.handleResize);

    this.hideClickMask();
    this.hideHoverMask();

    document.body.append(this.click, this.hover);
  }

  private handleResize(entries: ResizeObserverEntry[]) {
    if (entries.length > 0) {
      const target = entries[0].target as HTMLElement;
      this.paintClickMask(target);
    }
  }

  public paintClickMask(ref: HTMLElement) {
    this.click.style.display = 'block';
    this.rObserver.observe(ref);
    drawOver(this.click, ref);
  }

  public hideClickMask() {
    this.rObserver.disconnect();
    this.click.style.display = 'none';
  }

  public paintHoverMask(ref: HTMLElement) {
    this.hover.style.display = 'block';
    drawOver(this.hover, ref);
  }

  public hideHoverMask() {
    this.hover.style.display = 'none';
  }
}

export const mask = new MaskService();