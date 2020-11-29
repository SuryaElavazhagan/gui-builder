import { MouseEvent, useContext, useEffect, useState } from "react";
import Select, { ValueType } from 'react-select';
import { Builder } from "../../../../context/builder.context";
import { TextEditor, TextEditCommands } from "../../../../services/TextEditor.service";
import { FONT_FAMILIES, FONT_SIZES, HEADINGS } from "../../../../constants/text.constants";
import { SelectOptions } from "../../../../interfaces/Select";
import bold from '../../../../assets/icons/bold.png';
import italic from '../../../../assets/icons/italic.png';
import underline from '../../../../assets/icons/underline.png';
import strikethrough from '../../../../assets/icons/strikethrough.png';
import left from '../../../../assets/icons/align-left.png';
import right from '../../../../assets/icons/align-right.png';
import center from '../../../../assets/icons/align-center.png';
import justify from '../../../../assets/icons/align-justify.png';
import link from '../../../../assets/icons/link.png';
import '../../../../styles/components/rich-text-editor.scss';
import { GUI_ELEMENTS } from "../../../../constants/element.constants";


function RichTextEditor() {
  const { state } = useContext(Builder);
  const [isHeading, setIsHeading] = useState(false);

  useEffect(() => {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    TextEditor.attach(ref);
    setIsHeading(ref.dataset.type === GUI_ELEMENTS.HEADING);

    return function cleanup() {
      TextEditor.detach();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedElement]);

  function handleHeadingChange(value: ValueType<SelectOptions>) {
    if ((value as SelectOptions).value !== 'none') {
      TextEditor.focus();
      TextEditor.handleCommand('formatblock', (value as SelectOptions).value);
    }
  }

  function handleFontFamilyChange(value: ValueType<SelectOptions>) {
    if ((value as SelectOptions).value !== 'none') {
      TextEditor.focus();
      TextEditor.handleCommand('fontname', (value as SelectOptions).value);
    }
  }

  function handleFontSizeChange(value: ValueType<SelectOptions>) {
    if ((value as SelectOptions).value !== 'none') {
      TextEditor.focus();
      TextEditor.handleCommand('fontsize', (value as SelectOptions).value);
    }
  }

  function handleTextEdit(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    TextEditor.focus();
    TextEditor.handleCommand(target.dataset.type as keyof TextEditCommands, undefined);
  }

  return (
    <div className="gui-rich-text-editor">
      {
        isHeading ? (
          <div>
            <h5>Heading: </h5>
            <Select options={HEADINGS} value={HEADINGS[0]} onMenuOpen={TextEditor.focus} onChange={handleHeadingChange} />
          </div>
        ): undefined
      }
      <h5>Font Family: </h5>
      <Select options={FONT_FAMILIES} value={FONT_FAMILIES[0]} onMenuOpen={TextEditor.focus} onChange={handleFontFamilyChange} />
      <h5>Font Size: </h5>
      <Select options={FONT_SIZES} value={FONT_SIZES[0]} onMenuOpen={TextEditor.focus} onChange={handleFontSizeChange} />
      <h5>Format: </h5>
      <img onClick={handleTextEdit} className="gui-format-icons" data-type="bold" src={bold} alt="Bold" />
      <img onClick={handleTextEdit} className="gui-format-icons" data-type="italic" src={italic} alt="Italic" />
      <img onClick={handleTextEdit} className="gui-format-icons" data-type="underline" src={underline} alt="Underline" />
      <img onClick={handleTextEdit} className="gui-format-icons" data-type="strikethrough" src={strikethrough} alt="Strikethrough" />
      <img onClick={TextEditor.addLink} className="gui-format-icons" src={link} alt="Link"/>

      <h5>Alignment: </h5>
      <img onClick={handleTextEdit} className="gui-align-icons" data-type="justifyleft" src={left} alt="Left Align" />
      <img onClick={handleTextEdit} className="gui-align-icons" data-type="justifycenter" src={center} alt="Center Align" />
      <img onClick={handleTextEdit} className="gui-align-icons" data-type="justifyright" src={right} alt="Right Align" />
      <img onClick={handleTextEdit} className="gui-align-icons" data-type="justifyFull" src={justify} alt="Justify" />
    </div>
  );
}

export default RichTextEditor;