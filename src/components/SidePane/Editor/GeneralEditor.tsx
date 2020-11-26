import Collapse from 'rc-collapse';
import { TwitterPicker } from 'react-color';
import BackgroundEditor from './General/BackgroundEditor';
import BorderEditor from './General/BorderEditor';
import SpacingEditor from './General/SpacingEditor';
import '../../../styles/components/general-editor.scss';
import { useContext } from 'react';
import { Builder } from '../../../context/builder.context';

interface GeneralEditorProps {
  handleDeselection: () => void;
}

function GeneralEditor({ handleDeselection }: GeneralEditorProps) {
  const { state } = useContext(Builder);

  function handleDelete() {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    ref.remove();
    handleDeselection();
  }

  return (
    <div className="gui-general-editor">
      <Collapse accordion={true}>
        <Collapse.Panel header="Background">
          <BackgroundEditor />
        </Collapse.Panel>
        <Collapse.Panel header="Spacing">
          <SpacingEditor />
        </Collapse.Panel>
        <Collapse.Panel header="Border">
          <BorderEditor />
        </Collapse.Panel>
        <Collapse.Panel header="Shadow">
          <h5>Color: </h5>
          <TwitterPicker />
        </Collapse.Panel>
      </Collapse>
      <div className="gui-editor-other-settings">
        <button className="gui-editor-button gui-element-copy">
          Copy
        </button>
        <button 
          className="gui-editor-button gui-element-delete"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default GeneralEditor;