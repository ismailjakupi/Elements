// Scroll reveal animation
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-section').forEach(section => {
  observer.observe(section);
});

// Sidebar navigation highlighting
const navLinks = document.querySelectorAll('.sidebar nav a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Smooth scrolling
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Warm Colors Tool
const warmColorInput = document.getElementById('warmColorInput');
const warmIntensity = document.getElementById('warmIntensity');
const warmIntensityValue = document.getElementById('warmIntensityValue');

warmIntensity.addEventListener('input', (e) => {
  warmIntensityValue.textContent = e.target.value;
  warmColor();
});

warmColorInput.addEventListener('input', warmColor);

function warmColor() {
  const color = warmColorInput.value;
  const intensity = parseInt(warmIntensity.value) / 100;
  
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);

  const warmShift = 50 * intensity;
  const coolReduction = 30 * intensity;
  
  r = Math.min(255, Math.round(r + warmShift));
  g = Math.min(255, Math.round(g + (warmShift * 0.6)));
  b = Math.max(0, Math.round(b - coolReduction));

  const warmed = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;

  document.getElementById('warmOriginalColor').style.backgroundColor = color;
  document.getElementById('warmedColor').style.backgroundColor = warmed;
  document.getElementById('warmOriginalCode').textContent = color.toUpperCase();
  document.getElementById('warmedCode').textContent = warmed.toUpperCase();
}

// Cool Colors Tool
const coolColorInput = document.getElementById('coolColorInput');
const coolIntensity = document.getElementById('coolIntensity');
const coolIntensityValue = document.getElementById('coolIntensityValue');

coolIntensity.addEventListener('input', (e) => {
  coolIntensityValue.textContent = e.target.value;
  coolColor();
});

coolColorInput.addEventListener('input', coolColor);

function coolColor() {
  const color = coolColorInput.value;
  const intensity = parseInt(coolIntensity.value) / 100;
  
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);

  const coolShift = 50 * intensity;
  const warmReduction = 30 * intensity;
  
  r = Math.max(0, Math.round(r - warmReduction));
  g = Math.min(255, Math.round(g + (coolShift * 0.4)));
  b = Math.min(255, Math.round(b + coolShift));

  const cooled = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;

  document.getElementById('coolOriginalColor').style.backgroundColor = color;
  document.getElementById('cooledColor').style.backgroundColor = cooled;
  document.getElementById('coolOriginalCode').textContent = color.toUpperCase();
  document.getElementById('cooledCode').textContent = cooled.toUpperCase();
}

// Initialize tools
warmColor();
coolColor();