import React from 'react';
import { connect } from 'react-redux';
import { Text, View, AsyncStorage, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { Constants } from 'expo';
import AuthModal from '../components/AuthModal';
import {
    registerToken,
    emailChanged,
    passwordChanged,
    confirmPAsswordChanged,
    userLoading, 
    resetCredentials 
} from '../actions';
import { Login, Register } from '../io';


class Auth extends React.Component {
    state = {
        showModal: false
    }

    componentWillMount() {
        this.props.userLoading(true);
    }

    componentDidMount() {
        this.getData();
    }

    onModalPress = () => {
        const { email, password, confirmPassword } = this.props;
        this.props.userLoading(true);
        if (this.state.register) {
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
    }

    onEmailChange = (value) => {
        this.props.emailChanged(value);
    }
    onPasswordChange = (value) => {
        this.props.passwordChanged(value);
    }
    onConfirmPasswordChange = (value) => {
        this.props.confirmPAsswordChanged(value);
    }

    async getData() {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                const { navigate } = this.props.navigation;
                this.props.registerToken(token, navigate);
            } else this.props.userLoading(false);
        } catch (error) {
            console.log('Error getting data:', error);
        }
    }
    async storeData(token) {
        try {
            await AsyncStorage.setItem('token', token);
            const { navigate } = this.props.navigation;
            this.props.resetCredentials();
            navigate('Main');
        } catch (error) {
            console.log('Error storing data:', error);
        }
    }

    renderLogin = () => {
        if (!this.props.userLoadingStatus) {
            return (
                <View style={styles.loginContainerStyle}>
                    <Button
                        buttonStyle={styles.buttonStyle}
                        textStyle={styles.textStyle}
                        title={'LOGIN'}
                        onPress={() => {
                            this.setState({ showModal: true, register: false });
                        }}
                    />
                    <Button
                        buttonStyle={styles.buttonStyle}
                        textStyle={styles.textStyle}
                        title={'REGISTER'}
                        onPress={() => {
                            this.setState({ showModal: true, register: true });
                        }}
                    />
                </View>
            );
        }
        return (
            <View style={styles.loginContainerStyle}>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    render() {
        const { navigate } = this.props.navigation;
        const { email, password, confirmPassword } = this.props;
        return (
            <View style={styles.containerStyle}>
                <Text h1 style={styles.titleStyle}>Note Keeper</Text>
                {this.renderLogin()}
                <Text style={styles.descStyle}>
                    Your go to Notes app. Easy and simple.
                    {'\n'}As simple as your cousin Dwayne.
                </Text>
                <AuthModal
                    visible={this.state.showModal} 
                    register={this.state.register} 
                    onDismiss={() => this.setState({ showModal: false })} 
                    onModalPress={this.onModalPress} 
                    navigate={navigate} 
                    onEmailChange={this.onEmailChange} 
                    email={email} 
                    onPasswordChange={this.onPasswordChange} 
                    password={password}
                    onConfirmPasswordChange={this.onConfirmPasswordChange} 
                    confirmPassword={confirmPassword} 
                />
            </View>
        );
    }
}


const styles = {
    containerStyle: {
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
    },
    textStyle: {
        textAlign: 'center',
        color: '#32292f',
        fontSize: 18
    },
    loginContainerStyle: {
        height: 200,
        justifyContent: 'center'
    }
};


const mapStateToProps = ({ auth }) => {
    const { email, password, confirmPassword, token, userLoadingStatus } = auth;
    return {
        email, password, confirmPassword, token, userLoadingStatus 
    };
};

export default connect(
    mapStateToProps, 
    { 
        registerToken, 
        emailChanged, 
        passwordChanged, 
        confirmPAsswordChanged,  
        userLoading, 
        resetCredentials 
    }
)(Auth);
