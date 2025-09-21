import React, { useEffect, useState } from 'react';
import { getArchivedNotes, unarchiveNote } from '../utils/network-data';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

export default function ArchivedPage() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchNotes() {
        setLoading(true);
        const { error, data } = await getArchivedNotes();
        if (!error) setNotes(data);
        setLoading(false);
    }

    useEffect(() => { fetchNotes(); }, []);

    if (loading) return <Loading />;

    return (
        <div style={{ padding: 20 }}>
            <h2>Archived Notes</h2>
            <ul>
                {notes.map(n => (
                    <li key={n.id}>
                        <Link to={`/notes/${n.id}`}>{n.title}</Link>
                        <button onClick={async () => { await unarchiveNote(n.id); fetchNotes(); }} style={{ marginLeft: 10 }}>Unarchive</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
