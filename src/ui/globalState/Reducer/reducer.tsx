import { ActionType } from "./../Actions/action";

export interface State {
  isMenuOpen: boolean;
}

type Action = { type: ActionType };

export const initialState: State = {
  isMenuOpen: false,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.TOGGLE_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    default:
      return state;
  }
};
