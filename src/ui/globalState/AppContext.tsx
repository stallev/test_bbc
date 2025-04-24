'use client';

import React, { createContext, useReducer, Dispatch } from 'react';

import { ActionType } from './Actions/action';
import { initialState, reducer, State, NotificationData, PlayerData } from './Reducer/reducer';

interface AppContextProps {
  state: State;
  dispatch: Dispatch<
    | { type: ActionType.TOGGLE_MENU }
    | { type: ActionType.UPDATE_NOTIFICATION; payload: NotificationData }
    | { type: ActionType.UPDATE_PLAYER_DATA; payload: PlayerData }
  >;
}

export const AppContext = createContext<AppContextProps>({
  state: initialState,
  dispatch: () => null,
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
