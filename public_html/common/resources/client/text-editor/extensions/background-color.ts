import {Extension} from '@tiptap/core';
import '@tiptap/extension-text-style';

export type ColorOptions = {
  types: string[];
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    bgColor: {
      setBackgroundColor: (color: string) => ReturnType;
      unsetBackgroundColor: () => ReturnType;
    };
  }
}

export const BackgroundColor = Extension.create<ColorOptions>({
  name: 'backgroundColor',

  addOptions() {
    return {
      types: ['textStyle'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          backgroundColor: {
            default: null,
            parseHTML: element =>
              element.style.backgroundColor.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.backgroundColor) {
                return {};
              }

              return {
                style: `background-color: ${attributes.backgroundColor}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setBackgroundColor:
        backgroundColor =>
        ({chain}) => {
          return chain().setMark('textStyle', {backgroundColor}).run();
        },
      unsetBackgroundColor:
        () =>
        ({chain}) => {
          return chain()
            .setMark('textStyle', {backgroundColor: null})
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
