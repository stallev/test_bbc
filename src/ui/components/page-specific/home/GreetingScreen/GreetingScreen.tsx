import React from 'react';

import { LinkTypes } from '@/constants/LinkTypes';
import { RoutePath } from '@/constants/RoutePath';
import { CustomLink, Text, Icon } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';

import styles from './styles/greeting-screen.module.scss';

export interface GreetingScreenProps {
  about_church_link_label: string;
  events_link_label: string;
}

const GreetingScreen: React.FC<GreetingScreenProps> = ({
  about_church_link_label,
  events_link_label,
}) => {
  return (
    <div className={styles['greeting-screen']}>
      <Container>
        <div className={styles['greeting-screen__content-wrap']}>
          <div className={styles['greeting-screen__content']}>
            <div className={styles['greeting-screen__icon']}>
              <Icon iconName="logo" />
            </div>

            <div className={styles['greeting-screen__links']}>
              <CustomLink
                to={RoutePath.UpcomingEvents}
                type={LinkTypes.primary}
                className={styles['greeting-screen__link']}
              >
                <Icon iconName="leftArrow" />
                <Text textType="span">{events_link_label}</Text>
              </CustomLink>

              <CustomLink
                to={RoutePath.AboutUs}
                type={LinkTypes.primary}
                className={styles['greeting-screen__link']}
              >
                <Text textType="span">{about_church_link_label}</Text>
                <Icon iconName="rightArrow" />
              </CustomLink>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default GreetingScreen;
