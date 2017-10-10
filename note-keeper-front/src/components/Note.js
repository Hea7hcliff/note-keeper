import React from 'react';
import { Text } from 'react-native';
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
    render() {
        const { title, desc, priority } = this.props.note;
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
                    <DoneIcon />
                </CardSection>
                <CardSection 
                    style={{ 
                        paddingBottom: 15, 
                        paddingTop: 5, 
                        borderBottomWidth: 0 
                    }}
                >
                    <Text style={styles.descStyle}>{desc}</Text>
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
