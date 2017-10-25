import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListView, AsyncStorage } from 'react-native';
import Note from './Note';
import { getNotes, getToken } from '../actions';

class NoteList extends React.Component {
    componentWillMount() {
        this.getData();
        const { token } = this.props;
        this.props.getNotes(token);
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    async getData() {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log(token);
            if (token !== null) {
                console.log(token);
                this.props.getToken(token);
                this.props.getNotes(token);
            }
        } catch (error) {
            console.log('Error getting data:', error);
        }
    }

    createDataSource({ notes }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(notes);
    }
    renderRow(note) {
        if (note.done === false) {
            return <Note note={note} isDone={false} />;
        }
        return null;
    }

    render() {
        console.log('Store:', this.props.notes);
        return (
            <ListView
                enableEmptySections 
                dataSource={this.dataSource} 
                renderRow={this.renderRow}
            >
                {this.renderRow}
            </ListView>
        );
    }
}

const mapStateToProps = ({ auth, list }) => {
    const { token } = auth;
    const notes = _.map(list, (val, uid) => {
        return { ...val, uid };
    });
    return {
        token, notes
    };
};

export default connect(mapStateToProps, { getNotes, getToken })(NoteList);
