import React from 'react';
import { Modal } from '@app/libs/BitUI/Modal/Modal';
import { useForm } from 'react-hook-form';
import styles from './date_picker.less';

import DayPicker from 'react-day-picker';

import '!!style-loader!css-loader!react-day-picker/lib/style.css';

export function TestDatePicker({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose?: () => void;
}) {
    return (
        <Modal visible={true} className={styles.testModal}>
            <DayPicker selectedDays={new Date()} />
        </Modal>
    );
}
