import { MouseEvent, useContext, useEffect } from "react";
import Select, { ValueType } from 'react-select';
import { Builder } from "../../../../context/builder.context";
import { TextEditor, TextEditCommands } from "../../../../helper/TextEditor";
import { FONT_FAMILIES, FONT_SIZES } from "../../../../constants/text.constants";
import { SelectOptions } from "../../../../interfaces/Select";
import bold from '../../../../assets/icons/bold.png';
import italic from '../../../../assets/icons/italic.png';
import underline from '../../../../assets/icons/underline.png';
import strikethrough from '../../../../assets/icons/strikethrough.png';
import left from '../../../../assets/icons/align-left.png';
import right from '../../../../assets/icons/align-right.png';
import center from '../../../../assets/icons/align-center.png';
import justify from '../../../../assets/icons/align-justify.png';
import '../../../../styles/components/rich-text-editor.scss';


function RichTextEditor() {
  const { state } = useContext(Builder);
  
  useEffect(() => {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    TextEditor.attach(ref);

    return function cleanup() {
      TextEditor.detach();
    }
  }, [state.selectedElement]);

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
      <h5>Font Family: </h5>
      <Select options={FONT_FAMILIES} value={FONT_FAMILIES[0]} onMenuOpen={TextEditor.focus} onChange={handleFontFamilyChange} />
      <h5>Font Size: </h5>
      <Select options={FONT_SIZES} value={FONT_SIZES[0]} onMenuOpen={TextEditor.focus} onChange={handleFontSizeChange} />
      <h5>Format: </h5>
      <img onClick={handleTextEdit} className="gui-format-icons" data-type="bold" src={bold} alt="Bold" />
      <img onClick={handleTextEdit} className="gui-format-icons" data-type="italic" src={italic} alt="Italic" />
      <img onClick={handleTextEdit} className="gui-format-icons" data-type="underline" src={underline} alt="Underline" />
      <img onClick={handleTextEdit} className="gui-format-icons" data-type="strikethrough" src={strikethrough} alt="Strikethrough" />

      <h5>Alignment: </h5>
      <img onClick={handleTextEdit} className="gui-align-icons" data-type="justifyleft" src={left} alt="Left Align" />
      <img onClick={handleTextEdit} className="gui-align-icons" data-type="justifycenter" src={center} alt="Center Align" />
      <img onClick={handleTextEdit} className="gui-align-icons" data-type="justifyright" src={right} alt="Right Align" />
      <img onClick={handleTextEdit} className="gui-align-icons" data-type="justifyFull" src={justify} alt="Justify" />
    </div>
  );
}

export default RichTextEditor;