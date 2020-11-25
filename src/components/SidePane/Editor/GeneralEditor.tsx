import Collapse from 'rc-collapse';
import { TwitterPicker } from 'react-color';
import BorderEditor from './General/BorderEditor';

function GeneralEditor() {
  return (
    <div className="gui-general-editor">
      <Collapse accordion={true}>
        <Collapse.Panel header="Border">
          <BorderEditor />
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