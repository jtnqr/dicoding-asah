import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { showFormattedDate } from '../utils/formatter';
import { useLocale } from '../contexts/LocaleContext';
import { translations } from '../i18n/translations';
import { FaArchive, FaTrash, FaInbox, FaArrowLeft } from 'react-icons/fa';

export default function NoteDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { locale } = useLocale();
    const t = translations[locale];

    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNote() {
            const { data } = await getNote(id);
            setNote(data);
            setLoading(false);
        }
        fetchNote();
    }, [id]);

    if (!t) return null;


    async function onArchiveHandler() {
        await archiveNote(id);
        navigate('/notes');
    }

    async function onUnarchiveHandler() {
        await unarchiveNote(id);
        navigate('/archived');
    }

    async function onDeleteHandler() {
        if (confirm(t.confirmDelete)) {
            await deleteNote(id);
            navigate('/');
        }
    }

    if (loading) {
        return <div className="text-center py-16"><span className="loading loading-lg"></span></div>;
    }

    if (!note) {
        return <div className="text-center py-16"><p>{t.noteNotFound}</p></div>;
    }

    return (
        <div className="py-8 max-w-4xl mx-auto">
            <div className="mb-4">
                <div className="tooltip tooltip-bottom" data-tip={t.backButtonTooltip}>
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-ghost btn-circle"
                        aria-label={t.backButtonTooltip}
                    >
                        <FaArrowLeft className="text-xl" />
                    </button>
                </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">{note.title}</h1>
            <time className="text-md opacity-70">{showFormattedDate(note.createdAt, locale)}</time>
            <p className="mt-6 text-lg whitespace-pre-wrap">{note.body}</p>

            <div className="fixed bottom-8 right-8 flex flex-col gap-4">
                {note.archived ? (
                    <div className="tooltip tooltip-left" data-tip={t.unarchive}>
                        <button
                            onClick={onUnarchiveHandler}
                            className="btn btn-primary btn-circle shadow-lg"
                            style={{ width: '4rem', height: '4rem' }}
                            aria-label={t.unarchive}
                        >
                            <FaInbox className="text-2xl" />
                        </button>
                    </div>
                ) : (
                    <div className="tooltip tooltip-left" data-tip={t.archive}>
                        <button
                            onClick={onArchiveHandler}
                            className="btn btn-primary btn-circle shadow-lg"
                            style={{ width: '4rem', height: '4rem' }}
                            aria-label={t.archive}
                        >
                            <FaArchive className="text-2xl" />
                        </button>
                    </div>
                )}
                <div className="tooltip tooltip-left" data-tip={t.delete}>
                    <button
                        onClick={onDeleteHandler}
                        className="btn btn-error text-white btn-circle shadow-lg"
                        style={{ width: '4rem', height: '4rem' }}
                        aria-label={t.delete}
                    >
                        <FaTrash className="text-2xl" />
                    </button>
                </div>
            </div>
        </div>
    );
}
