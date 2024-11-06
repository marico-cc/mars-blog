import { service } from '@/services/service';
import { handleNodeArray } from '@/utils/utils';
import { setAllNodeIds, setUserMenuMap, setUserMenuTree } from '@/redux/modules/menu/action';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

export const useNodes = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const setNodes = async () => {
    if (!params.siteId) return [];
    const data = await service.getSiteModules(params.siteId || '');
    const { nodeMap, nodeTree, nodeIds } = handleNodeArray(data.nodes, { labelIndex: 'nodeName', valueIndex: 'id', parentIndex: 'parentId' });
    dispatch(setUserMenuTree(nodeTree || []));
    dispatch(setUserMenuMap(nodeMap));
    dispatch(setAllNodeIds(nodeIds));
  };

  return { setNodes };
};
