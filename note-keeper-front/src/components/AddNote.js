import React from 'react';
// import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View, Picker } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { addNote } from '../actions/IoActions';

class AddNote extends React.Component {
    state = {
        priority: 0,
        title: '',
        description: ''
    }
    onPriorityChange = (value) => {
        this.setState({
            priority: value
        });
    }
    onChangeTitle = (value) => {
        this.setState({ title: value });
    }
    onChangeDesc = (value) => {
        this.setState({ description: value });
    }
    onSubmit = () => {
        if (this.state.title !== '' && this.state.description !== '') {
            const { token } = this.props;
            const data = { token, ...this.state };
            this.props.addNote(data);
        }
    }
    render() {
        return (
            <View style={styles.containerStyle}>
                <FormLabel labelStyle={styles.labelStyle}>Title</FormLabel>
                <FormInput
                    inputStyle={styles.inputStyle} 
                    onChangeText={this.onChangeTitle} 
                    value={this.state.title}
                />
                <FormLabel labelStyle={styles.labelStyle}>Note</FormLabel>
                <FormInput
                    multiline
                    numberOfLines={2}
                    inputStyle={styles.inputStyle} 
                    onChangeText={this.onChangeDesc} 
                    value={this.state.description}
                />
                <Picker
                    selectedValue={this.state.priority}
                    onValueChange={this.onPriorityChange}
                    style={styles.pickerStyle}
                >
                    <Picker.Item label="Very Important" value={0} />
                    <Picker.Item label="Semi Important" value={1} />
                    <Picker.Item label="Not Important" value={2} />
                    <Picker.Item label="No Priority" value={3} />
                </Picker>
                <Button
                    buttonStyle={styles.buttonStyle}
                    textStyle={{ textAlign: 'center', color: '#000', fontSize: 18 }}
                    title={'SAVE'}
                    onPress={this.onSubmit}
                />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1
    },
    inputStyle: {
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        height: 50,
        paddingBottom: 10,
    },
    labelStyle: {
        fontSize: 18,
        fontWeight: 'normal'
    },
    pickerStyle: {
        marginTop: 20,
        marginLeft: 12,
        marginRight: 12
    },
    buttonStyle: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#000',
        marginTop: 20
    }
};

const mapStateToProps = ({ auth }) => {
    const { token } = auth;
    return {
        token
    };
};

export default connect(mapStateToProps, { addNote })(AddNote);
