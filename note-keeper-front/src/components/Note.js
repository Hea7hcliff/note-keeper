import React from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, View, Vibration } from 'react-native';
import { Icon } from 'react-native-elements';
import { Card, CardSection } from './common';
import DeleteModal from './DeleteModal';
import { doneNote, undoNote } from '../actions/IoActions';

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
            color="#d9534f" 
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

    onPressChange() {
        if (this.props.isDone) {
            this.props.undoNote(this.props);
        }
        if (!this.props.isDone && !this.props.isNote) {
            this.props.doneNote(this.props);
        }
        return null; 
    }

    onLongPressChange() {
        if (this.props.isDone || this.props.isNote) {
            Vibration.vibrate(30);
            this.setState({ showModal: true });
        }
        return null;
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

    render() {
        const { title, description, priority } = this.props.note;
        const colorCode = priorityColors[priority];

        return (
            <Card
                style={{
                    borderLeftWidth: 3,
                    borderLeftColor: colorCode
                }}
            >
                <CardSection>
                    <Text style={{ color: colorCode, fontSize: 20 }}>{title}</Text>
                    <TouchableOpacity 
                        onPress={() => this.onPressChange()} 
                        onLongPress={() => this.onLongPressChange()} 
                        style={{ height: 40, width: 40, borderRadius: 100, borderWidth: 2, borderColor: '#CFDBD5' }}
                    >
                        <View>
                            {this.buttonType()}
                        </View>
                    </TouchableOpacity>
                </CardSection>
                <CardSection 
                    style={{ 
                        paddingBottom: 15, 
                        paddingTop: 5, 
                        borderBottomWidth: 0 
                    }}
                >
                    <Text style={styles.descStyle}>{description}</Text>
                </CardSection>
                <DeleteModal
                    noteDetails={this.props} 
                    message={this.props.isNote ? 'Delete this note?' : 'Delete this task?'}
                    visible={this.state.showModal}
                    onDismiss={() => this.setState({ showModal: false })}
                />
            </Card>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    descStyle: {
        fontSize: 18,
        color: '#32292f'
    },
    buttonStyle: {

    }
};

const mapStateToProps = ({ auth }) => {
    const { token } = auth;
    return {
        token
    };
};

export default connect(mapStateToProps, { doneNote, undoNote })(Note);
