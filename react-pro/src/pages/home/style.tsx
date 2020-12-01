import { makeStyles } from '@material-ui/styles';

export const useStyles1 = makeStyles<{ name: string }>((theme) => {
    return {
        div: {
            backgroundColor: (theme1) => {
                console.log(`test:>1`, theme, theme1);
                return theme.name === 'dark' ? '#000' : 'blue';
            },
            fontSize:
                theme.name === 'dark' ? '16px !important' : '20px !important',
            margin: '10px 10px 20px 20px',
        },
    };
});

export const useStyles2 = makeStyles({
    div: {
        fontSize: '14px',
    },
});
