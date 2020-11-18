import React from 'react';
import { Modal } from '@app/libs/BitUI/Modal/Modal';
import { useForm } from 'react-hook-form';
import styles from './test_modal.less';

export function TestModal({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose?: () => void;
}) {
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <Modal visible={true} className={styles.testModal}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    name="email"
                    ref={register({
                        required: 'value is required',
                        validate: (value) => {
                            if (
                                value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
                            ) {
                                return true;
                            }
                            return 'pattern is not match';
                        },
                    })}
                />
                {errors.email && (
                    <p style={{ color: 'red' }}>{errors.email.message}</p>
                )}
                <br />
                <input type="submit" value="submit" />
            </form>
        </Modal>
    );
}
