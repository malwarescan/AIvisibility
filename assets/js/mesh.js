const bodyEl = document.body;
let meshFrame = null;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const applyMeshOffsets = () => {
  meshFrame = null;
  if (!bodyEl || bodyEl.classList.contains('no-mesh')) return;

  const scrollY = window.scrollY || window.pageYOffset;
  const scrollX = window.scrollX || window.pageXOffset;
  const vh = window.innerHeight || 1;
  const vw = window.innerWidth || 1;

  const normalizedY = clamp(scrollY / vh, -2, 2);
  const normalizedX = clamp(scrollX / vw, -2, 2);

  const depth = clamp(Math.abs(normalizedY) * 0.5 + 0.65, 0.65, 1.05);
  const rotateX = clamp(normalizedY * 9, -12, 12);
  const rotateY = clamp(normalizedX * -9, -12, 12);

  bodyEl.style.setProperty('--mesh-offset-y', `${(normalizedY * 22).toFixed(2)}px`);
  bodyEl.style.setProperty('--mesh-offset-x', `${(normalizedX * 22).toFixed(2)}px`);
  bodyEl.style.setProperty('--mesh-rotate-x', `${rotateX.toFixed(2)}deg`);
  bodyEl.style.setProperty('--mesh-rotate-y', `${rotateY.toFixed(2)}deg`);
  bodyEl.style.setProperty('--mesh-depth', depth.toFixed(3));
};

const requestMeshFrame = () => {
  if (meshFrame === null) {
    meshFrame = window.requestAnimationFrame(applyMeshOffsets);
  }
};

const initMesh = () => {
  if (!bodyEl) return;
  applyMeshOffsets();
  window.addEventListener('scroll', requestMeshFrame, { passive: true });
  window.addEventListener('resize', requestMeshFrame);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMesh);
} else {
  initMesh();
}
