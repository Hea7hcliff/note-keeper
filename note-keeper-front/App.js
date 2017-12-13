import React from 'react';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import Root from './src/routes';
import store from './src/store';

const App = ({ dispatch, nav }) => (
    <Root 
        navigation={addNavigationHelpers({
            dispatch,
            state: nav
        })}
    />
);

const mapStateToProps = state => ({
    nav: state.nav
});
const AppWithNavigation = connect(mapStateToProps)(App);

export default () => (
    <Provider store={store}>
        <AppWithNavigation />
    </Provider>
);
