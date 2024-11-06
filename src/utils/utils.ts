import { RouteObject } from '@/routers/interFace';
import { useLocation, useParams } from 'react-router-dom';
import type { RcFile } from 'antd/es/upload';

export const searchRoute = (routes: RouteObject[] = [], path = usePath()): RouteObject => {
  // console.log({ path });
  let result: RouteObject = {};
  for (const item of routes) {
    if (item.path === path) return item;
    if (item.children) {
      const res = searchRoute(item.children);
      if (Object.keys(res).length) result = res;
    }
  }
  return result;
};

export const usePath: any = () => {
  const { pathname } = useLocation();
  const params = useParams();
  return Object.entries(params).reduce((path: any, [key, value]) => {
    return path.replace(`/${value}`, `/:${key}`);
  }, pathname);
};

/**
 * @description 对象数组深克隆
 * @param {Object} obj 源对象
 * @return object
 */
export const deepCopy = <T>(obj: any): T => {
  let newObj: any;
  try {
    newObj = obj.push ? [] : {};
  } catch (error) {
    newObj = {};
  }
  for (const attr in obj) {
    if (typeof obj[attr] === 'object') {
      newObj[attr] = deepCopy(obj[attr]);
    } else {
      newObj[attr] = obj[attr];
    }
  }
  return newObj;
};

//email
export const validateEmail = (text: string) => {
  if (text == '') return true;
  const emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  if (text && emailReg.test(text)) {
    return true;
  }
  return false;
};
//phone
export const validatePhone = (text: string, type: string) => {
  console.log('validatePhone' + text);
  if (text == '') return true;
  // const regPhone = /^[0-9]{5,17}$/; //带区号校验
  // (+65)SG验证-^[89]\d{7}$
  // (+60)MY验证-^（1）[0-46-9]-*[0-9]{7,8}$
  // (+63)PH验证-（[0]\d{3}\d{3}\d{4}）
  let regPhone = /^[89]\d{7}$/;
  if (type == 'SG' || type == '+65') {
    regPhone = /^[89]\d{7}$/;
  }
  if (type == 'MY' || type == '+60') {
    regPhone = /^(1)[0-46-9]-*[0-9]{7,8}$/;
  }
  if (type == 'PH' || type == '+63') {
    regPhone = /^\d{10}$/;
  }

  if (text && regPhone.test(text)) {
    return true;
  }

  return false;
};
export const validatePassword = (text: string) => {
  if (text == '') return true;
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&[\]<>()'"_\-.,;:/}{|~+=#^`])[A-Za-z\d@$!%*?&[\]<>()'"_\-.,:;/|}{~+=#^`]{8,128}$/;
  if (text && reg.test(text)) {
    return true;
  }
  return false;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const debounce = (fn: Function, delay = 500) => {
  let timer;
  return function (this: unknown) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // eslint-disable-next-line prefer-rest-params
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
};

export const throttle = (fn: any, delay = 500) => {
  let valid = true;
  return function (this: unknown) {
    if (valid) {
      //如果阀门已经打开，就继续往下
      setTimeout(() => {
        // eslint-disable-next-line prefer-rest-params
        fn.apply(this, arguments); //定时器结束后执行
        valid = true; //执行完成后打开阀门
      }, delay);
      valid = false; //关闭阀门
    }
  };
};

export const validateUserName = (text: string) => {
  if (text == '' || text == undefined) return true;
  //email
  const name = /^[a-zA-Z., \.]{0,64}$/;
  if (text && name.test(text)) {
    return true;
  }

  return false;
};

export const deepClone = (obj: any) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  const cloneObj = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj?.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key]);
    }
  }
  return cloneObj;
};

export const handleNodeArray = (array: Array<any> = [], config: { labelIndex?: string; valueIndex?: string; parentIndex?: string; disable?: (item) => boolean }) => {
  const _array = deepClone(array) as Array<any>;
  const tempMap = {};
  const valueKey = config.valueIndex ?? 'value';
  const labelKey = config.labelIndex ?? 'label';
  const parentKey = config.parentIndex ?? 'parentId';
  const nodeIds: string[] = [];

  _array.forEach((item) => {
    item.value = item[valueKey];
    item.label = item[labelKey];
    item.parent = item[parentKey];
    item.key = item[valueKey];
    tempMap[item[valueKey]] = item;
    item.disabled = config.disable ? config.disable(item) : false;

    if (item.type === 'node') {
      nodeIds.push(item.id);
    }
  });

  Object.keys(tempMap).forEach((key) => {
    const item = tempMap[key];
    if (item.parent) {
      if (!tempMap[item.parent]?.['children']) tempMap[item.parent]['children'] = [];
      tempMap[item.parent]['children'].push(item);
    }
  });

  const nodeMap = { ...tempMap };

  Object.keys(tempMap).forEach((key) => {
    const item = tempMap[key];
    if (item.parent) {
      delete tempMap[key];
    }
  });
  return { nodeMap, nodeTree: Object.values(tempMap), nodeIds };
};

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const getDateString = (date: Date) => {
  const _date = new Date(date);
  const year = _date.getFullYear();
  const month = _date.getMonth() + 1;
  const day = _date.getDate();
  return `${year}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}`;
};

export const getDateTimeString = (date: Date) => {
  const _date = new Date(date);
  const hour = _date.getHours();
  const minute = _date.getMinutes();
  const second = _date.getSeconds();
  return `${getDateString(date)} ${hour > 9 ? hour : `0${hour}`}:${minute > 9 ? minute : `0${minute}`}:${second > 9 ? second : `0${second}`}`;
};

export const getFileExt = (fileName: string): string => {
  if (!fileName) return '';
  const arr = fileName.split('.');
  return arr[arr.length - 1];
};

export const getAuthToken = () => {
  return window.atob(localStorage.getItem(import.meta.env.VITE_AUTH_KEY) || '');
};

export const setAuthToken = (token: string) => {
  localStorage.setItem(import.meta.env.VITE_AUTH_KEY, window.btoa(token));
};

export const getExpireTime = () => {
  return window.atob(localStorage.getItem(import.meta.env.VITE_AUTH_EXPIRE_KEY) || '');
};

export const setExpireTime = (time: string) => {
  localStorage.setItem(import.meta.env.VITE_AUTH_EXPIRE_KEY, window.btoa(time));
};

export const getRefreshToken = () => {
  return window.atob(localStorage.getItem(import.meta.env.VITE_AUTH_REFRESH_KEY) || '');
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem(import.meta.env.VITE_AUTH_REFRESH_KEY, window.btoa(token));
};
