import {
    ThemeProvider as MuiThemeProvider,
    makeStyles,
} from '@material-ui/styles';
import { useEffect, useState } from 'react';

export type Theme = {
    name: string;
    setTheme: (name: string) => void;
};

const useStyle = makeStyles({
    '@global': {
        body: {
            color: 'green',
        },
        a: {
            textDecoration: 'underline',
        },
    },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState('dark');

    useStyle();

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
