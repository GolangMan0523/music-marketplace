import React from 'react';

interface GooglePlayButtonProps {
  link: string;
  altText: string;
}

export function GooglePlayButton({link, altText}: GooglePlayButtonProps) {
  const imageSource = '/images/mobile-apps/google-play.png';
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
