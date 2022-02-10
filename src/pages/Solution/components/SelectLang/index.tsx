import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Select, Card } from '@alifd/next';
import { getLocale, setLocale } from '@/utils/locale';

const { Option } = Select;
const LANG_CONFIG = {
  'zh-CN': {
    text: '简体中文',
    icon: '🇨🇳',
  },
  'en-US': {
    text: 'English',
    icon: '🇬🇧',
  },
};

function changeLang(key) {
  setLocale(key);
}

export default function SelectLang() {
  const selectedLang = getLocale();
  return (
    <Card free>
      <Card.Header
        extra={
          <Select
            onChange={changeLang}
            size="small"
            style={{ display: 'flex', alignItems: 'center' }}
            value={selectedLang}
          >
            {Object.keys(LANG_CONFIG).map((lang) => {
              return (
                <Option
                  key={lang}
                  value={lang}
                >
                  {LANG_CONFIG[lang].text}
                </Option>
              );
            })}
          </Select>
        }
        title={<FormattedMessage id="app.i18n.demo" />}
      />

      <Card.Divider />

      <Card.Content>
        <FormattedMessage id="app.i18n.content" />
      </Card.Content>
    </Card>
  );
}
