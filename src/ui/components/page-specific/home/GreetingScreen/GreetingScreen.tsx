import React from "react";
import { IoArrowBackSharp, IoArrowForwardSharp } from "react-icons/io5";
import Container from "@/ui/containers/Container/Container";
import { CustomImage, CustomLink, Text, Icon } from "@/ui/components/ui-kit";
import { RoutePath } from "@/constants/RoutePath";
import { LinkTypes } from "@/constants/LinkTypes";

import styles from "./styles/greeting-screen.module.scss";

export interface GreetingScreenProps {
  header_h1_title: string;
  about_church_link_label: string;
  events_link_label: string;
}

const GreetingScreen: React.FC<GreetingScreenProps> = ({
  header_h1_title,
  about_church_link_label,
  events_link_label,
}) => {
  return (
    <div className={styles["greeting-screen"]}>
      <CustomImage
        imageName="heroSectionBg"
        className={styles["greeting-screen__image"]}
        alt="Background image alt"
        ariaLabel="Background image alt"
        sizes="100vw"
        priority
      />

      <Container>
        <div className={styles["greeting-screen__content-wrap"]}>
          <div className={styles["greeting-screen__content"]}>
            <div className={styles["greeting-screen__icon"]}>
              <Icon iconName="logo" />
            </div>

            <div className={styles["greeting-screen__links"]}>
              <CustomLink
                to={RoutePath.UpcomingEvents}
                label={events_link_label}
                type={LinkTypes.primary}
                className={styles["greeting-screen__link"]}
              >
                <IoArrowBackSharp />
              </CustomLink>    
              <CustomLink
                to={RoutePath.AboutUs}
                label={about_church_link_label}
                type={LinkTypes.primary}
                className={styles["greeting-screen__link"]}
              >
                <IoArrowForwardSharp />
              </CustomLink>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default GreetingScreen;
