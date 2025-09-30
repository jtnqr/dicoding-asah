import React, { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useLocale } from '../contexts/LocaleContext';
import { translations } from '../i18n/translations';

export default function SearchBar({ onSearchChange }) {
    const { locale } = useLocale();
    const t = translations[locale];

    if (!t) return null;

    return (
        <div className="form-control w-full mb-6">
            <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-50 z-2" />
                <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    className="input input-bordered w-full pl-12"
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
        </div>
    );
}
