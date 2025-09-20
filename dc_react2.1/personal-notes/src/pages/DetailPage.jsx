import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    getNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
} from '../utils/local-data';

function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const note = getNote(id);

    if (!note) return <p>Catatan tidak ditemukan</p>;

    const handleBack = () => {
        navigate(-1);
    };

    const handleDelete = () => {
        deleteNote(id);
        navigate(note.archived ? '/archived' : '/');
    };

    const handleArchiveToggle = () => {
        if (note.archived) {
            unarchiveNote(id);
            navigate('/archived');
        } else {
            archiveNote(id);
            navigate('/');
        }
    };

    return (
        <div className='container'>
            <h2>{note.title}</h2>
            <p><i>{new Date(note.createdAt).toLocaleString()}</i></p>
            <p>{note.body}</p>

            <button onClick={handleBack}>Kembali</button>
            <button className='delete' onClick={handleDelete}>Hapus</button>
            <button className='archive' onClick={handleArchiveToggle}>
                {note.archived ? 'Batal Arsip' : 'Arsipkan'}
            </button>
        </div>
    );
}

export default DetailPage;
