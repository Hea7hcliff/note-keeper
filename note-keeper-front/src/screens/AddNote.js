import React from 'react';
import { connect } from 'react-redux';
import { 
    View, 
    Text, 
    Picker, 
    DatePickerAndroid, 
    TimePickerAndroid, 
    ScrollView, 
    TouchableOpacity, 
    Dimensions 
} from 'react-native';
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements';
import { Notifications } from 'expo';
import {
    addNote,
    priorityChanged,
    titleChanged,
    descriptionChanged,
    resetNote,
    updateNote
} from '../actions';

const { width } = Dimensions.get('window');
const deviceWidth = width;

class AddNote extends React.Component {
    state = {
        year: '',
        month: '',
        day: '',
        hour: '',
        minute: '',
        list: [{
            name: ''
        }],
        dueDate: null
    };

    componentWillMount() {
        const { state } = this.props.navigation;
        if (state.params !== undefined && state.params.type === 'new') {
            this.props.resetNote();
        }
        this.setState({
            dueDate: this.props.dueDate
        });
    }

    componentDidMount() {
        if (this.props.list.length !== 0) {
            this.setState({
                list: this.props.list
            });
        }
    }

    onChangePriority = (value) => {
        this.props.priorityChanged(value);
    }

    onChangeTitle = (value) => {
        this.props.titleChanged(value);
    }

    onChangeDesc = (value) => {
        this.props.descriptionChanged(value);
    }

    onChangeListItem(value, index) {
        const list = this.state.list;
        list[index].name = value;
        this.setState({
            list
        });
    }

    onSubmit = () => {
        const { priority, title, description, navigation, _id } = this.props;
        if (title !== '' && description !== '') {
            const { token } = this.props;
            const { state } = this.props.navigation;

            const list = [];
            this.state.list.map((item) => {
                if (item.name.length !== 0) {
                    list.push(item);
                }
                return list;
            });

            if (this.state.year !== '') {
                this.scheduleNotification();
            }
            const { dueDate } = this.state;
            if (state.params !== undefined && state.params.type === 'new') {
                const data = { token, priority, title, description, list, dueDate };
                this.props.addNote(data, navigation);
            } else {
                const data = { token, priority, title, description, list, _id, dueDate };
                this.props.updateNote(data, navigation);
            }
        }
    }

    getSetDate = () => {
        const date = this.state.dueDate;
        return { time: date };
    }

    scheduleNotification = () => {
        const localNotification = {
            title: this.props.title,
            body: this.props.description,
            ios: {
                sound: true
            },
            android: {
                sound: true,
                // icon:
                // color:
                priority: 'high',
                sticky: false,
                vibrate: true
            }
        };

        Notifications.scheduleLocalNotificationAsync(localNotification, this.getSetDate());
        this.setState({
            year: '',
            month: '',
            day: '',
            hour: '',
            minute: ''
        });
    }

    openDatePicker = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({
                    year,
                    month,
                    day
                });
                this.openTimePicker();
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    openTimePicker = async () => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: new Date().getHours,
                minute: new Date().getMinutes,
                is24Hour: true
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                this.setState({
                    hour,
                    minute
                });
                const date = new Date(
                    this.state.year,
                    this.state.month,
                    this.state.day,
                    this.state.hour,
                    this.state.minute
                );
                this.setState({
                    dueDate: date
                });
            } else {
                this.setState({
                    year: '',
                    month: '',
                    day: '',
                    hour: '',
                    minute: ''
                });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
    }

    addListItem = () => {
        const list = this.state.list;
        list.push({ name: '' });
        this.setState({
            list
        });
    }

    deleteListItem = (index) => {
        const list = this.state.list;
        if (list.length !== 1) {
            list.splice(index, 1);
        }
        this.setState({
            list
        });
    }

    render() {
        const { priority, title, description } = this.props;

        return (
            <ScrollView style={styles.containerStyle}>
                <FormLabel labelStyle={styles.labelStyle}>Title</FormLabel>
                <FormInput
                    inputStyle={styles.inputStyle}
                    onChangeText={this.onChangeTitle}
                    value={title}
                />
                <FormLabel labelStyle={styles.labelStyle}>Description</FormLabel>
                <FormInput
                    multiline
                    numberOfLines={2}
                    inputStyle={styles.inputStyle}
                    onChangeText={this.onChangeDesc}
                    value={description}
                />
                <FormLabel labelStyle={styles.labelStyle}>Make a list?</FormLabel>
                {
                    this.state.list.map((item, index) => {
                        return (
                            <View key={index} style={styles.listContainerStyle}>
                                <FormInput
                                    inputStyle={styles.listInputStyle}
                                    onChangeText={(value) => this.onChangeListItem(value, index)}
                                    value={item.name}
                                />
                                <TouchableOpacity onPress={this.addListItem}>
                                    <View style={styles.listButtonStyle}>
                                        <Icon
                                            name="plus"
                                            color="#000"
                                            type="entypo"
                                            size={30}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.deleteListItem(index)}>
                                    <View style={styles.listButtonStyle}>
                                        <Icon
                                            name="minus"
                                            type="material-community"
                                            color="#000"
                                            size={30}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    })
                }
                <Text style={styles.pickerTextStyle}>A task or just a note?</Text>
                <Picker
                    selectedValue={priority}
                    onValueChange={this.onChangePriority}
                    style={styles.pickerStyle}
                >
                    <Picker.Item label="Task: Very Important" value={0} />
                    <Picker.Item label="Task: Semi Important" value={1} />
                    <Picker.Item label="Task: Not Important" value={2} />
                    <Picker.Item label="Note" value={3} />
                </Picker>
                <Button
                    onPress={this.openDatePicker}
                    title={'DUEDATE'}
                    buttonStyle={styles.buttonStyle}
                    textStyle={styles.buttonTextStyle}
                />
                <Button
                    buttonStyle={styles.buttonStyle}
                    textStyle={styles.buttonTextStyle}
                    title={'SAVE'}
                    onPress={this.onSubmit}
                />
            </ScrollView>
        );
    }
}


const styles = {
    containerStyle: {
        flex: 1
    },
    inputStyle: {
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        height: 50,
        paddingBottom: 10,
    },
    labelStyle: {
        fontSize: 18,
        fontWeight: 'normal'
    },
    pickerStyle: {
        marginTop: 0,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 20
    },
    pickerTextStyle: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20
    },
    buttonStyle: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#000',
        marginBottom: 20
    },
    buttonTextStyle: {
        textAlign: 'center',
        color: '#000',
        fontSize: 18
    },
    listContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        paddingRight: 20
    },
    listInputStyle: {
        width: deviceWidth / 2,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        height: 50,
        paddingBottom: 10
    },
    listButtonStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center'
    }
};


const mapStateToProps = ({ auth, update }) => {
    const { token } = auth;
    const { priority, title, description, _id, list, dueDate } = update;
    return {
        token,
        priority,
        title,
        description,
        _id,
        list,
        dueDate
    };
};

export default connect(
    mapStateToProps,
    {
        addNote,
        priorityChanged,
        titleChanged,
        descriptionChanged,
        resetNote,
        updateNote
    }
)(AddNote);
