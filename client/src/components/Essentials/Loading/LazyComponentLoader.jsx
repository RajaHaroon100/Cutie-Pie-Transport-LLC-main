import React, { Suspense } from 'react';
import Loading from './Loading';

export default function LazyComponentLoader({ component: Component }) {
    return (
        <Suspense fallback={<Loading />}>
            <Component />
        </Suspense>
    );
}
