import React, { useContext } from 'react';
import NoteItem from './NoteItem';
import { useLocale } from '../contexts/LocaleContext';
import { translations } from '../i18n/translations';

export default function NoteList({ notes, isSearchResult }) {
    const { locale } = useLocale();
    const t = translations[locale];

    if (!t) return null;

    if (!notes || notes.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-xl opacity-70">
                    {isSearchResult ? t.noSearchResults : t.noNotes}
                </p>
            </div>
        );
    }

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4 bg-base-200">
            {notes.map((note) => (
                <NoteItem key={note.id} {...note} />
            ))}
        </section>
    );
}
