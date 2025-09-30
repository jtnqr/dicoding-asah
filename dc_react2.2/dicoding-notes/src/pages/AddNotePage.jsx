import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/network-data';
import { useLocale } from '../contexts/LocaleContext';
import { translations } from '../i18n/translations';
import { FaCheck, FaTimes } from 'react-icons/fa';

const MAX_TITLE_LENGTH = 50;

export default function AddNotePage() {
    const navigate = useNavigate();
    const { locale } = useLocale();
    const t = translations[locale];

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [titleCharLimit, setTitleCharLimit] = useState(MAX_TITLE_LENGTH);

    if (!t) return null;

    function onTitleChangeHandler(event) {
        const newTitle = event.target.value;
        if (newTitle.length <= MAX_TITLE_LENGTH) {
            setTitle(newTitle);
            setTitleCharLimit(MAX_TITLE_LENGTH - newTitle.length);
        }
    }

    async function onSubmitHandler(event) {
        event.preventDefault();
        const { error } = await addNote({ title, body });
        if (!error) {
            navigate('/');
        }
    }

    return (
        <section className="py-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">{t.addNewNote}</h2>
            <form onSubmit={onSubmitHandler} className="space-y-4">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">{t.noteTitle}</span>
                        <span className="label-text-alt">{t.charLimit}: {titleCharLimit}</span>
                    </label>
                    <input
                        type="text"
                        placeholder={t.titlePlaceholder}
                        className="input input-bordered w-full"
                        value={title}
                        onChange={onTitleChangeHandler}
                        required
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">{t.noteBody}</span>
                    </label>
                    <textarea
                        placeholder={t.bodyPlaceholder}
                        className="textarea textarea-bordered h-64 w-full"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="pt-4 flex gap-4">
                    <button
                        type="submit"
                        className="btn btn-primary flex-grow w-0.5"
                        aria-label={t.save}
                    >
                        <FaCheck className="mr-2" />
                        {t.save}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn btn-outline flex-grow w-0.5"
                        aria-label={t.cancel}
                    >
                        <FaTimes className="mr-2" />
                        {t.cancel}
                    </button>
                </div>
            </form>
        </section>
    );
}
