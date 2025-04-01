// Add at the beginning of the file
document.addEventListener('wheel', function(e) {
    if(e.ctrlKey) {
        e.preventDefault(); // Prevent zoom on Ctrl+scroll
    }
}, { passive: false });

document.addEventListener('keydown', function(e) {
    if(e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault(); // Prevent zoom on Ctrl+plus/minus/zero
    }
});

// Placeholder for future JavaScript functionality

// Fix click sound repetition
document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', () => {
        const audio = new Audio('assets/sfx/click.mp3');
        audio.currentTime = 0; // Reset audio to the start
        audio.play(); // Play the click sound
    });
});

// Add click sound effect to navigation buttons
document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', () => {
        const audio = new Audio('assets/sfx/click.mp3'); // Ensure the path is correct
        audio.currentTime = 0; // Reset audio to the start
        audio.play().catch(err => console.error('Error playing sound:', err)); // Play the click sound
    });
});

// Add click sound effect to tiles in extras
document.querySelectorAll('.extra-item').forEach(item => {
    item.addEventListener('click', () => {
        const audio = new Audio('assets/sfx/click.mp3'); // Ensure the path is correct
        audio.currentTime = 0; // Reset audio to the start
        audio.play().catch(err => console.error('Error playing sound:', err)); // Play the click sound
    });
});

const cursorCircle = document.querySelector('.cursor-circle');

// Unified cursor tracking across the entire document
document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        cursorCircle.style.left = `${e.clientX}px`;
        cursorCircle.style.top = `${e.clientY}px`;
    });
});

// Ensure the cursor works over iframes
const iframe = document.querySelector('.about iframe');
if (iframe) {
    iframe.addEventListener('mouseenter', () => {
        iframe.contentWindow.addEventListener('mousemove', (e) => {
            const rect = iframe.getBoundingClientRect();
            const iframeX = e.clientX + rect.left;
            const iframeY = e.clientY + rect.top;

            requestAnimationFrame(() => {
                cursorCircle.style.left = `${iframeX}px`;
                cursorCircle.style.top = `${iframeY}px`;
            });
        });
    });
}

// Add mouse overlay effect
document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
        document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
    });
});

// Button hover effects
document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        cursorCircle.style.transform = 'translate(-50%, -50%) scale(2)';
        cursorCircle.style.opacity = '0.5';
    });
    button.addEventListener('mouseleave', () => {
        cursorCircle.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorCircle.style.opacity = '0.9';
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

// Sound effects
const SOUNDS = {
    menuOpen: new Audio('assets/sfx/menu_open.mp3'),
    menuClose: new Audio('assets/sfx/menu_close.mp3'),
    hover: new Audio('assets/sfx/hover.mp3'),
    select: new Audio('assets/sfx/select.mp3')
};

// Define common styles to be used for both initial load and navigation
const commonStyles = `
    body {
        cursor: url('assets/images/cursor_link.png') 0 0, auto !important;
        color: var(--blasphemous-light);
        background: var(--blasphemous-dark);
        font-family: 'BlasphemousFont', Arial, sans-serif;
        text-shadow: 0 0 10px var(--blasphemous-gold);
        padding: 20px;
        overflow-y: auto;
    }
    h2 {
        color: var(--blasphemous-gold);
        text-shadow: 0 0 10px var(--blasphemous-gold);
        border-bottom: 2px solid var(--blasphemous-gold);
        padding-bottom: 10px;
        margin-bottom: 20px;
        font-variant: small-caps;
        letter-spacing: 2px;
    }
    .about-content {
        border: 1px solid var(--blasphemous-gold);
        padding: 20px;
        background: rgba(0, 0, 0, 0.3);
        box-shadow: 0 0 15px rgba(145, 111, 58, 0.2);
    }
    p {
        line-height: 1.6;
        text-shadow: 0 0 5px var(--blasphemous-light);
        margin: 10px 0;
    }
    .highlight {
        color: var(--blasphemous-gold);
        text-shadow: 0 0 8px var(--blasphemous-gold);
    }
    ::-webkit-scrollbar { display: none; }
    html { scrollbar-width: none; }
`;

// Function to apply styles to iframe
function applyStylesToIframe(iframe) {
    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const style = document.createElement('style');
        style.textContent = commonStyles;
        iframeDoc.head.appendChild(style);
    } catch (e) {
        console.log('Could not apply styles to iframe content');
    }
}

// Enhanced menu transition for iframe loading
function loadSection(page) {
    // Remove selected class from all buttons and links
    document.querySelectorAll('nav button, .extra-item a').forEach(btn => btn.classList.remove('selected'));

    // Add selected class to the clicked button or link
    const clickedElement = document.querySelector(`nav button[onclick="loadSection('${page}')"], .extra-item a[onclick="loadSection('${page}'); return false;"]`);
    if (clickedElement) {
        clickedElement.classList.add('selected');
    }

    // Load the page into the iframe
    const iframe = document.getElementById('content-frame');
    const transition = document.querySelector('.menu-transition');

    // Play sound and show transition
    SOUNDS.select.play();
    transition.style.opacity = '1';

    setTimeout(() => {
        iframe.src = page;
        iframe.onload = () => {
            applyStylesToIframe(iframe);
            // Hide transition
            setTimeout(() => {
                transition.style.opacity = '0';
            }, 500);
        };
    }, 500);
}

// Handle initial page load
window.addEventListener('load', () => {
    const iframe = document.getElementById('content-frame');
    const aboutButton = document.querySelector('nav button[onclick="loadSection(\'about.html\')"]');
    
    // Set initial selected button
    if (aboutButton) {
        aboutButton.classList.add('selected');
    }

    // Apply styles when iframe loads
    iframe.onload = () => applyStylesToIframe(iframe);
});

// Set initial selected state on load
window.addEventListener('load', () => {
    const currentPage = document.getElementById('content-frame').src.split('/').pop();
    const currentButton = document.querySelector(`nav button[onclick="loadSection('${currentPage}')"]`);
    if (currentButton) {
        currentButton.classList.add('selected');
    }
});

// Profile section positioning
function adjustProfileSection() {
    const profileSection = document.querySelector('.profile-section');
    const about = document.querySelector('.about');
    
    if (profileSection && about) {
        const aboutRect = about.getBoundingClientRect();
        profileSection.style.top = `${aboutRect.top}px`;
        profileSection.style.right = '5vw';
        profileSection.style.height = `${aboutRect.height}px`;
        profileSection.style.width = '400px';
    }
}

// Call on load and resize
window.addEventListener('load', adjustProfileSection);
window.addEventListener('resize', adjustProfileSection);

// Add hover sound effects to buttons
document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        SOUNDS.hover.play();
    });
});

// Add initial load styling
window.addEventListener('load', () => {
    const iframe = document.getElementById('content-frame');
    const currentPage = iframe.src.split('/').pop();
    
    // Set initial selected button
    const currentButton = document.querySelector(`nav button[onclick="loadSection('${currentPage}')"]`);
    if (currentButton) {
        currentButton.classList.add('selected');
    }

    // Apply styles to initial load
    iframe.onload = () => {
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const style = document.createElement('style');
            style.textContent = commonStyles;
            iframeDoc.head.appendChild(style);
        } catch (e) {
            console.log('Could not apply styles to iframe content');
        }
    };
});

// Background music mute/unmute functionality
const bgm = document.getElementById('bgm');
const muteButton = document.getElementById('mute-button');
const muteIcon = document.getElementById('mute-icon');

// Ensure the background music starts playing
bgm.volume = 0.5; // Set initial volume
bgm.play().catch(err => console.error('Error playing background music:', err));

muteButton.addEventListener('click', () => {
    if (bgm.muted) {
        bgm.muted = false;
        bgm.currentTime = 0; // Reset music to the start
        bgm.play().catch(err => console.error('Error playing background music:', err));
        muteIcon.src = 'assets/logo/unmute.png'; // Update icon to unmute
    } else {
        bgm.muted = true;
        bgm.pause(); // Pause the music
        muteIcon.src = 'assets/logo/mute.png'; // Update icon to mute
    }
});
