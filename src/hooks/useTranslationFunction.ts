import { useTranslation } from 'next-i18next';

const useTranslationFunction = () => {
  const { t } = useTranslation();
  return t;
};

export default useTranslationFunction;
