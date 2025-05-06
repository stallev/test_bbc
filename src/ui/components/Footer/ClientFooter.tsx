'use client';

import dynamic from 'next/dynamic';
import { ClientSectionProps } from '@/types/globalTypes';

const Footer = dynamic(() => import('@/ui/components/Footer/Footer'), { ssr: false });

const ClientFooter = ({ locale, translations }: ClientSectionProps) => {
  return <Footer translations={translations} locale={locale} />;
};

export default ClientFooter;
