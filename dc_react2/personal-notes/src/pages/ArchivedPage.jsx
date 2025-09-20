import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getArchivedNotes } from '../utils/local-data';
import NoteList from '../components/NoteList';

function ArchivedPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';

    const notes = getArchivedNotes().filter((note) =>
        note.title.toLowerCase().includes(keyword.toLowerCase())
    );

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchParams(query ? { keyword: query } : {});
    };

    return (
        <div className='container'>
            <div className="header">
                <h2>Catatan Terarsip</h2>
                <input
                    type="text"
                    placeholder="Cari catatan..."
                    value={keyword}
                    onChange={handleSearch}
                />
                <Link to="/">Kembali ke Beranda</Link>
            </div>
            {notes.length ? (
                <NoteList notes={notes} />
            ) : (
                <p>Arsip kosong</p>
            )}
        </div>
    );
}

export default ArchivedPage;
