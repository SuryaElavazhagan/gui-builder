import { FormEvent, useContext, useEffect, useState } from 'react';
import Select, { ValueType } from 'react-select';
import { INPUT_TYPES } from '../../../../constants/input.constants';
import { Builder } from '../../../../context/builder.context';
import { SelectOptions } from '../../../../interfaces/Select';

function TextInputEditor() {
  const { state } = useContext(Builder);
  const [inputType, setInputType] = useState({ label: '', value: '' });
  const [inputLabel, setInputLabel] = useState('');
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    const inputRef = ref.querySelector('input') as HTMLInputElement;
    const labelRef = ref.querySelector('label') as HTMLLabelElement;
    if (inputRef.parentElement === ref && labelRef?.parentElement === ref) {
      const inputType = INPUT_TYPES.find((type => type.value === inputRef.type));
      const label = labelRef.innerText;
      setInputType(inputType!);
      setInputLabel(label);
      setPlaceholder(inputRef.placeholder);
    }
  }, [state.selectedElement]);

  function handleInputTypeChange(value: ValueType<SelectOptions>) {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    const inputRef = ref.querySelector('input') as HTMLInputElement;
    inputRef.type = (value as SelectOptions).value;
    setInputType(value as SelectOptions);
  }

  function handleLabelChange(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    const labelRef = ref.querySelector('label') as HTMLLabelElement;
    labelRef.innerText = value;
    setInputLabel(value);
  }

  function handlePlaceholderChange(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    const inputRef = ref.querySelector('input') as HTMLInputElement;
    inputRef.placeholder = value;
    setPlaceholder(value);
  }

  return (
    <div className="gui-text-input-editor">
      <h5>Label: </h5>
      <input className="gui-element-text-input" type="text" value={inputLabel} onInput={handleLabelChange} />
      <h5>Placeholder: </h5>
      <input className="gui-element-text-input" type="text" value={placeholder} onInput={handlePlaceholderChange} />
      <h5>Type: </h5>
      <Select options={INPUT_TYPES} value={inputType} onChange={handleInputTypeChange} />
    </div>
  );
}

export default TextInputEditor;