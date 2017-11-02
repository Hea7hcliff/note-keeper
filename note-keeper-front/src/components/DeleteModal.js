import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Modal, Vibration } from 'react-native';
import { Button } from 'react-native-elements';
import { deleteNote } from '../actions/IoActions';

class DeleteModal extends React.Component {
    onCancelPress = () => {
        Vibration.vibrate(20);
        this.props.onDismiss();
    }
    onConfirmPress = () => {
        Vibration.vibrate(20);
        const { noteDetails } = this.props;
        this.props.deleteNote(noteDetails);
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
                <View style={styles.backgroundStyle}>
                    <View style={styles.modalStyle}>
                        <Text style={styles.textStyle}>
                            {this.props.message}
                        </Text>
                        <View style={styles.buttonSectionStyle}>
                            <Button
                                buttonStyle={styles.buttonStyle}
                                textStyle={{ textAlign: 'center', color: '#000', fontSize: 18 }}
                                title="Yes"
                                onPress={this.onConfirmPress}
                            />
                            <Button
                                buttonStyle={styles.buttonStyle}
                                textStyle={{ textAlign: 'center', color: '#000', fontSize: 18 }}
                                title="No"
                                onPress={this.onCancelPress}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = {
    backgroundStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalStyle: {
        alignItems: 'center',
        backgroundColor: '#FFFCF9',
        width: 300,
        paddingTop: 20,
        paddingBottom: 20,
    },
    textStyle: {
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10
    },
    buttonSectionStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    buttonStyle: {
        marginTop: 20,
        width: 120,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#32292f'
    },
};

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps, { deleteNote })(DeleteModal);
