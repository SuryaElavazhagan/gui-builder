import './styles/components/app.scss';
import SidePane from './components/SidePane';
import BuilderPane from './components/BuilderPane';

function App() {
  function handleElementSelected(ref: HTMLElement) {}

  return (
    <div className="gui">
      <SidePane />
      <BuilderPane handleElementSelected={handleElementSelected} />
    </div>
  );
}

export default App;
