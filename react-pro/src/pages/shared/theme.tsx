import { create } from 'jss';
import {
    ThemeProvider as MuiThemeProvider,
    StylesProvider,
    jssPreset,
} from '@material-ui/styles';
import { useEffect, useState } from 'react';
import { jssPxToRem } from '@app/utils/pxToRem';

export type Theme = {
    name: string;
    setTheme: (name: string) => void;
};

const jss = create({
    plugins: [...jssPreset().plugins, jssPxToRem()],
});

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
        <StylesProvider jss={jss}>
            <MuiThemeProvider theme={{ name: theme, setTheme }}>
                {children}
            </MuiThemeProvider>
        </StylesProvider>
    );
}
