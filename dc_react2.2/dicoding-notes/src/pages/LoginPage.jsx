import React, { useState, useContext } from 'react';
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
        <div style={{ padding: 20 }}>
            <h2>{t.login}</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" disabled={loading}>{loading ? t.loading : t.login}</button>
            </form>
        </div>
    );
}
