const btn = document.getElementById("cartBtn");
  const overlay = document.getElementById("overlay");
  const video = document.getElementById("myVideo");

  btn.addEventListener("click", function () {
    overlay.style.display = "flex";
    video.currentTime = 0;
    video.play();
  });

  // إخفاء الفيديو عند الضغط خارج الفيديو
  overlay.addEventListener("click", function (e) {
    if (!video.contains(e.target)) {
      video.pause();
      overlay.style.display = "none";
    }
  });

  // ممكن كمان نخفيه بعد ما يخلص
  video.addEventListener("ended", function () {
    overlay.style.display = "none";
  });