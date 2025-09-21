import React from 'react';
export default function Loading({ label = 'Loading...' }) {
    return (
        <div style={{ padding: 20 }}>
            <div>{label}</div>
        </div>
    );
}
