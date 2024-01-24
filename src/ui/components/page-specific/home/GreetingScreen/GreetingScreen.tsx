import React from "react";
import Container from "@/ui/containers/Container/Container";
import { CustomImage, CustomLink, Text } from "@/ui/components/ui-kit";
import { RoutePath } from "@/constants/RoutePath";
import { LinkTypes } from "@/constants/LinkTypes";

import styles from "./styles/greeting-screen.module.scss";

export interface GreetingScreenProps {
  header_h1_title: string;
  header_descr: string;
  header_button_label: string;
}

const GreetingScreen: React.FC<GreetingScreenProps> = ({
  header_h1_title,
  header_descr,
  header_button_label,
}) => {
  return (
    <div className={styles["greeting-screen"]}>
      <CustomImage
        imageName="greetingSreenImage"
        className={styles["greeting-screen__image"]}
        alt="Background image alt"
        ariaLabel="Background image alt"
        sizes="100vw"
        priority
      />

      <Container>
        <div className={styles["greeting-screen__content-wrap"]}>
          <div className={styles["greeting-screen__content"]}>
            <div className={styles["greeting-screen__text-content"]}>
              <Text
                textType="p"
                className={styles["greeting-screen__description"]}
              >
                {header_descr}
              </Text>

              <Text
                textType="h1"
                className={styles["greeting-screen__page-title"]}
              >
                {header_h1_title}
              </Text>
            </div>

            <CustomLink
              to={RoutePath.GospelPage}
              label={header_button_label}
              type={LinkTypes.primary}
              className={styles["greeting-screen__link-more"]}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default GreetingScreen;
