import { MouseEvent, useContext } from "react";
import { Builder } from "../../../../context/builder.context";
import '../../../../styles/components/position-editor.scss';

function PositionEditor() {
  const { state } = useContext(Builder);

  function handleZIndexChange(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const ref = document.getElementById(state.selectedElement) as HTMLElement;
    let _zIndex = +window.getComputedStyle(ref).zIndex;
    _zIndex = target.dataset.type === 'increment' ? ++_zIndex : --_zIndex;
    ref.style.zIndex = `${_zIndex}`
  }

  return (
    <div className="gui-position-editor">
      <button
        data-type="increment"
        className="gui-editor-button gui-bring-up-button"
        onClick={handleZIndexChange}
      >
        Bring Up
      </button>
      <button
        data-type="decrement"
        className="gui-editor-button gui-bring-down-button"
        onClick={handleZIndexChange}
      >
        Bring Down
      </button>
    </div>
  );
}

export default PositionEditor;