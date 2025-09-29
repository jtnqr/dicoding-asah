import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { LocaleContext } from '../contexts/LocaleContext';
import { translations } from '../i18n/translations';

export default function LoginPage() {
    const { login } = useContext(AuthContext);
    const { locale } = useContext(LocaleContext);
    const t = translations[locale];

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        await login({ email, password });
        setLoading(false);
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">{t.login}</h2>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div className="form-control">
                    <label className="label" htmlFor="email">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="input input-bordered validator"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label" htmlFor="password">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="input input-bordered"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full mt-4"
                >
                    {loading ? t.loading : t.login}
                </button>
            </form>
        </div>

    );
}
