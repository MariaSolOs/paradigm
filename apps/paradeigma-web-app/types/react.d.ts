import type { FC, PropsWithChildren } from 'react';

declare module 'react' {
    // Custom type for a React functional component with props and children.
    type FCC<P = {}> = FC<PropsWithChildren<P>>;
}