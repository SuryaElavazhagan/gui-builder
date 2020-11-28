import { DragEvent } from 'react';
import text from '../../assets/icons/text.png';
import heading from '../../assets/icons/heading.png';
import textInput from '../../assets/icons/text-input.png';
import button from '../../assets/icons/button.png';
import image from '../../assets/icons/image.png';
import { GUI_ELEMENTS } from '../../constants/element.constants';

interface GUIElementsProps {
  handleDragStart: (event: DragEvent) => void;
}

function GUIElements({ handleDragStart }: GUIElementsProps) {
  return (
    <>
      <div
        className="gui-card"
        draggable={true}
        data-type={GUI_ELEMENTS.HEADING}
        onDragStart={handleDragStart}
      >
        <img className="gui-element-icon" src={heading} alt="text" />
        <span className="gui-element-label">Heading</span>
      </div>
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
        data-type={GUI_ELEMENTS.IMAGE}
        onDragStart={handleDragStart}
      >
        <img className="gui-element-icon" src={image} alt="text" />
        <span className="gui-element-label">Image</span>
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
      <div
        className="gui-card"
        draggable={true}
        data-type={GUI_ELEMENTS.BUTTON}
        onDragStart={handleDragStart}
      >
        <img className="gui-element-icon" src={button} alt="text" />
        <span className="gui-element-label">Button</span>
      </div>
    </>
  );
}

export default GUIElements;