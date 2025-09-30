import React, { createContext, useState, useEffect, useContext } from 'react';
const LocaleContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useLocale = () => {
    return useContext(LocaleContext);
};

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
