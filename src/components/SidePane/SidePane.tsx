import { DragEvent, useContext, MouseEvent, useState, useEffect } from 'react';
import GUIElements from './GUIElements';
import GeneralEditor from './Editor/General/GeneralEditor';
import { Builder } from '../../context/builder.context';
import { mask } from '../../services/Mask.service';
import back from '../../assets/icons/back.svg';
import '../../styles/components/side-pane.scss';
import { GUI_ELEMENTS } from '../../constants/element.constants';
import RichTextEditor from './Editor/Specifics/RichTextEditor';
import TextInputEditor from './Editor/Specifics/TextInputEditor';
import ButtonEditor from './Editor/Specifics/ButtonEditor';
import { DOM } from '../../constants/dom.constants';
import { LocalStorage } from '../../helper/LocalStorage';
import ImageEditor from './Editor/Specifics/ImageEditor';
import { ColorResult, TwitterPicker } from 'react-color';
import { STORAGE } from '../../constants/storage.constants';

function SidePane(): JSX.Element {
  const { state, dispatch } = useContext(Builder);
  const [selectedTab, setSelectedTab] = useState('');
  const [background, setBackground] = useState('');

  useEffect(() => {
    setBackground(window.localStorage.getItem(STORAGE.BACKGROUND) ?? 'rgba(0,0,0,0)');
  }, []);

  useEffect(() => {
    const tabRef = document.getElementById(`gui-editor-tab-${selectedTab}`);
    const animator = document.getElementsByClassName('gui-editor-tab-animator')[0];
    if (tabRef !== null && animator instanceof HTMLElement) {
      animator.style.left = `${tabRef.offsetLeft}px`;
      animator.style.top = `${tabRef.offsetTop}px`;
      animator.style.width = `${tabRef.offsetWidth}px`;
      animator.style.height = `${tabRef.offsetHeight}px`;
    }
  });

  useEffect(() => {
    setSelectedTab('specific');
  }, [state.selectedElement]);

  function handleBackgroundChange(color: ColorResult) {
    const root = document.getElementById(DOM.BUILDER_ROOT_ID) as HTMLElement;
    root.style.background = color.hex;
    setBackground(color.hex);
  }
  
  function handleDragStart(event: DragEvent) {
    const target = event.currentTarget as HTMLElement;
    const type = target.dataset.type;
    if (typeof type === 'string' && type !== '') {
      event.dataTransfer.dropEffect = 'copy';
      event.dataTransfer.setData('text/plain', type);
    }
  }

  function handleBack() {
    mask.hideClickMask();
    mask.hideHoverMask();
    dispatch({ type: 'select', payload: '' });
  }

  function handleSelectTab(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    setSelectedTab(target.id.replace('gui-editor-tab-', ''));
  }

  function handleClear() {
    const root = document.getElementById(DOM.BUILDER_ROOT_ID) as HTMLElement;
    // It's faster than emptying innerHTML
    while (root.lastElementChild) {
      root.removeChild(root.lastElementChild);
    }
    root.style.background = 'transparent';
    setBackground('rgba(0,0,0,0)');
    mask.hideHoverMask();
  }

  function renderCurrentTab() {
    if (selectedTab === 'general') {
      return <GeneralEditor handleDeselection={handleBack} />
    } else if (selectedTab === 'specific') {
      const ref = document.getElementById(state.selectedElement) as HTMLElement;
      switch (ref.dataset.type) {
        case GUI_ELEMENTS.TEXT:
        case GUI_ELEMENTS.HEADING:
          return <RichTextEditor />;
        case GUI_ELEMENTS.TEXT_INPUT: return <TextInputEditor />;
        case GUI_ELEMENTS.BUTTON: return <ButtonEditor />;
        case GUI_ELEMENTS.IMAGE: return <ImageEditor />;
        default: throw new Error('Invalid element type');
      }
    }
  }

  // If no element is selected, show elements list
  if (state.selectedElement === '') {
    return (
      <aside className="gui-side-pane">
        <h3>Elements</h3>
        <GUIElements handleDragStart={handleDragStart} />
        <hr className="gui-elements-pane-separator" />
        <h5>Page Background: </h5>
        <TwitterPicker
          triangle="hide"
          color={background}
          onChange={handleBackgroundChange}
        />
        <hr className="gui-elements-pane-separator" />
        <div>
          <button
            className="gui-editor-button gui-editor-save-button"
            onClick={LocalStorage.save}
          >
            Save
          </button>
          <button
            className="gui-editor-button gui-editor-clear-button"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </aside>
    );
  }
  // Else, show element editor
  return (
    <aside className="gui-side-pane">
      <h5 className="gui-editor-back" onClick={handleBack}>
        <img src={back} alt="Back icon"/>
        Back
      </h5>
      <div className="gui-editor-tab-area">
        <ul className="gui-editor-tab">
          <div className="gui-editor-tab-animator"></div>
          {/* I tend to avoid inline function calls 🙈 */}
          <li id="gui-editor-tab-general" onClick={handleSelectTab}>General</li>
          <li id="gui-editor-tab-specific" onClick={handleSelectTab}>Specific</li>
        </ul>
        {
          renderCurrentTab()
        }
      </div>
    </aside>
  );
}

export default SidePane;