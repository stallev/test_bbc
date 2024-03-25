import { ActionType } from "./../Actions/action";

export interface PlayerData {
  isVisiblePlayer: boolean
  trackName: string
  trackSrc: string
}
export interface State {
  isMenuOpen: boolean
  notificationData: {
    isVisibleNotification: boolean
    notificationText: string,
    notificationType: string,
  }
  playerData: PlayerData
}

export interface NotificationData {
  isVisibleNotification?: boolean
  notificationText?: string
  notificationType?: string
}

type Action =
  | { type: ActionType.TOGGLE_MENU }
  | { type: ActionType.UPDATE_NOTIFICATION; payload: NotificationData }
  | { type: ActionType.UPDATE_PLAYER_DATA; payload: PlayerData };

export const initialState: State = {
  isMenuOpen: false,
  notificationData: {
    isVisibleNotification: false,
    notificationText: '',
    notificationType: '',
  },
  
  playerData: {
    isVisiblePlayer: false,
    trackName: '',
    trackSrc: '',
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

      case ActionType.UPDATE_PLAYER_DATA:
        return {
          ...state,
          playerData: {
            ...state.playerData,
            ...action.payload,
          },
        };

    default:
      return state;
  }
};
