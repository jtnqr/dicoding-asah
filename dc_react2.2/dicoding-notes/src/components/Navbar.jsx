import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { LocaleContext } from '../contexts/LocaleContext';
import { translations } from '../i18n/translations';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { locale, toggleLocale } = useContext(LocaleContext);
    const t = translations[locale];

    return (
        <nav className="navbar bg-base-200 shadow-md">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    {t.appTitle}
                </Link>
            </div>

            <div className="flex-none">
                <div className="dropdown dropdown-end md:hidden">
                    <label tabIndex={0} className="btn btn-ghost text-xl px-4">
                        ☰
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-lg"
                    >
                        {user ? (
                            <>
                                {location.pathname.startsWith("/notes") ? (
                                    <li><Link to="/archived">
                                        {t.archived}
                                    </Link></li>
                                ) : location.pathname.startsWith("/archived") ? (
                                    <li>
                                        <Link to="/notes">
                                            {t.note}
                                        </Link>
                                    </li>
                                ) : (
                                    <>
                                        <li>
                                            <Link to="/notes">
                                                {t.note}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/archived">
                                                {t.archived}
                                            </Link>
                                        </li>
                                    </>
                                )}
                                {/* <li><Link to="/archived">{t.archived}</Link></li> */}
                                <li><button onClick={toggleTheme}>{theme === "light" ? `${t.darkMode}` : `${t.lightMode}`}</button></li>
                                <li><button onClick={toggleLocale}>{locale === "id" ? "Ubah Bahasa" : "Switch Language"}</button></li>
                                <li><button onClick={logout} className="text-error">{t.logout}</button></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login">{t.login}</Link></li>
                                <li><Link to="/register">{t.register}</Link></li>
                            </>
                        )}
                    </ul>
                </div>

                {/* desktop menu */}
                <div className="hidden md:flex gap-2 items-center">
                    {user ? (
                        <>
                            {/* <Link to="/notes/add" className="btn btn-ghost">{t.addNote}</Link> */}
                            {location.pathname.startsWith("/notes") ? (
                                <Link to="/archived" className="btn btn-ghost">
                                    {t.archived}
                                </Link>
                            ) : location.pathname.startsWith("/archived") ? (
                                <Link to="/notes" className="btn btn-ghost">
                                    {t.note}
                                </Link>
                            ) : (
                                <>
                                    <Link to="/notes" className="btn btn-ghost w-18">
                                        {t.note}
                                    </Link>
                                    <Link to="/archived" className="btn btn-ghost w-31">
                                        {t.archived}
                                    </Link>
                                </>
                            )}
                            <button onClick={toggleTheme} className="btn btn-ghost w-18">
                                {theme === "light" ? "🌞" : "🌙"}
                            </button>
                            <button onClick={toggleLocale} className="btn btn-ghost w-18">
                                {locale === "id" ? "ID" : "EN"}
                            </button>
                            <button onClick={logout} className="btn btn-error text-white w-21">
                                {t.logout}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost">{t.login}</Link>
                            <Link to="/register" className="btn btn-primary text-white">{t.register}</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>

    );
}
