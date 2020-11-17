import React, { MutableRefObject, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { LoginStatus } from '@app/redux/modules/app';
import useUpdateEffect from '@app/utils/hooks';
import { isEmpty } from '@app/utils/utils';
import { ListView, PullToRefresh } from 'antd-mobile';
import update from 'immutability-helper';
import SVG from 'react-inlinesvg';
import loadingSVG from '@app/assets/images/icons/loading.svg';

import styles from './index.less';
import { Empty } from '@app/containers/Match/components/Empty/Empty';
import { curryI18n, useLang } from '@app/components/I18n';

type RecordType = any;

interface TablePaginationConfig {
    pageSize: number;
    pageNum?: number;
    total?: number;
}

export interface RequestRepType {
    list?: RecordType[];
    total: number;
    pages?: number;
    pageNum?: number;
}

export interface UPageActRefObject {
    refresh: () => void;
    reset: () => void;
    row: (index: number, row: RecordType) => void;
}

export interface UPageProps {
    wrapClassName?: string;
    tableClassName?: string;
    request?: (pageNum: number, pageSize: number) => Promise<RequestRepType | undefined>;
    renderRow: (
        rowData: RecordType,
        sectionID: string | number,
        rowID: string | number,
        highlightRow?: boolean,
    ) => React.ReactElement<any>;
    depsReset?: any[];
    pageSize?: number;
    actRef?: MutableRefObject<UPageActRefObject | undefined>;
    loginStatus?: LoginStatus | undefined;
    emptyDescription?: React.ReactNode;
}

export default (props: UPageProps) => {
    const { request, loginStatus, renderRow, pageSize = 10 } = props;
    const i18n = curryI18n(useLang());
    const [uDataSource, setUDataSource] = useState<RecordType[]>([]);
    const [curPageNum, setCurPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [dataSource, setDataSource] = useState(
        new ListView.DataSource({
            rowHasChanged: (row1: RecordType, row2: RecordType) => row1 !== row2,
        }),
    );
    const actRef = props.actRef || useRef<UPageActRefObject>({} as any);
    const initialRef = useRef(true);


    const clear = () => {
        setUDataSource([]);
        setCurPageNum(1);
    };

    const handleRequest = (pageNum: number) => {
        if (props.hasOwnProperty('loginStatus') && loginStatus !== LoginStatus.Logined) {
            clear();
            return;
        }
        if (request) {
            setLoading(true);
            request(pageNum, pageSize)
                .then((rep: undefined | RequestRepType) => {
                    if (rep) {
                        const list: RecordType[] =
                            rep.list?.map((v, i) => ({ ...v, seq: (pageNum - 1) * pageSize + i + 1 })) || [];
                        setUDataSource(pageNum > 1 ? uDataSource.concat(list) : list);
                        setHasMore(Boolean(rep?.list && rep.list.length >= pageSize));
                    } else {
                        clear();
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const onRefresh = () => {
        // handleRequest(curPageNum + 1);
        console.log(`================onRefresh================`);
    };

    const onEndReached = () => {
        if (loading || !hasMore) {
            return;
        }
        setCurPageNum(curPageNum + 1);
        handleRequest(curPageNum + 1);
    };

    /* useEffect(() => {
        handleRequest(curPageNum);
    }, [...deps]); */

    useImperativeHandle(actRef, () => ({
        refresh: () => handleRequest(curPageNum),
        reset: () => handleRequest(1),
        row: (i: number, data?: RecordType) => {
            if (uDataSource.length > 1) {
                const md: [number, number?] | [number, number, ...RecordType[]] = !isEmpty(data)
                    ? [i, 1, data]
                    : [i, 1];
                setUDataSource(update(uDataSource, { $splice: [md] }));
            } else {
                actRef.current?.reset();
            }
        },
    }));

    useEffect(() => {
        setTimeout(() => setDataSource(dataSource.cloneWithRows(uDataSource)));
    }, [uDataSource]);

    return (
        <div className={styles.listScope}>
            <ListView
                useBodyScroll={true}
                dataSource={dataSource}
                renderRow={renderRow}
                renderFooter={() => (
                    <div className="page-list-footer">
                        {loading ? (
                            <div className="page-list-loading">{<SVG src={loadingSVG} />}</div>
                        ) : !hasMore && isEmpty(uDataSource) ? (
                            <Empty tip={i18n('common.noresult')} className="bit-list-empty" />
                        ) : null}
                    </div>
                )}
                // renderHeader={() => <span>Pull to refresh</span>}
                // pullToRefresh={<PullToRefresh direction="down" refreshing={loading} onRefresh={onRefresh} />}
                onEndReached={onEndReached}
                initialListSize={pageSize}
                pageSize={pageSize}
            ></ListView>
        </div>
    );
};
