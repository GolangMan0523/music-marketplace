import React from 'react';

interface AppleStoreButtonProps {
  link: string;
  altText: string;
}

export function AppleStoreButton({link, altText}: AppleStoreButtonProps) {
  const imageSource = '/images/mobile-apps/apple-store.png';
  const href = link;

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <img
        src={imageSource}
        alt={altText}
        className="h-auto max-w-[100px]"
      />
    </a>
  );
}
