//color extraction
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("playerContainer");
  const imageSrc = "elemental.jpg";

  function setStyles(imageSrc) {
   function getDominantColor(imageSrc, callback) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageSrc;

      img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      let rgb = [0, 0, 0];

    for (let i = 0; i < pixels.length; i += 4) {
        rgb[0] += pixels[i];
        rgb[1] += pixels[i + 1];
        rgb[2] += pixels[i + 2];
       }

    const numPixels = pixels.length / 4;
    rgb[0] = Math.round(rgb[0] / numPixels);
    rgb[1] = Math.round(rgb[1] / numPixels);
    rgb[2] = Math.round(rgb[2] / numPixels);

    callback(rgb);
           };
      }

 function applyBlur(color) {
   container.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.3)`; // Apply color with alpha for transparency
   }
    getDominantColor(imageSrc, applyBlur);
    }
    setStyles(imageSrc);
});

//fill the heart icon with red color when click
var isFilled = false;

function toggleHeart() {
  var heartPath = document.getElementById("heartPath");
        
  if (isFilled) {
    heartPath.setAttribute("fill", "none");
    heartPath.setAttribute("stroke", "currentColor");
     } else {
    heartPath.setAttribute("fill", "#FF033E");
    heartPath.setAttribute("stroke", "#FF033E");
    }
    isFilled = !isFilled;
}

//Mucic play
const music = document.querySelector('audio');
const playBtn = document.getElementById('playBtn');
function handlePlay() {
  const playIcon = '<i class="material-icons">play_circle_filled</i>';
  const pauseIcon = '<i class="material-icons">pause_circle_filled</i>';
    
  if (music.paused) {
      music.play();
      playBtn.innerHTML = pauseIcon;
      playBtn.querySelector('i').style.fontSize = '45px';
    } else {
        music.pause();
        playBtn.innerHTML = playIcon;
        playBtn.querySelector('i').style.fontSize = '45px';
    }

music.addEventListener('ended', function () {
  playBtn.innerHTML = playIcon;
  playBtn.querySelector('i').style.fontSize = '45px';
  music.currentTime = 0;
 });
}

//Slide seek bar
const seekbar = document.getElementById('seek-slider');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');

music.onloadeddata = function () {
  // Display max music duration
  seekbar.max = music.duration;
  updateDurationDisplay(music.duration);
};

music.ontimeupdate = function () {
  seekbar.value = music.currentTime;
  updateSeekBarBackground();
};

seekbar.addEventListener('input', function ()
{
  music.currentTime = seekbar.value;
  updateSeekBarBackground();
});

music.addEventListener('timeupdate', function() {
  // Display current time
  updateCurrentTimeDisplay(music.currentTime);
}, false);

function updateSeekBarBackground() {
  //Fill the slide bar with color
  const percentage = (music.currentTime / music.duration) * 100;
  seekbar.style.background = `linear-gradient(to right, #fffefc 0%, #fffefc ${percentage}%, #beb6b4 ${percentage}%, #beb6b4 100%)`;
}

function updateDurationDisplay(durationInSeconds) {
  // Takes the total duration in sec, converts it to min and sec
  var ds = parseInt(durationInSeconds % 60);
  var dm = parseInt((durationInSeconds / 60) % 60);

  duration.innerHTML = padZero(dm) + ':' + padZero(ds);
}

function updateCurrentTimeDisplay(currentTimeInSeconds) {
  var cs = parseInt(currentTimeInSeconds % 60);
  var cm = parseInt((currentTimeInSeconds / 60) % 60);

  currentTime.innerHTML = padZero(cm) + ':' + padZero(cs);
}

function padZero(number) {
 // Adds a leading zero if the number is less than 10 ( mm:ss )
 return (number < 10) ? '0' + number : number;
}






















    
 