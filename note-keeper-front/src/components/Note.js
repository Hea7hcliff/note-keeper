import React from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Card, CardSection } from './common';
import { doneNote, deleteNote } from '../actions/IoActions';

const DoneIcon = () => {
    return (
        <Icon
            name="check-circle-outline"
            type="material-community"
            color='#5cb85c' 
            size={36}
            style={{ marginRight: 3 }}
        />
    );
};

const RemoveIcon = () => {
    return (
        <Icon 
            name="minus-circle-outline" 
            type="material-community"
            color="#d9534f" 
            size={36}
            style={{ marginRight: 3 }}
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

    onChange() {
        if (this.props.isDone) {
            this.props.deleteNote(this.props);
        } else {
            this.props.doneNote(this.props);
        }
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
                    <TouchableOpacity onPress={() => this.onChange()}>
                        <View>
                            {this.props.isDone ? <RemoveIcon /> : <DoneIcon />}
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

export default connect(mapStateToProps, { doneNote, deleteNote })(Note);
