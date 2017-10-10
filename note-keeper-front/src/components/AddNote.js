import React from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Picker } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';

class AddNote extends React.Component {
    state= {
        priority: 0
    }
    onPriorityChange = (value) => {
        this.setState({
            priority: value
        });
    }
    render() {
        return (
            <View style={styles.containerStyle}>
                <FormLabel labelStyle={styles.labelStyle}>Note</FormLabel>
                <FormInput 
                    multiline 
                    numberOfLines={2}
                    inputStyle={styles.inputStyle} 
                />
                <Picker
                    selectedValue={this.state.priority}
                    onValueChange={this.onPriorityChange}
                    style={styles.pickerStyle}
                >
                    <Picker.Item label="Very Important" value={1} />
                    <Picker.Item label="Semi Important" value={2} />
                    <Picker.Item label="Not Important" value={3} />
                </Picker>
                <Button
                    buttonStyle={styles.buttonStyle}
                    textStyle={{ textAlign: 'center', color: '#000', fontSize: 18 }}
                    title={'SAVE'}
                    onPress={() => Actions.mainStack()}
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

export default AddNote;
