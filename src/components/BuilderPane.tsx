import { DragEvent, MouseEvent, useContext, useEffect } from 'react';
import { DOM } from '../constants/dom.constants';
import { Builder } from '../context/builder.context';
import { LocalStorage } from '../helper/LocalStorage';
import { dom } from '../services/DOM.service';
import { DragAndDrop } from '../services/DragAndDrop.service';
import { mask } from '../services/Mask.service';
import '../styles/components/builder-pane.scss';

function BuilderPane() {

  const { dispatch } = useContext(Builder);

  useEffect(() => {
    DragAndDrop.setupDragIndicator();
    LocalStorage.restore();
    const id = window.setInterval(() => {
      LocalStorage.save();
    }, 5000);

    return () => {
      window.clearInterval(id);
    }
  }, []);

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
    const root = event.currentTarget as HTMLElement;
    const type = event.dataTransfer.getData("text/plain");
    const element = dom.create(type);
    root.appendChild(element);
    DragAndDrop.attach(element);
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
      dispatch({ type: 'select', payload: target.id });
    } else {
      mask.hideClickMask();
      dispatch({ type: 'select', payload: '' });
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