interface QuillColumnOperator {
  text: string;
}
export interface QuillCommercialModule {
  codeHighlight?: boolean; // 是否有代码高亮，默认没有
  table?: {
    operationMenu?: {
      insertColumnRight?: QuillColumnOperator;
      insertColumnLeft?: QuillColumnOperator;
      insertRowUp?: QuillColumnOperator;
      insertRowDown?: QuillColumnOperator;
      mergeCells?: QuillColumnOperator;
      unmergeCells?: QuillColumnOperator;
      deleteColumn?: QuillColumnOperator;
      deleteRow?: QuillColumnOperator;
      deleteTable?: QuillColumnOperator;
    }; // 需要自定义支持的右键菜单项，当传此值时以此值为准，不然以下方默认值为准，一般不传
    backgroundColors?: {
      colors?: string[]; // table cell的可选背景色，默认为：['#dbc8ff', '#6918b4', '#4a90e2', '#999', '#fff']
      text?: string; // 副标题文本，默认值为“背景色”
    };
    toolBarOptions?: {
      dialogRows?: number; // toolbar中table点击后弹框中出现灰色格子行数，默认为9
      dialogColumns?: number; // 点击后弹框中出现灰色格子列数，默认为9
      i18?: 'zh' | 'en';
    }; // 工具栏上table点击交互配置，默认就有
  }; // 是否需要支持table，默认没有
  imageResize?: boolean; // 是否需要图片调整大小，默认为true
  imageDrop?: boolean; // 是否需要图片拖动添加，默认为true
  magicUrl?: boolean; // 是否自动识别url、email等，添加超链接，默认为true
  markdown?: boolean; // 是否自动支持markdown，自动转换为富文本，默认为true
  link?: boolean; // toolbar是否需要超链接及处理函数，默认为true
  imageHandler?: {
    imgUploadApi?: (formData: FormData) => Promise<string>; // 图片上传API，API返回的应该是结果为URL的Promise
    uploadSuccCB?: (data: unknown) => void; // 上传成功回调
    uploadFailCB?: (error: unknown) => void; // 上传失败回调
    imgRemarkPre?: string; // 添加备注的统一前置字符串，可删除
    maxSize?: number; // 上传本地图片最大体积，单位MB，默认为5MB
    imageAccept?: string; // 上传本地图片可以接受的图片类型，默认'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
  }; // 点击toolbar上图片时的处理函数相关，复制拖拽图片公用
  toolbarOptions?: [][]; // 自定义需要的toolbar icons & 顺序
}
