import React from 'react';
import { connect } from 'react-redux';
import { Text, View, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { Constants } from 'expo';
import AuthModal from './AuthModal';
import { getToken } from '../actions';


class Auth extends React.Component {
    state = {
        showModal: false
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log(token);
            if (token !== null) {
                console.log(token);
                this.props.getToken(token);
            }
        } catch (error) {
            console.log('Error getting data:', error);
        }
    }

    render() {
        console.log('Reducer store:', this.props);
        return (
            <View style={styles.container}>
                <Text h1 style={styles.titleStyle}>Note Keeper</Text>
                <View>
                    <Button
                        buttonStyle={styles.buttonStyle}
                        textStyle={{ textAlign: 'center', color: '#32292f', fontSize: 18 }}
                        title={'LOGIN'} 
                        onPress={() => this.setState({ showModal: true, register: false })}
                    />
                    <Button
                        buttonStyle={styles.buttonStyle}
                        textStyle={{ textAlign: 'center', color: '#32292f', fontSize: 18 }}
                        title={'REGISTER'}
                        onPress={() => this.setState({ showModal: true, register: true })}
                    />
                </View>
                <Text style={styles.descStyle}>
                    Your go to Notes app. Easy and simple.
                    {'\n'}As simple as your cousin Dwayne.
                </Text>
                <AuthModal
                    visible={this.state.showModal} 
                    register={this.state.register}
                    onDismiss={() => this.setState({ showModal: false })}
                />
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

const mapStateToProps = ({ auth }) => {
    const { email, password, token } = auth;
    return {
        email, password, token
    };
};

export default connect(mapStateToProps, { getToken })(Auth);
