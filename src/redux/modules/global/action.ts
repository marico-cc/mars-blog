import * as types from '@/redux/mutation-types';
import { UserInfo } from '@/redux/interface';

export const setIsLoading = (isLoading: boolean) => ({
  type: types.SET_IS_LOADING,
  isLoading
});

export const setUser = (user: UserInfo) => ({
  type: types.SET_USER,
  user
});

export const setSiteAdmin = ({ isSiteAdmin, isSiteSuperAdmin }) => ({
  type: types.SET_SITE_ADMIN,
  isSiteAdmin,
  isSiteSuperAdmin
});

export const setOssSignature = (ossSignature) => ({
  type: types.SET_OSS_SIGNATURE,
  ossSignature
});
