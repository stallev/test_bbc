"use client"

import React, { useContext, useEffect, useState } from "react";
import cx from "classnames";
import { ActionType } from "@/ui/globalState/Actions/action";
import { AppContext } from "@/ui/globalState/AppContext";
import { Text } from "..";

import styles from "./styles/notification.module.scss";

interface NotificationProps {
  translations: Record<string, string>
}

const Notification: React.FC<NotificationProps> = ({ translations }) => {
  const { state: { notificationData: { isVisibleNotification, notificationText, notificationType } }, dispatch } = useContext(AppContext);

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
      {translations[notificationText]}
  </Text>
    )
};

export default Notification;
