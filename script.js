// =============================
// ✅ JS CONNECTION CHECK
// =============================
console.log("✅ JS Connected!");

// =============================
// SMOOTH SCROLL NAV LINKS
// =============================
document.querySelectorAll('nav .nav-links a').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });

    document.querySelector(".nav-links").classList.remove("active");
  });
});

// =============================
// MENU TOGGLE MOBILE
// =============================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => navLinks.classList.toggle("active"));
}

// =============================
// DARK MODE TOGGLE
// =============================
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  const setThemeIcon = isDark => themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    setThemeIcon(true);
  } else setThemeIcon(false);

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setThemeIcon(isDark);
  });
}

// =============================
// TYPING EFFECT
// =============================
if (typeof Typed !== "undefined") {
  new Typed("#typing", {
    strings: ["IT Student", "Bekary", "Makeup Artist", "Arts & Wall Painting", "Mehendi"],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1500,
    loop: true
  });
}

// =============================
// SKILL BAR ANIMATION
// =============================
function animateSkills() {
  document.querySelectorAll(".skill-bar").forEach(bar => {
    const span = bar.querySelector(".progress span");
    const end = bar.dataset.width || "80%";
    span.style.width = end;
    const percentEl = bar.querySelector(".skill-percent");
    if (percentEl) percentEl.textContent = end;
  });
}

function skillsInView() {
  const skillsSection = document.querySelector(".skills");
  if (!skillsSection) return;
  const sectionTop = skillsSection.getBoundingClientRect().top;
  if (sectionTop < window.innerHeight - 100) {
    animateSkills();
    window.removeEventListener("scroll", skillsInView);
  }
}
window.addEventListener("scroll", skillsInView);
window.addEventListener("load", skillsInView);

// =============================
// PROJECT FILTER
// =============================
document.querySelectorAll(".filter-buttons").forEach(filterSection => {
  const buttons = filterSection.querySelectorAll(".filter-btn");
  const container = filterSection.nextElementSibling;
  const projects = container.querySelectorAll(".project-card");
  projects.forEach(p => p.classList.add("show"));

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.category;
      projects.forEach(project => {
        if (category === "all" || project.classList.contains(category)) {
          project.style.display = "block";
          setTimeout(() => project.classList.add("show"), 100);
        } else {
          project.style.display = "none";
          project.classList.remove("show");
        }
      });
    });
  });
});

// =============================
// ORDER MODAL
// =============================
const orderModal = document.getElementById("orderForm");
const orderBtns = document.querySelectorAll(".order-btn");
const closeOrderBtn = document.querySelector(".order-close");
if (orderModal && orderBtns && closeOrderBtn) {
  orderBtns.forEach(btn => btn.addEventListener("click", () => orderModal.classList.add("active")));
  closeOrderBtn.addEventListener("click", () => orderModal.classList.remove("active"));
  window.addEventListener("click", e => { if (e.target === orderModal) orderModal.classList.remove("active"); });

  const form = document.getElementById("orderForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.name.value, email = form.email.value, phone = form.phone.value, item = form.item.value, message = form.message.value;
    const whatsappMsg = `*New Order Received!*%0A👤 Name: ${name}%0A📧 Email: ${email}%0A📞 Phone: ${phone}%0A🎨 Item: ${item}%0A📝 Message: ${message}`;
    window.open(`https://wa.me/YOUR_NUMBER?text=${whatsappMsg}`, "_blank");
    orderModal.classList.remove("active");
    form.reset();
  });
}

// =============================
// CONTACT FORM
// =============================
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
if (contactForm && formStatus) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    formStatus.textContent = "Sending...";
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
      name: contactForm.name.value,
      email: contactForm.email.value,
      message: contactForm.message.value
    }).then(() => {
      formStatus.textContent = "Message sent successfully!";
      contactForm.reset();
    }).catch(err => {
      formStatus.textContent = "Failed to send message!";
      console.error(err);
    });
  });
}

// =============================
// RESUME MODAL
// =============================
const resumeModal = document.getElementById("resumeModal");
const resumeThumb = document.getElementById("resumeThumb");
const viewResumeBtn = document.getElementById("viewResumeBtn");
const closeResume = document.querySelector(".close-resume");
if (resumeModal && resumeThumb && viewResumeBtn && closeResume) {
  [viewResumeBtn, resumeThumb].forEach(el => el.addEventListener("click", () => resumeModal.style.display = "flex"));
  closeResume.addEventListener("click", () => resumeModal.style.display = "none");
  window.addEventListener("click", e => { if (e.target === resumeModal) resumeModal.style.display = "none"; });
}

// =============================
// EDUCATION MODAL
// =============================
const eduModal = document.getElementById("eduModal");
const eduIframe = document.getElementById("eduIframe");
const closeEdu = document.querySelector(".edu-modal .close");
document.querySelectorAll(".view-edu-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const doc = btn.getAttribute("data-doc");
    if (doc && doc !== "#") {
      eduIframe.src = doc;
      eduModal.style.display = "block";
    }
  });
});
closeEdu.addEventListener("click", () => { eduModal.style.display = "none"; eduIframe.src = ""; });
window.addEventListener("click", e => { if (e.target === eduModal) { eduModal.style.display = "none"; eduIframe.src = ""; } });

// =============================
// REVEAL ON SCROLL
// =============================
function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// =============================
// NAVBAR ACTIVE LINK ON SCROLL
// =============================
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    const secTop = sec.offsetTop - 60;
    if (pageYOffset >= secTop) current = sec.getAttribute("id");
  });
  navLinks.forEach(link => link.classList.remove("active"));
  navLinks.forEach(link => { if (link.getAttribute("href") === `#${current}`) link.classList.add("active"); });
});
