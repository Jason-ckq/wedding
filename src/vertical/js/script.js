const GroupOne = [
  "./Image/1/1.jpg",
  "./Image/1/2.jpg",
  "./Image/1/3.jpg",
  "./Image/1/4.jpg",
  "./Image/1/5.jpg",
  "./Image/1/6.jpg",
  "./Image/1/7.jpg",
  "./Image/1/8.jpg",
  "./Image/1/9.jpg",
  "./Image/1/10.jpg"
];

// const GroupTwo = [
//   "./Image/2/21.jpg",
//   "./Image/2/22.jpg",
//   "./Image/2/23.jpg",
//   "./Image/2/24.jpg",
//   "./Image/2/25.jpg",
//   "./Image/2/26.jpg",
//   "./Image/2/27.jpg",
//   "./Image/2/28.jpg"
// ];

$(document).ready(() => {
  const Carousel = function() {
    let idIndex = 0;
    const bodyWidth = $("body")[0].offsetWidth;
    const bodyHeight = $("body")[0].offsetHeight;
    const colorArr1 = ["#c1232b", "#b5c334", "#fcce10", "#e87c25", "#fe8463", "#9bca63", "#fad860"];
    const colorArr2 = [
      "#f3a43b",
      "#60c0dd",
      "#d7504b",
      "#c6e579",
      "#f4e001",
      "#f0805a",
      "#26c0c0",
      "#c1232b",
      "#b5c334",
      "#fcce10",
      "#e87c25",
      "#fe8463",
      "#9bca63",
      "#fad860"
    ];

    setInterval(function() {
      const left = randomNum(parseInt(bodyWidth * 0.1), parseInt(bodyWidth * 0.9));
      const top = randomNum(
        parseInt(bodyHeight * 0.1),
        parseInt(bodyHeight / 3 - bodyHeight * 0.1)
      );

      drawFire(left, top);

      setTimeout(function() {
        drawFireworks(left, top);
        removeUl(idIndex);
      }, 1000);

      setChange(idIndex);
      removeFire(idIndex);

      idIndex++;
    }, 300);

    function drawFire(left, top) {
      let div = "<div id='" + idIndex + "_fire' class='fire'></div>";
      $("body").append(div);
      $("#" + idIndex + "_fire").css({ left: bodyWidth / 2 });
      $("#" + idIndex + "_fire").animate({ left: left, top: top }, 1000);
    }

    function drawFireworks(left, top) {
      let color1 = colorArr1[randomNum(7) - 1];
      let color2 = colorArr2[randomNum(7) - 1];
      let ul = "";
      let li1 = "";
      let li2 = "";

      for (let i = 0; i < 12; i++) {
        li1 +=
          "<li id='" +
          idIndex +
          "_1_" +
          i +
          "' class='li1' style='background:" +
          color1 +
          "'></li>";
        li2 +=
          "<li id='" +
          idIndex +
          "_2_" +
          i +
          "' class='li2' style='background:" +
          color2 +
          "'></li>";
      }
      ul = "<ul id='" + idIndex + "'>" + li1 + li2 + "</ul>";
      $("body").append(ul);

      for (let i = 0; i < 12; i++) {
        $("#" + idIndex + "_1_" + i).addClass("change1");
        $("#" + idIndex + "_2_" + i).addClass("change1");
      }

      $("#" + idIndex).css({ left: left, top: top });

      $(".li1").each(function(index) {
        $(this).css({
          transform: "rotateZ(" + 30 * index + "deg) translateX(20px)"
        });
      });
      $(".li2").each(function(index) {
        $(this).css({
          transform: "rotateZ(" + 30 * index + "deg) translateX(40px)"
        });
      });
    }

    function setChange(id) {
      setTimeout(function() {
        for (let i = 0; i < 12; i++) {
          $("#" + id + "_1_" + i).removeClass("change1");
          $("#" + id + "_2_" + i).removeClass("change1");
          $("#" + id + "_1_" + i).addClass("change2");
          $("#" + id + "_2_" + i).addClass("change2");
        }
      }, 1000);
    }

    function removeFire(id) {
      setTimeout(function() {
        $("#" + id + "_fire").remove();
      }, 1000);
    }

    function removeUl(id) {
      setTimeout(function() {
        $("#" + id).remove();
      }, 1000);
    }

    //生成从minNum到maxNum的随机数
    function randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
          return 0;
      }
    }

    const bgMusic = document.getElementById("bgMusic");
    const playlist = document.getElementById("playlist").getElementsByTagName("a");
    let currentTrack = 0;

    document.querySelector("body").addEventListener(
      "click",
      function() {
        return;
        const audio = document.getElementById("bgMusic");
        // audio.play();
        function playTrack(trackIndex) {
          if (trackIndex >= 0 && trackIndex < playlist.length) {
            currentTrack = trackIndex;
            audio.src = playlist[currentTrack].getAttribute("href");
            audio.play();
          }
        }

        audio.addEventListener("ended", function() {
          // 播放下一首歌曲
          if (currentTrack === playlist.length - 1) {
            currentTrack = 0;
          } else {
            currentTrack++;
          }
          playTrack(currentTrack);
        });

        // 初始播放第一首歌曲
        playTrack(currentTrack);
      },
      { once: true }
    );
  };

  const doDispaly = () => {
    let radius = 560;
    let autoRotate = true; // auto rotate or not
    let rotateSpeed = -120;
    // let rotateSpeed = -720;
    let imgWidth = 230; // width of images (unit: px)
    // let imgWidth = 6; // width of images (unit: px)
    let imgHeight = 360;
    // let imgHeight = 8.5;
    // Link of background music - set 'null' if you dont want to play background music
    let bgMusicControls = true; // Show UI music control

    setTimeout(init, 200);
    let odrag = document.getElementById("drag-container");
    let ospin = document.getElementById("spin-container");
    let aImg = ospin.getElementsByTagName("img");
    let aVid = ospin.getElementsByTagName("video");
    let aEle = [...aImg, ...aVid]; // combine 2 arrays

    // Size of images
    ospin.style.width = imgWidth / 20 + "rem";
    ospin.style.height = imgHeight / 20 + "rem";

    let ground = document.getElementById("ground");
    ground.style.width = (radius / 20) * 3 + "rem";
    ground.style.height = (radius / 20) * 3 + "rem";

    function init(delayTime) {
      for (let i = 0; i < aEle.length; i++) {
        aEle[i].style.transform =
          "rotateY(" + i * (360 / aEle.length) + "deg) translateZ(" + radius / 20 + "rem)";
        aEle[i].style.transition = "transform 1s";
        aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
      }
    }

    function applyTranform(obj) {
      if (tY > 180) tY = 180;
      if (tY < 0) tY = 0;
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

    // setup events
    document.onpointerdown = function(e) {
      clearInterval(odrag.timer);
      e = e || window.event;
      let sX = e.clientX,
        sY = e.clientY;
      this.onpointermove = function(e) {
        e = e || window.event;
        let nX = e.clientX,
          nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTranform(odrag);
        sX = nX;
        sY = nY;
      };

      this.onpointerup = function(e) {
        odrag.timer = setInterval(function() {
          desX *= 0.95;
          desY *= 0.95;
          tX += desX * 0.1;
          tY += desY * 0.1;
          applyTranform(odrag);
          playSpin(false);
          if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
            clearInterval(odrag.timer);
            playSpin(true);
          }
        }, 17);
        this.onpointermove = this.onpointerup = null;
      };

      return false;
    };

    document.onmousewheel = function(e) {
      e = e || window.event;
      let d = e.wheelDelta / 20 || -e.detail;
      radius += d;
      init(1);
    };
  };

  // 重新绘制图片信息
  const drawLoop = function() {
    const spinContainer = document.querySelector("#spin-container");
    spinContainer.innerHTML = "";
    let node = "";
    viewImage.forEach(url => {
      node += `<img src=${url} />`;
    });
    setTimeout(() => {
      spinContainer.innerHTML = node;
      doDispaly();
    });
  };

  // 配置信息
  const imageList = [GroupOne];
  let timer = null,
    delay = 1 * 10 * 1000,
    viewImage = [],
    loopIndex = 0;
  // 启动
  const Start = function() {
    if (imageList.length <= 2) return;
    timer = setInterval(() => {
      loopIndex += 1;
      if (loopIndex >= imageList.length) {
        loopIndex = 0;
      }
      viewImage = imageList[loopIndex];
      drawLoop();
    }, delay);
  };

  Start();
  Carousel();
});
