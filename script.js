const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const progressBar = document.getElementById("progressBar");
const year = document.getElementById("year");

// Tema
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "light" ? "☾" : "☼";
}

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  localStorage.setItem("portfolio-theme", next);
  themeToggle.textContent = next === "light" ? "☾" : "☼";
});

// Menu mobile
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Barra de progresso
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${height > 0 ? (scrollTop / height) * 100 : 0}%`;
});

// Animações de entrada
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Ano automático
year.textContent = new Date().getFullYear();
