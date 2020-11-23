import { DragEvent, MouseEvent } from 'react';
import { DOM } from '../constants/dom.constants';
import { dom } from '../services/DOM.service';
import { mask } from '../services/Mask.service';
import '../styles/components/builder-pane.scss';

interface BuilderPaneProps {
  handleElementSelected: (ref: HTMLElement) => void;
}

function BuilderPane({ handleElementSelected }: BuilderPaneProps) {

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    target.style.borderColor = 'black';
  }

  function handleDragLeave(event: DragEvent) {
    const target = event.currentTarget as HTMLElement;
    target.style.borderColor = '';
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    const type = event.dataTransfer.getData("text/plain");
    const element = dom.create(type);
    const root = document.getElementById(DOM.BUILDER_ROOT_ID) as HTMLElement;
    root.appendChild(element);
  }

  function filterElementFromEvent(event: MouseEvent): HTMLElement | null {
    // event.composedPath() is not available in typing; IDK why!
    const currentTarget = event.currentTarget as HTMLElement;
    let target: HTMLElement | null = event.target as HTMLElement;

    while (currentTarget.contains(target) && target !== null) {
      if (typeof target.dataset.type === 'string') {
        break;
      }
      if (target === currentTarget || target.parentElement === currentTarget) {
        return null;
      }
      target = target.parentElement;
    }

    return target;
  }

  function handleMouseMove(event: MouseEvent) {
    const target = filterElementFromEvent(event);
    if (target) {
      event.stopPropagation();
      mask.paintHoverMask(target);
    } else {
      mask.hideHoverMask();
    }
  }

  function handleClick(event: MouseEvent) {
    const target = filterElementFromEvent(event);
    if (target) {
      event.stopPropagation();
      mask.paintClickMask(target);
      handleElementSelected(target);
    } else {
      mask.hideClickMask();
    }
  }

  function handleMouseOut(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      mask.hideHoverMask();
    }
  }

  return (
    // Not going to use iframe and make the app more complex
    // But for security concerns, while storing the DOM to localstorage
    // it is sanitized by [dompurify](https://github.com/cure53/DOMPurify)
    <div className="gui-builder">
      <div
        id={DOM.BUILDER_ROOT_ID}
        className="gui-inner-wrapper"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
      />
    </div>
  );
}

export default BuilderPane;