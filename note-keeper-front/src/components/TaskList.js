import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListView, AsyncStorage } from 'react-native';
import Note from './Note';
import { getNotes, registerToken } from '../actions';

class TaskList extends React.Component {
    componentWillMount() {
        this.getData();
        this.createDataSource(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    async getData() {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                this.props.registerToken(token);
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
        if (note !== undefined) {
            return <Note note={note} isDone={false} />;
        }
        return null;
    }

    render() {
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


const mapStateToProps = ({ auth, data }) => {
    const { token } = auth;
    const notes = _.map(data, (val) => {
        if (val.done === false && val.priority !== 3) {
            return val;
        }
    });
    return {
        token, notes
    };
};

export default connect(mapStateToProps, { getNotes, registerToken })(TaskList);
