import React, {Fragment, useState} from 'react';
import clsx from 'clsx';
import {AnimatePresence, m} from 'framer-motion';
import {Divider} from '@common/text-editor/menubar/divider';
import {FontStyleButtons} from '@common/text-editor/menubar/font-style-buttons';
import {ListButtons} from '@common/text-editor/menubar/list-buttons';
import {LinkButton} from '@common/text-editor/menubar/link-button';
import {ImageButton} from '@common/text-editor/menubar/image-button';
import {ClearFormatButton} from '@common/text-editor/menubar/clear-format-button';
import {InsertMenuTrigger} from '@common/text-editor/menubar/insert-menu-trigger';
import {FormatMenuTrigger} from '@common/text-editor/menubar/format-menu-trigger';
import {ColorButtons} from '@common/text-editor/menubar/color-buttons';
import {AlignButtons} from '@common/text-editor/menubar/align-buttons';
import {IndentButtons} from '@common/text-editor/menubar/indent-buttons';
import {CodeBlockMenuTrigger} from '@common/text-editor/menubar/code-block-menu-trigger';
import {MenubarButtonProps} from '@common/text-editor/menubar/menubar-button-props';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';
import {IconButton} from '@common/ui/buttons/icon-button';
import {UnfoldMoreIcon} from '@common/icons/material/UnfoldMore';
import {UnfoldLessIcon} from '@common/icons/material/UnfoldLess';

const MenubarRowClassName =
  'flex items-center px-4 h-42 text-muted border-b overflow-hidden';

interface Props extends MenubarButtonProps {
  justify?: string;
  hideInsertButton?: boolean;
  imageDiskPrefix?: string;
}
export function ArticleBodyEditorMenubar({
  editor,
  size = 'md',
  justify = 'justify-center',
  hideInsertButton = false,
  imageDiskPrefix,
}: Props) {
  const isMobile = useIsMobileMediaQuery();
  const [extendedVisible, setExtendedVisible] = useState(false);
  return (
    <div className={clsx(extendedVisible ? 'h-84' : 'h-42')}>
      <div className={clsx(MenubarRowClassName, justify, 'relative z-20')}>
        <FormatMenuTrigger editor={editor} size={size} />
        <Divider />
        <FontStyleButtons editor={editor} size={size} />
        <Divider />
        <AlignButtons editor={editor} size={size} />
        <IndentButtons editor={editor} size={size} />
        <Divider />
        {isMobile ? (
          <IconButton
            className="flex-shrink-0"
            color={extendedVisible ? 'primary' : null}
            size={size}
            onClick={() => {
              setExtendedVisible(!extendedVisible);
            }}
          >
            {extendedVisible ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
          </IconButton>
        ) : (
          <ExtendedButtons
            editor={editor}
            size={size}
            hideInsertButton={hideInsertButton}
            imageDiskPrefix={imageDiskPrefix}
          />
        )}
      </div>
      <AnimatePresence>
        {extendedVisible && (
          <m.div
            className={clsx(
              MenubarRowClassName,
              justify,
              'absolute flex h-full w-full',
            )}
            initial={{y: '-100%'}}
            animate={{y: 0}}
            exit={{y: '-100%'}}
          >
            <ExtendedButtons
              editor={editor}
              size={size}
              imageDiskPrefix={imageDiskPrefix}
            />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ExtendedButtons({
  editor,
  size = 'md',
  hideInsertButton,
  imageDiskPrefix,
}: Props) {
  return (
    <Fragment>
      <ListButtons editor={editor} size={size} />
      <Divider />
      <LinkButton editor={editor} size={size} />
      <ImageButton editor={editor} size={size} diskPrefix={imageDiskPrefix} />
      {!hideInsertButton && <InsertMenuTrigger editor={editor} size={size} />}
      <Divider />
      <ColorButtons editor={editor} size={size} />
      <Divider />
      <CodeBlockMenuTrigger editor={editor} size={size} />
      <ClearFormatButton editor={editor} size={size} />
    </Fragment>
  );
}
