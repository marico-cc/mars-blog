import gql from 'graphql-tag';

export const LOGIN_GQL = gql`
  query login($loginInput: LoginUserInput!) {
    login(loginInput: $loginInput) {
      token
      expireAt
      freshToken
      user {
        id
        userName
        nickName
        phone
      }
    }
  }
`;

export const REFRESH_TOKEN_GQL = gql`
  query refreshToken($token: String!) {
    refreshToken(token: $token) {
      token
      expireAt
    }
  }
`;

export const GET_USERS_GQL = gql`
  query finAllUsers($userIds: [ID!]!) {
    users(userIds: $userIds) {
      id
      userName
      email
      nickName
    }
  }
`;

export const SEARCH_USERS_GQL = gql`
  query searchUser($keyword: String!) {
    searchUsers(keyword: $keyword) {
      id
      userName
      email
      phone
      gender
      nickName
      createdAt
    }
  }
`;

export const CREATE_USER_GQL = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
    }
  }
`;

export const UPDATE_USER_GQL = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
    }
  }
`;

export const REMOVE_USER_GQL = gql`
  mutation removeUser($id: ID!) {
    removeUser(id: $id) {
      id
    }
  }
`;

export const GET_SITES_GQL = gql`
  query finAll {
    sites {
      id
      siteName
      siteDomain
      createdAt
    }
  }
`;

export const GET_SITE_INFO_GQL = gql`
  query getSite($id: ID!) {
    site(id: $id) {
      id
      siteName
      siteDomain
      createdAt
    }

    rolesOfSites(siteIds: [$id]) {
      id
      siteId
      userId
      roleCode
    }
  }
`;

export const CREATE_SITE_GQL = gql`
  mutation createSite($createSiteInput: CreateSiteInput!) {
    createSite(createSiteInput: $createSiteInput) {
      id
      siteName
      siteDomain
    }
  }
`;

export const UPDATE_SITE_GQL = gql`
  mutation updateSite($updateSiteInput: UpdateSiteInput!) {
    updateSite(updateSiteInput: $updateSiteInput) {
      id
      siteName
      siteDomain
    }
  }
`;

export const GET_SITE_MODULES_GQL = gql`
  query getNodes($siteId: ID!) {
    nodes(siteId: $siteId) {
      id
      parentId
      nodeName
      uniKey
      siteId
      type
      uploadMax
      order
      createdAt
    }
  }
`;
export const GET_NODE_ADD_DATA_GQL = gql`
  query getNodeTypes($siteId: ID!) {
    nodeTypes
    nodes(siteId: $siteId) {
      id
      parentId
      nodeName
      uniKey
      siteId
      type
      uploadMax
    }
  }
`;

export const CREATE_NODE_GQL = gql`
  mutation createNode($createNodeInput: CreateNodeInput!) {
    createNode(createNodeInput: $createNodeInput) {
      id
      parentId
      nodeName
      siteId
      type
      uploadMax
    }
  }
`;

export const UPDATE_NODE_GQL = gql`
  mutation createNode($updateNodeInput: UpdateNodeInput!) {
    updateNode(updateNodeInput: $updateNodeInput) {
      id
      parentId
      nodeName
      siteId
      type
      uploadMax
    }
  }
`;

export const REMOVE_NODE_GQL = gql`
  mutation removeNode($nodeId: ID!) {
    removeNode(id: $nodeId) {
      id
    }
  }
`;

export const CREATE_ARTICLE_GQL = gql`
  mutation createArticle($createArticleInput: CreateArticleInput!) {
    createArticle(createArticleInput: $createArticleInput) {
      id
      siteId
      nodeId
      userId
      title
      content
      thumbUrl
      images
      author
      origin
      originUrl
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_ARTICLE_GQL = gql`
  mutation updateArticle($updateArticleInput: UpdateArticleInput!) {
    updateArticle(updateArticleInput: $updateArticleInput) {
      id
      siteId
      nodeId
      userId
      title
      content
      thumbUrl
      images
      author
      origin
      originUrl
      createdAt
      updatedAt
    }
  }
`;

export const GET_ARTICLES_GQL = gql`
  query articles($siteId: ID!, $nodeId: ID!, $keyword: String, $isPrivate: String, $page: Int, $pageSize: Int, $orderBy: String, $order: String) {
    articleCount(siteId: $siteId, nodeId: $nodeId, keyword: $keyword)
    articles(siteId: $siteId, nodeId: $nodeId, keyword: $keyword, isPrivate: $isPrivate, page: $page, pageSize: $pageSize, orderBy: $orderBy, order: $order) {
      id
      siteId
      nodeId
      userId
      title
      isPrivate
      content
      thumbUrl
      images
      author
      origin
      originUrl
      viewCount
      tags
      createdAt
      updatedAt
    }
  }
`;

export const GET_ARTICLE_GQL = gql`
  query article($id: ID!) {
    article(id: $id) {
      id
      siteId
      nodeId
      userId
      title
      isPrivate
      content
      thumbUrl
      images
      author
      origin
      originUrl
      tags
      viewCount
      createdAt
      updatedAt
    }
  }
`;

export const REMOVE_ARTICLE_GQL = gql`
  mutation removeArticle($id: ID!) {
    removeArticle(id: $id) {
      id
    }
  }
`;

export const GET_CURRENT_USER_GQL = gql`
  query getCurrentUser {
    currentRole {
      id
      userName
      email
      nickName
      isSystemAdmin
      isSuperAdmin
      isAdmin
    }
  }
`;

export const GET_ROLES_OF_SITES_GQL = gql`
  query getRolesOfSites($siteIds: [ID!]!) {
    rolesOfSites(siteIds: $siteIds) {
      id
      siteId
      userId
      roleCode
    }
  }
`;

export const CHECK_SITE_ADMIN_GQL = gql`
  query getRolesOfSites($siteId: ID!) {
    isSiteAdmin(siteId: $siteId) {
      isSiteAdmin
      isSiteSuperAdmin
    }
  }
`;

export const GET_SETTING_BY_BELONG_ID_GQL = gql`
  query getSettingByBelongId($belongId: ID!) {
    setting(belongId: $belongId) {
      id
      belongId
      values
    }
  }
`;

export const GET_SETTING_VALUES_BY_BELONG_ID_GQL = gql`
  query getSettingValuesByBelongId($belongId: ID!) {
    settingValues(belongId: $belongId) {
      id
      belongId
      values
    }
  }
`;

export const SAVE_SETTINGS_GQL = gql`
  mutation createSetting($createSettingInput: CreateSettingInput!) {
    createSetting(createSettingInput: $createSettingInput) {
      id
    }
  }
`;

export const SAVE_SETTING_VALUES_GQL = gql`
  mutation createSettingValues($createSettingValuesInput: CreateSettingValuesInput!) {
    createSettingValues(createSettingValuesInput: $createSettingValuesInput) {
      id
    }
  }
`;

export const GET_SETTING_DATA_GQL = gql`
  query getSettingData($belongId: ID!) {
    setting(belongId: $belongId) {
      id
      belongId
      values
    }

    settingValues(belongId: $belongId) {
      id
      belongId
      values
    }
  }
`;

export const GET_PAGE_CONTENT_GQL = gql`
  query getPageContent($nodeId: ID!) {
    page(nodeId: $nodeId) {
      id
      siteId
      nodeId
      title
      content
      thumbUrl
      images
      updatedAt
    }
  }
`;

export const SAVE_PAGE_CONTENT_GQL = gql`
  mutation savePage($savePageInput: SavePageInput!) {
    savePage(savePageInput: $savePageInput) {
      id
      siteId
      nodeId
      title
      content
      thumbUrl
      images
      updatedAt
    }
  }
`;

export const GET_MEDIAS_GQL = gql`
  query getMedias($nodeId: ID!, $keyword: String, $page: Int, $pageSize: Int, $orderBy: String, $order: String) {
    mediaCount(nodeId: $nodeId, keyword: $keyword)
    mediaList(nodeId: $nodeId, keyword: $keyword, page: $page, pageSize: $pageSize, orderBy: $orderBy, order: $order) {
      id
      siteId
      nodeId
      title
      mediaList
      content
      thumbUrl
      viewCount
      createdAt
    }
  }
`;

export const GET_MEDIA_GQL = gql`
  query getMedia($id: ID!) {
    media(id: $id) {
      id
      siteId
      nodeId
      title
      mediaList
      content
      thumbUrl
      viewCount
      createdAt
    }
  }
`;

export const CREATE_MEDIA_GQL = gql`
  mutation createMedia($createMediaInput: CreateMediaInput!) {
    createMedia(createMediaInput: $createMediaInput) {
      id
      siteId
      nodeId
      title
      mediaList
      content
      thumbUrl
      createdAt
    }
  }
`;

export const UPDATE_MEDIA_GQL = gql`
  mutation updateMedia($updateMediaInput: UpdateMediaInput!) {
    updateMedia(updateMediaInput: $updateMediaInput) {
      id
      siteId
      nodeId
      title
      mediaList
      content
      thumbUrl
      createdAt
    }
  }
`;

export const REMOVE_MEDIA_GQL = gql`
  mutation removeMedia($id: ID!) {
    removeMedia(id: $id) {
      id
    }
  }
`;

export const GET_CUSTOMIZED_FORM_LIST_GQL = gql`
  query getCustomizedFormList($nodeId: ID!, $page: Int, $pageSize: Int) {
    customizedCount(nodeId: $nodeId)
    customizedForms(nodeId: $nodeId, page: $page, pageSize: $pageSize) {
      id
      siteId
      nodeId
      values
    }
  }
`;

export const GET_CUSTOMIZED_FORM_GQL = gql`
  query getCustomizedForm($id: ID!) {
    customizedForm(id: $id) {
      id
      nodeId
      siteId
      values
    }
  }
`;

export const CREATE_CUSTOMIZED_FORM_DATA_GQL = gql`
  mutation createCustomizedForm($createCustomizedFormInput: CreateCustomizedFormInput!) {
    createCustomizedForm(createCustomizedFormInput: $createCustomizedFormInput) {
      id
    }
  }
`;

export const UPDATE_CUSTOMIZED_FORM_DATA_GQL = gql`
  mutation updateCustomizedForm($updateCustomizedFormInput: UpdateCustomizedFormInput!) {
    updateCustomizedForm(updateCustomizedFormInput: $updateCustomizedFormInput) {
      id
    }
  }
`;

export const REMOVE_CUSTOMIZED_FORM_DATA_GQL = gql`
  mutation removeCustomizedForm($id: ID!) {
    removeCustomizedForm(id: $id) {
      id
    }
  }
`;

export const GET_OSS_SIGNATURE_GQL = gql`
  query ossInit {
    ossInit {
      expire
      policy
      signature
      accessId
      host
      callback
      dir
    }
  }
`;
