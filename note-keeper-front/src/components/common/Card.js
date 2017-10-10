import React from 'react';
import { View } from 'react-native';

const Card = ({ children, style }) => {
    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
};

const styles = {
    card: {
        elevation: 1,
        marginLeft: 3,
        marginRight: 4,
        marginBottom: 3
    }
};

export { Card };
