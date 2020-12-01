import { makeStyles } from '@material-ui/styles';

export const useStyles1 = makeStyles<{ name: string }>((theme) => {
    return {
        div: {
            backgroundColor: theme.name === 'dark' ? '#000' : 'blue',
            fontSize: '16px !important',
            margin: '10px 10px 20px 20px',
        },
    };
});

export const useStyles2 = makeStyles({
    div: {
        fontSize: '14px',
    },
});
