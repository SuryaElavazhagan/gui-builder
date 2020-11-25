import { FormEvent } from "react";
import '../../../../styles/components/gutter.scss';

interface GutterProps {
  names: string[];
  values: number[];
  handleInput: (event: FormEvent<HTMLInputElement>) => void;
}

function GutterEditor({ names, values, handleInput }: GutterProps) {
  return (
    <div className="gui-gutter">
      <div className="gui-gutter-upper-half">
        <div>
          <h5>{ names[0] }</h5>
          <input
            type="number"
            className="gui-element-text-input"
            name="0"
            value={values[0]}
            onInput={handleInput}
          />
        </div>
        <div>
          <h5>{ names[1] }</h5>
          <input
            type="number"
            className="gui-element-text-input"
            name="1"
            value={values[1]}
            onInput={handleInput}
          />
        </div>
      </div>
      <div className="gui-gutter-lower-half">
        <div>
          <h5>{ names[2] }</h5>
          <input
            type="number"
            className="gui-element-text-input"
            name="2"
            value={values[2]}
            onInput={handleInput}
          />
        </div>
        <div>
          <h5>{ names[3] }</h5>
          <input
            type="number"
            className="gui-element-text-input"
            name="3"
            value={values[3]}
            onInput={handleInput}
          />
        </div>
      </div>
    </div>
  );
}

export default GutterEditor;