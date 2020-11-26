import { useContext, useEffect, useState } from "react";
import GutterEditor from './GutterEditor';
import { Builder } from "../../../../context/builder.context";
import { StyleParser } from "../../../../helper/StyleParser";

function SpacingEditor() {
  const { state } = useContext(Builder);
  const [margin, setMargin] = useState<number[]>([]);
  const [padding, setPadding] = useState<number[]>([]);

  useEffect(() => {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    setMargin(StyleParser.parseMargin(ref));
    setPadding(StyleParser.parsePadding(ref));
  }, [state.selectedElement]);

  function handleMarginChange(values: number[]) {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    ref.style.margin = values.join('px ').concat('px');
    setMargin(values);
  }

  function handlePaddingChange(values: number[]) {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    ref.style.padding = values.join('px ').concat('px');
    setPadding(values);
  }

  return (
    <div className="gui-spacing-editor">
      <h5>Outer Spacing</h5>
      <GutterEditor
        names={['Top', 'Right', 'Bottom', 'Left']}
        values={margin}
        onChange={handleMarginChange}
      />
      <h5>Inner Spacing</h5>
      <GutterEditor
        names={['Top', 'Right', 'Bottom', 'Left']}
        values={padding}
        onChange={handlePaddingChange}
      />
    </div>
  );
}

export default SpacingEditor;