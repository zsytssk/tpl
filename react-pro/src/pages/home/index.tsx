import { actions } from '@app/redux/modules/app';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLang, useLangMap } from '../shared/i18n';
import { TestDatePicker } from './modal/date_picker';
import { TestForm } from './modal/test_form';
import { useStyles1, useStyles2 } from './style';
import { useTheme } from '@material-ui/styles';
import { Theme } from '../shared/theme';

export default function Home() {
    const { name, setTheme } = useTheme<Theme>();
    const classes1 = useStyles1({ theme: name });
    const classes2 = useStyles2({ classes: classes1 });
    const [visible, setVisible] = useState(false);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const lang = useLang();
    const dispatch = useDispatch();
    const langMap = useLangMap();

    return (
        <div className={classes2.div}>
            <button
                onClick={() => {
                    dispatch(actions.setLang('en'));
                }}
            >
                change lang to en
            </button>
            {langMap('test.test') + '111111'}
            <br />
            <Link to={`/${lang}/loading`}>loading</Link>
            <button onClick={() => setTheme('light')}>theme:light</button>
            <button onClick={() => setTheme('dark')}>theme:dark</button>

            <div onClick={() => setVisible(true)}>test form</div>
            <TestForm visible={visible} onClose={() => setVisible(false)} />

            <div onClick={() => setDatePickerVisible(true)}>date picker</div>
            <TestDatePicker
                visible={datePickerVisible}
                onClose={() => setDatePickerVisible(false)}
            />
        </div>
    );
}
