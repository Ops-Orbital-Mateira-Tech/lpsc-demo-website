import React from 'react';

type Props = {
  src: string;
  captions?: string; // path to VTT or transcript
  title?: string;
};

export default function MediaPlayer({ src, captions, title }: Props) {
  return (
    <figure>
      <figcaption>{title}</figcaption>
      <video controls src={src} aria-describedby={captions ? 'media-captions' : undefined}>
        {captions && <track kind="captions" src={captions} srcLang="en" label="English captions" />}
        Sorry, your browser doesn't support embedded videos.
      </video>
      {captions && (
        <div id="media-captions">
          <p>Captions available. You can download the transcript or view captions in the player.</p>
        </div>
      )}
    </figure>
  );
}

