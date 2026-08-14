(() => {
  const el = document.querySelector(".loading-text");
  const chars = [...el.textContent];
  el.textContent = "";
  chars.forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? String.fromCharCode(160) : char;
    span.style.animationDelay = `${0.1 + i * 0.035}s`;
    el.appendChild(span);
  });
})();

let loadingRevealTimer;
window.addEventListener("load", () => {
  loadingRevealTimer = setTimeout(() => {
    document.getElementById("loading-screen").classList.add("loaded");
  }, 1200);
});

window.addEventListener("pageshow", (e) => {
  if (e.persisted) {
    document.getElementById("loading-screen").classList.add("loaded");
  }
});

(() => {
  const loadingScreen = document.getElementById("loading-screen");
  document
    .querySelectorAll('a[href^="index.html"], a[href^="otherside.html"]')
    .forEach((link) => {
      link.addEventListener("click", (e) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        const href = link.getAttribute("href");
        clearTimeout(loadingRevealTimer);
        document.querySelectorAll(".loading-text span").forEach((s) => {
          s.style.animation = "none";
          s.style.opacity = "0";
          s.style.transform = "translateY(10px)";
        });
        const barFill = document.querySelector(".loading-bar-fill");
        if (barFill) {
          barFill.style.animation = "none";
          barFill.style.width = "0%";
        }
        loadingScreen.classList.remove("loaded");
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      });
    });
})();

(() => {
  const navLinks = document.querySelector(".nav-links");
  const dot = navLinks.querySelector(".nav-dot");
  const links = navLinks.querySelectorAll("a");

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      const linkRect = link.getBoundingClientRect();
      const containerRect = navLinks.getBoundingClientRect();
      const center = linkRect.left - containerRect.left + linkRect.width / 2;
      dot.style.left = `${center}px`;
      dot.style.width = `${linkRect.width}px`;
      dot.style.opacity = "1";
    });
  });

  navLinks.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
  });
})();

(() => {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);
  document.documentElement.classList.add("has-custom-cursor");

  window.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    cursor.style.opacity = "1";
  });

  document.documentElement.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });

  const hoverSelector = "a, button, .btn, .card, .stat-card, input, textarea";
  document.addEventListener(
    "mouseover",
    (e) => {
      if (e.target.closest(hoverSelector)) cursor.classList.add("cursor-hover");
    },
    true,
  );
  document.addEventListener(
    "mouseout",
    (e) => {
      if (e.target.closest(hoverSelector)) cursor.classList.remove("cursor-hover");
    },
    true,
  );
})();
