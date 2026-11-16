import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import App from './App';
import { store } from './store/index';
import { PayPal_CONFIG_OPTIONS } from './configs';

// The original (v1) application tree, unchanged; selected by REACT_APP_UI_VERSION=v1.
export default function V1Root() {
  return (
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true} options={PayPal_CONFIG_OPTIONS}>
        <App />
      </PayPalScriptProvider>
    </Provider>
  );
}
