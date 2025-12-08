/* 0) Footer Year */
(function () {
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();
})();

/* 1) Scroll reveal */
(function () {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.animate(
            [
              { opacity: 0, transform: "translateY(12px)" },
              { opacity: 1, transform: "none" },
            ],
            {
              duration: 600,
              easing: "cubic-bezier(.22,.61,.36,1)",
              fill: "both",
            }
          );
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  document
    .querySelectorAll(".card,.mile,.stat,.partner,.cta")
    .forEach((el) => io.observe(el));
})();

/* 2) 3D tilt cards */
(function () {
  document.querySelectorAll(".tilt").forEach((card) => {
    const max = 8;
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width,
        y = (e.clientY - r.top) / r.height;
      const rx = (0.5 - y) * max,
        ry = (x - 0.5) * max;
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0)";
    });
  });
})();

/* 3) HeroShowcase 그룹 틸트 */
(function () {
  const box = document.getElementById("heroShowcase");
  if (!box) return;
  const tiles = box.querySelectorAll(".tile");
  function onMove(e) {
    const b = box.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - 0.5;
    const y = (e.clientY - b.top) / b.height - 0.5;
    box.style.transform = `rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(
      x * 6
    ).toFixed(2)}deg)`;
    tiles.forEach((t, i) => {
      const k = (i - (tiles.length - 1) / 2) * 0.06;
      t.style.transform = `translate3d(${(x * 8 + k * 20).toFixed(2)}px, ${(
        y * 8 -
        Math.abs(k) * 6
      ).toFixed(2)}px, 0)`;
    });
  }
  function onLeave() {
    box.style.transform = "none";
    tiles.forEach((t) => (t.style.transform = "none"));
  }
  box.addEventListener("mousemove", onMove);
  box.addEventListener("mouseleave", onLeave);
})();

/* 4) Gauge + sliders */
(function () {
  const hydr = document.getElementById("hydr");
  const salt = document.getElementById("salt");
  const ferm = document.getElementById("ferm");
  if (!hydr || !salt || !ferm) return;

  const outH = document.getElementById("hydrOut");
  const outS = document.getElementById("saltOut");
  const outF = document.getElementById("fermOut");
  const score = document.getElementById("score");
  const gauge = document.getElementById("gauge");
  const crumb = document.getElementById("crumb");
  const digest = document.getElementById("digest");
  const salty = document.getElementById("salty");

  function update() {
    outH.textContent = hydr.value + "%";
    outS.textContent = (+salt.value).toFixed(1) + "%";
    outF.textContent = ferm.value + "h";
    const H = +hydr.value,
      S = +salt.value,
      F = +ferm.value;
    const dH = Math.abs(H - 68),
      dS = Math.abs(S - 2.0) * 10,
      dF = Math.abs(F - 18) / 1.5;
    let sc = 100 - (dH * 1.3 + dS * 1.2 + dF * 1.1);
    sc = Math.max(0, Math.min(100, sc));
    score.textContent = Math.round(sc);
    const deg = Math.round((sc / 100) * 360);
    gauge.style.background = `
      radial-gradient(closest-side, #fff 60%, transparent 61%),
      conic-gradient(var(--accent) ${deg}deg, #e9edf2 0)`;
    crumb.textContent = H >= 72 ? "최상" : H >= 65 ? "상" : "중";
    digest.textContent = F >= 20 ? "최상" : F >= 14 ? "상" : "중";
    salty.textContent = S >= 2.2 ? "상" : S >= 1.8 ? "중" : "하";
  }
  [hydr, salt, ferm].forEach((i) => i.addEventListener("input", update));
  update();
})();

/* 5) Stats counters (빈 data-count도 방어) */
(function () {
  const statsEl = document.getElementById("stats");
  if (!statsEl) return;
  const nums = Array.from(statsEl.querySelectorAll(".num"));

  function animateNumber(el, from, to, dur) {
    const t0 = performance.now();
    function step(t) {
      const k = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(from + (to - from) * (1 - (1 - k) * (1 - k)));
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function startCounters() {
    nums.forEach((n) => {
      if (n.dataset.started) return;
      let target = parseInt(n.dataset.count, 10);
      if (Number.isNaN(target)) {
        // HTML에 값이 비어있어도 동작하도록 기본값 보정
        target = parseInt(n.textContent, 10);
        if (Number.isNaN(target)) target = 24; // 기본값
        n.dataset.count = String(target);
      }
      animateNumber(n, parseInt(n.textContent, 10) || 0, target, 1200);
      n.dataset.started = "1";

      // 클릭 시 살짝 올림
      n.parentElement.addEventListener("click", () => {
        const cur = parseInt(n.textContent, 10) || 0;
        const bump =
          (parseInt(n.dataset.count, 10) || target) +
          Math.floor(Math.random() * 50);
        animateNumber(n, cur, bump, 800);
        n.dataset.count = bump;
      });
    });
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          startCounters();
          io.disconnect();
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -20% 0px" }
  );
  io.observe(statsEl);

  if (document.readyState === "complete") setTimeout(startCounters, 200);
  else
    addEventListener("load", () => setTimeout(startCounters, 200), {
      once: true,
    });
})();

/* 6) Background parallax + grain */
(function () {
  const img = document.querySelector(".bg__image, .bg__svg");
  const grain = document.getElementById("bgGrain");
  if (!grain) return;
  const ctx = grain.getContext("2d", { alpha: true });
  let w = 0,
    h = 0;
  const mq = matchMedia("(prefers-reduced-motion: reduce)");
  const enabled = !mq.matches && !!img;

  function resize() {
    w = grain.width = innerWidth;
    h = grain.height = innerHeight;
  }
  resize();
  addEventListener("resize", resize, { passive: true });

  function drawGrain() {
    const id = ctx.createImageData(w, h);
    for (let i = 0; i < id.data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      id.data[i] = id.data[i + 1] = id.data[i + 2] = v;
      id.data[i + 3] = 8;
    }
    ctx.putImageData(id, 0, 0);
  }
  drawGrain();

  if (!enabled) return;
  let mx = 0,
    my = 0;
  addEventListener(
    "mousemove",
    (e) => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
    },
    { passive: true }
  );

  function loop() {
    const sy = scrollY || 0;
    const tx = mx * 12,
      ty = my * 12 - sy * 0.04;
    img.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(1.03)`;
    requestAnimationFrame(loop);
  }
  loop();
})();

/* 7) Marquee & Partners — 자동 복제 + 안전 가드 */
(function () {
  const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function ensureLoop(track, minMultiplier = 2.5) {
    if (!track) return;
    const wrap = track.parentElement;
    let total = track.scrollWidth;
    const need = wrap.clientWidth * minMultiplier;
    if (total <= 0) return;

    // 내용이 부족하면 자기 자신을 복제해서 루프 가능 길이를 확보
    while (total < need) {
      track.innerHTML += track.innerHTML;
      total = track.scrollWidth;
      if (track.childElementCount > 200) break; // 안전 가드
    }
  }

  // 1) 텍스트 마키
  const marquee = document.getElementById("marquee");
  ensureLoop(marquee, 2.5);

  // 2) 파트너 로고 벨트
  const pTrack = document.getElementById("partnersTrack");
  ensureLoop(pTrack, 2.5);

  // 모션 감소 환경에선 애니 정지
  if (prefersReduced) {
    [marquee, pTrack].forEach((el) => {
      if (el) el.style.animation = "none";
    });
  }
})();
