import { actions } from '@app/redux/modules/app';
import { RootState } from '@app/redux/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLang, useLangMap } from '../shared/i18n';
import { TestModal } from './modal/test_modal';

import style from './style.less';

export default function Home() {
    const [visible, setVisible] = useState(false);
    const lang = useLang();
    const dispatch = useDispatch();
    const langMap = useLangMap();

    return (
        <div className={style.div}>
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

            <div onClick={() => setVisible(true)}>show modal</div>
            <TestModal visible={visible} onClose={() => setVisible(false)} />
            <TestModal visible={visible} onClose={() => setVisible(false)} />
            <TestModal visible={visible} onClose={() => setVisible(false)} />
            <TestModal visible={visible} onClose={() => setVisible(false)} />
        </div>
    );
}
