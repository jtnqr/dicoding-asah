import React from 'react';
import { Link } from 'react-router-dom';

function NoteList({ notes }) {
    return (
        <ul className="note-list">
            {notes.map((note) => (
                <li key={note.id} className="note-card">
                    <Link to={`/notes/${note.id}`}>
                        <h3>{note.title}</h3>
                    </Link>
                    <small>{new Date(note.createdAt).toLocaleString()}</small>
                    <p>{note.body.substring(0, 80)}...</p>
                </li>
            ))}
        </ul>
    );
}

export default NoteList;
