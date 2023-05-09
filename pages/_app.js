import '../styles/globals.css'


import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage';
import { Provider } from 'react-redux';
import reducer from '../store/reducers/reducers'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

let store = createStore(persistedReducer);
let persistor = persistStore(store)


const MyApp = ({ Component, pageProps }) => {
  return (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Component {...pageProps} />
    </PersistGate>
  </Provider>
  )
}

export default MyApp
