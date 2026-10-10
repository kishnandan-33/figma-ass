// Recommendations Slider / Carousel
document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.carousel-wrapper');
  const track = document.getElementById('carouselTrack');
  const dots = document.querySelectorAll('#carouselDots .dot');
  const cards = document.querySelectorAll('.carousel-card');

  if (!wrapper || !track || dots.length === 0 || cards.length === 0) return;

  // Active state is indicated by the highlighted dot (index 2 is centered in Figma)
  let currentIndex = 2;
  const gap = 28;

  function updateSlider(index) {
    currentIndex = Math.max(0, Math.min(index, cards.length - 1));

    // Update active dot
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    // Update active card class
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === currentIndex);
    });

    // Center the active card in the wrapper so side cards peek in
    const wrapperWidth = wrapper.offsetWidth;
    const cardWidth = cards[0].offsetWidth;
    const activeCenter = currentIndex * (cardWidth + gap) + cardWidth / 2;
    const targetX = wrapperWidth / 2 - activeCenter;

    track.style.transform = `translateX(${targetX}px)`;
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateSlider(index);
    });
  });

  // Clicking any card centers it
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      updateSlider(index);
    });
  });

  // Touch swipe & mouse drag support
  let startX = 0;
  let isDragging = false;

  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
  });

  window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = e.pageX - startX;
    if (diff < -40) updateSlider(currentIndex + 1);
    else if (diff > 40) updateSlider(currentIndex - 1);
  });

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (diff < -40) updateSlider(currentIndex + 1);
    else if (diff > 40) updateSlider(currentIndex - 1);
  }, { passive: true });

  // Recalculate centering when window resizes
  window.addEventListener('resize', () => {
    updateSlider(currentIndex);
  });

  // Initialize to Figma default position
  updateSlider(currentIndex);
});