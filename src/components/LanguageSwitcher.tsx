import { Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    React.startTransition(() => {
      i18n.changeLanguage(lng);
    });
  };

  return (
    <div className="language-switcher">
      <Button onClick={() => changeLanguage('en')}>EN</Button>
      <Button onClick={() => changeLanguage('pl')}>PL</Button>
    </div>
  );
};

export default LanguageSwitcher;
