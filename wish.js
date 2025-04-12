document.addEventListener('DOMContentLoaded', function() {
    // Floating elements in background
    const bgAnimation = document.getElementById('bgAnimation');
    const elements = ['balloon', 'star', 'cake'];
    const colors = ['#FF69B4', '#FFD700', '#00BFFF', '#FF6347', '#7CFC00'];
    
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        const elementType = elements[Math.floor(Math.random() * elements.length)];
        element.className = `floating ${elementType}`;
        element.style.left = `${Math.random() * 100}%`;
        element.style.animationDuration = `${15 + Math.random() * 10}s`;
        element.style.animationDelay = `${Math.random() * 5}s`;
        bgAnimation.appendChild(element);
    }
    
    // Countdown Timer
    const targetDate = new Date("2025-09-28T00:00:00");
    
    function updateCountdown() {
        const currentDate = new Date();
        const difference = targetDate - currentDate;
        
        let days = Math.floor(difference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days < 10 ? `0${days}` : days;
        document.getElementById('hours').textContent = hours < 10 ? `0${hours}` : hours;
        document.getElementById('minutes').textContent = minutes < 10 ? `0${minutes}` : minutes;
        document.getElementById('seconds').textContent = seconds < 10 ? `0${seconds}` : seconds;
        
        // Add flip animation
        if (seconds % 10 === 0) {
            document.querySelectorAll('.countdown-number').forEach(el => {
                el.classList.add('flip');
                setTimeout(() => {
                    el.classList.remove('flip');
                }, 500);
            });
        }
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
    
    // Button actions
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surprisePopup = document.getElementById('surprisePopup');
    
    surpriseBtn.addEventListener('click', function() {
        surprisePopup.classList.add('active');
        createSparkles();
    });

    document.querySelector('.type1.button').addEventListener('click', function() {
window.location.href = 'puzzle.html';
});
    
    document.querySelector('.popup-close').addEventListener('click', function() {
        surprisePopup.classList.remove('active');
    });
    
    // Theme changer
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.dataset.theme;
            changeTheme(theme);
        });
    });
    
    function changeTheme(theme) {
        const root = document.documentElement;
        
        switch(theme) {
            case 'pastel':
                bgAnimation.style.background = 'linear-gradient(135deg, #FFDFD3, #FEC8D8)';
                break;
            case 'ocean':
                bgAnimation.style.background = 'linear-gradient(135deg, #2193b0, #6dd5ed)';
                break;
            case 'sunset':
                bgAnimation.style.background = 'linear-gradient(135deg, #FF512F, #F09819)';
                break;
            default:
                bgAnimation.style.background = 'linear-gradient(135deg, #00FFFF, #E6E6FA)';
        }
        
        // Show notification
        showNotification('Theme Changed', `Switched to ${theme} theme`, '🎨');
    }
    
    // Create sparkle effect
    function createSparkles() {
        const content = document.querySelector('.popup-content');
        
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            content.appendChild(sparkle);
            
            // Animate sparkle
            setTimeout(() => {
                sparkle.style.opacity = '1';
                setTimeout(() => {
                    sparkle.style.opacity = '0';
                    setTimeout(() => {
                        sparkle.remove();
                    }, 300);
                }, 700);
            }, Math.random() * 1000);
        }
    }
    
    // Show notification
    function showNotification(title, message, emoji = '🎉') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <span class="notification-emoji">${emoji}</span>
            <div>
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            </div>
            <span class="notification-close">&times;</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        });
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 5000);
    }
    
    // Birthday wishes generator
    const wishes = [
        "May your birthday be as special as you are!",
        "Wishing you a day filled with happiness and a year filled with joy.",
        "On your special day, I wish you good luck, joy, happiness, and all that your heart desires.",
        "Count your life by smiles, not tears. Count your age by friends, not years. Happy birthday!",
        "May the joy that you have spread in the past come back to you on this day. Happy birthday!",
        "Sending you smiles for every moment of your special day. Have a wonderful time and a very happy birthday!",
        "Hope your special day brings you all that your heart desires! Here's wishing you a day full of pleasant surprises!",
        "On your birthday may your spirit be enriched in light, love, and hope for a prosperous year ahead.",
        "Wishing you a beautiful day with good health and happiness forever. Happy birthday!",
        "The day is all yours — have fun!"
    ];
    
    document.getElementById('generateWishBtn').addEventListener('click', function() {
        const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
        const wishDisplay = document.getElementById('wishDisplay');
        
        wishDisplay.style.opacity = 0;
        
        setTimeout(() => {
            wishDisplay.textContent = randomWish;
            wishDisplay.style.opacity = 1;
        }, 300);
        
        showNotification('New Wish', 'Generated a special birthday wish for you!', '✨');
    });
    
    // Messages section
    const messageForm = document.getElementById('messageForm');
    const messagesContainer = document.getElementById('messagesContainer');
    
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        
        if (message) {
            addMessage('You', message);
            messageInput.value = '';
            
            showNotification('Message Added', 'Your birthday message has been added', '💌');
        }
    });
    
    function addMessage(author, text) {
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';
        
        messageItem.innerHTML = `
            <div class="message-author">${author}</div>
            <div class="message-text">${text}</div>
        `;
        
        messagesContainer.appendChild(messageItem);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Add some initial messages
    const initialMessages = [
        { author: 'Mom', text: 'Happy birthday, sweetheart! We are so proud of you. ❤️' },
        { author: 'Dad', text: 'Another year older, another year wiser. Have a great day!' },
        { author: 'Best Friend', text: 'Happy birthday! Can\'t wait to celebrate with you this weekend! 🎉' }
    ];
    
    initialMessages.forEach(msg => {
        addMessage(msg.author, msg.text);
    });
    
    // Timeline
    const timelineEvents = [
        { date: '1 Year Ago', description: 'Last year\'s birthday celebration at the Cake fest' },
        { date: '5 Years Ago', description: 'Remember that surprise party we threw? That was amazing!' },
        { date: '10 Years Ago', description: 'Your first double-digit birthday. You were so excited!' },
        { date: 'Birth', description: 'Where it all began! Welcome to the world!' }
    ];
    
    const timelineContainer = document.querySelector('.timeline-container');
    
    timelineEvents.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'timeline-event';
        
        eventElement.innerHTML = `
            <div class="timeline-date">${event.date}</div>
            <div class="timeline-description">${event.description}</div>
        `;
        
        timelineContainer.appendChild(eventElement);
    });
    
    // Balloon Pop Game
    const startGameBtn = document.getElementById('startGameBtn');
    const gameContainer = document.getElementById('gameContainer');
    let gameScore = 0;
    let gameTime = 30;
    let gameInterval;
    
    startGameBtn.addEventListener('click', function() {
        gameContainer.style.display = 'block';
        gameScore = 0;
        gameTime = 30;
        document.getElementById('gameScore').textContent = gameScore;
        document.getElementById('gameTime').textContent = gameTime;
        
        startGame();
        showNotification('Game Started', 'Pop the balloons before they float away!', '🎮');
        
        // Scroll to game
        gameContainer.scrollIntoView({ behavior: 'smooth' });
    });
    
    function startGame() {
        if (gameInterval) clearInterval(gameInterval);
        
        gameInterval = setInterval(() => {
            gameTime--;
            document.getElementById('gameTime').textContent = gameTime;
            
            if (gameTime <= 0) {
                clearInterval(gameInterval);
                endGame();
            }
            
            if (Math.random() < 0.3) {
                createBalloon();
            }
        }, 1000);
    }
    
    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'balloon-game';
        balloon.style.left = `${Math.random() * (gameContainer.offsetWidth - 40)}px`;
        
        gameContainer.appendChild(balloon);
        
        balloon.addEventListener('click', () => {
            popBalloon(balloon);
        });
        
        setTimeout(() => {
            if (balloon.parentNode === gameContainer) {
                gameContainer.removeChild(balloon);
            }
        }, 7000);
    }
    
    function popBalloon(balloon) {
        const rect = balloon.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        gameScore++;
        document.getElementById('gameScore').textContent = gameScore;
        
        createPopEffect(x, y);
        gameContainer.removeChild(balloon);
    }
    
    function createPopEffect(x, y) {
        const popEffect = document.createElement('div');
        popEffect.className = 'pop-effect';
        popEffect.textContent = '+1';
        popEffect.style.left = `${x - gameContainer.getBoundingClientRect().left}px`;
        popEffect.style.top = `${y - gameContainer.getBoundingClientRect().top}px`;
        
        gameContainer.appendChild(popEffect);
        
        setTimeout(() => {
            gameContainer.removeChild(popEffect);
        }, 500);
    }
    
    function endGame() {
        showNotification('Game Over', `Your final score: ${gameScore}`, '🏆');
        
        // Remove any remaining balloons
        document.querySelectorAll('.balloon-game').forEach(balloon => {
            balloon.remove();
        });
        
        setTimeout(() => {
            gameContainer.style.display = 'none';
        }, 3000);
    }
});