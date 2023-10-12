window.onload = () => {
  let radius = 560;
  let autoRotate = true; // auto rotate or not
  let rotateSpeed = -120;
  // let rotateSpeed = -720;
  let imgWidth = 260; // width of images (unit: px)
  // let imgWidth = 6; // width of images (unit: px)
  let imgHeight = 360;
  // let imgHeight = 8.5;
  // Link of background music - set 'null' if you dont want to play background music
  let bgMusicURL =
    "https://api.soundcloud.com/tracks/143041228/stream?client_id=587aa2d384f7333a886010d5f52f302a";
  let bgMusicControls = true; // Show UI music control

  /*
		 NOTE:
			 + imgWidth, imgHeight will work for video
			 + if imgWidth, imgHeight too small, play/pause button in <video> will be hidden
			 + Music link are taken from: https://hoangtran0410.github.io/Visualyze-design-your-own-/?theme=HauMaster&playlist=1&song=1&background=28
			 + Custom from code in tiktok video  https://www.facebook.com/J2TEAM.ManhTuan/videos/1353367338135935/
*/

  // ===================== start =======================
  // animation start after 1000 miliseconds
  setTimeout(init, 200);

  let odrag = document.getElementById("drag-container");
  let ospin = document.getElementById("spin-container");
  let aImg = ospin.getElementsByTagName("img");
  let aVid = ospin.getElementsByTagName("video");
  let aEle = [...aImg, ...aVid]; // combine 2 arrays

  // Size of images
  ospin.style.width = imgWidth / 20 + "rem";
  ospin.style.height = imgHeight / 20 + "rem";

  // Size of ground - depend on radius
  let ground = document.getElementById("ground");
  ground.style.width = (radius / 20) * 3 + "rem";
  // ground.style.width = 12 * 3 + "rem";
  ground.style.height = (radius / 20) * 3 + "rem";
  // ground.style.height = 12 * 3 + "rem";

  function init(delayTime) {
    for (let i = 0; i < aEle.length; i++) {
      aEle[i].style.transform =
        "rotateY(" + i * (360 / aEle.length) + "deg) translateZ(" + radius / 20 + "rem)";
      aEle[i].style.transition = "transform 1s";
      aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
    }
  }

  function applyTranform(obj) {
    // Constrain the angle of camera (between 0 and 180)
    if (tY > 180) tY = 180;
    if (tY < 0) tY = 0;

    // Apply the angle
    obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
  }

  function playSpin(yes) {
    ospin.style.animationPlayState = yes ? "running" : "paused";
  }

  let sX,
    sY,
    nX,
    nY,
    desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

  // auto spin
  if (autoRotate) {
    let animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
    ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
  }

  document.onmousewheel = function(e) {
    e = e || window.event;
    let d = e.wheelDelta / 20 || -e.detail;
    radius += d;
    init(1);
  };
};
