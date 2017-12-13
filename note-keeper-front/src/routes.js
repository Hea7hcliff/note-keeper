import React from 'react';
// import { Platform } from 'react-native';
import {
    TabNavigator,
    StackNavigator
} from 'react-navigation';
import {
    AsyncStorage,
    View,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import { Constants } from 'expo';
import { Icon } from 'react-native-elements';

import Auth from './screens/Auth';
import TaskList from './components/TaskList';
import DoneList from './components/DoneList';
import NoteList from './components/NoteList';
import AddNote from './screens/AddNote';


// ICONS
const LogoutIcon = ({ navigate }) => {
    return (
        <TouchableOpacity>
            <View style={styles.iconContainer}>
                <Icon
                    name="log-out"
                    color="#32292f"
                    type="entypo"
                    style={styles.logoutIconStyle}
                    onPress={() => {
                        AsyncStorage.removeItem('token', () => {
                            navigate('Auth');
                        });
                    }}
                />
            </View>
        </TouchableOpacity>
    );
};

const AddIcon = ({ navigate }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                navigate('Note', { type: 'new' });
            }}
        >
            <View style={styles.iconContainer}>
                <Icon
                    name="plus"
                    color="#5bc0de"
                    type="entypo"
                    size={36}
                    style={styles.addIconStyle}
                />
            </View>
        </TouchableOpacity>
    );
};


// NAVIGATION
const TasksTab = StackNavigator(
    {
        TaskList: {
            screen: TaskList,
            navigationOptions: ({ navigation }) => ({
                headerTitle: 'Tasks',
                headerLeft: <AddIcon navigate={navigation.navigate} />,
                headerRight: <LogoutIcon navigate={navigation.navigate} />
            })
        },
        Note: {
            screen: AddNote,
            navigationOptions: ({
                headerTitle: "What's new?"
            })
        }
    },
    {
        cardStyle: { paddingTop: StatusBar.currentHeight }
    }
);

const DoneTab = StackNavigator(
    {
        DoneList: {
            screen: DoneList,
            navigationOptions: ({ navigation }) => ({
                headerTitle: 'Done',
                headerLeft: <AddIcon navigate={navigation.navigate} />,
                headerRight: <LogoutIcon navigate={navigation.navigate} />
            })
        },
        Note: {
            screen: AddNote,
            navigationOptions: ({
                headerTitle: "What's new?"
            })
        }
    },
    {
        cardStyle: { paddingTop: StatusBar.currentHeight }
    }
);

const NotesTab = StackNavigator(
    {
        NotesList: {
            screen: NoteList,
            navigationOptions: ({ navigation }) => ({
                headerTitle: 'Notes',
                headerLeft: <AddIcon navigate={navigation.navigate} />,
                headerRight: <LogoutIcon navigate={navigation.navigate} />
            })
        },
        Note: {
            screen: AddNote,
            navigationOptions: ({
                headerTitle: "What's new?"
            })
        }
    },
    {
        cardStyle: { paddingTop: StatusBar.currentHeight }
    }
);

const Tabs = TabNavigator(
    {
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
    },
    {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showIcon: true,
            showLabel: false,
            activeTintColor: '#5bc0de',
            inactiveTintColor: '#CFDBD5',
            activeBackgroundColor: '#CFDBD5',
            inactiveBackgroundColor: '#CFDBD5',
            style: { backgroundColor: '#fff' },
            indicatorStyle: { backgroundColor: '#5bc0de' }
        }
    }
);

const Root = StackNavigator(
    {
        Auth: {
            screen: Auth,
            navigationOptions: {
                header: null
            }
        },
        Main: {
            screen: Tabs,
            navigationOptions: {
                header: null
            }
        }
    }
);


const styles = {
    addIconStyle: {
        marginLeft: 10,
        marginRight: 10
    },
    logoutIconStyle: {
        marginLeft: 18,
        marginRight: 15
    },
    iconContainer: {
        height: 55,
        borderRadius: 25,
        justifyContent: 'center'
    }
};


export default Root;
