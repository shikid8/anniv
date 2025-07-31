// Animasi bunga tumbuh saat klik di mana saja
function createFlowerSVG(x, y) {
    const flower = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    flower.setAttribute('width', 48);
    flower.setAttribute('height', 64);
    flower.setAttribute('viewBox', '0 0 48 64');
    flower.classList.add('growing-flower');
    flower.style.left = (x - 24) + 'px';
    flower.style.top = (y - 48) + 'px';
    flower.innerHTML = `
      <g>
        <!-- Tangkai dan daun (langsung tampil) -->
        <rect x="22" y="28" width="4" height="28" rx="2" fill="#388e3c"/>
        <ellipse cx="24" cy="56" rx="7" ry="3" fill="#388e3c" opacity=".3"/>
        <ellipse cx="18" cy="44" rx="5" ry="2.2" fill="#43a047" transform="rotate(-18 18 44)"/>
        <ellipse cx="30" cy="38" rx="4" ry="1.7" fill="#43a047" transform="rotate(18 30 38)"/>
        <!-- Kelopak bawah -->
        <ellipse cx="24" cy="28" rx="10" ry="7" fill="#b71c1c" opacity=".7"/>
        <!-- Kepala mawar (dianimasikan) -->
        <g class="rose-head">
          <ellipse cx="24" cy="18" rx="10" ry="10" fill="#e53935"/>
          <ellipse cx="24" cy="18" rx="7" ry="7" fill="#c62828"/>
          <path d="M24 8 Q28 12 24 18 Q20 24 24 28" stroke="#fff" stroke-width="1.2" fill="none"/>
          <ellipse cx="20" cy="14" rx="2.5" ry="4" fill="#fff" opacity=".13"/>
          <ellipse cx="28" cy="22" rx="2.5" ry="4" fill="#fff" opacity=".09"/>
        </g>
      </g>
    `;
    flower.style.position = 'absolute';
    flower.style.pointerEvents = 'none';
    document.body.appendChild(flower);
    setTimeout(() => {
        flower.style.transition = 'opacity 0.7s';
        flower.style.opacity = '0';
        setTimeout(() => flower.remove(), 700);
    }, 1200);
}
document.addEventListener('click', function(e) {
    // Jangan munculkan bunga jika klik pada tombol atau input
    if (e.target.closest('button, input, textarea, select, audio')) return;
    createFlowerSVG(e.clientX, e.clientY);
});
// Music player logic
const audio = document.getElementById('annivAudio');
const playPauseBtn = document.getElementById('playPauseBtn');
if (audio && playPauseBtn) {
    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '&#10073;&#10073; Pause Lagu';
            playPauseBtn.classList.add('active');
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '&#9658; Putar Lagu';
            playPauseBtn.classList.remove('active');
        }
    });
    audio.addEventListener('ended', function() {
        playPauseBtn.innerHTML = '&#9658; Putar Lagu';
        playPauseBtn.classList.remove('active');
    });
}
// Countdown logic
function updateCountdowns() {
    const startDate = new Date('2019-08-01T00:00:00');
    const now = new Date();
    // Time together
    let diff = now - startDate;
    const years = now.getFullYear() - startDate.getFullYear();
    const months = now.getMonth() - startDate.getMonth() + (years * 12);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    document.getElementById('timeTogether').textContent = `${years} years, ${months % 12} months, ${days % 30} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    // Next anniversary
    let nextAnnivYear = now.getMonth() > 7 || (now.getMonth() === 7 && now.getDate() >= 1) ? now.getFullYear() + 1 : now.getFullYear();
    const nextAnniv = new Date(`${nextAnnivYear}-08-01T00:00:00`);
    let diffNext = nextAnniv - now;
    const nDays = Math.floor(diffNext / (1000 * 60 * 60 * 24));
    const nHours = Math.floor((diffNext / (1000 * 60 * 60)) % 24);
    const nMinutes = Math.floor((diffNext / (1000 * 60)) % 60);
    const nSeconds = Math.floor((diffNext / 1000) % 60);
    document.getElementById('nextAnniv').textContent = `${nDays} days, ${nHours} hours, ${nMinutes} minutes, ${nSeconds} seconds`;
}
setInterval(updateCountdowns, 1000);
updateCountdowns();

// Animasi bunga dihapus

// Memories (photo gallery with scroll animation)
const photoList = [
    'assets/photos/1.jpg',
    'assets/photos/2.jpg',
    'assets/photos/3.jpg',
    'assets/photos/4.jpg',
    'assets/photos/5.jpg',
    'assets/photos/6.jpg',
    'assets/photos/7.jpg',
    'assets/photos/8.jpg',
    'assets/photos/9.jpg',
    'assets/photos/10.jpg',
    'assets/photos/11.jpg',
    'assets/photos/12.jpg',
];
// Carousel logic
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
let currentIdx = 0;
let autoSlideInterval = null;

function getVisibleCount() {
    return window.innerWidth < 600 ? 2 : 3;
}

function renderCarousel() {
    carouselTrack.innerHTML = '';
    // Looping: tampilkan 3/2 foto, dan duplikat di awal/akhir agar seamless
    const visibleCount = getVisibleCount();
    const total = photoList.length;
    // Ambil index foto yang akan tampil (looping)
    let idxs = [];
    for (let i = -Math.floor(visibleCount/2); i <= Math.floor(visibleCount/2); i++) {
        let idx = (currentIdx + i + total) % total;
        idxs.push(idx);
    }
    if (visibleCount === 2) idxs = [currentIdx, (currentIdx+1)%total];
    idxs.forEach((idx, i) => {
        const div = document.createElement('div');
        div.className = 'carousel-photo' + (i === Math.floor(visibleCount/2) ? ' active' : '');
        const img = document.createElement('img');
        img.src = photoList[idx];
        div.appendChild(img);
        carouselTrack.appendChild(div);
    });
    // Geser track agar foto aktif di tengah
    const photoWidth = carouselTrack.querySelector('.carousel-photo')?.offsetWidth || (window.innerWidth < 600 ? 180 : 440);
    const gap = window.innerWidth < 600 ? 6 : 36;
    const containerWidth = carouselTrack.parentElement.offsetWidth;
    const offset = Math.floor(visibleCount/2);
    // Hitung agar foto aktif benar-benar di tengah container
    const totalWidth = (photoWidth + gap) * visibleCount;
    const leftSpace = (containerWidth - photoWidth) / 2;
    carouselTrack.style.transform = `translateX(${-offset * (photoWidth + gap) + leftSpace}px)`;
}
function showPrev() {
    currentIdx = (currentIdx - 1 + photoList.length) % photoList.length;
    renderCarousel();
    resetAutoSlide();
}
function showNext() {
    currentIdx = (currentIdx + 1) % photoList.length;
    renderCarousel();
    resetAutoSlide();
}
function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        currentIdx = (currentIdx + 1) % photoList.length;
        renderCarousel();
    }, 3000);
}
function resetAutoSlide() {
    startAutoSlide();
}
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);
}

// Touch support for mobile swipe
let touchStartX = 0;
let touchEndX = 0;
let isDragging = false;

carouselTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    isDragging = true;
    resetAutoSlide(); // Pause auto-slide while touching
}, { passive: true });

carouselTrack.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    isDragging = false;
}, { passive: true });

carouselTrack.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    // Add visual feedback during swipe
    const currentX = e.changedTouches[0].screenX;
    const diff = currentX - touchStartX;
    const maxDiff = 50; // Limit the visual feedback
    const limitedDiff = Math.max(-maxDiff, Math.min(maxDiff, diff * 0.3));
    
    // Apply temporary transform for visual feedback
    const photoWidth = carouselTrack.querySelector('.carousel-photo')?.offsetWidth || 180;
    const gap = window.innerWidth < 600 ? 6 : 36;
    const containerWidth = carouselTrack.parentElement.offsetWidth;
    const visibleCount = getVisibleCount();
    const offset = Math.floor(visibleCount/2);
    const leftSpace = (containerWidth - photoWidth) / 2;
    const baseTransform = -offset * (photoWidth + gap) + leftSpace;
    
    carouselTrack.style.transform = `translateX(${baseTransform + limitedDiff}px)`;
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeLength = touchEndX - touchStartX;
    
    if (Math.abs(swipeLength) > swipeThreshold) {
        if (swipeLength > 0) {
            // Swiped right - show previous
            showPrev();
        } else {
            // Swiped left - show next
            showNext();
        }
    } else {
        // Not enough swipe distance, reset position
        renderCarousel();
    }
}

// Mouse drag support for desktop
let mouseStartX = 0;
let isMouseDragging = false;

carouselTrack.addEventListener('mousedown', (e) => {
    mouseStartX = e.clientX;
    isMouseDragging = true;
    resetAutoSlide();
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!isMouseDragging) return;
    const currentX = e.clientX;
    const diff = currentX - mouseStartX;
    const maxDiff = 50;
    const limitedDiff = Math.max(-maxDiff, Math.min(maxDiff, diff * 0.3));
    
    const photoWidth = carouselTrack.querySelector('.carousel-photo')?.offsetWidth || 180;
    const gap = window.innerWidth < 600 ? 6 : 36;
    const containerWidth = carouselTrack.parentElement.offsetWidth;
    const visibleCount = getVisibleCount();
    const offset = Math.floor(visibleCount/2);
    const leftSpace = (containerWidth - photoWidth) / 2;
    const baseTransform = -offset * (photoWidth + gap) + leftSpace;
    
    carouselTrack.style.transform = `translateX(${baseTransform + limitedDiff}px)`;
});

document.addEventListener('mouseup', (e) => {
    if (!isMouseDragging) return;
    const mouseEndX = e.clientX;
    const swipeLength = mouseEndX - mouseStartX;
    const swipeThreshold = 50;
    
    if (Math.abs(swipeLength) > swipeThreshold) {
        if (swipeLength > 0) {
            showPrev();
        } else {
            showNext();
        }
    } else {
        renderCarousel();
    }
    
    isMouseDragging = false;
});

window.addEventListener('resize', renderCarousel);
renderCarousel();
startAutoSlide();

// Tambahkan body kupu-kupu secara dinamis agar tetap di atas sayap
document.querySelectorAll('.butterfly').forEach(bf => {
    const body = document.createElement('span');
    bf.appendChild(body);
});
