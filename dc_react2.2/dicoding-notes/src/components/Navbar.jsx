import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaLanguage, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLocale } from '../contexts/LocaleContext';
import { translations } from '../i18n/translations';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { locale, toggleLocale } = useLocale();
    const t = translations[locale];
    const location = useLocation();

    const renderNavLinks = () => {
        if (!user) return null;

        if (location.pathname.startsWith("/archived")) {
            return (
                <li><Link to="/notes">{t.activeNotes}</Link></li>
            );
        }
        return (
            <li><Link to="/archived">{t.archived}</Link></li>
        );
    };

    if (!t) return null;

    return (
        <nav className="navbar px-4 sm:px-10 bg-base-200 shadow-md sticky top-0 z-50">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    {t.appTitle}
                </Link>
            </div>

            <div className="flex-none">
                {/* Mobile Dropdown Menu */}
                <div className="dropdown dropdown-end md:hidden">
                    <label tabIndex={0} className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {user && <p className='ml-2 my-2'>{t.hello}, <span className="font-semibold">{user.name}</span></p>}

                        {renderNavLinks()}
                        <li><button onClick={toggleLocale}><FaLanguage className="w-5 h-5" /> {locale === "id" ? "English" : "Indonesia"}</button></li>
                        <li>
                            <button onClick={toggleTheme}>
                                {theme === "light" ? (
                                    <>
                                        <FaMoon className="w-5 h-5" /> {t.darkMode}
                                    </>
                                ) : (
                                    <>
                                        <FaSun className="w-5 h-5" /> {t.lightMode}
                                    </>
                                )}
                            </button>
                        </li>
                        {user && <li><button onClick={logout} className="text-error"><FaSignOutAlt className="w-5 h-5" /> {t.logout}</button></li>}
                    </ul>
                </div>

                {/* Desktop Menu */}
                <ul className="menu menu-horizontal px-1 gap-2 items-center hidden md:flex">
                    {renderNavLinks()}
                    <li>
                        <button onClick={toggleTheme} className="btn btn-ghost btn-square">
                            {theme === "light" ? <FaMoon className="w-5 h-5" /> : <FaSun className="w-5 h-5" />}
                        </button>
                    </li>
                    <li>
                        {/* FIX: Locale toggle button size */}
                        <button onClick={toggleLocale} className="btn btn-ghost btn-square" aria-label="Toggle Language">
                            <FaLanguage className="w-5 h-5" />
                        </button>
                    </li>
                    {user && (
                        <div className="flex items-center gap-2 ml-2">
                            <button onClick={logout} className="btn btn-ghost btn-square text-error" aria-label="Logout">
                                <FaSignOutAlt className="w-5 h-5" />
                            </button>
                            <span className="font-semibold ml-1">{user.name}</span>
                        </div>
                    )}
                </ul>
            </div>
        </nav>
    );
}
