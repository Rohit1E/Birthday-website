(() => {
  "use strict";

  /* ============================================================
     EASY SETTINGS
     ============================================================ */

  const PHOTOS = {
    older: "images/older.jpeg",
    instant: "images/instant.jpeg",
    photo1: "images/photo1.jpeg",
    photo2: "images/photo2.jpeg",
    photo3: "images/photo3.jpeg",
    final: "images/final.jpeg"
  };


  /* ============================================================
     COUNTDOWN TARGET
     ============================================================

     CURRENT TEST:
     15 August 2026, 2:52 PM

     FINAL:
     21 August 2026, 11:59 PM

  */
const TARGET = new Date(Date.now() + 10000);


  /* ============================================================
     ELEMENTS
     ============================================================ */

  const waiting = document.getElementById("waiting");
  const story = document.getElementById("story");

  const startOverlay = document.getElementById("startOverlay");
  const startBtn = document.getElementById("startBtn");

  const waitingAudio = document.getElementById("waitingAudio");
  const birthdayAudio = document.getElementById("birthdayAudio");

  const waitingMusicBtn =
    document.getElementById("waitingMusicBtn");

  const waitingMusicLabel =
    document.getElementById("waitingMusicLabel");

  const musicControl =
    document.getElementById("musicControl");

  const musicToggle =
    document.getElementById("musicToggle");

  const musicStatus =
    document.getElementById("musicStatus");

  const toast =
    document.getElementById("toast");


  /* ============================================================
     IMAGE FALLBACK
     ============================================================ */

  Object.values(PHOTOS).forEach(src => {

    document
      .querySelectorAll(`img[src="${src}"]`)
      .forEach(img => {

        img.addEventListener("error", () => {
          img.style.opacity = "0";
        });

      });

  });


  /* ============================================================
     COUNTDOWN
     ============================================================ */

  const dEl = document.getElementById("days");
  const hEl = document.getElementById("hours");
  const mEl = document.getElementById("minutes");
  const sEl = document.getElementById("seconds");

  let unlocked = false;

  /*
     IMPORTANT:
     Declare this BEFORE updateCountdown().
     This prevents the reload-after-expiry error.
  */

  let countdownTimer = null;


  function pad(n) {
    return String(n).padStart(2, "0");
  }


  function updateCountdown() {

    const diff =
      TARGET.getTime() - Date.now();


    /*
       Countdown finished.
    */

    if (diff <= 0) {

      if (countdownTimer !== null) {

        clearInterval(countdownTimer);

        countdownTimer = null;

      }

      unlock();

      return;
    }


    let x = diff;


    const days =
      Math.floor(x / 86400000);

    x %= 86400000;


    const hours =
      Math.floor(x / 3600000);

    x %= 3600000;


    const minutes =
      Math.floor(x / 60000);

    x %= 60000;


    const seconds =
      Math.floor(x / 1000);


    dEl.textContent = pad(days);
    hEl.textContent = pad(hours);
    mEl.textContent = pad(minutes);
    sEl.textContent = pad(seconds);

  }


  /*
     Start timer FIRST.
     Then perform the first update.
  */

  countdownTimer =
    setInterval(updateCountdown, 1000);

  updateCountdown();


  /* ============================================================
     WAITING MUSIC
     ============================================================ */

  waitingMusicBtn.addEventListener(
    "click",
    async () => {

      try {

        if (waitingAudio.paused) {

          await waitingAudio.play();

          waitingMusicBtn.classList.add("playing");

          waitingMusicLabel.textContent =
            "Let it play";

        }

        else {

          waitingAudio.pause();

          waitingAudio.currentTime = 0;

          waitingMusicBtn.classList.remove("playing");

          waitingMusicLabel.textContent =
            "Press play";

        }

      }

      catch {

        showToast(
          "Add audio/waiting-music.mp3 first ♡"
        );

      }

    }
  );


  /* ============================================================
     BIRTHDAY MUSIC
     ============================================================ */

  async function switchToBirthdayMusic() {

    /*
       Stop waiting music completely.
    */

    waitingAudio.pause();

    waitingAudio.currentTime = 0;

    waitingMusicBtn.classList.remove("playing");

    waitingMusicLabel.textContent =
      "Press play";


    /*
       Start birthday music.
    */

    try {

      await birthdayAudio.play();

      /*
         PLAYING ICON
      */

      musicToggle.textContent = "♫";

      musicStatus.textContent = "Playing";

    }

    catch {

      /*
         Autoplay may be blocked by browser.
         Website still opens normally.
      */

      musicToggle.textContent = "♪";

      musicStatus.textContent = "Press play";

    }

  }


  /* ============================================================
     UNLOCK WEBSITE
     ============================================================ */

  async function unlock() {

    /*
       Prevent duplicate unlock calls.
    */

    if (unlocked) return;

    unlocked = true;


    /*
       Stop countdown.
    */

    if (countdownTimer !== null) {

      clearInterval(countdownTimer);

      countdownTimer = null;

    }


    /*
       Stop waiting music.
    */

    waitingAudio.pause();

    waitingAudio.currentTime = 0;

    waitingMusicBtn.classList.remove("playing");

    waitingMusicLabel.textContent =
      "Press play";


    /*
       Celebration burst.
    */

    burst();


    /*
       Hide countdown screen.
    */

    waiting.classList.add("hide");


    /*
       Show birthday website.
    */

    setTimeout(async () => {

      story.classList.add("show");

      musicControl.classList.remove("hidden");

      document.body.classList.add(
        "birthday-mode"
      );


      /*
         Start birthday music.
      */

      await switchToBirthdayMusic();


      startParticles();

      observeScenes();

    }, 1100);

  }


  /* ============================================================
     OPEN DIRECTLY AFTER BIRTHDAY TIME
     ============================================================ */

  /*
     This is important.

     If the user opens the website after
     the countdown has already finished,
     the birthday page opens directly.
  */

  if (TARGET.getTime() <= Date.now()) {

    setTimeout(() => {

      unlock();

    }, 150);

  }


  /* ============================================================
     MANUAL MUSIC START
     ============================================================ */

  if (startBtn) {

    startBtn.addEventListener(
      "click",
      async () => {

        startOverlay.classList.remove("show");


        /*
           Stop waiting music.
        */

        waitingAudio.pause();

        waitingAudio.currentTime = 0;

        waitingMusicBtn.classList.remove(
          "playing"
        );

        waitingMusicLabel.textContent =
          "Press play";


        /*
           Start birthday music.
        */

        try {

          await birthdayAudio.play();

          musicToggle.textContent = "♫";

          musicStatus.textContent =
            "Playing";

        }

        catch {

          musicToggle.textContent = "♪";

          musicStatus.textContent =
            "Press play";

          showToast(
            "Please check that birthday-music.mp3 exists."
          );

        }


        burst(100);

      }
    );

  }


  /* ============================================================
     BIRTHDAY MUSIC CONTROL
     ============================================================ */

  musicToggle.addEventListener(
    "click",
    async () => {

      /*
         MUSIC IS CURRENTLY OFF
      */

      if (birthdayAudio.paused) {

        try {

          await birthdayAudio.play();

          /*
             Playing icon
          */

          musicToggle.textContent = "♫";

          musicStatus.textContent =
            "Playing";

        }

        catch {

          musicToggle.textContent = "♪";

          showToast(
            "Could not play birthday music."
          );

        }

      }

      /*
         MUSIC IS CURRENTLY PLAYING
      */

      else {

        birthdayAudio.pause();

        /*
           Stop completely.
        */

        birthdayAudio.currentTime = 0;

        /*
           Muted / closed icon
        */

        musicToggle.textContent = "🔇";

        musicStatus.textContent =
          "Paused";

      }

    }
  );


  /* ============================================================
     SCENE NAVIGATION
     ============================================================ */

  document
    .querySelectorAll("[data-next]")
    .forEach(btn => {

      btn.addEventListener(
        "click",
        () => {

          const target =
            document.getElementById(
              btn.dataset.next
            );

          target?.scrollIntoView({
            behavior: "smooth"
          });

        }
      );

    });


  /* ============================================================
     3D PHOTO CUBE
     ============================================================ */

  const cube =
    document.getElementById("cube");

  let cubeX = -22;
  let cubeY = 3;


  window.addEventListener(
    "mousemove",
    e => {

      if (
        !cube ||
        window.innerWidth < 800
      ) {
        return;
      }


      const nx =
        e.clientX / innerWidth - 0.5;

      const ny =
        e.clientY / innerHeight - 0.5;


      cube.style.transform =
        `rotateY(${cubeX + nx * 180}deg) rotateX(${cubeY - ny * 45}deg)`;

    }
  );


  /* ============================================================
     TOUCH-FRIENDLY CUBE
     ============================================================ */

  let touchStartX = null;
  let touchStartY = null;


  window.addEventListener(
    "touchstart",
    e => {

      touchStartX =
        e.touches[0].clientX;

      touchStartY =
        e.touches[0].clientY;

    },
    { passive: true }
  );


  window.addEventListener(
    "touchmove",
    e => {

      if (
        !cube ||
        touchStartX === null
      ) {
        return;
      }


      const deltaX =
        e.touches[0].clientX -
        touchStartX;

      const deltaY =
        e.touches[0].clientY -
        touchStartY;


      cube.style.transform =
        `rotateY(${cubeX + deltaX * 1.2}deg) rotateX(${cubeY - deltaY * 0.5}deg)`;

    },
    { passive: true }
  );


  window.addEventListener(
    "touchend",
    () => {

      touchStartX = null;

      touchStartY = null;

    }
  );


  /* ============================================================
     SCROLL REVEAL
     ============================================================ */

  function observeScenes() {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "seen"
              );


              if (
                entry.target.id === "cake"
              ) {

                burst(70);

              }

            }

          });

        },
        {
          threshold: 0.35
        }
      );


    document
      .querySelectorAll(".scene")
      .forEach(
        scene =>
          observer.observe(scene)
      );

  }


  /* ============================================================
     PARTICLES
     ============================================================ */

  let particlesStarted = false;


  function startParticles() {

    if (particlesStarted) return;

    particlesStarted = true;


    const holder =
      document.getElementById(
        "particles"
      );


    setInterval(() => {

      if (document.hidden) return;


      const p =
        document.createElement("span");


      p.className = "particle";


      p.textContent =
        ["♡", "✦", "✧", "·"]
        [
          Math.floor(
            Math.random() * 4
          )
        ];


      p.style.left =
        Math.random() * 100 + "vw";


      p.style.fontSize =
        10 +
        Math.random() * 16 +
        "px";


      p.style.color =
        [
          "#e8aab9",
          "#d4aa6d",
          "#c8bde6",
          "#fff"
        ][
          Math.floor(
            Math.random() * 4
          )
        ];


      p.style.setProperty(
        "--x",
        Math.random() * 130 -
          65 +
          "px"
      );


      p.style.animationDuration =
        8 +
        Math.random() * 9 +
        "s";


      holder.appendChild(p);


      setTimeout(
        () => p.remove(),
        18000
      );


    }, 600);

  }


  /* ============================================================
     CONFETTI / CELEBRATION
     ============================================================ */

  function burst(count = 55) {

    for (
      let i = 0;
      i < count;
      i++
    ) {

      const p =
        document.createElement("span");


      p.className =
        "particle";


      p.textContent =
        Math.random() > 0.45
          ? "✦"
          : "♡";


      p.style.left =
        "50vw";


      p.style.bottom =
        "35vh";


      p.style.fontSize =
        12 +
        Math.random() * 18 +
        "px";


      p.style.color =
        [
          "#e8aab9",
          "#d4aa6d",
          "#c8bde6",
          "#ffffff"
        ][
          Math.floor(
            Math.random() * 4
          )
        ];


      p.style.setProperty(
        "--x",
        Math.random() * 900 -
          450 +
          "px"
      );


      p.style.animationDuration =
        2 +
        Math.random() * 2 +
        "s";


      document
        .getElementById("particles")
        .appendChild(p);


      setTimeout(
        () => p.remove(),
        4500
      );

    }

  }


  /* ============================================================
     TOAST
     ============================================================ */

  function showToast(text) {

    toast.textContent = text;

    toast.classList.add("show");


    setTimeout(
      () =>
        toast.classList.remove(
          "show"
        ),
      2600
    );

  }


  /* ============================================================
     START WAITING PAGE PARTICLES
     ============================================================ */

  startParticles();

})();