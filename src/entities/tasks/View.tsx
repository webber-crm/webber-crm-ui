import {Alert, Descriptions, Space} from 'antd';
import {FC, memo, useContext} from 'react';

import {SpaceFull} from '../../components/containers';

import DateView from '../../components/view/DateView';
import useHasAccess from '../../hooks/useHasAccess';

import {DASH, RUB} from '../../libs/text';
import {TASK_EDIT} from '../../permissions';

import ArchiveButton from './ArchiveButton';
import {Context} from './Context';
import DeleteButton from './DeleteButton';
import FormTask from './FormTask';
import Status from './Status';

const View: FC = memo(() => {
    const {item} = useContext(Context);
    const {title, description, is_active, is_archive, status, deadline, estimate, actually, price, customer} = item;
    const canEdit = useHasAccess(TASK_EDIT);

    return (
        <SpaceFull direction="vertical" size="middle">
            {!is_active && <Alert message="Задача в архиве" type="info" />}

            <Descriptions layout="vertical" column={1} colon={false} size="small">
                <Descriptions.Item label="Название">{title}</Descriptions.Item>

                <Descriptions.Item label="Описание">{description ?? DASH}</Descriptions.Item>

                <Descriptions.Item label="Клиент">{customer ? customer.name : DASH}</Descriptions.Item>

                <Descriptions.Item label="Статус">
                    <Status item={status} />
                </Descriptions.Item>

                <Descriptions.Item label="Срок выполнения">
                    {deadline ? <DateView date={deadline} /> : DASH}
                </Descriptions.Item>

                <Descriptions.Item label="Оценка (ч)">{estimate ?? DASH}</Descriptions.Item>

                <Descriptions.Item label="Учёт времени (ч)">{actually ?? DASH}</Descriptions.Item>

                <Descriptions.Item label="Стоимость задачи">{price ? `${price} ${RUB}` : DASH}</Descriptions.Item>

                {canEdit && (
                    <Descriptions.Item>
                        <Space direction="vertical">
                            {is_active && !is_archive && <FormTask />}

                            <Space>
                                <DeleteButton />
                                <ArchiveButton />
                            </Space>
                        </Space>
                    </Descriptions.Item>
                )}
            </Descriptions>
        </SpaceFull>
    );
});

export default View;
