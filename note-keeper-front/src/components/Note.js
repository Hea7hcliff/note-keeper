import React from 'react';
import axios from 'axios';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Card, CardSection } from './common';

const DoneIcon = () => {
    return (
        <Icon
            name="check-circle-outline"
            type="material-community"
            color='#CFDBD5' 
            size={36}
            style={{ marginRight: 3 }}
        />
    );
};

const priorityColors = {
    0: '#d9534f',
    1: '#5cb85c',
    2: '#5bc0de'
};

class Note extends React.Component {

    onChangeToDone(title, description, priority, id) {
        axios.put('http://84.251.221.123:3000/api/update/' + id, { title, description, priority, done: true })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
        });
    }

    render() {
        const { title, description, priority, _id } = this.props.note;
        const colorCode = priorityColors[priority];
        const { marginTop } = this.props.style;

        return (
            <Card
                style={{
                    marginTop,
                    borderLeftWidth: 3,
                    borderLeftColor: colorCode
                }}
            >
                <CardSection>
                    <Text style={{ color: colorCode, fontSize: 20 }}>{title}</Text>
                    <TouchableWithoutFeedback onPress={() => this.onChangeToDone(title, description, priority, _id)}>
                        <View>
                            <DoneIcon />
                        </View>
                    </TouchableWithoutFeedback>
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

export default Note;
