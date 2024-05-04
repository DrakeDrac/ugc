//urls

token = "O2JBWGVK8PBB9AOOR5CC";
//https://cloudflare-cors-anywhere.mojmsti.workers.dev/?
let data_url = "https://player.uacdn.net/lesson-raw/" + token + "/data.json";

let video_url =
  "https://uamediav2.uacdn.net/lesson-raw/" + token + "/output.webm";

let canvas = document.getElementById("canvas");
let imgCanvas = document.getElementById("imgCanvas");
let animCanvas = document.getElementById("animCanvas");

let ctx = canvas.getContext("2d");
let imgCtx = imgCanvas.getContext("2d");
let animCtx = animCanvas.getContext("2d");

let pointer = document.getElementById("img");

var video = document.getElementById("video");

var hls = new Hls({
  debug: false,
});

// init/reset canvas after window resize (or Orientation change)
const initCanvas = () => {
  aspectratio = width / height;
  width = Scale * window.innerWidth;
  height = width / aspectratio;
  canvas.height = height * 2;
  canvas.width = width * 2;
  canvas.style.height = height + "px";
  canvas.style.width = width + "px";
  const dpi = window.devicePixelRatio;
  ctx.scale(dpi, dpi);

  document.getElementById("controls").style = "width:" + width + "px";
  imgCanvas.height = height;
  imgCanvas.width = width;
  animCanvas.height = height * 2;
  animCanvas.width = width * 2;
  animCanvas.style.height = height + "px";
  animCanvas.style.width = width + "px";
  animCtx.scale(dpi, dpi);

  // 360 is the constant value ___cademy used
  strokeMultiplier = width / 360;

  // Landscape or Portrait?
  video.height = height > width ? width * 0.3 : height * 0.3;
  loadBg(lastBg, true);
};
window.onkeydown = vidCtrl;

video.src = video_url;
hls.on(Hls.Events.MEDIA_ATTACHED, function () {
  video.muted = false;
});

// Update Video controls
setTimeout(() => {
  document.getElementById("duration").innerHTML = secondsToHms(video.duration);
}, 2000);

// Make video Draggable
dragElement(video);

// usual shit
window.addEventListener("resize", () => {
  initCanvas();
  video.currentTime = video.currentTime;
});

// Start handling seeking, renders every 50ms.
video.onseeking = function () {
  seekC++;
  let temp = seekC;
  document.getElementById("progressBar").value =
    (video.currentTime / video.duration) * 100;
  document.getElementById("currentTime").innerHTML = secondsToHms(
    video.currentTime
  );
  setTimeout(() => {
    if (seekC == temp) {
      onSeek(true);

      /*setTimeout(() => {
        onSeek();
      }, 1000); // Temp fix for inaccurate seeking, less performant*/
      seekC = 0;
    }
  }, 50);
};

// Save data.json
fetch(data_url).then(async (r) => {
  data = await r.json();

  // Convert data.json into a single array
  for (x of data) {
    for (y of x) {
      parsed_data.push(y);
    }
  }
  initCanvas();

  loadBg(0);
});

// Re-render every 15 seconds (Debugging, can be used in production after saving shapes)
setInterval(() => {
  if (video.paused) return;
  onSeek();
}, 15000);

//update video progress
setInterval(() => {
  if (video.paused) return;
  document.getElementById("progressBar").value =
    (video.currentTime / video.duration) * 100;
  document.getElementById("currentTime").innerHTML = secondsToHms(
    video.currentTime
  );
}, 1000);

// Check for strokes
setInterval(() => {
  if (video.paused) return;
  drawLoop();
}, 10);
