import { ActionType } from '../Actions/action';
import { NotificationData, PlayerData } from '../Reducer/reducer';

type Action =
  | { type: ActionType.TOGGLE_MENU }
  | { type: ActionType.UPDATE_NOTIFICATION; payload: NotificationData }
  | { type: ActionType.UPDATE_PLAYER_DATA; payload: PlayerData };

export const toggleMenu = (dispatch: React.Dispatch<Action>) => {
  dispatch({ type: ActionType.TOGGLE_MENU });
};
