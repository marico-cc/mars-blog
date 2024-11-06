import {
  CHECK_SITE_ADMIN_GQL,
  CREATE_ARTICLE_GQL,
  CREATE_CUSTOMIZED_FORM_DATA_GQL,
  CREATE_MEDIA_GQL,
  CREATE_NODE_GQL,
  CREATE_SITE_GQL,
  CREATE_USER_GQL,
  GET_ARTICLES_GQL,
  GET_ARTICLE_GQL,
  GET_CURRENT_USER_GQL,
  GET_CUSTOMIZED_FORM_GQL,
  GET_CUSTOMIZED_FORM_LIST_GQL,
  GET_MEDIAS_GQL,
  GET_MEDIA_GQL,
  GET_NODE_ADD_DATA_GQL,
  GET_OSS_SIGNATURE_GQL,
  GET_PAGE_CONTENT_GQL,
  GET_ROLES_OF_SITES_GQL,
  GET_SETTING_BY_BELONG_ID_GQL,
  GET_SETTING_DATA_GQL,
  GET_SETTING_VALUES_BY_BELONG_ID_GQL,
  GET_SITES_GQL,
  GET_SITE_INFO_GQL,
  GET_SITE_MODULES_GQL,
  GET_USERS_GQL,
  LOGIN_GQL,
  REFRESH_TOKEN_GQL,
  REMOVE_ARTICLE_GQL,
  REMOVE_CUSTOMIZED_FORM_DATA_GQL,
  REMOVE_MEDIA_GQL,
  REMOVE_NODE_GQL,
  REMOVE_USER_GQL,
  SAVE_PAGE_CONTENT_GQL,
  SAVE_SETTINGS_GQL,
  SAVE_SETTING_VALUES_GQL,
  SEARCH_USERS_GQL,
  UPDATE_ARTICLE_GQL,
  UPDATE_CUSTOMIZED_FORM_DATA_GQL,
  UPDATE_MEDIA_GQL,
  UPDATE_NODE_GQL,
  UPDATE_SITE_GQL,
  UPDATE_USER_GQL
} from '@/services/gql/global';
import { useApollo } from './apollo';
import { getExpireTime, getRefreshToken, setAuthToken, setExpireTime } from '@/utils/utils';

const handleError = (error) => {
  console.log(error);
  try {
    const errorDetail = JSON.parse(error.message);
    console.log(`errorDetail`, errorDetail);
    if (errorDetail.code === 'UNAUTHENTICATED') {
      window.location.hash = '#';
    }
  } catch (e) {
    // console.log(e);
  }
};

const checkToken = async () => {
  const expiration = getExpireTime();
  if (!expiration) return;
  const _freshToken = getRefreshToken();
  if (!_freshToken) return;
  const expireTime = new Date(expiration).getTime();
  const now = Date.now();

  if (now >= expireTime - 1000 * 60) {
    const data = await service.refreshToken(_freshToken);
    setAuthToken(data.token);
    setExpireTime(data.expireAt);
  }
};

export namespace service {
  const client = useApollo();

  export const login = async (value: { userName: string; password: string }) => {
    const { data } = await client.query({
      fetchPolicy: 'no-cache',
      query: LOGIN_GQL,
      variables: { loginInput: value }
    });
    return data.login;
  };

  export const refreshToken = async (refreshToken: string) => {
    try {
      const { data } = await client.query({
        fetchPolicy: 'no-cache',
        query: REFRESH_TOKEN_GQL,
        variables: { token: refreshToken }
      });
      return data.refreshToken;
    } catch (e) {
      handleError(e);
    }
  };

  export const getSites = async () => {
    try {
      await checkToken();
      const res = await client.query({
        fetchPolicy: 'no-cache',
        query: GET_SITES_GQL
      });
      return res.data;
    } catch (e) {
      handleError(e);
    }
  };

  export const getSiteInfoById = async (id: string) => {
    try {
      await checkToken();
      const { data } = await client.query({
        fetchPolicy: 'no-cache',
        query: GET_SITE_INFO_GQL,
        variables: { id }
      });

      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const getUsers = async (userIds: Array<string>) => {
    try {
      await checkToken();
      const { data } = await client.query({
        fetchPolicy: 'no-cache',
        query: GET_USERS_GQL,
        variables: { userIds }
      });

      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const searchUsers = async (keyword: string) => {
    try {
      await checkToken();
      const { data } = await client.query({
        fetchPolicy: 'no-cache',
        query: SEARCH_USERS_GQL,
        variables: { keyword }
      });

      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const createUser = async (user: any) => {
    try {
      await checkToken();
      const { data } = await client.mutate({
        fetchPolicy: 'no-cache',
        mutation: CREATE_USER_GQL,
        variables: { createUserInput: user }
      });
      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const updateUser = async (user: any) => {
    try {
      await checkToken();
      const { data } = await client.mutate({
        fetchPolicy: 'no-cache',
        mutation: UPDATE_USER_GQL,
        variables: { updateUserInput: user }
      });
      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const removeUser = async (id: string) => {
    try {
      await checkToken();
      const { data } = await client.mutate({
        fetchPolicy: 'no-cache',
        mutation: REMOVE_USER_GQL,
        variables: { id }
      });
      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const createSite = async (site: any) => {
    try {
      await checkToken();
      const { data } = await client.mutate({
        fetchPolicy: 'no-cache',
        mutation: CREATE_SITE_GQL,
        variables: { createSiteInput: site }
      });

      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const updateSite = async (site: any) => {
    try {
      await checkToken();
      const { data } = await client.mutate({
        fetchPolicy: 'no-cache',
        mutation: UPDATE_SITE_GQL,
        variables: { updateSiteInput: site }
      });

      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const getSiteModules = async (siteId: string) => {
    try {
      await checkToken();
      const { data } = await client.query({
        fetchPolicy: 'no-cache',
        query: GET_SITE_MODULES_GQL,
        variables: { siteId }
      });
      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const getAddNodeData = async (siteId: string) => {
    try {
      await checkToken();
      const { data } = await client.query({
        fetchPolicy: 'no-cache',
        query: GET_NODE_ADD_DATA_GQL,
        variables: { siteId }
      });

      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const createNode = async (createNodeInput) => {
    try {
      await checkToken();
      const { data } = await client.mutate({
        mutation: CREATE_NODE_GQL,
        variables: { createNodeInput }
      });

      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const updateNode = async (updateNodeInput) => {
    try {
      await checkToken();
      const { data } = await client.mutate({
        mutation: UPDATE_NODE_GQL,
        variables: { updateNodeInput }
      });

      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const removeNode = async (nodeId: string) => {
    try {
      await checkToken();
      const { data } = await client.mutate({
        mutation: REMOVE_NODE_GQL,
        variables: { nodeId }
      });
    } catch (e) {
      handleError(e);
    }
  };

  export const createArticle = async (createArticleInput) => {
    try {
      await checkToken();
      const { data } = await client.mutate({
        mutation: CREATE_ARTICLE_GQL,
        variables: { createArticleInput }
      });

      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const updateArticle = async (updateArticleInput) => {
    try {
      await checkToken();
      const { data } = await client.mutate({
        mutation: UPDATE_ARTICLE_GQL,
        variables: { updateArticleInput }
      });

      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const getArticles = async (siteId: string, nodeId: string, isPrivate: string, page?: number, pageSize?: number) => {
    try {
      await checkToken();
      const { data } = await client.query({
        query: GET_ARTICLES_GQL,
        variables: { siteId, nodeId, isPrivate, page, pageSize }
      });

      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const getArticle = async (articleId: string) => {
    try {
      await checkToken();
      const { data } = await client.query({
        query: GET_ARTICLE_GQL,
        variables: { id: articleId }
      });

      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const removeArticle = async (articleId: string) => {
    try {
      await checkToken();
      await client.mutate({
        mutation: REMOVE_ARTICLE_GQL,
        variables: { id: articleId }
      });
    } catch (e) {
      handleError(e);
    }
  };

  export const getCurrentUser = async () => {
    try {
      await checkToken();
      const { data } = await client.query({
        query: GET_CURRENT_USER_GQL
      });

      return data.currentRole;
    } catch (e) {
      handleError(e);
    }
  };

  export const getRolesOfSites = async (siteIds: Array<string>) => {
    try {
      await checkToken();
      const { data } = await client.query({
        query: GET_ROLES_OF_SITES_GQL,
        variables: { siteIds }
      });

      return data.rolesOfSites;
    } catch (e) {
      handleError(e);
    }
  };

  export const checkSiteAdmin = async (siteId: string) => {
    try {
      await checkToken();
      const { data } = await client.query({
        query: CHECK_SITE_ADMIN_GQL,
        variables: { siteId }
      });
      return data.isSiteAdmin;
    } catch (e) {
      handleError(e);
    }
  };

  export const getSettingByBelongId = async (belongId: string) => {
    try {
      await checkToken();
      const { data } = await client.query({
        query: GET_SETTING_BY_BELONG_ID_GQL,
        variables: { belongId }
      });

      return data.setting;
    } catch (e) {
      handleError(e);
    }
  };

  export const getSettingValuesByBelongId = async (belongId: string) => {
    try {
      await checkToken();
      const { data } = await client.query({
        query: GET_SETTING_VALUES_BY_BELONG_ID_GQL,
        variables: { belongId }
      });

      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const saveSettings = async (belongId: string, settings: any) => {
    try {
      await checkToken();
      const { data } = await client.mutate({
        mutation: SAVE_SETTINGS_GQL,
        variables: {
          createSettingInput: {
            belongId,
            values: settings
          }
        }
      });

      return data.createSetting;
    } catch (e) {
      handleError(e);
    }
  };

  export const saveSettingValues = async (settingId: string, belongId: string, values: any) => {
    try {
      await checkToken();
      const { data } = await client.mutate({
        mutation: SAVE_SETTING_VALUES_GQL,
        variables: {
          createSettingValuesInput: {
            settingId,
            belongId,
            values
          }
        }
      });

      return data.createSetting;
    } catch (e) {
      handleError(e);
    }
  };

  export const getSettingDataByBelongId = async (belongId: string) => {
    try {
      await checkToken();
      const { data } = await client.query({
        fetchPolicy: 'no-cache',
        query: GET_SETTING_DATA_GQL,
        variables: { belongId }
      });

      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const getPageContent = async (nodeId: string) => {
    try {
      await checkToken();
      const { data } = await client.query({
        query: GET_PAGE_CONTENT_GQL,
        variables: { nodeId }
      });

      return data.page;
    } catch (e) {
      handleError(e);
    }
  };

  export const savePageContent = async (page: any) => {
    try {
      await checkToken();
      const { data } = await client.mutate({
        mutation: SAVE_PAGE_CONTENT_GQL,
        variables: { savePageInput: page }
      });

      return data.page;
    } catch (e) {
      handleError(e);
    }
  };

  export const getMedias = async (nodeId: string, page?: number, pageSize?: number) => {
    try {
      await checkToken();
      const { data } = await client.query({
        query: GET_MEDIAS_GQL,
        variables: { nodeId, page, pageSize }
      });
      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const getMedia = async (mediaId: string) => {
    try {
      await checkToken();
      const { data } = await client.query({
        query: GET_MEDIA_GQL,
        variables: { id: mediaId }
      });
      return data.media;
    } catch (e) {
      handleError(e);
    }
  };

  export const createMedia = async (media: any) => {
    try {
      await checkToken();
      const { data } = await client.mutate({
        mutation: CREATE_MEDIA_GQL,
        variables: { createMediaInput: media }
      });
      return data.createMedia;
    } catch (e) {
      handleError(e);
    }
  };

  export const updateMedia = async (media: any) => {
    try {
      await checkToken();
      const { data } = await client.mutate({
        mutation: UPDATE_MEDIA_GQL,
        variables: { updateMediaInput: media }
      });
      return data.updateMedia;
    } catch (e) {
      handleError(e);
    }
  };

  export const removeMedia = async (mediaId: string) => {
    try {
      await checkToken();
      const { data } = await client.mutate({
        mutation: REMOVE_MEDIA_GQL,
        variables: { id: mediaId }
      });
      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const getCustomizedTableData = async (nodeId: string, page?: number, pageSize?: number) => {
    try {
      await checkToken();
      const { data } = await client.query({
        query: GET_CUSTOMIZED_FORM_LIST_GQL,
        variables: { nodeId, page, pageSize }
      });
      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const getCustomizedTableItem = async (formId: string) => {
    try {
      await checkToken();
      const { data } = await client.query({
        query: GET_CUSTOMIZED_FORM_GQL,
        variables: { id: formId }
      });
      return data.customizedForm;
    } catch (e) {
      handleError(e);
    }
  };

  export const createCustomizedTableItem = async (form: any) => {
    try {
      await checkToken();
      const { data } = await client.mutate({
        mutation: CREATE_CUSTOMIZED_FORM_DATA_GQL,
        variables: { createCustomizedFormInput: form }
      });
      return data.createCustomizedForm;
    } catch (e) {
      handleError(e);
    }
  };

  export const updateCustomizedTableItem = async (form: any) => {
    try {
      await checkToken();
      const { data } = await client.mutate({
        mutation: UPDATE_CUSTOMIZED_FORM_DATA_GQL,
        variables: { updateCustomizedFormInput: form }
      });
      return data.updateCustomizedForm;
    } catch (e) {
      handleError(e);
    }
  };

  export const removeCustomizedTableItem = async (formId: string) => {
    try {
      await checkToken();
      const { data } = await client.mutate({
        mutation: REMOVE_CUSTOMIZED_FORM_DATA_GQL,
        variables: { id: formId }
      });
      return data;
    } catch (e) {
      handleError(e);
    }
  };

  export const getOssSignature = async () => {
    try {
      await checkToken();
      const { data } = await client.query({
        query: GET_OSS_SIGNATURE_GQL
      });
      return data.ossInit;
    } catch (e) {
      handleError(e);
    }
  };
}
