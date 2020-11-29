import { DragEvent as ReactDragEvent } from 'react';
import { DOM } from "../constants/dom.constants";
import { dom } from "./DOM.service";

export class DragAndDrop {
  private static handleDragStart(event: DragEvent) {
    if (event.dataTransfer) {
      const target = event.currentTarget as HTMLElement;
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.setData('text/plain', target.id);
      DragAndDrop.toggleDragImage(event, target.dataset.type ?? 'Element');
    }
  }

  private static handleDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    if (!event.shiftKey && target.dataset.absolute !== 'true') {
      const dropIndicator = document.getElementById(DOM.DROP_INDICATOR) as HTMLElement;
      const { width, bottom, left, top } = target.getBoundingClientRect();
      dropIndicator.style.width = `${width}px`;
      dropIndicator.style.left = `${left}px`;
      dropIndicator.style.display = 'block';
      if (target.parentElement && target.parentElement.firstElementChild === target) {
        const isBottom = ((top + bottom) / 2) < event.clientY;
        if (isBottom) {
          dropIndicator.style.top = `${bottom}px`;
          dropIndicator.dataset.drop = 'bottom';
        } else {
          dropIndicator.style.top = `${top}px`;
          dropIndicator.dataset.drop = 'top';
        }
      } else {
        dropIndicator.style.top = `${bottom}px`;
        dropIndicator.dataset.drop = 'bottom';
      }
    }
  }

  private static handleDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropIndicator = document.getElementById(DOM.DROP_INDICATOR) as HTMLElement;
    dropIndicator.style.display = 'none';
  }

  private static handleDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    if (event.dataTransfer && target.dataset.absolute !== 'true') {
      const parent = (target.id === DOM.BUILDER_ROOT_ID ? target : target.parentElement) as HTMLElement;
      const idOrName = event.dataTransfer.getData('text/plain');
      const dropIndicator = document.getElementById(DOM.DROP_INDICATOR) as HTMLElement;
      let ref = document.getElementById(idOrName);
      if (ref === null) {
        ref = dom.create(idOrName);
        target.appendChild(ref);
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
        const isBottom = dropIndicator.dataset.drop === 'bottom';
        if (isBottom) {
          parent.insertBefore(ref, target.nextElementSibling);
        } else {
          parent.insertBefore(ref, target);
        }
      }
      dropIndicator.style.display = 'none';
      dropIndicator.dataset.drop = undefined;
    }
  }

  private static setupDragImage() {
    const dragImage = document.createElement('span');
    dragImage.style.display = 'none';
    dragImage.id = DOM.DRAG_IMAGE;
    dragImage.classList.add('gui-drag-image');
    document.body.appendChild(dragImage);
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
    DragAndDrop.setupDragImage();
  }

  public static toggleDragImage(event: DragEvent | ReactDragEvent, text: string = '') {
    const dragImage = document.getElementById(DOM.DRAG_IMAGE) as HTMLElement;
    dragImage.innerText = text.toUpperCase();

    if (event.type === 'dragstart' && event.dataTransfer) {
      dragImage.style.display = 'inline-block';
      event.dataTransfer.setDragImage(dragImage, 10, 10);
    } else if (event.type === 'dragexit') {
      dragImage.style.display = 'none'
    }
  }

  public static attach(ref: HTMLElement) {
    ref.addEventListener('dragstart', DragAndDrop.handleDragStart);
    ref.addEventListener('dragover', DragAndDrop.handleDragOver);
    ref.addEventListener('dragleave', DragAndDrop.handleDragLeave);
    ref.addEventListener('drop', DragAndDrop.handleDrop);
    ref.addEventListener('dragend', DragAndDrop.toggleDragImage);
  }
}