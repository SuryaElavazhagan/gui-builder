import { DOM } from "../constants/dom.constants";
import { STORAGE } from "../constants/storage.constants";
import DOMPurify from 'dompurify';
import { DragAndDrop } from "../services/DragAndDrop.service";

export class LocalStorage {
  public static restore() {
    const dom = window.localStorage.getItem(STORAGE.DOM);
    const root = document.getElementById(DOM.BUILDER_ROOT_ID);
    if (dom !== null && root !== null) {
      root.innerHTML = dom;
      
      root.childNodes.forEach(node => {
        DragAndDrop.attach(node as HTMLElement);
      });
    }
  }

  public static save() {
    const root = document.getElementById(DOM.BUILDER_ROOT_ID);
    if (root !== null) {
      window.localStorage.setItem(STORAGE.DOM, DOMPurify.sanitize(root.innerHTML));
    }
  }
}