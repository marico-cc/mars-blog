import { fromExtension as getFileTypeFromExt } from 'human-filetypes/ext';
import { getFileExt } from '@/utils/utils';
// import 'quill-paste-smart';
import { QuillCommercialModule } from '@/typings/QuillCommercialModule';
const { VITE_APP_FILE_UPLOAD_URL } = import.meta.env;
declare const window: any;

export const mediaHandler = (quill, fileUrl) => {
  const cursorPosition = quill?.getSelection?.()?.index || 0; //获取当前光标位置
  const link = `${VITE_APP_FILE_UPLOAD_URL}/${fileUrl}`;
  const embedType = getFileTypeFromExt(getFileExt(fileUrl));
  quill?.insertText(cursorPosition, '\n');
  quill?.insertText(cursorPosition, '\n');
  if (embedType === 'image') {
    quill?.insertEmbed(cursorPosition + 2, embedType, link, 'silent'); //插入图片
  } else if (embedType === 'video') {
    quill?.insertEmbed(cursorPosition + 2, embedType, `./video.html?url=${window.encodeURIComponent(link)}`); //插入视频
  }
  quill?.insertText(cursorPosition + 3, '\n');

  quill?.setSelection(cursorPosition + 4); //光标位置加1
};

export const quillModulesCommerce: QuillCommercialModule = {
  codeHighlight: true, // 是否有代码高亮，默认没有
  table: {
    operationMenu: {
      insertColumnRight: {
        text: '右侧插入列'
      },
      insertColumnLeft: {
        text: '左侧插入列'
      },
      insertRowUp: {
        text: '上方插入行'
      },
      insertRowDown: {
        text: '下方插入行'
      },
      mergeCells: {
        text: '合并单元格'
      },
      unmergeCells: {
        text: '取消单元格合并'
      },
      deleteColumn: {
        text: '删除列'
      },
      deleteRow: {
        text: '删除行'
      },
      deleteTable: {
        text: '删除表格'
      }
    }, // 需要自定义支持的右键菜单项，当传此值时以此值为准，不然以下方默认值为准，一般不传
    backgroundColors: {
      colors: ['#4a90e2', '#999'], // table cell的可选背景色，默认为：['#dbc8ff', '#6918b4', '#4a90e2', '#999', '#fff']
      text: '背景色' // 副标题文本，默认值为“背景色”
    },
    toolBarOptions: {
      dialogRows: 3, // toolbar中table点击后弹框中出现灰色格子行数，默认为9
      dialogColumns: 4, // 点击后弹框中出现灰色格子列数，默认为9
      i18: 'zh'
    } // 工具栏上table点击交互配置，默认就有
  }, // 是否需要支持table，默认没有
  imageResize: true, // 是否需要图片调整大小，默认为true
  imageDrop: true, // 是否需要图片拖动添加，默认为true
  magicUrl: true, // 是否自动识别url、email等，添加超链接，默认为true
  markdown: true, // 是否自动支持markdown，自动转换为富文本，默认为true
  link: true // toolbar是否需要超链接及处理函数，默认为true
  // imageHandler: {
  // imgUploadApi: (formData: FormData) => Promise<string>;// 图片上传API，API返回的应该是结果为URL的Promise
  // uploadSuccCB: (data: unknown) => void; // 上传成功回调
  // uploadFailCB: (error: unknown) => void; // 上传失败回调
  // imgRemarkPre: '图：'; // 添加备注的统一前置字符串，可删除
  // maxSize: 1 // 上传本地图片最大体积，单位MB，默认为5MB
  // imageAccept: string; // 上传本地图片可以接受的图片类型，默认'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
  // } // 点击toolbar上图片时的处理函数相关，复制拖拽图片公用
  // toolbarOptions: [][] // 自定义需要的toolbar icons & 顺序
};

export const quillFormats = ['header', 'color', 'background', 'size', 'align', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'ordered', 'bullet', 'indent', 'link', 'script', 'image', 'video', 'clean'];
