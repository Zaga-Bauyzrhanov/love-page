// Romantic Custom Cursor Effect
// Adds a soft pink heart cursor with trailing sparkles and gentle pulsing

(function romanticCursor() {
  // Create the heart cursor element
  const heart = document.createElement('div');
  heart.style.position = 'fixed';
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '9999';
  heart.style.width = '32px';
  heart.style.height = '32px';
  heart.style.transform = 'translate(-50%, -50%) scale(1)';
  heart.style.transition = 'transform 0.2s cubic-bezier(.4,2,.6,1)';
  heart.style.willChange = 'transform';
  heart.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 29s-9.5-7.5-12-12.5C1.5 12 4 7 8.5 7c2.5 0 4.5 2 5.5 3.5C15.5 9 17.5 7 20 7 24.5 7 27 12 26 16.5 25.5 21.5 16 29 16 29z" fill="#FFB6C1" stroke="#FF69B4" stroke-width="1.5"/>
    </svg>
  `;
  document.body.appendChild(heart);

  // Sparkle trail
  const sparkles = [];
  const MAX_SPARKLES = 18;
  function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9998';
    sparkle.style.width = '10px';
    sparkle.style.height = '10px';
    sparkle.style.borderRadius = '50%';
    sparkle.style.background = 'radial-gradient(circle, #fff6fa 0%, #ffb6c1 60%, transparent 100%)';
    sparkle.style.opacity = '0.7';
    sparkle.style.boxShadow = '0 0 8px 2px #ffb6c1, 0 0 16px 4px #fff6fa';
    sparkle.style.transform = `scale(${0.7 + Math.random() * 0.6})`;
    sparkle.style.transition = 'opacity 0.7s, transform 0.7s';
    document.body.appendChild(sparkle);
    setTimeout(() => {
      sparkle.style.opacity = '0';
      sparkle.style.transform += ' scale(1.5)';
      setTimeout(() => sparkle.remove(), 700);
    }, 10);
    sparkles.push(sparkle);
    if (sparkles.length > MAX_SPARKLES) {
      const old = sparkles.shift();
      if (old) old.remove();
    }
  }

  // Animate heart pulsing
  let pulse = 1;
  let pulseDir = 1;
  function animatePulse() {
    pulse += 0.01 * pulseDir;
    if (pulse > 1.08) pulseDir = -1;
    if (pulse < 0.95) pulseDir = 1;
    heart.style.transform = `translate(-50%, -50%) scale(${pulse})`;
    requestAnimationFrame(animatePulse);
  }
  animatePulse();

  // Move heart and create sparkles on mouse move
  document.addEventListener('mousemove', (e) => {
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    createSparkle(e.clientX, e.clientY);
  });

  // Hide default cursor
  document.body.style.cursor = 'none';
})(); 