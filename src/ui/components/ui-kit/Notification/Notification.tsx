import React, { useContext, useEffect, useState } from "react";
import cx from "classnames";
import { ActionType } from "@/ui/globalState/Actions/action";
import { AppContext } from "@/ui/globalState/AppContext";
import useTranslationFunction from "@/hooks/useTranslationFunction";
import { Text } from "..";

import styles from "./styles/notification.module.scss";

const Notification: React.FC = () => {
  const { state: { notificationData: { isVisibleNotification, notificationText, notificationType } }, dispatch } = useContext(AppContext);
  const translate = useTranslationFunction();

  const [showNotification, setShowNotification] = useState(isVisibleNotification);

  useEffect(() => {
    setShowNotification(isVisibleNotification);
    
    if (isVisibleNotification) {
      const timer = setTimeout(() => {
        dispatch({
          type: ActionType.UPDATE_NOTIFICATION,
          payload: {
            isVisibleNotification: false,
            notificationText: "",
            notificationType: "",
          },
        });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisibleNotification, dispatch]);

  if (!showNotification) {
    return null;
  }

  return (
  <Text
    className={cx(
      styles.notification,
      styles[`notification--${notificationType}`]
    )}
    textType="span"
  >
      {translate(notificationText)}
  </Text>
    )
};

export default Notification;
