import React from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, View, Vibration } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import { Card, CardSection } from './common';
import DeleteModal from './DeleteModal';
import { doneNote, undoNote, getNote, updateNote } from '../actions';

const DoneIcon = () => {
    return (
        <Icon
            name="check"
            type="material-community"
            color='#5cb85c'
            size={30}
            style={{ margin: 2, marginLeft: 3 }}
        />
    );
};

const RemoveIcon = () => {
    return (
        <Icon
            name="minus"
            type="material-community"
            color="#FFB300"
            size={34}
            style={{ marginLeft: 1 }}
        />
    );
};

const DeleteIcon = () => {
    return (
        <Icon
            name="delete"
            type="material-community"
            color="#5bc0de"
            size={28}
            style={{ marginTop: 3, marginLeft: 4 }}
        />
    );
};

const priorityColors = {
    0: '#d9534f',
    1: '#FFB300',
    2: '#5cb85c',
    3: '#5bc0de'
};

class Note extends React.Component {
    state = {
        showModal: false
    }

    onChangeDone() {
        if (this.props.isDone) {
            this.props.undoNote(this.props);
        }
        if (!this.props.isDone && !this.props.isNote) {
            this.props.doneNote(this.props);
        }
        return null;
    }

    onDelete() {
        if (this.props.isDone || this.props.isNote) {
            Vibration.vibrate(30);
            this.setState({ showModal: true });
        }
        return null;
    }

    onEdit() {
        const { _id } = this.props.note;
        const { token } = this.props;
        const data = { token, _id };

        this.props.getNote(data);
    }

    buttonType = () => {
        if (this.props.isNote) {
            return <DeleteIcon />;
        }
        if (this.props.isDone) {
            return <RemoveIcon />;
        }
        return <DoneIcon />;
    }

    updateCheckbox = (item) => {
        const { priority, title, description, _id, list } = this.props.note;
        const updatedItem = item;
        updatedItem.checkbox = !item.checkbox;

        const { token } = this.props;
        const data = { token, priority, title, description, list, _id };

        this.props.updateNote(data, null);
    }

    renderList = () => {
        const { list } = this.props.note;
        if (list !== null && list !== []) {
            return (
                <CardSection style={styles.listContainerStyle}>
                    {list.map((item) => {
                        const { _id, name } = item;
                        return (
                            <CheckBox
                                key={_id}
                                title={name}
                                iconType="material-community"
                                checkedIcon="check"
                                uncheckedIcon="checkbox-blank-circle-outline"
                                checked={item.checkbox}
                                checkedColor="#5cb85c"
                                uncheckedColor="#CFDBD5"
                                onPress={() => this.updateCheckbox(item)}
                                containerStyle={styles.checkboxContainerStyle}
                                textStyle={styles.checkboxTextStyle}
                            />
                        );
                    })}
                </CardSection>
            );
        }
    }

    renderDate = () => {
        const colorCode = priorityColors[this.props.note.priority];
        const { dueDate } = this.props.note;
        if (dueDate !== null) {
            const date = new Date(dueDate);
            const day = date.toLocaleDateString('fi-FI');
            const time = date.toLocaleTimeString('fi-FI');
            return (
                <CardSection
                    style={{
                        paddingVertical: 15,
                        borderBottomWidth: 0,
                    }}
                >
                    <View 
                        style={{ 
                            backgroundColor: colorCode, 
                            borderRadius: 15, 
                            paddingHorizontal: 7, 
                            paddingVertical: 3 
                        }}
                    >
                        <Text style={styles.dateStyle}>{`${day} ${time}`}</Text>
                    </View>
                </CardSection>
            );
        }
    }

    render() {
        const { title, description, priority } = this.props.note;
        const colorCode = priorityColors[priority];

        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onLongPress={() => this.onEdit()}
            >
                <Card
                    style={{
                        borderLeftWidth: 3,
                        borderLeftColor: colorCode
                    }}
                >
                    <CardSection>
                        <Text style={{ color: colorCode, fontSize: 20 }}>{title}</Text>
                        <TouchableOpacity
                            onPress={() => this.onChangeDone()}
                            onLongPress={() => this.onDelete()}
                            style={styles.buttonStyle}
                        >
                            <View>
                                {this.buttonType()}
                            </View>
                        </TouchableOpacity>
                    </CardSection>
                    <CardSection
                        style={{
                            paddingVertical: 15,
                            borderBottomWidth: 0,
                        }}
                    >
                        <Text style={styles.descStyle}>{description}</Text>
                    </CardSection>
                    {this.renderList()}
                    {this.renderDate()}
                    <DeleteModal
                        noteDetails={this.props}
                        message={this.props.isNote ? 'Delete this note?' : 'Delete this task?'}
                        visible={this.state.showModal}
                        onDismiss={() => this.setState({ showModal: false })}
                    />
                </Card>
            </TouchableOpacity>
        );
    }
}

const styles = {
    descStyle: {
        fontSize: 18,
        color: '#32292f'
    },
    buttonStyle: {
        height: 40,
        width: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#CFDBD5'
    },
    listContainerStyle: {
        borderTopWidth: 0,
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: 0
    },
    checkboxContainerStyle: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        paddingLeft: 0,
        marginLeft: 0,
        marginVertical: 0
    },
    checkboxTextStyle: {
        fontWeight: '300',
        fontSize: 16
    },
    dateStyle: {
        fontSize: 16,
        color: '#fff'
    }
};

const mapStateToProps = ({ auth }) => {
    const { token } = auth;
    return {
        token
    };
};

export default connect(mapStateToProps, { doneNote, undoNote, getNote, updateNote })(Note);
