import { useContext, useEffect, useState } from 'react';
import Select, { ValueType } from 'react-select';
import { BORDER_TYPES } from '../../../../constants/border.constants';
import { Builder } from '../../../../context/builder.context';
import { StyleParser } from '../../../../helper/StyleParser';
import { SelectOptions } from '../../../../interfaces/Select';
import { ColorResult, TwitterPicker } from 'react-color';
import GutterEditor from './GutterEditor';

function BorderEditor() {
  const { state } = useContext(Builder);
  const [borderType, setBorderType] = useState({ label: '', value: '' });
  const [borderWidth, setBorderWidth] = useState<number[]>([]);
  const [borderRadius, setBorderRadius] = useState<number[]>([]);
  const [borderColor, setBorderColor] = useState('');

  useEffect(() => {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    const borderType = StyleParser.parseBorder(ref);
    const borderValue = BORDER_TYPES.find((type) => type.value === borderType)!;
    const _borderWidth = StyleParser.parseBorderWidth(ref);
    const _borderRadius = StyleParser.parseBorderRadius(ref);
    
    setBorderType(borderValue);
    setBorderWidth(_borderWidth);
    setBorderRadius(_borderRadius);
  }, [state.selectedElement]);

  function handleBorderTypeChange(value: ValueType<SelectOptions>) {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    ref.style.borderStyle = (value as SelectOptions).value;

    ref.style.borderWidth = '1px';
    ref.style.borderColor = 'black';

    setBorderType(value as SelectOptions);
    setBorderWidth(new Array(4).fill(1));
    setBorderColor('#000000');
  }

  function handleBorderWidthChange(values: number[]) {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    ref.style.borderWidth = values.join('px ').concat('px');
    setBorderWidth(values);
  }

  function handleBorderRadiusChange(values: number[]) {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    ref.style.borderRadius = values.join('px ').concat('px');
    setBorderRadius(values);
  }

  function handleBorderColorChange(color: ColorResult) {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    ref.style.borderColor = color.hex;
    setBorderColor(color.hex);
  }

  function renderBorderWidthEditor() {
    if (borderType.value !== 'none') {
      return (
        <div>
          <h5>Border Width: </h5>
          <GutterEditor
            names={['Top', 'Right', 'Bottom', 'Left']}
            values={borderWidth}
            onChange={handleBorderWidthChange}
          />
        </div>
      );
    }
  }

  function renderBorderRadiusEditor() {
    if (borderType.value !== 'none') {
      return (
        <div>
          <h5>Border Radius: </h5>
          <GutterEditor
            names={['Top Left', 'Top Right', 'Bottom Right', 'Bottom Left']}
            values={borderRadius}
            onChange={handleBorderRadiusChange}
          />
        </div>
      );
    }
  }

  function renderBorderColor() {
    if (borderType.value !== 'none') {
      return (
        <div>
          <h5>Color: </h5>
          <TwitterPicker
            triangle="hide"
            color={borderColor}
            onChange={handleBorderColorChange}
          />
        </div>
      );
    }
  }

  return (
    <div className="gui-border-editor">
      <h5>Type: </h5>
      <Select
        options={BORDER_TYPES}
        value={borderType}
        onChange={handleBorderTypeChange}
      />
      {
        renderBorderWidthEditor()
      }
      {
        renderBorderRadiusEditor()
      }
      {
        renderBorderColor()
      }
    </div>
  );
}

export default BorderEditor;