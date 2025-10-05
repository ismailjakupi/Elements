const intensitySlider = document.getElementById('intensity');
const intensityValue = document.getElementById('intensityValue');
const colorInput = document.getElementById('colorInput')

function warmColor() {
  let color = document.getElementById('colorInput').value;
  let intensity = parseInt(document.getElementById('intensity').value) / 100;
  
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);

  // enhanced warming algorithm
  // shift toward red-orange spectrum
  const warmShift = 50 * intensity;
  const coolReduction = 30 * intensity;
  
  r = Math.min(255, Math.round(r + warmShift));
  g = Math.min(255, Math.round(g + (warmShift * 0.6)));
  b = Math.max(0, Math.round(b - coolReduction));

  let warmed = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;

  document.getElementById('originalColor').style.backgroundColor = color;
  document.getElementById('warmedColor').style.backgroundColor = warmed;
  document.getElementById('originalCode').textContent = color.toUpperCase();
  document.getElementById('warmedCode').textContent = warmed.toUpperCase();
}

// ----- LISTENERS ------
// initialize with default color on page load
window.addEventListener('DOMContentLoaded', warmColor);

intensitySlider.addEventListener('input', (e) => {
  intensityValue.textContent = e.target.value;
  warmColor(); // Automatically warm color as you adjust!
});

colorInput.addEventListener('input', (e) => {
  warmColor(); // Automatically warm the new color!
});