import { DOM } from "../constants/dom.constants";
import { STORAGE } from "../constants/storage.constants";
import DOMPurify from 'dompurify';

export class LocalStorage {
  public static restore() {
    const dom = window.localStorage.getItem(STORAGE.DOM);
    const root = document.getElementById(DOM.BUILDER_ROOT_ID);
    if (dom !== null && root !== null) {
      root.innerHTML = dom;
    }
  }

  public static save() {
    const root = document.getElementById(DOM.BUILDER_ROOT_ID);
    if (root !== null) {
      window.localStorage.setItem(STORAGE.DOM, DOMPurify.sanitize(root.innerHTML));
    }
  }
}