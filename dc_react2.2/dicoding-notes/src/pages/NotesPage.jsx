import React, { useContext, useEffect, useState } from 'react';
import { getActiveNotes, deleteNote } from '../utils/network-data';
import { AuthContext } from '../contexts/AuthContext';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { LocaleContext } from '../contexts/LocaleContext';
import { translations } from '../i18n/translations';

export default function NotesPage() {
    const { user } = useContext(AuthContext);
    const { locale } = useContext(LocaleContext);
    const t = translations[locale];

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchNotes() {
        setLoading(true);
        const { error, data } = await getActiveNotes();
        if (!error) setNotes(data);
        else setNotes([]);
        setLoading(false);
    }

    useEffect(() => {
        if (!user) return;
        fetchNotes();
        // optionally: poll/refresh when focus
    }, [user]);

    async function onDelete(id) {
        if (!confirm('Delete this note?')) return;
        await deleteNote(id);
        fetchNotes();
    }

    if (loading) return <Loading label={t.loading} />;

    return (
        <div style={{ padding: 20 }}>
            <h2>Notes ({notes.length})</h2>
            <ul>
                {notes.map(n => (
                    <li key={n.id} style={{ marginBottom: 10 }}>
                        <Link to={`/notes/${n.id}`}>{n.title || '(no title)'}</Link>
                        <button onClick={() => onDelete(n.id)} style={{ marginLeft: 10 }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
