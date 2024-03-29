import styled from '@emotion/styled';
import {Spin} from 'antd';
import {FC, memo} from 'react';

import {useQuery} from 'react-query';

import PageWrapper from '../../components/view/Page';
import $api from '../../http';
import API from '../../libs/API';

import {PageProps} from '../../router/types';

import {UserDTO} from '../../store/account/types';

import {Context} from './Context';
import View from './View';

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const Page: FC<PageProps> = memo((): JSX.Element | null => {
    const {data: profile} = useQuery<unknown, unknown, UserDTO>([API.profile()], () =>
        $api.get(API.profile()).then(response => response.data),
    );

    if (!profile) return <Spin />;

    return (
        <Context.Provider value={{item: profile}}>
            <Container>
                <PageWrapper>
                    <View />
                </PageWrapper>
            </Container>
        </Context.Provider>
    );
});

export default Page;
