// Screen management
let currentScreen = 1;

function showScreen(screenNumber) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(`screen${screenNumber}`).classList.add('active');
    currentScreen = screenNumber;
}

// Screen 1: Welcome - Exit button behavior
const exitBtn = document.getElementById('exitBtn');
const enterBtn = document.getElementById('enterBtn');
let exitAttempts = 0;

exitBtn.addEventListener('mouseenter', () => {
    exitAttempts++;
    exitBtn.classList.add('running');

    const randomX = Math.random() * (window.innerWidth - 200);
    const randomY = Math.random() * (window.innerHeight - 100);

    exitBtn.style.left = randomX + 'px';
    exitBtn.style.top = randomY + 'px';

    // After 5 attempts, make it disappear
    if (exitAttempts >= 5) {
        setTimeout(() => {
            exitBtn.classList.add('disappear');
        }, 500);
    }
});

enterBtn.addEventListener('click', () => {
    showScreen(2);
    startLoadingScreen();
});

// Screen 2: Loading Screen
const loadingMessages = [
    "Calculating our compatibility... 99.9% ✓",
    "Checking your schedule for February 14th... ✓",
    "Measuring cuteness levels... Off the charts! ✓",
    "Scanning for Valentine availability... Perfect! ✓",
    "Preparing something special... Almost ready! ✓",
    "Loading the best decision you'll make today... 💕"
];

function startLoadingScreen() {
    const loadingText = document.getElementById('loadingText');
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');

    let messageIndex = 0;
    let progress = 0;

    const messageInterval = setInterval(() => {
        if (messageIndex < loadingMessages.length) {
            loadingText.textContent = loadingMessages[messageIndex];
            messageIndex++;
        } else {
            clearInterval(messageInterval);
        }
    }, 1500);

    const progressInterval = setInterval(() => {
        progress += 2;
        progressBar.style.width = progress + '%';
        progressPercent.textContent = progress + '%';

        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                showScreen(3);
            }, 500);
        }
    }, 100);
}

// Screen 3: Baguio Proposal
const nextBtn = document.getElementById('nextBtn');
nextBtn.addEventListener('click', () => {
    showScreen(4);
});

// Screen 4: The Big Question - NO button with error popup
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const noMessage = document.getElementById('noMessage');
const bigQuestion = document.querySelector('.big-question');
let noAttempts = 0;

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    noAttempts++;

    if (noAttempts === 1) {
        // Show error popup with image
        showErrorPopup();

        // After showing popup, hide NO button, show message, change question, and make YES bigger
        setTimeout(() => {
            noBtn.style.display = 'none';
            noMessage.textContent = "Looks like YES is your only option 😊";
            bigQuestion.textContent = "Will you be my Valentine plsss? 💕";
            yesBtn.style.transform = "scale(1.3)";
            yesBtn.style.fontSize = "1.8rem";
        }, 2000);
    }
});

function showErrorPopup() {
    // Create popup overlay
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    popup.style.background = 'rgba(0, 0, 0, 0.8)';
    popup.style.display = 'flex';
    popup.style.flexDirection = 'column';
    popup.style.alignItems = 'center';
    popup.style.justifyContent = 'center';
    popup.style.zIndex = '9999';
    popup.style.animation = 'fadeIn 0.3s ease';

    // Create error image
    const errorImg = document.createElement('img');
    errorImg.src = 'Assets/wrong.png';
    errorImg.style.maxWidth = '300px';
    errorImg.style.width = '80%';
    errorImg.style.marginBottom = '20px';
    errorImg.style.borderRadius = '20px';

    // Create error message
    const errorMsg = document.createElement('div');
    errorMsg.textContent = 'nahhh. wrong';
    errorMsg.style.color = 'white';
    errorMsg.style.fontSize = '2rem';
    errorMsg.style.fontWeight = 'bold';
    errorMsg.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';

    popup.appendChild(errorImg);
    popup.appendChild(errorMsg);
    document.body.appendChild(popup);

    // Remove popup after 1.5 seconds
    setTimeout(() => {
        popup.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            popup.remove();
        }, 300);
    }, 1500);
}

yesBtn.addEventListener('click', () => {
    showScreen(5);
    startCelebration();
});

// Screen 5: Celebration
function startCelebration() {
    const celebrationSound = document.getElementById('celebrationSound');
    celebrationSound.play().catch(e => console.log('Audio play failed:', e));

    // Confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Confetti from left
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });

        // Confetti from right
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
    }, 250);

    // Hearts animation
    createFloatingHearts();

    // Show booking confirmations
    setTimeout(() => showBookingConfirmation('Assets/float1.jpeg', 'Hotel Booking Confirmed! 🏨'), 2000);
    setTimeout(() => showBookingConfirmation('Assets/float2.jpeg', 'Bus Booking Confirmed! 🚌'), 4500);
}

function createFloatingHearts() {
    const hearts = ['💕', '💖', '💗', '💝', '❤️', '💘'];
    const container = document.querySelector('#screen5 .content');

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.bottom = '-50px';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.opacity = '0';
            heart.style.transition = 'all 3s ease-out';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '999';

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.style.bottom = '100vh';
                heart.style.opacity = '1';
                heart.style.transform = `translateX(${(Math.random() - 0.5) * 200}px) rotate(${Math.random() * 360}deg)`;
            }, 10);

            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 200);
    }
}

function showBookingConfirmation(imageSrc, title) {
    // Create popup overlay
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    popup.style.background = 'rgba(0, 0, 0, 0.85)';
    popup.style.display = 'flex';
    popup.style.flexDirection = 'column';
    popup.style.alignItems = 'center';
    popup.style.justifyContent = 'center';
    popup.style.zIndex = '10000';
    popup.style.animation = 'fadeIn 0.5s ease';
    popup.style.cursor = 'pointer';

    // Create title
    const titleElement = document.createElement('div');
    titleElement.textContent = title;
    titleElement.style.color = 'white';
    titleElement.style.fontSize = '2rem';
    titleElement.style.fontWeight = 'bold';
    titleElement.style.marginBottom = '20px';
    titleElement.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';

    // Create booking image
    const bookingImg = document.createElement('img');
    bookingImg.src = imageSrc;
    bookingImg.style.maxWidth = '90%';
    bookingImg.style.maxHeight = '70vh';
    bookingImg.style.borderRadius = '15px';
    bookingImg.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.5)';

    // Create close instruction
    const closeText = document.createElement('div');
    closeText.textContent = 'Click anywhere to close';
    closeText.style.color = 'rgba(255, 255, 255, 0.7)';
    closeText.style.fontSize = '1rem';
    closeText.style.marginTop = '20px';

    popup.appendChild(titleElement);
    popup.appendChild(bookingImg);
    popup.appendChild(closeText);
    document.body.appendChild(popup);

    // Click to close
    popup.addEventListener('click', () => {
        popup.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            popup.remove();
        }, 300);
    });
}

// Prevent right-click context menu for better mobile experience
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Handle screen orientation changes
window.addEventListener('resize', () => {
    // Reset positions of moving buttons if screen is resized
    if (exitBtn.classList.contains('running')) {
        exitBtn.style.left = '';
        exitBtn.style.top = '';
        exitBtn.classList.remove('running');
    }
});

// Initialize
console.log('Valentine\'s Website loaded! 💕');
