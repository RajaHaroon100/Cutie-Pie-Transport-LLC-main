import React from 'react';
import './Loading.css'

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-bg">
            <div className="spinner-border animate-spin inline-block w-24 h-24 border-4 rounded-full" role="status">
                
            </div>
            <span className="mt-8">Please Wait...</span>
        </div>
    );
}
