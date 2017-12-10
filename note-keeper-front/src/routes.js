import React from 'react';
// import { Platform } from 'react-native';
import {
    TabNavigator,
    StackNavigator
} from 'react-navigation';
import { AsyncStorage, TouchableNativeFeedback, View, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';

import Auth from './components/Auth';
import TaskList from './components/TaskList';
import DoneList from './components/DoneList';
import NoteList from './components/NoteList';
import AddNote from './components/AddNote';


const LogoutIcon = ({ navigate }) => {
    return (
        <TouchableNativeFeedback>
            <Icon
                name="log-out"
                color="#32292f"
                type="entypo"
                style={styles.iconStyle}
                onPress={() => {
                    AsyncStorage.removeItem('token', () => {
                        navigate('Auth');
                    });
                }}
            />
        </TouchableNativeFeedback>
    );
};

const AddIcon = ({ navigate }) => {
    return (
        <TouchableNativeFeedback
            onPress={() => {
                navigate('Note');
            }}
            background={TouchableNativeFeedback.Ripple(
                'red',
                false
            )}
            style={{ height: 50, borderBottomRightRadius: 25, borderTopRightRadius: 25 }}
        >
            <View style={{ width: 100, height: 100 }}>
                <Icon
                    name="plus"
                    color="#5bc0de"
                    type="entypo"
                    size={36}
                    style={styles.iconStyle}
                />
            </View>
        </TouchableNativeFeedback>
    );
};


const TasksTab = StackNavigator({
    TaskList: {
        screen: TaskList,
        navigationOptions: ({ navigation }) => ({
            headerTitle: 'Tasks',
            headerRight: <LogoutIcon navigate={navigation.navigate} />,
            headerLeft: <AddIcon navigate={navigation.navigate} />
        })
    }
});

const DoneTab = StackNavigator({
    DoneList: {
        screen: DoneList,
        navigationOptions: ({
            headerTitle: 'Done'
        })
    }
});

const NotesTab = StackNavigator({
    NotesList: {
        screen: NoteList,
        navigationOptions: ({
            headerTitle: 'Notes'
        })
    }
});

const Tabs = TabNavigator({
    TasksTab: {
        screen: TasksTab,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon
                name="checkbox-multiple-blank-outline"
                type="material-community"
                size={22}
                color={tintColor}
            />
        }
    },
    DoneTab: {
        screen: DoneTab,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon
                name="checkbox-multiple-marked"
                type="material-community"
                size={22}
                color={tintColor}
            />
        }
    },
    NotesTab: {
        screen: NotesTab,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon
                name="list"
                size={22}
                color={tintColor}
            />
        }
    }
}, {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showIcon: true,
            showLabel: false
        }
    });

const Root = StackNavigator({
    Auth: {
        screen: Auth,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    Main: {
        screen: Tabs,
        navigationOptions: ({
            header: null
        })
    },
    Note: {
        screen: AddNote,
        navigationOptions: ({

        })
    }
});


const styles = {
    iconStyle: {
        marginLeft: 15,
        marginRight: 15
    }
};


export default Root;
