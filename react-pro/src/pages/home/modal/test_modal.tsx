import React from 'react';
import { Modal } from '@app/libs/BitUI/Modal/Modal';
import styles from './test_modal.less';

export function TestModal({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose?: () => void;
}) {
    return (
        <Modal visible={visible}>
            <div className={styles.testModal}>
                <div className="title" onClick={onClose}>
                    this is a test
                </div>
            </div>
        </Modal>
    );
}
