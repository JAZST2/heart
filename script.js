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

    // Shrink the button
    const scale = Math.max(0.3, 1 - (exitAttempts * 0.15));
    exitBtn.style.transform = `scale(${scale})`;

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

// Screen 4: The Big Question - Jeepney NO button
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const noMessage = document.getElementById('noMessage');
const honkSound = document.getElementById('honkSound');
let noAttempts = 0;

const jeepneyMessages = [
    "Nope, full na! 🚐",
    "Sorry, walang baba dito! 😅",
    "Next trip na lang! 💨",
    "BEEP BEEP! 🚐💨"
];

noBtn.addEventListener('mouseenter', () => {
    noAttempts++;

    // Play honk sound
    honkSound.currentTime = 0;
    honkSound.play().catch(e => console.log('Audio play failed:', e));

    noBtn.classList.add('moving');

    // Move the jeepney button
    const randomX = Math.random() * (window.innerWidth - 200);
    const randomY = Math.random() * (window.innerHeight - 100);

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // Show message
    if (noAttempts <= jeepneyMessages.length) {
        noMessage.textContent = jeepneyMessages[noAttempts - 1];
    }

    // Make it move faster each time
    noBtn.style.transition = `all ${Math.max(0.2, 0.5 - (noAttempts * 0.1))}s ease`;

    // After 3 attempts, drive it off screen
    if (noAttempts >= 3) {
        setTimeout(() => {
            noBtn.style.left = '-300px';
            noBtn.style.opacity = '0';
            noMessage.textContent = "Looks like YES is your only option 😊";
        }, 500);
    }
});

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Trigger the same behavior as hover
    noBtn.dispatchEvent(new Event('mouseenter'));
});

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
    if (noBtn.classList.contains('moving')) {
        noBtn.style.left = '';
        noBtn.style.top = '';
        noBtn.classList.remove('moving');
    }
});

// Initialize
console.log('Valentine\'s Website loaded! 💕');
