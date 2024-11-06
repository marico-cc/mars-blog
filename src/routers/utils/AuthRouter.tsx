import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { searchRoute } from '@/utils/utils';
import { rootRouter } from '@/routers';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowUserMenu } from '@/redux/modules/menu/action';
import { service } from '@/services/service';
import { setOssSignature, setSiteAdmin, setUser } from '@/redux/modules/global/action';
import { useNodes } from '@/hooks/nodes.hook';
declare const window: any;

const AuthRouter = (props: { children: JSX.Element }) => {
  const location = useLocation();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const route = searchRoute(rootRouter);
  const params = useParams();
  const user = useSelector((state: any) => state.global.user);
  const ossSignature = useSelector((state: any) => state.global.ossSignature);
  const { setNodes } = useNodes();

  useEffect(() => {
    if (route.path && !['/', '/auth'].includes(route.path)) {
      getUserInfo().then();
    }

    setNodes().then();
    checkOssSignature().then();

    if (route?.meta?.manageSite) {
      dispatch(setShowUserMenu(true));
    } else {
      dispatch(setShowUserMenu(false));
    }
  }, [location.pathname]);

  useEffect(() => {
    if (params?.siteId) {
      checkIsSiteAdmin().then();
    }
  }, [params?.siteId]);

  const getUserInfo = async () => {
    if (!user?.id) {
      const user = await service.getCurrentUser();
      dispatch(setUser(user));
    }
  };

  const checkIsSiteAdmin = async () => {
    if (!params.siteId) return;
    dispatch(setSiteAdmin({ isSiteAdmin: false, isSiteSuperAdmin: false }));
    try {
      const { isSiteAdmin, isSiteSuperAdmin } = await service.checkSiteAdmin(params.siteId);
      dispatch(setSiteAdmin({ isSiteAdmin, isSiteSuperAdmin }));
    } catch (e) {
      console.log(e);
    }
  };

  const checkOssSignature = async () => {
    const { expire } = ossSignature;
    const expireTimeStamp = new Date(expire || new Date()).getTime();
    if (expireTimeStamp > Date.now() + 5 * 1000 * 60) return;
    const data = await service.getOssSignature();
    dispatch(setOssSignature(data));
  };

  return props.children;
};

export default AuthRouter;
