import React from 'react';
import { View, Text } from 'react-native';

class Archive extends React.Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <Text>Archive component</Text>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#32292f'
    }
};

export default Archive;
