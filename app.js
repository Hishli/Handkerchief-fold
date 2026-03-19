let state = { taps: 0, holds: 0, releases: 0, holdActive: false, holdTimer: null };

const hk = document.getElementById('handkerchief');
const label = document.getElementById('fold-label');
const badge = document.getElementById('result-badge');
const instruction = document.getElementById('instruction');

const shapes = [
  { name: "Half Fold",     cls: "half",     condition: s => s.taps===1 && s.holds===0 },
  { name: "Quarter Fold",  cls: "quarter",  condition: s => s.taps===2 && s.holds===0 },
  { name: "Triangle",      cls: "triangle", condition: s => s.taps===1 && s.holds===1 },
  { name: "Crumple Ball",  cls: "crumple",  condition: s => s.holds>=2 },
  { name: "Fan Fold",      cls: "fan",      condition: s => s.taps>=3 && s.holds===0 },
  { name: "Pocket Rose 🌹",cls: "rose",     condition: s => s.taps>=2 && s.holds>=1 && s.releases>=1 },
];

function doAction(action) {
  if (action === 'tap')     { state.taps++;     instruction.textContent = `Tapped ${state.taps}x`; }
  if (action === 'release') { state.releases++; instruction.textContent = `Released!`; }
  applyShape();
}

function startHold() {
  state.holdActive = true;
  instruction.textContent = "Holding... 🤚";
  state.holdTimer = setTimeout(() => {
    if (state.holdActive) { state.holds++; applyShape(); }
  }, 800);
}

function endHold() {
  state.holdActive = false;
  clearTimeout(state.holdTimer);
}

function applyShape() {
  const match = shapes.find(s => s.condition(state));
  hk.className = match ? match.cls : 'flat';
  label.textContent = match ? match.name : '';
  badge.textContent = match ? `✨ ${match.name} unlocked!` : '';
  badge.style.animation = 'none';
  void badge.offsetWidth;
  badge.style.animation = 'pop 0.3s ease';
}

function resetAll() {
  state = { taps: 0, holds: 0, releases: 0, holdActive: false, holdTimer: null };
  hk.className = 'flat';
  label.textContent = '';
  badge.textContent = '';
  instruction.textContent = 'Choose an action below';
}
