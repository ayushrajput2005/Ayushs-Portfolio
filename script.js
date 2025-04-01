// Initialize audio
const bgm = document.getElementById('bgm');
const muteButton = document.getElementById('mute-button');
const muteIcon = document.getElementById('mute-icon');
bgm.volume = 0.2;

// Function to play music
function playMusic() {
    bgm.play().catch(error => {
        console.error("Autoplay prevented:", error);
    });
}

// Play music on load
document.addEventListener('DOMContentLoaded', playMusic);

muteButton.addEventListener('click', () => {
    bgm.muted = !bgm.muted;
    muteIcon.src = bgm.muted ? 'assets/logo/mute.png' : 'assets/logo/unmute.png';
    if (!bgm.muted) {
        bgm.currentTime = 0; // Reset to the beginning
        bgm.play().catch(console.error);
    }
});

let hasInteracted = false;

// Function to start background music
function startBackgroundMusic() {
    if (!hasInteracted) {
        bgm.play()
            .then(() => {
                hasInteracted = true;
                console.log('Music started successfully');
            })
            .catch(err => {
                console.error('Failed to play music:', err);
                // Retry on next interaction
                hasInteracted = false;
            });
    }
}

// Add event listeners for user interaction
['click', 'touchstart', 'keydown'].forEach(event => {
    document.addEventListener(event, startBackgroundMusic, { once: true });
});

document.addEventListener('wheel', function(e) {
    if(e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('keydown', function(e) {
    if(e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
    }
});

document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', () => {
        const audio = new Audio('assets/sfx/click.mp3');
        audio.currentTime = 0;
        audio.play();
    });
});

document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', () => {
        const audio = new Audio('assets/sfx/click.mp3');
        audio.currentTime = 0;
        audio.play().catch(err => console.error('Error playing sound:', err));
    });
});

document.querySelectorAll('.extra-item').forEach(item => {
    item.addEventListener('click', () => {
        const audio = new Audio('assets/sfx/click.mp3');
        audio.currentTime = 0;
        audio.play().catch(err => console.error('Error playing sound:', err));
    });
});

const cursorCircle = document.querySelector('.cursor-circle');

document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        cursorCircle.style.left = `${e.clientX}px`;
        cursorCircle.style.top = `${e.clientY}px`;
    });
});

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

document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
        document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
    });
});

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

document.querySelectorAll('nav button, a').forEach((element) => {
    element.addEventListener('mouseenter', () => {
        cursorCircle.style.transform = 'translate(-50%, -50%) scale(2)';
        cursorCircle.style.opacity = '0.5';
    });
    element.addEventListener('mouseleave', () => {
        cursorCircle.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorCircle.style.opacity = '0.9';
    });
});

const SOUNDS = {
    menuOpen: new Audio('assets/sfx/menu_open.mp3'),
    menuClose: new Audio('assets/sfx/menu_close.mp3'),
    hover: new Audio('assets/sfx/hover.mp3'),
    select: new Audio('assets/sfx/select.mp3')
};

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

function loadSection(page) {
    document.querySelectorAll('nav button, .extra-item a').forEach(btn => btn.classList.remove('selected'));

    const clickedElement = document.querySelector(`nav button[onclick="loadSection('${page}')"], .extra-item a[onclick="loadSection('${page}'); return false;"]`);
    if (clickedElement) {
        clickedElement.classList.add('selected');
    }

    const iframe = document.getElementById('content-frame');
    const transition = document.querySelector('.menu-transition');

    SOUNDS.select.play();
    transition.style.opacity = '1';

    setTimeout(() => {
        iframe.src = page;
        iframe.onload = () => {
            applyStylesToIframe(iframe);
            setTimeout(() => {
                transition.style.opacity = '0';
            }, 250);
        };
    }, 250);
}

window.addEventListener('load', () => {
    const iframe = document.getElementById('content-frame');
    const aboutButton = document.querySelector('nav button[onclick="loadSection(\'about.html\')"]');
    
    if (aboutButton) {
        aboutButton.classList.add('selected');
    }

    iframe.onload = () => applyStylesToIframe(iframe);
});

window.addEventListener('load', () => {
    const currentPage = document.getElementById('content-frame').src.split('/').pop();
    const currentButton = document.querySelector(`nav button[onclick="loadSection('${currentPage}')"]`);
    if (currentButton) {
        currentButton.classList.add('selected');
    }
});

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

window.addEventListener('load', adjustProfileSection);
window.addEventListener('resize', adjustProfileSection);

document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        SOUNDS.hover.play();
    });
});

window.addEventListener('load', () => {
    const iframe = document.getElementById('content-frame');
    const currentPage = iframe.src.split('/').pop();
    
    const currentButton = document.querySelector(`nav button[onclick="loadSection('${currentPage}')"]`);
    if (currentButton) {
        currentButton.classList.add('selected');
    }

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
