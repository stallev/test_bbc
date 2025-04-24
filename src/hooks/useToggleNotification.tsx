import { useContext } from 'react';

import { ActionType } from '@/ui/globalState/Actions/action';
import { AppContext } from '@/ui/globalState/AppContext';
import { NotificationData } from '@/ui/globalState/Reducer/reducer';

export const useToggleNotification = () => {
  const { dispatch } = useContext(AppContext);

  const updateNotificationData = (data: NotificationData) => {
    dispatch({
      type: ActionType.UPDATE_NOTIFICATION,
      payload: {
        isVisibleNotification: data.isVisibleNotification,
        notificationText: data.notificationText,
        notificationType: data.notificationType,
      },
    });
  };

  return updateNotificationData;
};
