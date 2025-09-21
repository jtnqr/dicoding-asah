import React, { createContext, useState, useEffect } from 'react';
export const LocaleContext = createContext();

export function LocaleProvider({ children }) {
    const [locale, setLocale] = useState(() => localStorage.getItem('locale') || 'id');

    useEffect(() => {
        localStorage.setItem('locale', locale);
    }, [locale]);

    function toggleLocale() {
        setLocale((l) => (l === 'id' ? 'en' : 'id'));
    }

    return (
        <LocaleContext.Provider value={{ locale, toggleLocale }}>
            {children}
        </LocaleContext.Provider>
    );
}
