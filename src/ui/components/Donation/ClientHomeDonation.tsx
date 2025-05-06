'use client';

import dynamic from 'next/dynamic';
import { DonationProps } from '@/ui/components/Donation/Donation';

const Container = dynamic(() => import('@/ui/containers/Container/Container'), { ssr: false });
const Donation = dynamic(() => import('@/ui/components/Donation/Donation'), { ssr: false });

const ClientHomeDonation = ({ translations, isDonationPage }: DonationProps) => {
  return (
    <Container>
      <Donation isDonationPage={isDonationPage} translations={translations} />
    </Container>
  );
};

export default ClientHomeDonation;
