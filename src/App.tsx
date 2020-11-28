import SidePane from './components/SidePane/SidePane';
import BuilderPane from './components/BuilderPane';
import { BuilderProvider } from './context/builder.context';
import './styles/components/app.scss';

function App() {
  return (
    <BuilderProvider>
      <div className="gui">
        <SidePane />
        <BuilderPane />
      </div>
    </BuilderProvider>
  );
}

export default App;
