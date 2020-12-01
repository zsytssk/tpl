import { jssPxToRem } from '@app/utils/pxToRem';
import { jssPreset, StylesProvider } from '@material-ui/styles';
import { create } from 'jss';

const jss = create({
    plugins: [...jssPreset().plugins, jssPxToRem()],
});

export function JSSPluginProvider({ children }: { children: React.ReactNode }) {
    return <StylesProvider jss={jss}>{children}</StylesProvider>;
}
