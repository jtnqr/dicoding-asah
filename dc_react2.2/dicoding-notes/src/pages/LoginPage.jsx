import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLocale } from '../contexts/LocaleContext';
import { translations } from '../i18n/translations';

export default function LoginPage() {
    const { login, user } = useAuth();
    const { locale } = useLocale();
    const t = translations[locale];

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    if (!t) return null;

    if (user) {
        return <Navigate to="/" replace />;
    }

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const success = await login({ email, password });
        if (!success) {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-start md:items-center min-h-screen p-4">
            <div className="w-full max-w-md p-8 space-y-6 shadow-2xl card bg-base-100">
                <h2 className="text-2xl font-bold text-center">{t.loginToYourAccount}</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="form-control">
                        <label className="label" htmlFor="email">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full input input-bordered"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label" htmlFor="password">
                            <span className="label-text">{t.password}</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full input input-bordered"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="pt-4 form-control">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary"
                        >
                            {loading && <span className="loading loading-spinner"></span>}
                            {loading ? t.loading : t.login}
                        </button>
                    </div>
                </form>
                <p className="text-sm text-center">
                    {t.dontHaveAccount}{' '}
                    <Link to="/register" className="link link-hover link-primary">
                        {t.registerHere}
                    </Link>
                </p>
            </div>
        </div>
    );
}
