import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLocale } from '../contexts/LocaleContext';
import { translations } from '../i18n/translations';

export default function RegisterPage() {
    const { register, user } = useAuth();
    const { locale } = useLocale();
    const t = translations[locale];

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);

    if (!t) return null;

    async function onSubmit(e) {
        e.preventDefault();
        if (password !== confirm) {
            alert(t.passwordMismatch);
            return;
        }
        setLoading(true);
        const success = await register({ name, email, password });
        if (!success) {
            setLoading(false);
        }
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex items-start md:items-center justify-center min-h-screen bg-base-200">
            <div className="w-full max-w-md p-8 space-y-6 shadow-2xl card bg-base-100">
                <h2 className="text-2xl font-bold text-center">{t.createYourAccount}</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">{t.name}</span>
                        </label>
                        <input
                            type="text"
                            className="w-full input input-bordered"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            className="w-full input input-bordered"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">{t.password}</span>
                        </label>
                        <input
                            type="password"
                            className="w-full input input-bordered"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">{t.confirmPassword}</span>
                        </label>
                        <input
                            type="password"
                            className="w-full input input-bordered"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
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
                            {loading ? t.loading : t.register}
                        </button>
                    </div>
                </form>
                <p className="text-sm text-center">
                    {t.alreadyHaveAccount}{' '}
                    <Link to="/login" className="link link-hover link-primary">
                        {t.loginHere}
                    </Link>
                </p>
            </div>
        </div>
    );
}
