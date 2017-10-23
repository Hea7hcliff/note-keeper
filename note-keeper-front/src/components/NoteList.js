import React from 'react';
import axios from 'axios';
import { ScrollView } from 'react-native';
import Note from './Note';

class NoteList extends React.Component {
    state = { 
        tasks: [] 
    };

    componentDidMount() {
        const config = { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1OWUyM2U2N2Q1MjU3NDBhMmY2YjE2YTEiLCJpYXQiOjE1MDg3ODkwNDB9.fFZQLXDRXMz3mCLcB649KPsaBhLNg118GYpmei3B7-I' };
        axios.get('http://10.0.1.14:3000/api/notes?priority=1', { headers: config })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    tasks: response.data
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
        console.log(this.state.tasks);
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
