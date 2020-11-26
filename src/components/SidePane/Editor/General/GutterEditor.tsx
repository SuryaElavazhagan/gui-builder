import { FormEvent, useState, useEffect, ChangeEvent } from "react";
import Toggle from 'react-toggle';
import { StyleParser } from "../../../../helper/StyleParser";
import '../../../../styles/components/gutter.scss';

interface GutterProps {
  names: string[];
  values: number[];
  handleInput: (event: FormEvent<HTMLInputElement>) => void;
}

function GutterEditor({ names, values, handleInput }: GutterProps) {
  const [isAppliedToAllSides, setIsAppliedToAllSides] = useState(false);

  useEffect(() => {
    setIsAppliedToAllSides(StyleParser.isAppliedToAllSides(values));

    // This should be initialized only once, after that
    // This value should be controlled by user
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSetIsAppliedToAllSides(event: ChangeEvent<HTMLInputElement>) {
    setIsAppliedToAllSides(event.currentTarget.value === 'yes');
  }

  return (
    <div className="gui-gutter">
      <div className="gui-gutter-apply-to-all-sides">
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
              <div className="gui-gutter-upper-half">
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
              <div className="gui-gutter-lower-half">
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