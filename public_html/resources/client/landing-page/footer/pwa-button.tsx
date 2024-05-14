import React from 'react';

interface PwaButtonProps {
  link: string;
  altText: string;
}

export function PwaButton({link, altText}: PwaButtonProps) {
  const imageSource = '/images/mobile-apps/pwa.png';
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
