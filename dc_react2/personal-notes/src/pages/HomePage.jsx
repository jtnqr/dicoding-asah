import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getActiveNotes } from '../utils/local-data';
import NoteList from '../components/NoteList';

function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';

    const notes = getActiveNotes().filter((note) =>
        note.title.toLowerCase().includes(keyword.toLowerCase())
    );

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchParams(query ? { keyword: query } : {});
    };

    return (
        <div className='container'>
            <div className="header">
                <h2>Catatan Aktif</h2>
                <input
                    type="text"
                    placeholder="Cari catatan..."
                    value={keyword}
                    onChange={handleSearch}
                />
                <Link to="/notes/new">+ Tambah Catatan</Link>
                <Link to="/archived">Lihat Arsip</Link>
            </div>
            {notes.length ? (
                <NoteList notes={notes} />
            ) : (
                <p>Tidak ada catatan</p>
            )}
        </div>
    );
}

export default HomePage;
