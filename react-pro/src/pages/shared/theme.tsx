import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { useState } from 'react';

export type Theme = {
    name: string;
    setTheme: (name: string) => void;
};
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState('dark');

    return (
        <MuiThemeProvider theme={{ name: theme, setTheme }}>
            {children}
        </MuiThemeProvider>
    );
}
