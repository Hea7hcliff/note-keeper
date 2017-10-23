import React from 'react';
import axios from 'axios';
import { ScrollView } from 'react-native';
import Note from './Note';

class NoteList extends React.Component {
    state = { 
        tasks: [] 
    };

    componentDidMount() {
        axios.get('http://84.251.221.123:3000/api/notes')
            .then((response) => {
                console.log(response.data[1].notes);
                this.setState({
                    tasks: response.data[1].notes
                });
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                  } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                  }
            });
    }

    renderTasks() {
        return this.state.tasks.map((note, index) => {
            return (
                <Note
                    key={note._id}
                    note={note}
                    style={index === 0 ? { marginTop: 3 } : { marginTop: 0 }}
                />
            );
        });
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#32292f' }}>
                {this.renderTasks()}
            </ScrollView>
        );
    }
}

export default NoteList;
