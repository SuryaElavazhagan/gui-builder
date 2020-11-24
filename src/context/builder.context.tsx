import { createContext, useReducer, PropsWithChildren, Dispatch } from 'react';

let initialState: BuilderContext = {
  state: {
    selectedElement: ''
  },
  dispatch(action: BuilderAction) {}
}

const Builder = createContext<BuilderContext>(initialState);

interface BuilderContext {
  state: BuilderState;
  dispatch: Dispatch<BuilderAction>;
}

interface BuilderState {
  selectedElement: string;
}

interface BuilderAction {
  type: string;
  payload: string;
}

function reducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case 'select':
      return { selectedElement: action.payload };
    default: throw new Error('Invalid action type');
  }
}

function BuilderProvider({ children }: PropsWithChildren<Object>) {
  const [state, dispatch] = useReducer(reducer, { selectedElement: '' });
  let value = { state, dispatch };

  return (
    <Builder.Provider value={value}>{ children }</Builder.Provider>
  );
}

const BuilderConsumer = Builder.Consumer;

export {
  Builder,
  BuilderProvider,
  BuilderConsumer
};