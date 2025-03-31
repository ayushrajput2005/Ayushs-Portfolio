// Placeholder for future JavaScript functionality

// Add click sound functionality
document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', () => {
        const audio = new Audio('assets/sfx/click.mp3');
        audio.play();
    });
});

const cursorCircle = document.querySelector('.cursor-circle');

// Enhanced cursor circle tracking
document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        cursorCircle.style.left = `${e.clientX}px`;
        cursorCircle.style.top = `${e.clientY}px`;
    });
});

// Add hover effects for buttons and links
document.querySelectorAll('nav button, a').forEach((element) => {
    element.addEventListener('mouseenter', () => {
        cursorCircle.style.transform = 'translate(-50%, -50%) scale(2)'; /* Expand circle */
        cursorCircle.style.opacity = '0.5'; /* Fade effect */
    });
    element.addEventListener('mouseleave', () => {
        cursorCircle.style.transform = 'translate(-50%, -50%) scale(1)'; /* Reset size */
        cursorCircle.style.opacity = '0.9'; /* Reset opacity */
    });
});

// Function to load content into the iframe and apply cursor style
function loadSection(page) {
    const iframe = document.getElementById('content-frame');
    iframe.src = page;
    
    // Apply cursor style to iframe content after it loads
    iframe.onload = () => {
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const style = document.createElement('style');
            style.textContent = `
                * {
                    cursor: url('assets/images/cursor_link.png') 0 0, auto !important;
                }
            `;
            iframeDoc.head.appendChild(style);
        } catch (e) {
            console.log('Could not apply cursor style to iframe content');
        }
    };
}
