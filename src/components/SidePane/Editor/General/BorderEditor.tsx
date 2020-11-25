import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import Select, { ValueType } from 'react-select';
import { BORDER_TYPES } from '../../../../constants/border.constants';
import { Builder } from '../../../../context/builder.context';
import { StyleParser } from '../../../../helper/StyleParser';
import { SelectOptions } from '../../../../interfaces/Select';
import Toggle from 'react-toggle';
import { ColorResult, TwitterPicker } from 'react-color';
import GutterEditor from './GutterEditor';

function BorderEditor() {
  const { state } = useContext(Builder);
  const [borderType, setBorderType] = useState({ label: '', value: '' });
  const [borderWidth, setBorderWidth] = useState<number[]>([]);
  const [isWidthAppliedToAllSides, setIsWidthAppliedToAllSides] = useState(false);
  const [borderRadius, setBorderRadius] = useState<number[]>([]);
  const [isRadiusAppliedToAllSides, setIsRadiusAppliedToAllSides] = useState(false);
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
    setIsWidthAppliedToAllSides(StyleParser.isAppliedToAllSides(_borderWidth));
    setIsRadiusAppliedToAllSides(StyleParser.isAppliedToAllSides(_borderRadius));
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

  function handleSetAllSideWidth(event: ChangeEvent<HTMLInputElement>) {
    setIsWidthAppliedToAllSides(event.currentTarget.value === 'yes');
  }

  function handleSetAllSideRadius(event: ChangeEvent<HTMLInputElement>) {
    setIsRadiusAppliedToAllSides(event.currentTarget.value === 'yes');
  }

  function handleBorderWidthChange(event: FormEvent<HTMLInputElement>) {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    let _borderWidth = Array.from(borderWidth);

    switch (event.currentTarget.name) {
      case 'all':
        _borderWidth = new Array(4).fill(Number(event.currentTarget.value));
        break;
      default:
        _borderWidth[Number(event.currentTarget.name)] = Number(event.currentTarget.value);
    }

    ref.style.borderWidth = _borderWidth.join('px ').concat('px');
    setBorderWidth(_borderWidth);
  }

  function handleBorderRadiusChange(event: FormEvent<HTMLInputElement>) {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    let _borderRadius = Array.from(borderRadius);
    
    switch (event.currentTarget.name) {
      case 'all':
        _borderRadius = new Array(4).fill(Number(event.currentTarget.value));
        break;
      default:
        _borderRadius[Number(event.currentTarget.name)] = Number(event.currentTarget.value);
    }

    ref.style.borderRadius = _borderRadius.join('px ').concat('px');
    setBorderRadius(_borderRadius);
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
          <div className="gui-gutter-apply-to-all-sides">
            <span>
              Apply to all sides
            </span>
            <Toggle
              checked={isWidthAppliedToAllSides}
              onChange={handleSetAllSideWidth}
            />
          </div>
          {
            isWidthAppliedToAllSides ? (
              <input
                className="gui-element-text-input"
                type="number"
                name="all"
                value={borderWidth[0]}
                onInput={handleBorderWidthChange}
              />
            ) : (
              <GutterEditor
                names={['Top', 'Right', 'Bottom', 'Left']}
                values={borderWidth}
                handleInput={handleBorderWidthChange}
              />
            )
          }
        </div>
      );
    }
  }

  function renderBorderRadiusEditor() {
    if (borderType.value !== 'none') {
      return (
        <div>
          <h5>Border Radius: </h5>
          <div className="gui-gutter-apply-to-all-sides">
            <span>
              Apply to all sides
            </span>
            <Toggle
              checked={isRadiusAppliedToAllSides}
              onChange={handleSetAllSideRadius}
            />
          </div>
          {
            isRadiusAppliedToAllSides ? (
              <input
                className="gui-element-text-input"
                type="number"
                name="all"
                value={borderRadius[0]}
                onInput={handleBorderRadiusChange}
              />
            ) : (
              <GutterEditor
                names={['Top Left', 'Top Right', 'Bottom Right', 'Bottom Left']}
                values={borderRadius}
                handleInput={handleBorderRadiusChange}
              />
            )
          }
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