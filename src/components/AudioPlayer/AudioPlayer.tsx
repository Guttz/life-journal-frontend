import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

type Props = {};

const AudioPlayer: React.FC<Props> = ({}) => {
  const [image] = useImage('https://image.flaticon.com/icons/svg/860/860780.svg');
  //window.AudioContext = window.AudioContext || window.webkitAudioContext ;
  window.AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  window.OfflineAudioContext = window.OfflineAudioContext || (window as any).webkitOfflineAudioContext;
  if (!AudioContext) alert('This site cannot be run in your Browser. Try a recent version of Chrome or Firefox. ');

  let audioContext = new AudioContext();

  // MUSIC LOADER + DECODE
  const loadMusic = (url: string) => {
    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'arraybuffer';
    req.onreadystatechange = e => {
      if (req.readyState == 4) {
        audioContext.close();
        audioContext = new AudioContext();
        if (req.status == 200)
          audioContext.decodeAudioData(
            req.response,
            buffer => {
              //audioContext.close();
              const bufferSource = audioContext.createBufferSource(); // creates a sound source

              const processedBufferFreq = [];

              bufferSource.buffer = buffer; // tell the source which sound to play
              //bufferSource.connect(audioContext.destination);     // connect the source to the context's destination (the speakers)
              bufferSource.connect(audioContext.destination);
              //bufferSource.start(0);

              const offline = new OfflineAudioContext(2, buffer.length, 44100);
              const waveAnalyser = offline.createAnalyser();
              waveAnalyser.fftSize = 256;
              const dataArray = new Uint8Array(waveAnalyser.frequencyBinCount);
              const bufferSourceOf = offline.createBufferSource();
              bufferSourceOf.buffer = buffer;

              const scp = offline.createScriptProcessor(256, 0, 1);

              bufferSourceOf.connect(waveAnalyser);
              waveAnalyser.connect(scp);
              scp.connect(offline.destination); // this is necessary for the script processor to start

              const milisecondsAnalyze = 0;
              const freqData = new Uint8Array(waveAnalyser.frequencyBinCount);
              let auxPlayback = 0;
              scp.onaudioprocess = e => {
                waveAnalyser.getByteFrequencyData(freqData);
                //analyser.getByteTimeDomainData(freqData);
                //processedBufferFreq.push( {playbackTime: e.playbackTime, data: freqData.slice()});

                if ((e.playbackTime - auxPlayback) * 1000 > milisecondsAnalyze) {
                  //console.log(freqData);
                  auxPlayback = e.playbackTime;
                  processedBufferFreq.push({ playbackTime: e.playbackTime, data: freqData.slice() });
                }
              };

              bufferSourceOf.start(0);
              offline.oncomplete = () => {
                console.log('analysed');
                bufferSource.start(0);
              };
              offline.startRendering();
            },
            () => alert('error while decoding your file.'),
          );
        else alert('error during the load.Wrong url or cross origin issue');
      }
    };
    req.send();
  };

  return (
    <Image
      onClick={(): void => {
        loadMusic(
          'https://p.scdn.co/mp3-preview/819980211c2d492dfdce4967df6176f86c2023f2?cid=21dbe53cbabe4f03b2ad3090342a7bbc',
        );
      }}
      absolutePosition={{
        x: window.innerWidth / 2 - 133,
        y: window.innerHeight - 185,
      }}
      width={66}
      height={66}
      image={image}
    />
  );
};

export default AudioPlayer;
