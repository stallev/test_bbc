"use client";

import React from 'react';
import { CustomLink, Icon, Text } from '@/ui/components/ui-kit';
import { RoutePath } from '@/constants';
import Container from '@/ui/containers/Container/Container';
import { getTranslations } from '@/utils/languageParser';
import YouTubePlayer from '@/ui/components/YouTubePlayer/YouTubePlayer';
import { FetchedVideoItemsList } from '@/types/YouTubeDataTypes';
import { Locale } from '@/i18n.config';

import styles from './styles/live-streams.module.scss';

interface LiveStreamsProps {
  data: FetchedVideoItemsList
  locale: Locale
}

const LiveStreams = ({ data, locale }: LiveStreamsProps) => {
  const translations = getTranslations(locale);
  const videoItemsList = data.finishedVideos.slice(0, 3);

  return (
    <section className={styles.livestreams}>
      <Container>
        <Text
          textType='h2'
          className={styles.livestreams__title}
        >
          {translations.streams_section_title}
        </Text>

        <div className={styles.livestreams__list}>
          {videoItemsList.map((item) => (
            <YouTubePlayer
              key={item.id}
              data={item}
              locale={locale}
            />
          ))}
          <CustomLink
            to={RoutePath.LiveStreams}
            className={styles["livestreams__page-link"]}
          >
            <div className={styles["livestreams__page-link-inner-wrap"]}>
              <div className={styles["livestreams__page-link-content"]}>
                <div className={styles["livestreams__page-link-content-top"]}>
                  <Icon iconName='rightArrow' />
                  
                  <Text
                    textType='span'
                    className={styles["livestreams__page-link-text"]}
                  >
                    {translations.all}
                  </Text>
                </div>

                <Text
                  textType='span'
                  className={styles["livestreams__page-link-text"]}
                >
                  {translations.broadcasts}
                </Text>
              </div>
            </div>
          </CustomLink>
        </div>
      </Container>
    </section>
  )
}

export default LiveStreams
