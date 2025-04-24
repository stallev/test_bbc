import { useContext } from 'react';

import { ActionType } from '@/ui/globalState/Actions/action';
import { AppContext } from '@/ui/globalState/AppContext';
import { PlayerData } from '@/ui/globalState/Reducer/reducer';

export const useUpdatePlayerInformation = () => {
  const { dispatch } = useContext(AppContext);

  const updatePlayerData = (data: PlayerData) => {
    dispatch({
      type: ActionType.UPDATE_PLAYER_DATA,
      payload: {
        isVisiblePlayer: data.isVisiblePlayer,
        trackName: data.trackName,
        trackSrc: data.trackSrc,
      },
    });
  };

  return updatePlayerData;
};
