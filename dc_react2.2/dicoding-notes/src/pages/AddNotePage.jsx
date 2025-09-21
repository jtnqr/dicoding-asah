import React, { useState } from 'react';
import { addNote } from '../utils/network-data';
import { useNavigate } from 'react-router-dom';

export default function AddNotePage() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const { error } = await addNote({ title, body });
        setLoading(false);
        if (!error) navigate('/notes');
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Add Note</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Body</label>
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} />
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            </form>
        </div>
    );
}
