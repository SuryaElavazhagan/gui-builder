import { FormEvent, useState, useEffect, ChangeEvent } from "react";
import Toggle from 'react-toggle';
import { StyleParser } from "../../../../helper/StyleParser";

interface GutterProps {
  names: string[];
  values: number[];
  onChange: (values: number[]) => void;
}

function GutterEditor({ names, values, onChange }: GutterProps) {
  const [isAppliedToAllSides, setIsAppliedToAllSides] = useState(false);

  useEffect(() => {
    setIsAppliedToAllSides(StyleParser.isAppliedToAllSides(values));
  }, [values]);

  function handleInput(event: FormEvent<HTMLInputElement>) {
    let _values = Array.from(values);

    switch (event.currentTarget.name) {
      case 'all':
        _values = new Array(4).fill(Number(event.currentTarget.value));
        break;
      default:
        _values[Number(event.currentTarget.name)] = Number(event.currentTarget.value);
    }

    onChange(_values);
  }

  function handleSetIsAppliedToAllSides(event: ChangeEvent<HTMLInputElement>) {
    setIsAppliedToAllSides(event.currentTarget.checked);
  }

  return (
    <div className="gui-gutter">
      <div className="gui-toggle-input">
        <span>
          Apply to all sides
        </span>
        <Toggle
          checked={isAppliedToAllSides}
          onChange={handleSetIsAppliedToAllSides}
        />
      </div>
      {
        isAppliedToAllSides ? (
          <input
            className="gui-element-text-input"
            type="number"
            name="all"
            value={values[0]}
            onInput={handleInput}
          />
        ) : (
            <div>
              <div className="gui-split-input">
                <div>
                  <h5>{names[0]}</h5>
                  <input
                    type="number"
                    className="gui-element-text-input"
                    name="0"
                    value={values[0]}
                    onInput={handleInput}
                  />
                </div>
                <div>
                  <h5>{names[1]}</h5>
                  <input
                    type="number"
                    className="gui-element-text-input"
                    name="1"
                    value={values[1]}
                    onInput={handleInput}
                  />
                </div>
              </div>
              <div className="gui-split-input">
                <div>
                  <h5>{names[2]}</h5>
                  <input
                    type="number"
                    className="gui-element-text-input"
                    name="2"
                    value={values[2]}
                    onInput={handleInput}
                  />
                </div>
                <div>
                  <h5>{names[3]}</h5>
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
          )
      }
    </div>
  );

}

export default GutterEditor;