const partners = [
  ["Stillstrom by Maersk", "stillstrom.svg", "https://stillstrom.com/"],
  ["Aalborg University", "aalborg uni.svg", "https://www.en.aau.dk/"],
  ["DNV", "DNV.svg", "https://www.dnv.co.uk/"],
  ["Maersk", "MAERSK.svg", "https://www.maersk.com/"],
  ["MARIN", "MARIN.svg", "https://www.marin.nl/en"],
  ["Port of Malta", "MALTA.svg", "https://maltafreeport.com.mt/"],
  ["Port of Skagen", "SKAGEN.svg", "https://portofskagen.com/en/port-of-scandinavia"],
  ["University College London", "UCL.svg", "https://www.ucl.ac.uk/"],
];

const navItems = [
  ["Home", "/"],
  ["About", "/about/"],
  ["Consortium", "/consortium/"],
  ["News & Events", "/news-events/"],
  ["Contact", "/contact/"],
];

function currentPath() {
  const path = window.location.pathname.replace(/index\.html$/, "");
  return path.endsWith("/") ? path : `${path}/`;
}

function renderHeader() {
  const target = document.querySelector("[data-site-header]");
  if (!target) return;
  const path = currentPath();
  target.innerHTML = `
    <header class="site-header">
      <a class="brand" href="/" aria-label="SPARK home">
        <img src="/assets/spark white.svg" alt="SPARK">
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation">
        <span></span><span></span><span></span>
      </button>
      <nav class="site-nav" id="site-nav" aria-label="Primary navigation">
        ${navItems.map(([label, href]) => `<a href="${href}"${path === href ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
      </nav>
    </header>`;

  const button = target.querySelector(".menu-toggle");
  const nav = target.querySelector(".site-nav");
  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!open));
    button.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
    nav.classList.toggle("is-open", !open);
  });
}

function renderFooter() {
  const target = document.querySelector("[data-site-footer]");
  if (!target) return;
  target.innerHTML = `
    <footer class="site-footer">
      <div class="footer-inner">
        <a class="footer-brand" href="/" aria-label="SPARK home"><img src="/assets/spark white.svg" alt="SPARK"></a>
        <div class="funding">
          <img src="/assets/eu-flag.svg" alt="European Union flag">
          <div><strong>Co-funded by the European Union</strong><p>This project has received funding from the European Union's Horizon Europe research and innovation programme under Grant Agreement XXX.</p></div>
        </div>
      </div>
      <div class="photo-credit">Photography: <a href="https://commons.wikimedia.org/wiki/File:Skagen_harbour.jpg">Poul-Werner Dam / CC BY 2.0</a>, <a href="https://commons.wikimedia.org/wiki/File:Off-shore_Wind_Farm_Turbine.jpg">Phil Hollman / CC BY 2.0</a>, and <a href="https://commons.wikimedia.org/wiki/File:Valletta_Grand_Harbour_from_Valletta.jpg">Hunor Peter / CC0</a>. Images have been cropped for presentation.</div>
    </footer>`;
}

function enableReveals() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  items.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 90}ms`);
    observer.observe(item);
  });
}

function enableFilters() {
  const buttons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-category]");
  buttons.forEach((button) => button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    cards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  }));
}

renderHeader();
renderFooter();
enableReveals();
enableFilters();

window.SPARK_PARTNERS = partners;
