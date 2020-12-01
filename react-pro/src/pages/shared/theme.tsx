import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { useEffect, useState } from 'react';

export type Theme = {
    name: string;
    setTheme: (name: string) => void;
};
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        if (localTheme) {
            setTheme(localTheme);
        }
    }, []);

    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        if (localTheme !== 'theme') {
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    return (
        <MuiThemeProvider theme={{ name: theme, setTheme }}>
            {children}
        </MuiThemeProvider>
    );
}
