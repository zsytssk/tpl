import { useState } from 'react';
import { Modal } from '@app/libs/BitUI/Modal/Modal';
import styles from './date_picker.less';

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
            test
        </Modal>
    );
}
