const userProfile = require('./component/userProfile.js');

function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = [];
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function (url, index) {
  // Load buffer asynchronously
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          console.error('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  };

  request.onerror = function () {
    console.log('BufferLoader error Error loading audio file');
  };

  request.send();
};

BufferLoader.prototype.load = function () {
  for (let i = 0; i < this.urlList.length; i += 1) {
    this.loadBuffer(this.urlList[i], i);
  }
};

window.AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
const smashBrawl = new SmashBrawl(context);

function SmashBrawl(currContext) {
  const ctx = this;
  function onLoaded(buffers) {
    ctx.buffers = buffers;
  }
  const loader = new BufferLoader(currContext, ['../assets/jump2.wav',
    '../assets/shoot2.mp3',
    '../assets/die2.wav',
    '../assets/questionCrate.wav',
    '../assets/metalCrate.mp3',
    '../assets/ancientCrate.wav',
    '../assets/woodCrate.wav',
    '../assets/playerHit2.wav'], onLoaded);
  loader.load();
}

SmashBrawl.prototype.shootRound = function shootRound(type, rounds, interval, random, random2) {
  if (userProfile.sound === 1) {
    random = random || 0;
    const time = context.currentTime;
    // Make multiple sources using the same buffer and play in quick succession.
    for (let i = 0; i < rounds; i += 1) {
      const source = this.makeSource(this.buffers[type]);
      source.playbackRate.value = 1 + (Math.random() * random2);
      source.start(time + (i * interval) + (Math.random() * random));
    }
  }
};

SmashBrawl.prototype.makeSource = function (buffer) {
  const source = context.createBufferSource();
  const compressor = context.createDynamicsCompressor();
  const gain = context.createGain();
  gain.gain.value = 0.2;
  source.buffer = buffer;
  source.connect(gain);
  gain.connect(compressor);
  compressor.connect(context.destination);
  return source;
};
// window.addEventListener('click', () => {
//   smashBrawl.shootRound(1, 1, 0.08, 0, 1);
// });

// window.addEventListener('keydown', onKeyDown, false);
module.exports = {
  smashBrawl,
};
