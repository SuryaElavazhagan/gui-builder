import { DOM } from "../constants/dom.constants";
import { dom } from "./DOM.service";

export class DragAndDrop {
  private static handleDragStart(event: DragEvent) {
    if (event.dataTransfer) {
      const target = event.currentTarget as HTMLElement;
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.setData('text/plain', target.id);
    }
  }

  private static handleDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!event.shiftKey) {
      const target = event.currentTarget as HTMLElement;
      const dropIndicator = document.getElementById(DOM.DROP_INDICATOR) as HTMLElement;
      const { width, bottom, left } = target.getBoundingClientRect();
      dropIndicator.style.width = `${width}px`;
      dropIndicator.style.top = `${bottom}px`;
      dropIndicator.style.left = `${left}px`;
      dropIndicator.style.display = 'block';
    }
  }

  private static handleDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropIndicator = document.getElementById(DOM.DROP_INDICATOR) as HTMLElement;
    dropIndicator.style.display = 'none';
  }

  private static handleDrop(event: DragEvent) {
    if (event.dataTransfer) {
      event.preventDefault();
      event.stopPropagation();
      const target = event.currentTarget as HTMLElement;
      const parent = (target.id === DOM.BUILDER_ROOT_ID ? target : target.parentElement) as HTMLElement;
      const idOrName = event.dataTransfer.getData('text/plain');
      const dropIndicator = document.getElementById(DOM.DROP_INDICATOR) as HTMLElement;
      let ref = document.getElementById(idOrName);
      if (ref === null) {
        ref = dom.create(idOrName);
        DragAndDrop.attach(ref);
      }
      if (event.shiftKey) {
        ref.dataset.absolute = "true";
        ref.style.zIndex = "1";
        ref.style.position = "absolute";
        ref.style.left = `${event.clientX}px`;
        ref.style.top = `${event.clientY}px`
      } else if (target.id === DOM.BUILDER_ROOT_ID) {
        parent.append(ref);
      } else {
        parent.insertBefore(ref, target.nextElementSibling);
      }
      dropIndicator.style.display = 'none';
    }
  }

  private static setupDragIndicator() {
    const dropIndicator = document.createElement('div');
    dropIndicator.id = DOM.DROP_INDICATOR;
    dropIndicator.style.display = 'none';
    dropIndicator.classList.add('gui-drop-indicator');
    document.body.append(dropIndicator);
  }

  public static initialize() {
    const root = document.getElementById(DOM.BUILDER_ROOT_ID) as HTMLElement;
    root.addEventListener('drop', DragAndDrop.handleDrop);
    DragAndDrop.setupDragIndicator();
  }

  public static attach(ref: HTMLElement) {
    ref.addEventListener('dragstart', DragAndDrop.handleDragStart);
    ref.addEventListener('dragover', DragAndDrop.handleDragOver);
    ref.addEventListener('dragleave', DragAndDrop.handleDragLeave);
    ref.addEventListener('drop', DragAndDrop.handleDrop);
  }
}