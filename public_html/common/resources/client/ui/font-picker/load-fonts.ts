import {FontFaceConfig} from './font-face-config';
import {FontConfig} from '@common/http/value-lists';
import lazyLoader from '@common/utils/http/lazy-loader';

function prefixId(id: string) {
  return `be-fonts-${id}`;
}

export function loadFonts(
  fonts: (FontFaceConfig | FontConfig)[],
  options: {
    prefixSrc?: (src?: string) => string;
    id: string;
    forceAssetLoad?: boolean;
    document?: Document;
    weights?: number[];
  },
): Promise<FontFace[]> {
  const doc = options.document || document;
  const googleFonts: FontConfig[] = [];
  const customFonts: FontFaceConfig[] = [];

  let promises = [];

  fonts.forEach(font => {
    if ('google' in font && font.google) {
      googleFonts.push(font);
    } else if ('src' in font) {
      customFonts.push(font);
    }
    // native fonts don't need to be loaded, they are already available in the browser
  });

  if (googleFonts?.length) {
    const weights = options.weights || [400];
    const families = fonts
      .map(f => `${f.family}:${weights.join(',')}`)
      .join('|');
    const googlePromise = lazyLoader.loadAsset(
      `https://fonts.googleapis.com/css?family=${families}&display=swap`,
      {
        type: 'css',
        id: prefixId(options.id),
        force: options.forceAssetLoad,
        document: doc,
      },
    );
    promises.push(googlePromise);
  }

  if (customFonts?.length) {
    const customFontPromises = customFonts.map(async fontConfig => {
      const loadedFont = Array.from(doc.fonts.values()).find(current => {
        return current.family === fontConfig.family;
      });
      if (loadedFont) {
        return loadedFont.loaded;
      }
      const fontFace = new FontFace(
        fontConfig.family,
        `url(${
          options?.prefixSrc
            ? options.prefixSrc(fontConfig.src)
            : fontConfig.src
        })`,
        fontConfig.descriptors,
      );
      doc.fonts.add(fontFace);
      return fontFace.load();
    });
    promises = promises.concat(customFontPromises);
  }

  return Promise.all(promises);
}
