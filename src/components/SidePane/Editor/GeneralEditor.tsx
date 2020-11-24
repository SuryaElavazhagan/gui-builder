import Select from 'react-select';
import Collapse from 'rc-collapse';
import { TwitterPicker } from 'react-color';
import { BORDER_TYPES } from '../../../constants/border.constants';

function GeneralEditor() {

  return (
    <div className="gui-general-editor">
      <Collapse accordion={true}>
        <Collapse.Panel header="Border">
          <h5>Type: </h5>
          <Select
            options={BORDER_TYPES}
          />
        </Collapse.Panel>
        <Collapse.Panel header="Shadow">
          <h5>Color: </h5>
          <TwitterPicker />
        </Collapse.Panel>
      </Collapse>
    </div>
  );
}

export default GeneralEditor;