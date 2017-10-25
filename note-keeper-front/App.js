import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './src/Router';
import store from './src/store';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );
    }
}
