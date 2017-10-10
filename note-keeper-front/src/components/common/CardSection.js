import React from 'react';
import { View } from 'react-native';

const CardSection = ({ children, style }) => {
    return (
        <View style={[styles.cardSection, style]}>
            {children}
        </View>
    );
};

const styles = {
    cardSection: {
        borderBottomWidth: 1,
        borderColor: '#CFDBD5',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#FFFCF9',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative'
    }
};

export { CardSection };
