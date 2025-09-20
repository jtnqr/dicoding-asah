import { useState } from "react";
import { getInitialData } from './utils/index';

function App() {
  const [notes, setNotes] = useState(getInitialData());
  const [search, setSearch] = useState("");

  // tambah catatan
  const addNote = (title, body) => {
    const newNote = {
      id: +new Date(),
      title,
      body,
      archived: false,
      createdAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
  };

  // hapus catatan
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // toggle arsip
  const toggleArchive = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
  };

  // filter pencarian
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Aplikasi Catatan Pribadi</h1>

      <SearchBar search={search} setSearch={setSearch} />
      <NoteForm addNote={addNote} />

      <h2>Catatan Aktif</h2>
      <NoteList
        notes={filteredNotes.filter((note) => !note.archived)}
        onDelete={deleteNote}
        onToggleArchive={toggleArchive}
      />

      <h2>Arsip</h2>
      <NoteList
        notes={filteredNotes.filter((note) => note.archived)}
        onDelete={deleteNote}
        onToggleArchive={toggleArchive}
      />
    </div>
  );
}

// Form tambah catatan
function NoteForm({ addNote }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const limit = 50;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    addNote(title, body);
    setTitle("");
    setBody("");
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <p className="char-limit">Sisa karakter: {limit - title.length}</p>
      <input
        type="text"
        value={title}
        placeholder="Judul catatan"
        onChange={(e) =>
          e.target.value.length <= limit && setTitle(e.target.value)
        }
      />
      <textarea
        value={body}
        placeholder="Isi catatan..."
        onChange={(e) => setBody(e.target.value)}
      />
      <button className="btn btn-add" type="submit">
        Tambah
      </button>
    </form>
  );
}

// Komponen pencarian
function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Cari catatan..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

// Daftar catatan
function NoteList({ notes, onDelete, onToggleArchive }) {
  if (notes.length === 0) {
    return <p className="empty-message">Tidak ada catatan</p>;
  }
  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onToggleArchive={onToggleArchive}
        />
      ))}
    </div>
  );
}

// Item catatan
function NoteItem({ note, onDelete, onToggleArchive }) {
  return (
    <div className="note-item">
      <h3>{note.title}</h3>
      <small>{new Date(note.createdAt).toLocaleString()}</small>
      <p>{note.body}</p>
      <div className="note-actions">
        <button
          className="btn btn-delete"
          onClick={() => onDelete(note.id)}
        >
          Hapus
        </button>
        <button
          className="btn btn-archive"
          onClick={() => onToggleArchive(note.id)}
        >
          {note.archived ? "Pindahkan" : "Arsipkan"}
        </button>
      </div>
    </div>
  );
}

export default App;
