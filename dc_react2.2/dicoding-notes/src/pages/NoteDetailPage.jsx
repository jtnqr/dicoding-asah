import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, archiveNote, unarchiveNote } from '../utils/network-data';
import Loading from '../components/Loading';

export default function NoteDetailPage() {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    async function fetch() {
        setLoading(true);
        const { error, data } = await getNote(id);
        if (!error) setNote(data);
        setLoading(false);
    }

    useEffect(() => { fetch(); }, [id]);

    if (loading) return <Loading />;
    if (!note) return <div style={{ padding: 20 }}>Not found</div>;

    return (
        <div style={{ padding: 20 }}>
            <h2>{note.title}</h2>
            <div>{note.body}</div>
            <div style={{ marginTop: 10 }}>
                {note.archived ? (
                    <button onClick={async () => { await unarchiveNote(id); navigate('/archived'); }}>Unarchive</button>
                ) : (
                    <button onClick={async () => { await archiveNote(id); navigate('/notes'); }}>Archive</button>
                )}
            </div>
        </div>
    );
}
