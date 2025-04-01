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

// Add click sound functionality
document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', () => {
        const audio = new Audio('assets/sfx/click.mp3');
        audio.play();
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

// Enhanced menu transition
function loadSection(page) {
    // Remove selected class from all buttons
    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('selected'));
    
    // Add selected class to clicked button
    const clickedButton = document.querySelector(`nav button[onclick="loadSection('${page}')"]`);
    if (clickedButton) {
        clickedButton.classList.add('selected');
    }

    // Existing loading logic
    const iframe = document.getElementById('content-frame');
    const transition = document.querySelector('.menu-transition');
    
    // Play sound and show transition
    SOUNDS.select.play();
    transition.style.opacity = '1';
    
    setTimeout(() => {
        iframe.src = page;
        iframe.onload = () => {
            // Apply Dark Souls styling to iframe content
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                const style = document.createElement('style');
                style.textContent = `
                    body {
                        cursor: url('assets/images/cursor_link.png') 0 0, auto !important;
                        color: #c7a649;
                        font-family: 'CustomFont', Arial, sans-serif;
                        text-shadow: 0 0 10px #c7a649;
                        padding: 20px;
                    }
                    h2 {
                        border-bottom: 1px solid #c7a649;
                        padding-bottom: 10px;
                    }
                    ul {
                        list-style: none;
                        padding: 0;
                    }
                    li {
                        margin: 15px 0;
                        transition: text-shadow 0.3s ease;
                    }
                    li:hover {
                        text-shadow: 0 0 15px #c7a649;
                    }
                `;
                iframeDoc.head.appendChild(style);
            } catch (e) {
                console.log('Could not apply styles to iframe content');
            }
            
            // Hide transition
            setTimeout(() => {
                transition.style.opacity = '0';
            }, 500);
        };
    }, 500);
}

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
