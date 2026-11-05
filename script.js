const slides = [
  {
    division: "Nursery School",
    title: "A Strong Foundation for a Brighter Future.",
    description: "A welcoming beginning shaped around curiosity, care and early discovery.",
    link: "nursery.html",
    linkText: "Discover Nursery",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1500&q=90",
    alt: "Representative image of a young child exploring a classroom activity"
  },
  {
    division: "Primary School",
    title: "Building Knowledge, Confidence and Character.",
    description: "A supportive next step for growing knowledge, skills and self-belief.",
    link: "primary.html",
    linkText: "Discover Primary",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1500&q=90",
    alt: "Representative image of school-age children learning together"
  },
  {
    division: "Secondary School",
    title: "Preparing Tomorrow's Leaders Today.",
    description: "A place to deepen understanding, develop independence and look ahead.",
    link: "secondary.html",
    linkText: "Discover Secondary",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1500&q=90",
    alt: "Representative image of secondary-age students collaborating in class"
  }
];

const slideImage = document.querySelector("#slide-image");
if (slideImage) {
  const slideDivision = document.querySelector("#slide-division");
  const slideTitle = document.querySelector("#slide-title");
  const slideDescription = document.querySelector("#slide-description");
  const slideLink = document.querySelector("#slide-link");
  const slideNumber = document.querySelector("#slide-number");
  const dots = Array.from(document.querySelectorAll(".carousel-dot"));
  let currentSlide = 0;

  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    const slide = slides[currentSlide];
    slideImage.style.backgroundImage = `url("${slide.image}")`;
    slideImage.setAttribute("aria-label", slide.alt);
    slideDivision.textContent = slide.division;
    slideTitle.textContent = slide.title;
    slideDescription.textContent = slide.description;
    slideLink.href = slide.link;
    slideLink.innerHTML = `${slide.linkText} <span aria-hidden="true">↗</span>`;
    slideNumber.textContent = String(currentSlide + 1).padStart(2, "0");
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === currentSlide;
      dot.classList.toggle("is-active", active);
      if (active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  showSlide(0);
  dots.forEach((dot) => dot.addEventListener("click", () => showSlide(Number(dot.dataset.slide))));
  document.querySelector("#previous-slide").addEventListener("click", () => showSlide(currentSlide - 1));
  document.querySelector("#next-slide").addEventListener("click", () => showSlide(currentSlide + 1));
}

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (primaryNav) {
  const schoolLifeLink = primaryNav.querySelector('a[href="school-life.html"]');
  if (schoolLifeLink) {
    const schoolLifeMenu = document.createElement("details");
    schoolLifeMenu.className = "nav-dropdown nav-dropdown--life";
    schoolLifeMenu.innerHTML = `
      <summary>School Life <span aria-hidden="true">⌄</span></summary>
      <div class="nav-dropdown__menu">
        <a href="school-life.html">School Life Overview</a>
        <a href="facilities.html">Facilities</a>
        <a href="sports.html">Sports &amp; Games</a>
        <a href="clubs.html">Clubs &amp; Societies</a>
        <a href="gallery.html">Gallery</a>
      </div>`;
    schoolLifeLink.replaceWith(schoolLifeMenu);
    const activeSchoolLifeLink = Array.from(schoolLifeMenu.querySelectorAll("a"))
      .find((link) => new URL(link.href).pathname.toLowerCase() === location.pathname.toLowerCase());
    if (activeSchoolLifeLink) {
      activeSchoolLifeLink.setAttribute("aria-current", "page");
      schoolLifeMenu.classList.add("is-current");
    }
  }
}

function closeMenu() {
  if (!menuToggle || !primaryNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.querySelector(".sr-only").textContent = "Open navigation menu";
  primaryNav.classList.remove("is-open");
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.querySelector(".sr-only").textContent = isExpanded ? "Open navigation menu" : "Close navigation menu";
    primaryNav.classList.toggle("is-open", !isExpanded);
  });

  primaryNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
}
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openDropdown = primaryNav?.querySelector(".nav-dropdown[open]");
    if (openDropdown) {
      openDropdown.open = false;
      openDropdown.querySelector("summary").focus();
    }
    if (primaryNav?.classList.contains("is-open")) {
      closeMenu();
      menuToggle?.focus();
    }
  }
});

document.querySelectorAll("[data-demo-form]").forEach((form) => {
  let submitted = false;
  const response = form.querySelector(".form-response");
  const fields = Array.from(form.querySelectorAll("input, select, textarea"));

  function validateField(field) {
    const message = field.validity.valueMissing || (field.required && !field.value.trim())
      ? "Please complete this field."
      : field.validity.typeMismatch
        ? "Enter a valid email address."
        : field.validity.tooShort
          ? `Enter at least ${field.minLength} characters.`
          : field.name === "phone" && field.value.replace(/\D/g, "").length < 7
            ? "Enter a phone number with at least 7 digits."
          : "";
    let error = field.id ? document.getElementById(`${field.id}-error`) : null;
    if (!error) {
      error = document.createElement("span");
      error.className = "field-error";
      error.id = field.id ? `${field.id}-error` : `form-error-${fields.indexOf(field)}`;
      field.closest(".form-row")?.append(error);
      if (field.id) field.setAttribute("aria-describedby", error.id);
    }
    error.textContent = message;
    field.setAttribute("aria-invalid", String(Boolean(message)));
    field.closest(".form-row")?.classList.toggle("is-invalid", Boolean(message));
    return !message;
  }

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      if (submitted) validateField(field);
      if (response) response.textContent = "";
      form.removeAttribute("data-submitted");
    });
    field.addEventListener("change", () => {
      if (submitted) validateField(field);
      form.removeAttribute("data-submitted");
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitted = true;
    const invalidFields = fields.filter((field) => !validateField(field));
    if (invalidFields.length) {
      form.removeAttribute("data-submitted");
      if (response) response.textContent = "Please correct the highlighted fields before continuing.";
      invalidFields[0].focus();
      return;
    }
    if (response) {
      response.textContent = form.elements.parentName
        ? "Thank you. Your enquiry preview is complete; no details were sent or stored."
        : "Your message preview is complete; no details were sent or stored.";
    }
    form.dataset.submitted = "true";
  });
});

const galleryDialog = document.querySelector("#gallery-dialog");
if (galleryDialog) {
  const galleryItems = Array.from(document.querySelectorAll("[data-gallery-image]"));
  const previewImage = galleryDialog.querySelector(".gallery-dialog__image");
  const previewCaption = galleryDialog.querySelector(".gallery-dialog__caption");
  const previewCount = galleryDialog.querySelector(".gallery-dialog__count");
  let activeImageIndex = 0;
  let lastGalleryTrigger = null;

  function showGalleryImage(index) {
    activeImageIndex = (index + galleryItems.length) % galleryItems.length;
    const trigger = galleryItems[activeImageIndex];
    const image = trigger.querySelector("img");
    previewImage.src = trigger.dataset.galleryImage || image.currentSrc || image.src;
    previewImage.alt = image.alt;
    previewCaption.textContent = trigger.dataset.galleryCaption || image.alt;
    previewCount.textContent = `Image ${activeImageIndex + 1} of ${galleryItems.length}`;
  }

  galleryItems.forEach((trigger, index) => {
    trigger.addEventListener("click", () => {
      lastGalleryTrigger = trigger;
      showGalleryImage(index);
      galleryDialog.showModal();
    });
  });
  galleryDialog.querySelector("[data-gallery-previous]").addEventListener("click", () => showGalleryImage(activeImageIndex - 1));
  galleryDialog.querySelector("[data-gallery-next]").addEventListener("click", () => showGalleryImage(activeImageIndex + 1));
  galleryDialog.querySelector("[data-gallery-close]").addEventListener("click", () => galleryDialog.close());
  galleryDialog.addEventListener("click", (event) => {
    if (event.target === galleryDialog) galleryDialog.close();
  });
  galleryDialog.addEventListener("close", () => lastGalleryTrigger?.focus());
  galleryDialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") galleryDialog.close();
    if (event.key === "ArrowRight") showGalleryImage(activeImageIndex + 1);
    if (event.key === "ArrowLeft") showGalleryImage(activeImageIndex - 1);
  });
}

const copyrightYear = document.querySelector("#copyright-year");
if (copyrightYear) copyrightYear.textContent = String(new Date().getFullYear());
