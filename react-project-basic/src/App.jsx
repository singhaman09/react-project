
import { Provider } from 'react-redux';
import './App.css'
import RouteWrapper from './routes';
import { store,persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RouteWrapper />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App
