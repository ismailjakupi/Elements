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

// Invert colors tool
const colorInput = document.getElementById('invertColorInput');
const box1 = document.getElementById('invertBox1');
const box2 = document.getElementById('invertBox2');
const text1 = document.getElementById('invertText1');
const text2 = document.getElementById('invertText2');

function invertColor(hex) {
  // remove #
  hex = hex.replace('#','');
  // convert to RGB
  let r = parseInt(hex.substring(0,2),16);
  let g = parseInt(hex.substring(2,4),16);
  let b = parseInt(hex.substring(4,6),16);
  // invert
  r = 255 - r;
  g = 255 - g;
  b = 255 - b;
  // return as hex
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}

function updateInvertBoxes() {
  const color = colorInput.value;
  const inverted = invertColor(color);

  box1.style.backgroundColor = color;
  text1.style.color = inverted;

  box2.style.backgroundColor = inverted;
  text2.style.color = color;
}

// update on input
colorInput.addEventListener('input', updateInvertBoxes);

// Contrast Checker Tool
const firstContrastColorInput = document.getElementById('firstContrastColorInput');
const firstContrastColorText = document.getElementById('firstContrastColorText');
const secondContrastColorInput = document.getElementById('secondContrastColorInput');
const secondContrastColorText = document.getElementById('secondContrastColorText');

// Sync first color
firstContrastColorInput.addEventListener('input', (e) => {
  firstContrastColorText.value = e.target.value.toUpperCase();
  checkContrast();
});

firstContrastColorText.addEventListener('keydown', (e) => {
  const input = e.target;
  if ((e.key === 'Backspace' || e.key === 'Delete') && input.selectionStart <= 1) {
    e.preventDefault();
  }
});

firstContrastColorText.addEventListener('input', (e) => {
  let hex = e.target.value;
  if (!hex.startsWith('#')) {
    hex = '#' + hex.replace('#', '');
    e.target.value = hex;
  }
  if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    firstContrastColorInput.value = hex;
    checkContrast();
  }
});

// Sync second color
secondContrastColorInput.addEventListener('input', (e) => {
  secondContrastColorText.value = e.target.value.toUpperCase();
  checkContrast();
});

secondContrastColorText.addEventListener('keydown', (e) => {
  const input = e.target;
  if ((e.key === 'Backspace' || e.key === 'Delete') && input.selectionStart <= 1) {
    e.preventDefault();
  }
});

secondContrastColorText.addEventListener('input', (e) => {
  let hex = e.target.value;
  if (!hex.startsWith('#')) {
    hex = '#' + hex.replace('#', '');
    e.target.value = hex;
  }
  if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    secondContrastColorInput.value = hex;
    checkContrast();
  }
});

function getRelativeLuminance(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  
  r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(color1, color2) {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

function checkContrast() {
  const bgColor = firstContrastColorInput.value;
  const textColor = secondContrastColorInput.value;
  
  // Update preview
  document.getElementById('contrastPreview').style.backgroundColor = bgColor;
  document.getElementById('contrastPreviewText').style.color = textColor;
  
  // Calculate contrast ratio
  const ratio = getContrastRatio(bgColor, textColor);
  document.getElementById('contrastRatio').textContent = ratio.toFixed(1);
  
  // Check Normal AA (4.5:1)
  const normalAA = document.getElementById('normalAAResult');
  const normalAAStatus = normalAA.querySelector('.result-status');
  if (ratio >= 4.5) {
    normalAAStatus.textContent = '✓ Pass';
    normalAAStatus.className = 'result-status pass';
  } else {
    normalAAStatus.textContent = '✗ Fail';
    normalAAStatus.className = 'result-status fail';
  }
  
  // Check Large AA (3:1)
  const largeAA = document.getElementById('largeAAResult');
  const largeAAStatus = largeAA.querySelector('.result-status');
  if (ratio >= 3) {
    largeAAStatus.textContent = '✓ Pass';
    largeAAStatus.className = 'result-status pass';
  } else {
    largeAAStatus.textContent = '✗ Fail';
    largeAAStatus.className = 'result-status fail';
  }
  
  // Check Normal AAA (7:1)
  const normalAAA = document.getElementById('normalAAAResult');
  const normalAAAStatus = normalAAA.querySelector('.result-status');
  if (ratio >= 7) {
    normalAAAStatus.textContent = '✓ Pass';
    normalAAAStatus.className = 'result-status pass';
  } else {
    normalAAAStatus.textContent = '✗ Fail';
    normalAAAStatus.className = 'result-status fail';
  }
}

// Initialize tools
warmColor();
coolColor();
updateInvertBoxes();
checkContrast();