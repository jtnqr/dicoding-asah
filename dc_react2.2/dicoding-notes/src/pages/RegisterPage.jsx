import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { LocaleContext } from '../contexts/LocaleContext';
import { translations } from '../i18n/translations';

export default function RegisterPage() {
    const { register } = useContext(AuthContext);
    const { locale } = useContext(LocaleContext);
    const t = translations[locale];

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();
        if (password !== confirm) return alert('Password tidak cocok');
        setLoading(true);
        await register({ name, email, password });
        setLoading(false);
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>{t.register}</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Nama</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                </div>
                <button type="submit" disabled={loading}>{loading ? t.loading : t.register}</button>
            </form>
        </div>
    );
}
