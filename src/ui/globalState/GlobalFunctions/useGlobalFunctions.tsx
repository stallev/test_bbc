import { ActionType } from '../Actions/action';

export const toggleMenu = (dispatch: any) => {
  dispatch({ type: ActionType.TOGGLE_MENU });
};
