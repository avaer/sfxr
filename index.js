const requestSfx = url => new Promise((accept, reject) => {
  const audio = document.createElement('audio');

  audio.oncanplay = () => {
    _cleanup();

    audio.trigger = () => {
      audio.currentTime = 0;

      if (audio.paused) {
        audio.play();
      }
    };

    accept(audio);
  };
  audio.onerror = err => {
    reject(err);
  };

  audio.crossOrigin = true;
  audio.src = url;

  document.body.appendChild(audio);

  const _cleanup = () => {
    audio.oncanplay = null;
    audio.onerror = null;

    document.body.removeChild(audio);
  };
});

module.exports = {
  requestSfx,
};
