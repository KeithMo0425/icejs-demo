import * as React from 'react';
import { runApp, IAppConfig } from 'ice';
import LocaleProvider from '@/components/LocaleProvider';
import { getLocale } from '@/utils/locale';
import requestConfig from '@/config/request';

const locale = getLocale();


const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    addProvider: ({ children }) => <LocaleProvider locale={locale}>{children}</LocaleProvider>,
  },

  request: requestConfig,
};
runApp(appConfig);
