import React, { useState } from 'react';
import { Modal } from '@app/libs/BitUI/Modal/Modal';
import { useForm } from 'react-hook-form';
import styles from './date_picker.less';

import DatePicker from 'react-day-picker';

import '!style-loader!css-loader!react-day-picker/lib/style.css';

export function TestDatePicker({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose?: () => void;
}) {
    const [value, onChange] = useState(new Date());

    return (
        <Modal visible={true} className={styles.testModal}>
            <DatePicker locale="zh" onChange={onChange} value={value} />
        </Modal>
    );
}
