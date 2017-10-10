import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Constants } from 'expo';

class Auth extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text h1 style={styles.titleStyle}>Note Keeper</Text>
                <View>
                    <Button
                        buttonStyle={styles.buttonStyle}
                        textStyle={{ textAlign: 'center', color: '#32292f', fontSize: 18 }}
                        title={'LOGIN'} 
                    />
                    <Button
                        buttonStyle={styles.buttonStyle}
                        textStyle={{ textAlign: 'center', color: '#32292f', fontSize: 18 }}
                        title={'REGISTER'}
                        onPress={() => Actions.mainStack()}
                    />
                </View>
                <Text style={styles.descStyle}>
                    Your go to Notes app. Easy and simple.
                    {'\n'}As simple as your cousin Dwayne.
                </Text>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#FFFCF9',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: Constants.statusBarHeight
    },
    titleStyle: {
        fontSize: 40
    },
    descStyle: {
        fontSize: 18,
        width: 200,
        textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: 'transparent',
        borderColor: '#32292f',
        borderRadius: 0,
        width: 200,
        height: 60,
        borderWidth: 2,
        marginTop: 20,
        marginBottom: 20
    }
};

export default Auth;
