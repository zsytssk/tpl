import { useState } from 'react';
import { Modal } from '@app/libs/BitUI/Modal/Modal';
import styles from './date_picker.less';
import zhCn from 'date-fns/locale/zh-CN';

import DatePicker, { registerLocale } from 'react-datepicker';

import '!style-loader!css-loader!react-datepicker/dist/react-datepicker.css';
registerLocale('zh-CN', zhCn);

export function TestDatePicker({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose?: () => void;
}) {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <Modal visible={visible} className={styles.testModal}>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                locale="zh-CN"
            />
        </Modal>
    );
}
