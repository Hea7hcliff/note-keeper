import React from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Modal, AsyncStorage } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { Login } from '../io';

class AuthModal extends React.Component {
    state = {
        email: '',
        password: ''
    }

    onEmailChange = (value) => {
        this.setState({ email: value });
    }
    onPasswordChange = (value) => {
        this.setState({ password: value });
    }

    onLogin = () => {
        this.props.onDismiss();
        console.log(this.state);
        Login(this.state)
            .then((token) => {
                this.storeData(token);
                Actions.mainStack();
            });
    }

    async storeData(token) {
        try {
            await AsyncStorage.setItem('token', token);
        } catch (error) {
            console.log('Error storing data:', error);
        }
    }

    render() {
        const { visible, onDismiss } = this.props;

        return (
            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={onDismiss}
            >
                <View style={styles.containerStyle}>
                    <View style={styles.innerStyle}>
                        <Text style={styles.textStyle}>
                            Tip: longpress on a note card to edit.
                            This is as complicated as this app gets.
                        </Text>
                        <View>
                            <FormLabel>Enter your email</FormLabel>
                            <FormInput 
                                inputStyle={styles.inputStyle} 
                                onChangeText={this.onEmailChange} 
                                value={this.state.email}
                            />
                        </View>
                        <View>
                            <FormLabel>Enter your password</FormLabel>
                            <FormInput 
                                inputStyle={styles.inputStyle} 
                                onChangeText={this.onPasswordChange} 
                                value={this.state.password}
                            />
                        </View>
                        <Button
                            buttonStyle={styles.buttonStyle}
                            textStyle={{ textAlign: 'center', color: '#000', fontSize: 18 }}
                            title={'Login'}
                            onPress={this.onLogin}
                        />
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = {
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerStyle: {
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFCF9',
        width: 300,
        paddingTop: 20,
        paddingBottom: 30,
        paddingLeft: 10,
        paddingRight: 10
    },
    textStyle: {
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10
    },
    buttonStyle: {
        marginTop: 20,
        width: 160,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#32292f'
    },
    inputStyle: {
        width: 260,
        paddingLeft: 5
    }
};

export default AuthModal;
