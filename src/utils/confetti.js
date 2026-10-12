/**
 * Confetti utility — creates and manages confetti burst animations.
 * Pure JS + CSS, no dependencies.
 */

const SHAPES = ['circle', 'rect'];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Creates a confetti burst at the center of the viewport (or specified position).
 * @param {Object} options
 * @param {string[]} options.colors - Array of color strings
 * @param {number} options.count - Number of confetti pieces (default 80)
 * @param {number} options.duration - Duration in ms (default 3000)
 * @param {number} options.spread - Spread radius in px (default 400)
 * @param {HTMLElement} options.container - Container element (default: document.body)
 * @param {number} options.originX - X origin (0-1, default 0.5)
 * @param {number} options.originY - Y origin (0-1, default 0.5)
 */
export function confettiBurst({
  colors = ['#FF6B9D', '#FFD1DC', '#C9A96E', '#FF8FB5', '#E0C68F', '#FFF0F3', '#FFB6C1'],
  count = 80,
  duration = 3000,
  spread = 400,
  container = document.body,
  originX = 0.5,
  originY = 0.5,
} = {}) {
  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10000;
    overflow: hidden;
  `;
  container.appendChild(wrapper);

  const startX = window.innerWidth * originX;
  const startY = window.innerHeight * originY;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = randomBetween(6, 12);
    const angle = randomBetween(0, 360);
    const velocity = randomBetween(0.3, 1);
    const dx = Math.cos((angle * Math.PI) / 180) * spread * velocity;
    const dy = Math.sin((angle * Math.PI) / 180) * spread * velocity - randomBetween(100, 300);
    const rotation = randomBetween(0, 720);
    const delay = randomBetween(0, 200);

    piece.style.cssText = `
      position: absolute;
      left: ${startX}px;
      top: ${startY}px;
      width: ${size}px;
      height: ${shape === 'rect' ? size * 0.6 : size}px;
      background: ${color};
      border-radius: ${shape === 'circle' ? '50%' : '2px'};
      opacity: 1;
      pointer-events: none;
      animation: confetti-fall ${duration}ms ease-out ${delay}ms forwards;
      --dx: ${dx}px;
      --dy: ${dy}px;
      --rotation: ${rotation}deg;
    `;
    wrapper.appendChild(piece);
  }

  // Inject keyframes if not already present
  if (!document.getElementById('confetti-keyframes')) {
    const style = document.createElement('style');
    style.id = 'confetti-keyframes';
    style.textContent = `
      @keyframes confetti-fall {
        0% {
          transform: translate(0, 0) rotate(0deg) scale(1);
          opacity: 1;
        }
        30% {
          opacity: 1;
        }
        100% {
          transform: translate(var(--dx), calc(var(--dy) + 600px)) rotate(var(--rotation)) scale(0.3);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Cleanup after animation
  setTimeout(() => {
    wrapper.remove();
  }, duration + 500);
}

/**
 * Creates a sparkle burst effect.
 * Smaller, more subtle than confetti.
 */
export function sparkleBurst({
  colors = ['#FFD700', '#FF6B9D', '#C9A96E', '#FFFFFF'],
  count = 30,
  duration = 2000,
  container = document.body,
  originX = 0.5,
  originY = 0.5,
} = {}) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10000;
    overflow: hidden;
  `;
  container.appendChild(wrapper);

  const startX = window.innerWidth * originX;
  const startY = window.innerHeight * originY;

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = randomBetween(3, 8);
    const angle = randomBetween(0, 360);
    const distance = randomBetween(50, 200);
    const dx = Math.cos((angle * Math.PI) / 180) * distance;
    const dy = Math.sin((angle * Math.PI) / 180) * distance;
    const delay = randomBetween(0, 300);

    sparkle.style.cssText = `
      position: absolute;
      left: ${startX}px;
      top: ${startY}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      box-shadow: 0 0 ${size * 2}px ${color};
      opacity: 1;
      pointer-events: none;
      animation: sparkle-burst ${duration}ms ease-out ${delay}ms forwards;
      --sdx: ${dx}px;
      --sdy: ${dy}px;
    `;
    wrapper.appendChild(sparkle);
  }

  if (!document.getElementById('sparkle-keyframes')) {
    const style = document.createElement('style');
    style.id = 'sparkle-keyframes';
    style.textContent = `
      @keyframes sparkle-burst {
        0% {
          transform: translate(0, 0) scale(1);
          opacity: 1;
        }
        50% {
          opacity: 1;
        }
        100% {
          transform: translate(var(--sdx), var(--sdy)) scale(0);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => {
    wrapper.remove();
  }, duration + 500);
}
