import { DragEvent } from 'react';
import '../styles/components/side-pane.scss';
import text from '../assets/icons/text.png';
import textInput from '../assets/icons/text-input.png';
import button from '../assets/icons/button.png';
import { GUI_ELEMENTS } from '../constants/element.constants';

function SidePane(): JSX.Element {
  
  function handleDragStart(event: DragEvent) {
    const target = event.currentTarget as HTMLElement;
    const type = target.dataset.type;
    if (typeof type === 'string' && type !== '') {
      event.dataTransfer.dropEffect = 'copy';
      event.dataTransfer.setData('text/plain', type);
    }
  }

  return (
    <div className="gui-side-pane">
      <h3>Elements</h3>
      <div
        className="gui-card"
        draggable={true}
        data-type={GUI_ELEMENTS.TEXT}
        onDragStart={handleDragStart}
      >
        <img className="gui-element-icon" src={text} alt="text" />
        <span className="gui-element-label">Text</span>
      </div>
      <div
        className="gui-card"
        draggable={true}
        data-type={GUI_ELEMENTS.BUTTON}
        onDragStart={handleDragStart}
      >
        <img className="gui-element-icon" src={button} alt="text" />
        <span className="gui-element-label">Button</span>
      </div>
      <div
        className="gui-card"
        draggable={true}
        data-type={GUI_ELEMENTS.TEXT_INPUT}
        onDragStart={handleDragStart}
      >
        <img className="gui-element-icon" src={textInput} alt="text" />
        <span className="gui-element-label">Text Input</span>
      </div>
    </div>
  );
}

export default SidePane;