import React from 'react';
import { ScrollView } from 'react-native';
import Note from './Note';

class NoteList extends React.Component {
    state = { 
        tasks: [
            { id: '0', title: 'Useless', desc: 'Jotain tekstiä...', priority: 0 },
            { id: '1', title: 'Titles', desc: 'Lisää tekstiä tänne...', priority: 1 },
            { id: '2', title: 'Are', desc: 'Perse ei ole pippeli!', priority: 2 },
            { id: '3', title: 'Useless', desc: 'Mikko on Tiitinen, mutta ei ole Partanen.', priority: 0 },
            { id: '4', title: 'IMHO', desc: 'Panu on Partanen, mutta ei ole Tiitinen.', priority: 1 },
            { id: '5', title: 'LOL', desc: 'Saatana. The reason why we have to call next() on the returned values is that, all those functions return iterators.', priority: 2 }
        ] 
    };
    renderTasks() {
        return this.state.tasks.map((note, index) => {
            return (
                <Note key={index} note={note} style={index === 0 ? { marginTop: 3 } : { marginTop: 0 }} />
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
