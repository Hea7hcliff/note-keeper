import React from 'react';
import { Router, Stack, Scene, Tabs, ActionConst, Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import { Constants } from 'expo';
import Auth from './components/Auth';
import NoteList from './components/NoteList';
import Archive from './components/Archive';
import AddNote from './components/AddNote';

const LogoutIcon = () => {
    return (
        <Icon 
            name="log-out" 
            color="#32292f" 
            type="entypo" 
            style={styles.iconStyle} 
            onPress={() => Actions.authStack()} 
        />
    );
};

const AddIcon = () => {
    return (
        <Icon 
            name="plus" 
            color="#5bc0de" 
            type="entypo" 
            size={36} 
            style={styles.iconStyle}
            onPress={() => Actions.addNote()}
        />
    );
};

const BackIcon = () => {
    return (
        <Icon 
            name="chevron-left" 
            color="#32292f" 
            size={30} 
            style={styles.iconStyle}
            onPress={() => Actions.pop()}
        />
    );
};

/**
const RemoveIcon = () => {
    return <Icon name="minus" color="#7a918d" />;
};
**/

const ListIcon = ({ focused }) => {
    const iconStyle = { color: focused ? '#5cb85c' : '#CFDBD5' };
    return <Icon name="list" color={iconStyle.color} size={30} />;
};

const DoneIcon = ({ focused }) => {
    const iconStyle = { color: focused ? '#5cb85c' : '#CFDBD5' };
    return <Icon name="check" color={iconStyle.color} size={30} />;
};

const AppRouter = () => {
    return (
        <Router>
            <Stack key="root" hideNavBar>
                <Stack key="authStack" hideNavBar>
                    <Scene
                        key="auth"
                        component={Auth}
                    />
                </Stack>
                <Stack 
                    key="mainStack" 
                    navigationBarStyle={styles.headerStyle} 
                    // prevent Android back button into Login
                    type={ActionConst.RESET}
                    hideNavBar
                >
                    <Tabs
                        tabBarPosition="bottom" 
                        tabBarStyle={styles.tabBarStyle} 
                        renderLeftButton={AddIcon}
                        renderRightButton={LogoutIcon} 
                        navigationBarStyle={styles.navigationBarStyle}
                    >
                        <Scene
                            key="noteList"
                            component={NoteList} 
                            title="Notes"
                            navigationBarStyle={styles.headerStyle} 
                            titleStyle={styles.titleStyle}
                            tabBarLabel={ListIcon} 
                        />
                        <Scene
                            key="archive"
                            component={Archive} 
                            title="Archive"
                            navigationBarStyle={styles.headerStyle} 
                            titleStyle={styles.titleStyle}
                            tabBarLabel={DoneIcon} 
                        />
                    </Tabs>
                </Stack>
                <Stack 
                    key="addNote" 
                    navigationBarStyle={styles.headerStyle} 
                    renderLeftButton={BackIcon}
                >
                    <Scene
                        component={AddNote} 
                        title="What's New?"
                    />
                </Stack>
            </Stack>
        </Router>
    );
};

const styles = {
    headerStyle: {
        marginTop: Constants.statusBarHeight,
        borderBottomWidth: 1,
        borderBottomColor: '#32292f',
        backgroundColor: '#FFFCF9'
    },
    tabBarStyle: {
        paddingBottom: 10,
        borderTopWidth: 1,
        borderTopColor: '#32292f',
        backgroundColor: '#FFFCF9'
    },
    iconStyle: {
        marginLeft: 15,
        marginRight: 20
    },
    navigationBarStyle: {
        paddingLeft: 20, 
        marginLeft: 20
    },
    titleStyle: {
        color: '#32292f'
    }
};

export default AppRouter;
