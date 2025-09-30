import React, { useState, useEffect } from 'react';
import { getArchivedNotes } from '../utils/network-data';
import { useLocale } from '../contexts/LocaleContext';
import { translations } from '../i18n/translations';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';

export default function ArchivedPage() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const { locale } = useLocale();
    const t = translations[locale];

    useEffect(() => {
        async function fetchNotes() {
            const { error, data } = await getArchivedNotes();
            if (!error && data) {
                const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setNotes(sortedData);
            }
            setLoading(false);
        }
        fetchNotes();
    }, []);

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!t) return null;

    if (loading) {
        return <div className="text-center py-16">
            <span className="loading loading-lg"></span>
        </div>;
    }

    return (
        <div className="py-8">
            <h2 className="text-3xl font-bold mb-4">{t.archivedNotes}</h2>
            <SearchBar onSearchChange={setSearchQuery} />
            <NoteList notes={filteredNotes} isSearchResult={searchQuery.length > 0} />
        </div>
    );
}
