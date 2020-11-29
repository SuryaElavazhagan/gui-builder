import Collapse from 'rc-collapse';
import BackgroundEditor from './BackgroundEditor';
import BorderEditor from './BorderEditor';
import SpacingEditor from './SpacingEditor';
import ShadowEditor from './ShadowEditor';
import PositionEditor from './PositionEditor';
import '../../../../styles/components/general-editor.scss';
import { useContext, useEffect, useState } from 'react';
import { Builder } from '../../../../context/builder.context';

interface GeneralEditorProps {
  handleDeselection: () => void;
}

function GeneralEditor({ handleDeselection }: GeneralEditorProps) {
  const { state } = useContext(Builder);
  const [showPosition, setShowPosition] = useState(false);

  useEffect(() => {
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    setShowPosition(ref.dataset.absolute === 'true');
  }, [state.selectedElement]);

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
          <ShadowEditor />
        </Collapse.Panel>
        {
          showPosition ? (
            <Collapse.Panel header="Position">
              <PositionEditor />
            </Collapse.Panel>
          ) : undefined
        }
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