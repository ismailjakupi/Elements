// scroll reveal animation
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

// sidebar navigation highlighting
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

// smooth scrolling
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
const warmColorText = document.getElementById('warmColorText');
const warmIntensity = document.getElementById('warmIntensity');
const warmIntensityValue = document.getElementById('warmIntensityValue');

// when color picker changes, update text field
warmColorInput.addEventListener('input', (e) => {
  warmColorText.value = e.target.value.toUpperCase();
  warmColor();
});

warmColorText.addEventListener('keydown', (e) => {
  const input = e.target;
  // prevent deleting # if cursor is at position 0 or 1
  if ((e.key === 'Backspace' || e.key === 'Delete') && input.selectionStart <= 1) {
    e.preventDefault();
  }
});

warmColorText.addEventListener('input', (e) => {
  let hex = e.target.value;
  
  // ensure # is always first
  if (!hex.startsWith('#')) {
    hex = '#' + hex.replace('#', '');
    e.target.value = hex;
  }
  
  if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    warmColorInput.value = hex;
    warmColor();
  }
});

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

// copy color code on click
document.getElementById('warmedCode').addEventListener('click', () => {
  const colorCode = document.getElementById('warmedCode').textContent;
  navigator.clipboard.writeText(colorCode);
  
  // visual feedback
  const el = document.getElementById('warmedCode');
  const originalText = el.textContent;
  el.textContent = 'Copied!';
  setTimeout(() => {
    el.textContent = originalText;
  }, 1000);
});

document.getElementById('warmOriginalCode').addEventListener('click', () => {
  const colorCode = document.getElementById('warmOriginalCode').textContent;
  navigator.clipboard.writeText(colorCode);
  
  const el = document.getElementById('warmOriginalCode');
  const originalText = el.textContent;
  el.textContent = 'Copied!';
  setTimeout(() => {
    el.textContent = originalText;
  }, 1000);
});

// copy on click boxes
document.getElementById('warmedColor').addEventListener('click', () => {
  const colorCode = document.getElementById('warmedCode').textContent;
  navigator.clipboard.writeText(colorCode);
  
  const el = document.getElementById('warmedCode');
  const originalText = el.textContent;
  el.textContent = 'Copied!';
  setTimeout(() => {
    el.textContent = originalText;
  }, 1000);
});

document.getElementById('warmOriginalColor').addEventListener('click', () => {
  const colorCode = document.getElementById('warmOriginalCode').textContent;
  navigator.clipboard.writeText(colorCode);
  
  const el = document.getElementById('warmOriginalCode');
  const originalText = el.textContent;
  el.textContent = 'Copied!';
  setTimeout(() => {
    el.textContent = originalText;
  }, 1000);
});

// Cool Colors Tool
const coolColorInput = document.getElementById('coolColorInput');
const coolColorText = document.getElementById('coolColorText');
const coolIntensity = document.getElementById('coolIntensity');
const coolIntensityValue = document.getElementById('coolIntensityValue');

// when color picker changes, update text field
coolColorInput.addEventListener('input', (e) => {
  coolColorText.value = e.target.value.toUpperCase();
  coolColor();
});

coolColorText.addEventListener('keydown', (e) => {
  const input = e.target;
  // prevent deleting # if cursor is at position 0 or 1
  if ((e.key === 'Backspace' || e.key === 'Delete') && input.selectionStart <= 1) {
    e.preventDefault();
  }
});

coolColorText.addEventListener('input', (e) => {
  let hex = e.target.value;
  
  // ensure # is always first
  if (!hex.startsWith('#')) {
    hex = '#' + hex.replace('#', '');
    e.target.value = hex;
  }
  
  if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    coolColorInput.value = hex;
    coolColor();
  }
});

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

// copy colors
document.getElementById('cooledCode').addEventListener('click', () => {
  const colorCode = document.getElementById('cooledCode').textContent;
  navigator.clipboard.writeText(colorCode);
  
  const el = document.getElementById('cooledCode');
  const originalText = el.textContent;
  el.textContent = 'Copied!';
  setTimeout(() => {
    el.textContent = originalText;
  }, 1000);
});

document.getElementById('coolOriginalCode').addEventListener('click', () => {
  const colorCode = document.getElementById('coolOriginalCode').textContent;
  navigator.clipboard.writeText(colorCode);
  
  const el = document.getElementById('coolOriginalCode');
  const originalText = el.textContent;
  el.textContent = 'Copied!';
  setTimeout(() => {
    el.textContent = originalText;
  }, 1000);
});

// copy on click boxes
document.getElementById('cooledColor').addEventListener('click', () => {
  const colorCode = document.getElementById('cooledCode').textContent;
  navigator.clipboard.writeText(colorCode);
  
  const el = document.getElementById('cooledCode');
  const originalText = el.textContent;
  el.textContent = 'Copied!';
  setTimeout(() => {
    el.textContent = originalText;
  }, 1000);
});

document.getElementById('coolOriginalColor').addEventListener('click', () => {
  const colorCode = document.getElementById('coolOriginalCode').textContent;
  navigator.clipboard.writeText(colorCode);
  
  const el = document.getElementById('coolOriginalCode');
  const originalText = el.textContent;
  el.textContent = 'Copied!';
  setTimeout(() => {
    el.textContent = originalText;
  }, 1000);
});

// Initialize tools
warmColor();
coolColor();