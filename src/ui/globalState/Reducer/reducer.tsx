import { ActionType } from "./../Actions/action";

export interface State {
  isMenuOpen: boolean
  notificationData: {
    isVisibleNotification: boolean
    notificationText: string,
    notificationType: string,
  }
}

export interface NotificationData {
  isVisibleNotification?: boolean
  notificationText?: string
  notificationType?: string
}

type Action =
  | { type: ActionType.TOGGLE_MENU }
  | { type: ActionType.UPDATE_NOTIFICATION; payload: NotificationData };

export const initialState: State = {
  isMenuOpen: false,
  notificationData: {
    isVisibleNotification: false,
    notificationText: '',
    notificationType: '',
  },
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.TOGGLE_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };

      case ActionType.UPDATE_NOTIFICATION:
        return {
          ...state,
          notificationData: {
            ...state.notificationData,
            ...action.payload,
          },
        };

    default:
      return state;
  }
};
