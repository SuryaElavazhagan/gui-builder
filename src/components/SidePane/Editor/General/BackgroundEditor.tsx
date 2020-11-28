import { useContext, useEffect, useState } from "react";
import { ColorResult, TwitterPicker } from "react-color";
import { Builder } from "../../../../context/builder.context";
import { StyleParser } from "../../../../helper/StyleParser";

function BackgroundEditor() {
  const { state } = useContext(Builder);
  const [background, setBackground] = useState('');

  useEffect(() => {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    setBackground(StyleParser.parseBackground(ref));
  }, [state.selectedElement]);

  function handleBackgroundChange(color: ColorResult) {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    ref.style.backgroundColor = color.hex;
    setBackground(color.hex);
  }

  return (
    <div className="gui-background-editor">
      <TwitterPicker
        triangle="hide"
        color={background}
        onChange={handleBackgroundChange}
      />
    </div>
  );
}

export default BackgroundEditor;