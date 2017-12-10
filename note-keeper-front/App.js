import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './src/Router';
import Root from './src/routes';
import store from './src/store';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Root />
            </Provider>
        );
    }
}
