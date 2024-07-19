import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import './App.scss';

import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { buildProvidersTree } from './shared/utils';
import { theme } from './styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

import 'dayjs/locale/vi.js';

const queryClient = new QueryClient();

const ProvidersTree = buildProvidersTree([
  [MantineProvider, { theme }],
  [Suspense, { fallback: <></> }],
  [QueryClientProvider, { client: queryClient }],
  [ModalsProvider, {}],
  [DatesProvider, { settings: { weekendDays: [0] }, locale: 'vi' }]
]);

root.render(
  <ProvidersTree>
    <App />
    <Notifications id="noti-id" position="top-right" zIndex={1000111} />
    <ReactQueryDevtools initialIsOpen={false} position="left" buttonPosition="bottom-left" />
  </ProvidersTree>
);
