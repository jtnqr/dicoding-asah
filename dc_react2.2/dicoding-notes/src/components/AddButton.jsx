import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { useLocale } from '../contexts/LocaleContext';
import { translations } from '../i18n/translations';

export default function AddButton() {
    const { locale } = useLocale();
    const t = translations[locale];

    if (!t) return null;

    return (
        <div
            className="tooltip tooltip-left fixed bottom-8 right-8"
            data-tip={t.addNewNoteTooltip}
        >
            <Link
                to="/notes/add"
                className="btn btn-primary btn-circle shadow-lg"
                aria-label={t.addNewNoteTooltip}
                style={{ width: '4rem', height: '4rem' }}
            >
                <FaPlus className="text-2xl" />
            </Link>
        </div>
    );
}
