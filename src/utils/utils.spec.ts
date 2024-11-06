import { describe, it } from 'vitest';
import { handleNodeArray } from './utils';

describe(`passArray2Tree`, () => {
  const data = [
    { id: `1`, value: '1111' },
    { id: `2`, value: '2222' },
    { id: `3`, value: '3333' },
    { id: `1-1`, value: '1-1', parentId: '1' },
    { id: `2-1`, value: '2-1', parentId: '2' },
    { id: `3-1`, value: '3-1', parentId: '3' },
    { id: `3-1-1`, value: '3-1-1', parentId: '3-1' },
    { id: `2-1-1`, value: '2-1-1', parentId: '2-1' }
  ];

  it('should be an array', () => {
    const res = handleNodeArray(data, { labelIndex: 'value', valueIndex: 'id', parentIndex: 'parentId' });
    console.log(res);
  });
});
