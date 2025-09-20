import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addNote } from '../utils/local-data';

function NewNotePage() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote({ title, body });
        navigate('/');
    };

    return (
        <div className="container">
            <div className="header">
                <h2>Tambah Catatan</h2>
                <Link to="/">Kembali ke Beranda</Link>

            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Judul"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Isi catatan..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <button className='save' type="submit">Simpan</button>
            </form>
        </div>
    );
}

export default NewNotePage;
