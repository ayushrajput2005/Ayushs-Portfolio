// Placeholder for future JavaScript functionality

// Add click sound functionality
document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', () => {
        const audio = new Audio('assets/sfx/click.mp3');
        audio.play();
    });
});

const cursorCircle = document.querySelector('.cursor-circle');

// Update circle position on mousemove
document.addEventListener('mousemove', (e) => {
    cursorCircle.style.left = `${e.clientX}px`;
    cursorCircle.style.top = `${e.clientY}px`;
});

// Add hover effects for buttons and links
document.querySelectorAll('nav button, a').forEach((element) => {
    element.addEventListener('mouseenter', () => {
        cursorCircle.style.transform = 'translate(-50%, -50%) scale(2)';
        cursorCircle.style.opacity = '0.5';
    });
    element.addEventListener('mouseleave', () => {
        cursorCircle.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorCircle.style.opacity = '1';
    });
});

// Function to load content into the iframe
function loadSection(page) {
    const iframe = document.getElementById('content-frame');
    iframe.src = page;
}
