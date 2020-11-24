import { useContext, useEffect, useState, FormEvent } from "react";
import { Builder } from "../../../../context/builder.context";

function ButtonEditor() {
  const { state } = useContext(Builder);
  const [label, setLabel] = useState('');
  
  useEffect(() => {
    const ref = document.getElementById(state.selectedElement) as HTMLButtonElement; // It won't be null here
    setLabel(ref.textContent ?? '');
  }, [state.selectedElement]);

  function handleLabelChange(event: FormEvent<HTMLInputElement>) {
    const ref = document.getElementById(state.selectedElement) as HTMLButtonElement; // It won't be null here
    ref.textContent = event.currentTarget.value;
    setLabel(event.currentTarget.value);
  }

  return (
    <div className="gui-button-editor">
      <h5>Label:</h5>
      <input className="gui-element-text-input" type="text" value={label} onInput={handleLabelChange} />
    </div>
  );
}

export default ButtonEditor;