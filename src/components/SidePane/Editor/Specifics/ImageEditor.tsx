import { FormEvent, useContext, useEffect, useState } from 'react';
import { ValueType } from 'react-select';
import Select from 'react-select';
import { IMAGE_CLIP, IMAGE_FIT } from '../../../../constants/image.constants';
import { Builder } from '../../../../context/builder.context';
import { SelectOptions } from '../../../../interfaces/Select';
import '../../../../styles/components/image-editor.scss';

function ImageEditor() {
  const { state } = useContext(Builder);
  const [fit, setFit] = useState<SelectOptions>({ label: '', value: '' });
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [src, setSrc] = useState('');
  const [clip, setClip] = useState<SelectOptions>({ label: '', value: '' });

  useEffect(() => {
    const ref = document.getElementById(state.selectedElement) as HTMLImageElement;
    const style = window.getComputedStyle(ref);
    const _objectFit = IMAGE_FIT.find((fit) => fit.value === style.objectFit)!;
    const _clipPath = IMAGE_CLIP.find((clipPath) => clipPath.value === style.clipPath)!;
    setFit(_objectFit);
    setClip(_clipPath);
    setWidth(+style.width.replace('px', ''));
    setHeight(+style.height.replace('px', ''));
    setSrc(ref.src);
  }, [state.selectedElement]);

  function handleFitChange(value: ValueType<SelectOptions>) {
    const ref = document.getElementById(state.selectedElement) as HTMLImageElement;
    ref.style.objectFit = (value as SelectOptions).value;
    setFit(value as SelectOptions);
  }

  function handleHeightChange(event: FormEvent<HTMLInputElement>) {
    const ref = document.getElementById(state.selectedElement) as HTMLImageElement;
    const value = +event.currentTarget.value;
    ref.style.height = `${value}px`;
    setHeight(value);
  }

  function handleWidthChange(event: FormEvent<HTMLInputElement>) {
    const ref = document.getElementById(state.selectedElement) as HTMLImageElement;
    const value = +event.currentTarget.value;
    ref.style.width = `${value}px`;
    setWidth(value);
  }

  function handleClipPathChange(value: ValueType<SelectOptions>) {
    const ref = document.getElementById(state.selectedElement) as HTMLImageElement;
    ref.style.clipPath = (value as SelectOptions).value;
    setClip(value as SelectOptions);
  }

  function handleSourceChange(event: FormEvent<HTMLInputElement>) {
    const ref = document.getElementById(state.selectedElement) as HTMLImageElement;
    ref.src = event.currentTarget.value;
    setSrc(event.currentTarget.value);
  }

  return (
    <div className="gui-image-editor">
      <h5>Image Source: </h5>
      <input
        className="gui-element-text-input"
        type="url"
        value={src}
        onChange={handleSourceChange}
      />
      <div className="gui-image-size">
        <div>
          <h5>Width:</h5>
          <input
            className="gui-element-text-input"
            type="number"
            value={width}
            onInput={handleWidthChange}
          />
        </div>
        <div>
          <h5>Height:</h5>
          <input
            className="gui-element-text-input"
            type="number"
            value={height}
            onInput={handleHeightChange}
          />
        </div>
      </div>
      <h5>Fit:</h5>
      <Select
        options={IMAGE_FIT}
        value={fit}
        onChange={handleFitChange}
      />
      <h5>Clip:</h5>
      <Select
        options={IMAGE_CLIP}
        value={clip}
        onChange={handleClipPathChange}
      />
    </div>
  );
}

export default ImageEditor;