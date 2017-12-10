import React from 'react';
// import { Actions } from 'react-native-router-flux';
import { View, Text, Modal, AsyncStorage } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { Login, Register } from '../io';

class AuthModal extends React.Component {
    state = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    onEmailChange = (value) => {
        this.setState({ email: value });
    }
    onPasswordChange = (value) => {
        this.setState({ password: value });
    }
    onConfirmPasswordChange = (value) => {
        this.setState({ confirmPassword: value });
    }

    onModalPress = () => {
        const { email, password, confirmPassword } = this.state;
        if (this.props.register) {
            Register({ email, password, confirmPassword })
                .then((token) => {
                    this.storeData(token);
                });
        } else {
            Login({ email, password })
                .then((token) => {
                    this.storeData(token);
                });
        }
        this.props.onDismiss();
    }

    async storeData(token) {
        try {
            await AsyncStorage.setItem('token', token);
            this.props.navigate('Main');
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
                        {!this.props.register && <Text style={styles.textStyle}>
                            Tip: longpress on a note card to edit.
                            This is as complicated as this gets. (Doesn't actually work)
                        </Text>}
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
                        {this.props.register && <View>
                            <FormLabel>Confirm your password</FormLabel>
                            <FormInput
                                inputStyle={styles.inputStyle}
                                onChangeText={this.onConfirmPasswordChange}
                                value={this.state.confirmPassword}
                            />
                        </View>}
                        <Button
                            buttonStyle={styles.buttonStyle}
                            textStyle={{ textAlign: 'center', color: '#000', fontSize: 18 }}
                            title={this.props.register ? 'Register' : 'Login'}
                            onPress={this.onModalPress}
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
