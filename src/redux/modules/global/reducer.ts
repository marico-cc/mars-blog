import { AnyAction } from 'redux';
import { GlobalState, UserInfo } from '@/redux/interface';
import produce from 'immer';
import * as types from '@/redux/mutation-types';

export const globalState: GlobalState = {
  token: '',
  user: {} as UserInfo,
  email: '',
  language: '',
  isLoading: 0,
  isSiteAdmin: false,
  isSiteSuperAdmin: false,
  ossSignature: {}
};

// global reducer
const global = (state: GlobalState = globalState, action: AnyAction) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case types.SET_IS_LOADING:
        draftState.isLoading = action.isLoading ? draftState.isLoading + 1 : draftState.isLoading - 1;
        break;

      case types.SET_USER:
        draftState.user = action.user;
        break;

      case types.SET_SITE_ADMIN:
        draftState.isSiteAdmin = action.isSiteAdmin ?? false;
        draftState.isSiteSuperAdmin = action.isSiteSuperAdmin ?? false;
        break;

      case types.SET_OSS_SIGNATURE:
        draftState.ossSignature = action.ossSignature ?? {};
        break;

      default:
        return draftState;
    }
  });

export default global;
