import {ConfigProvider} from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import moment from 'moment';

import ReactDOM from 'react-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {Provider as ReduxProvider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import App from './App';
import {_SYSTEM_NAME} from './globals';
import {logGreeting} from './libs/log';
import validateMessages from './libs/validateMessages';
import createStore from './store/store';

import 'antd/dist/antd.css';

moment.locale('ru');

const formConfig = {
    validateMessages,
};

const queryClient = new QueryClient();

const store = createStore();

logGreeting(`👋🏻 Welcome to ${_SYSTEM_NAME}`);

ReactDOM.render(
    <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
            <ConfigProvider locale={ruRU} form={formConfig}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ConfigProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </ReduxProvider>,
    document.getElementById('app'),
);
