import React from 'react';
import { View, Text, Modal } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';


const AuthModal = ({
    visible, 
    register, 
    onDismiss,
    onModalPress,
    email,
    onEmailChange,
    password,
    onPasswordChange,
    confirmPassword,
    onConfirmPasswordChange
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onDismiss}
        >
            <View style={styles.containerStyle}>
                <View style={styles.innerStyle}>
                    {!register && <Text style={styles.textStyle}>
                        Tip: longpress on a note card to edit.
                            This is as complicated as this gets. (Doesn't actually work)
                        </Text>}
                    <View>
                        <FormLabel>Enter your email</FormLabel>
                        <FormInput
                            inputStyle={styles.inputStyle}
                            onChangeText={onEmailChange}
                            value={email}
                        />
                    </View>
                    <View>
                        <FormLabel>Enter your password</FormLabel>
                        <FormInput
                            inputStyle={styles.inputStyle}
                            onChangeText={onPasswordChange}
                            value={password}
                        />
                    </View>
                    {register && <View>
                        <FormLabel>Confirm your password</FormLabel>
                        <FormInput
                            inputStyle={styles.inputStyle}
                            onChangeText={onConfirmPasswordChange}
                            value={confirmPassword}
                        />
                    </View>}
                    <Button
                        buttonStyle={styles.buttonStyle}
                        textStyle={styles.buttonTextStyle}
                        title={register ? 'Register' : 'Login'}
                        onPress={() => {
                            onModalPress();
                            onDismiss();
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
};


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
    buttonTextStyle: {
        textAlign: 'center',
        color: '#000',
        fontSize: 18
    },
    inputStyle: {
        width: 260,
        paddingLeft: 5
    }
};

export default AuthModal;
