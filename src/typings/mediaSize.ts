export const mediaSizing = {
  small: {
    className: '!h-24 !w-24',
    size: 96
  },
  medium: {
    className: '!h-32 !w-32',
    size: 128
  },
  large: {
    className: '!h-40 !w-40',
    size: 160
  }
};

export type MediaSize = keyof typeof mediaSizing;
