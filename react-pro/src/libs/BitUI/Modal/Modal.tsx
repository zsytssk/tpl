import { useEffect, useState, useRef } from 'react';

import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.less';

type ModalProps = DialogProps & {
    visible?: boolean;
    className?: string;
};

let wrap: HTMLDivElement;
export function Modal(props: ModalProps) {
    const { visible } = props;
    const [modal] = useState(document.createElement('div'));
    if (!wrap) {
        wrap = document.createElement('div');
        document.body.appendChild(wrap);
    }

    useEffect(() => {
        return () => {
            if (wrap.contains(modal)) {
                wrap.removeChild(modal);
            }
        };
    }, []);

    useEffect(() => {
        if (!visible) {
            return;
        }
        wrap.appendChild(modal);
        return () => {
            wrap.removeChild(modal);
        };
    }, [visible]);

    return ReactDOM.createPortal(<Dialog {...props} />, modal);
}

type DialogProps = {
    type?: 'popup';
    children: React.ReactNode | React.ReactNode[];
    visible: boolean;
};
export function Dialog(props: ModalProps) {
    let { children, className } = props;

    return (
        <div className={`bit-modal-root ${className ? className : ''}`}>
            <div className="bit-modal-mask"></div>
            <div className="bit-modal-wrap">{children}</div>
        </div>
    );
}
