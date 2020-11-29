import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { ColorResult, TwitterPicker } from "react-color";
import Toggle from "react-toggle";
import { Builder } from "../../../../context/builder.context";
import { StyleParser, Shadow } from "../../../../helper/StyleParser";

function ShadowEditor() {
  const { state } = useContext(Builder);
  const [shadowEnabled, setShadowEnabled] = useState(false);
  const [insetEnabled, setInsetEnabled] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [blur, setBlur] = useState(0);
  const [spread, setSpread] = useState(0);
  const [shadowColor, setShadowColor] = useState('');

  useEffect(() => {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    const parsedShadow = StyleParser.parseShadow(ref);
    setShadowEnabled(parsedShadow.type !== 'none');
    setInsetEnabled(parsedShadow.type === 'inset');
    setX(parsedShadow.offsetX);
    setY(parsedShadow.offsetY);
    setBlur(parsedShadow.blurRadius);
    setSpread(parsedShadow.spreadRadius);
    setShadowColor(parsedShadow.color);
  }, [state.selectedElement]);

  function getShadow({
    type = insetEnabled ? 'inset' : 'normal',
    offsetX = x,
    offsetY = y,
    blurRadius = blur,
    spreadRadius = spread,
    color = shadowColor
  }: Partial<Shadow>) {
    let _boxShadow = `${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${color}`;
    if (type === 'inset') {
      _boxShadow = `inset ${_boxShadow}`;
    }
    return _boxShadow;
  }

  function handleToggleShadow(event: ChangeEvent<HTMLInputElement>) {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    if (event.currentTarget.checked) {
      ref.style.boxShadow = '2px 2px 2px 1px rgba(0, 0, 0, 0.2)';
      setX(2);
      setY(2);
      setBlur(2);
      setSpread(1);
      setShadowColor('rgba(0,0,0,0.2)');
    } else {
      ref.style.boxShadow = 'none';
    }

    setShadowEnabled(event.currentTarget.checked);
  }

  function handleToggleInset(event: ChangeEvent<HTMLInputElement>) {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    ref.style.boxShadow = getShadow({
      type: event.currentTarget.checked ? 'inset' : 'normal',
    });
    setInsetEnabled(event.currentTarget.checked);
  }

  function handleXChange(event: FormEvent<HTMLInputElement>) {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    const value = +event.currentTarget.value;
    ref.style.boxShadow = getShadow({
      offsetX: value,
    });
    setX(value);
  }

  function handleYChange(event: FormEvent<HTMLInputElement>) {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    const value = +event.currentTarget.value;
    ref.style.boxShadow = getShadow({
      offsetY: value,
    });
    setY(value);
  }

  function handleBlurChange(event: FormEvent<HTMLInputElement>) {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    const value = +event.currentTarget.value;
    ref.style.boxShadow = getShadow({
      blurRadius: value,
    });
    setBlur(value);
  }

  function handleRadiusChange(event: FormEvent<HTMLInputElement>) {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    const value = +event.currentTarget.value;
    ref.style.boxShadow = getShadow({
      spreadRadius: value,
    });
    setSpread(value);
  }

  function handleColorChange(color: ColorResult) {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    ref.style.boxShadow = getShadow({
      color: color.hex,
    });
    setShadowColor(color.hex);
  }

  return (
    <div className="gui-shadow-editor">
      <div className="gui-toggle-input">
        <span>
          Enable
          </span>
        <Toggle
          checked={shadowEnabled}
          onChange={handleToggleShadow}
        />
      </div>
      {
        shadowEnabled ? (
          <div>
            <div className="gui-toggle-input">
              <span>
                Inset
                </span>
              <Toggle
                checked={insetEnabled}
                onChange={handleToggleInset}
              />
            </div>
            <div className="gui-split-input">
              <div>
                <h5>Offset X: </h5>
                <input
                  type="number"
                  className="gui-element-text-input"
                  value={x}
                  onInput={handleXChange}
                />
              </div>
              <div>
                <h5>Offset Y: </h5>
                <input
                  type="number"
                  className="gui-element-text-input"
                  value={y}
                  onInput={handleYChange}
                />
              </div>
            </div>
            <div className="gui-split-input">
              <div>
                <h5>Blur Radius: </h5>
                <input
                  type="number"
                  className="gui-element-text-input"
                  value={blur}
                  onInput={handleBlurChange}
                />
              </div>
              <div>
                <h5>Spread Radius: </h5>
                <input
                  type="number"
                  className="gui-element-text-input"
                  value={spread}
                  onInput={handleRadiusChange}
                />
              </div>
            </div>
            <h5>Color: </h5>
            <TwitterPicker
              triangle="hide"
              color={shadowColor}
              onChange={handleColorChange}
            />
          </div>
        ) : (undefined)
      }
    </div>
  );
}

export default ShadowEditor;