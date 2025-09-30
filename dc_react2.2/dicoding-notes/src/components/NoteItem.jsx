import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../utils/formatter';
import { useLocale } from '../contexts/LocaleContext';

export default function NoteItem({ id, title, createdAt, body }) {
    const { locale } = useLocale();

    return (
        <Link to={`/notes/${id}`} className="block">
            <article className="card h-full bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="card-body">
                    <h3 className="card-title truncate link-hover">
                        {title}
                    </h3>
                    <time className="text-sm opacity-70">{showFormattedDate(createdAt, locale)}</time>
                    <p className="mt-2 opacity-80 overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                    }}>
                        {body}
                    </p>
                </div>
            </article >
        </Link >
    );
}
