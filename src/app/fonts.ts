import { Inter, Roboto_Mono } from 'next/font/google';

export const textFont = Inter({
    subsets: ['latin'],
    variable: '--font-text',
    display: 'swap',
});

export const headerFont = Roboto_Mono({
    subsets: ['latin'],
    variable: '--font-title',
    display: 'swap',
});