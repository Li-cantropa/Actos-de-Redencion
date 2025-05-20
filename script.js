document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const disclaimerPage = document.getElementById('disclaimer-page');
    const startButton = document.getElementById('start-button');
    const galleryPage = document.getElementById('gallery-page');
    const photoFrames = document.querySelectorAll('.photo-frame');
    const storyPages = document.querySelectorAll('.story-page');
    const backButtons = document.querySelectorAll('.back-button');
    const fullscreenTransition = document.getElementById('fullscreen-transition');
    const transitionImage = document.getElementById('transition-image');
    
    // Audio elements
    const audioElements = {
        blackwater: document.getElementById('blackwater-audio'),
        gun: document.getElementById('gun-audio'),
        horse: document.getElementById('horse-audio'),
        death: document.getElementById('death-audio'),
        deer: document.getElementById('deer-audio')
    };
    
    // Start button click
    startButton.addEventListener('click', function() {
        disclaimerPage.style.display = 'none';
        galleryPage.style.display = 'flex';
    });
    
    // Photo frame click
    photoFrames.forEach(frame => {
        frame.addEventListener('click', function() {
            const storyId = this.getAttribute('data-story');
            const storyPage = document.getElementById(`${storyId}-story`);
            const img = this.querySelector('img');
            
            // Set transition image
            transitionImage.src = img.src;
            
            // Show fullscreen transition
            fullscreenTransition.classList.add('active');
            
            // After transition
            setTimeout(() => {
                fullscreenTransition.classList.remove('active');
                galleryPage.style.display = 'none';
                storyPage.style.display = 'block';
                
                // Play audio
                if (audioElements[storyId]) {
                    audioElements[storyId].currentTime = 0;
                    audioElements[storyId].play();
                }
            }, 1000);
        });
    });
    
    // Back buttons
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Stop all audio
            Object.values(audioElements).forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });
            
            // Hide story pages
            storyPages.forEach(page => {
                page.style.display = 'none';
            });
            
            // Show gallery
            galleryPage.style.display = 'flex';
        });
    });
});