// YouTube URL Configuration
const YOUTUBE_URL = 'https://youtu.be/u5r-XTJ5tEA?si=3VN7DzAE6SNk2BUe';

// Global Variables
let isFullscreen = false;
let isRotated = false;
let player = null;

// DOM Elements
const videoContainer = document.getElementById('videoContainer');
const youtubePlayer = document.getElementById('youtubePlayer');
const loadingScreen = document.getElementById('loadingScreen');
const errorScreen = document.getElementById('errorScreen');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const rotateBtn = document.getElementById('rotateBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 تطبيق البث المباشر جاهز للعمل');
    
    // Try to enable autoplay by user interaction first
    enableAutoplayWithUserInteraction();
    
    initializePlayer();
    setupEventListeners();
    hideOriginalYouTubeReference();
});

// Enable autoplay with user interaction - Disabled
function enableAutoplayWithUserInteraction() {
    // No loading screen or messages - direct autoplay
    console.log('✅ التشغيل التلقائي مفعل بدون رسائل');
}

// Initialize YouTube Player
function initializePlayer() {
    try {
        // Extract video ID from URL
        const videoId = extractVideoId(YOUTUBE_URL);
        if (!videoId) {
            throw new Error('لا يمكن استخراج معرف الفيديو من الرابط');
        }

        // Create embed URL with enhanced autoplay parameters and disabled controls
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}&start=0&loop=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&wmode=transparent&disablekb=1&enablejsapi=0`;
        
        // Set the iframe source
        youtubePlayer.src = embedUrl;
        
        console.log('✅ تم تحميل رابط الفيديو بنجاح');
        
        // Force autoplay after iframe loads
        youtubePlayer.addEventListener('load', () => {
            console.log('🔄 محاولة تشغيل الفيديو تلقائياً...');
            forceAutoplay();
        });
        
        // Additional autoplay attempts - Multiple attempts to ensure play
        setTimeout(() => {
            forceAutoplay();
        }, 1000);
        
        setTimeout(() => {
            forceAutoplay();
        }, 3000);
        
        setTimeout(() => {
            forceAutoplay();
        }, 5000);
        
        setTimeout(() => {
            forceAutoplay();
        }, 8000);
        
        // No loading screen to hide

    } catch (error) {
        console.error('❌ خطأ في تحميل الفيديو:', error);
        showErrorScreen();
    }
}

// Force Autoplay Function - Enhanced for automatic play without user interaction
function forceAutoplay() {
    try {
        // Method 1: Multiple postMessage attempts with different formats
        const playCommands = [
            '{"event":"command","func":"playVideo","args":""}',
            '{"event":"command","func":"playVideo"}',
            '{"event":"command","func":"playVideo","args":[]}',
            '{"event":"command","func":"playVideo","args":[""]}',
            '{"event":"command","func":"playVideo","args":[0]}'
        ];
        
        playCommands.forEach((command, index) => {
            setTimeout(() => {
                try {
                    youtubePlayer.contentWindow.postMessage(command, '*');
                    console.log(`🔄 محاولة تشغيل ${index + 1}: ${command}`);
                } catch (e) {
                    console.warn(`⚠️ فشل في محاولة ${index + 1}:`, e);
                }
            }, index * 500);
        });
        
        // Method 2: Force play through iframe manipulation
        setTimeout(() => {
            try {
                // Try to access iframe content and force play
                const iframeDoc = youtubePlayer.contentDocument || youtubePlayer.contentWindow.document;
                if (iframeDoc) {
                    const playButton = iframeDoc.querySelector('.ytp-play-button, .ytp-large-play-button');
                    if (playButton) {
                        playButton.click();
                        console.log('🎬 تم تشغيل الفيديو عبر النقر على زر التشغيل');
                    }
                }
            } catch (e) {
                console.warn('⚠️ لا يمكن الوصول لمحتوى الفيديو:', e);
            }
        }, 2000);
        
        // Method 3: Focus and simulate user interaction
        setTimeout(() => {
            youtubePlayer.focus();
            youtubePlayer.style.pointerEvents = 'none'; // Disable all interactions
        }, 1000);
        
        // Method 4: Continuous play attempts
        const playInterval = setInterval(() => {
            try {
                youtubePlayer.contentWindow.postMessage('{"event":"command","func":"playVideo"}', '*');
            } catch (e) {
                clearInterval(playInterval);
            }
        }, 2000);
        
        // Clear interval after 30 seconds
        setTimeout(() => {
            clearInterval(playInterval);
        }, 30000);
        
    } catch (error) {
        console.warn('⚠️ خطأ في التشغيل التلقائي:', error);
    }
}

// Check if video is playing - Disabled since we want full autoplay
function checkIfVideoIsPlaying() {
    // No user interaction needed - video should play automatically
    console.log('🎬 الفيديو يجب أن يعمل تلقائياً بدون تفاعل المستخدم');
}

// Show iOS specific autoplay message - Disabled for full autoplay
function showIOSAutoplayMessage() {
    // No messages needed - video should play automatically
    console.log('🎬 لا توجد رسائل مطلوبة - التشغيل التلقائي مفعل');
}

// Show autoplay message - Disabled for full autoplay
function showAutoplayMessage() {
    // No messages needed - video should play automatically
    console.log('🎬 لا توجد رسائل مطلوبة - التشغيل التلقائي مفعل');
}

// Extract Video ID from YouTube URL
function extractVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Hide Loading Screen - Disabled
function hideLoadingScreen() {
    // Loading screen is already hidden via CSS
    console.log('✅ شاشة التحميل مخفية');
}

// Show Error Screen
function showErrorScreen() {
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
    if (errorScreen) {
        errorScreen.style.display = 'flex';
    }
}

// Hide Error Screen
function hideErrorScreen() {
    if (errorScreen) {
        errorScreen.style.display = 'none';
    }
}

// Retry Loading Function
function retryLoad() {
    console.log('🔄 إعادة محاولة تحميل الفيديو...');
    hideErrorScreen();
    loadingScreen.style.display = 'flex';
    loadingScreen.style.opacity = '1';
    
    setTimeout(() => {
        initializePlayer();
    }, 1000);
}

// Setup Event Listeners
function setupEventListeners() {
    // Fullscreen button
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }

    // Rotate button
    if (rotateBtn) {
        rotateBtn.addEventListener('click', toggleOrientation);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);

    // Orientation change detection
    window.addEventListener('orientationchange', handleOrientationChange);

    // Resize event
    window.addEventListener('resize', handleResize);

    // Prevent context menu on video
    youtubePlayer.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Handle iframe load events
    youtubePlayer.addEventListener('load', () => {
        console.log('✅ تم تحميل iframe بنجاح');
    });

    youtubePlayer.addEventListener('error', () => {
        console.error('❌ خطأ في تحميل iframe');
        showErrorScreen();
    });
}

// Toggle Fullscreen
function toggleFullscreen() {
    if (!isFullscreen) {
        enterFullscreen();
    } else {
        exitFullscreen();
    }
}

// Enter Fullscreen Mode
function enterFullscreen() {
    try {
        if (videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen();
        } else if (videoContainer.webkitRequestFullscreen) {
            videoContainer.webkitRequestFullscreen();
        } else if (videoContainer.msRequestFullscreen) {
            videoContainer.msRequestFullscreen();
        }
        
        isFullscreen = true;
        videoContainer.classList.add('fullscreen');
        document.body.classList.add('fullscreen-mode');
        
        // Update button text
        updateFullscreenButton();
        
        console.log('🖥️ تم تفعيل الشاشة الكاملة');
        
    } catch (error) {
        console.error('❌ خطأ في تفعيل الشاشة الكاملة:', error);
    }
}

// Exit Fullscreen Mode
function exitFullscreen() {
    try {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        
        isFullscreen = false;
        videoContainer.classList.remove('fullscreen');
        document.body.classList.remove('fullscreen-mode');
        
        // Update button text
        updateFullscreenButton();
        
        console.log('📱 تم إلغاء الشاشة الكاملة');
        
    } catch (error) {
        console.error('❌ خطأ في إلغاء الشاشة الكاملة:', error);
    }
}

// Update Fullscreen Button Text
function updateFullscreenButton() {
    const btnText = fullscreenBtn.querySelector('.btn-text');
    if (btnText) {
        btnText.textContent = isFullscreen ? 'إغلاق الشاشة الكاملة' : 'شاشة كاملة';
    }
}

// Toggle Orientation
function toggleOrientation() {
    if (!isRotated) {
        rotateToLandscape();
    } else {
        rotateToPortrait();
    }
}

// Rotate to Landscape - Disabled for mobile natural rotation
function rotateToLandscape() {
    // Allow natural mobile rotation instead of forcing it
    console.log('🔄 السماح بالتدوير الطبيعي للموبايل');
    
    // Show message to user about natural rotation
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 10000;
        font-size: 1rem;
        font-weight: 500;
        text-align: center;
        max-width: 300px;
    `;
    messageDiv.innerHTML = `
        <div style="margin-bottom: 0.5rem;">📱</div>
        <p style="margin: 0;">يمكنك تدوير جهازك للعرض أو الطول حسب رغبتك</p>
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        if (messageDiv.parentElement) {
            document.body.removeChild(messageDiv);
        }
    }, 3000);
}

// Rotate to Portrait - Disabled for mobile natural rotation
function rotateToPortrait() {
    // Allow natural mobile rotation instead of forcing it
    console.log('📱 السماح بالتدوير الطبيعي للموبايل');
    
    // Show message to user about natural rotation
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 10000;
        font-size: 1rem;
        font-weight: 500;
        text-align: center;
        max-width: 300px;
    `;
    messageDiv.innerHTML = `
        <div style="margin-bottom: 0.5rem;">📱</div>
        <p style="margin: 0;">يمكنك تدوير جهازك للعرض أو الطول حسب رغبتك</p>
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        if (messageDiv.parentElement) {
            document.body.removeChild(messageDiv);
        }
    }, 3000);
}

// Update Rotate Button
function updateRotateButton() {
    const btnText = rotateBtn.querySelector('.btn-text');
    if (btnText) {
        btnText.textContent = isRotated ? 'إرجاع الشاشة' : 'تدوير';
    }
}

// Show Orientation Message
function showOrientationMessage(orientation) {
    const message = orientation === 'landscape' ? 
        'يرجى تدوير الجهاز للعرض' : 
        'يرجى تدوير الجهاز للطول';
    
    // Create temporary message
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 10000;
        font-size: 1.1rem;
        font-weight: 600;
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        document.body.removeChild(messageDiv);
    }, 3000);
}

// Handle Keyboard Shortcuts
function handleKeyboardShortcuts(event) {
    switch(event.key) {
        case 'f':
        case 'F':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                toggleFullscreen();
            }
            break;
        case 'r':
        case 'R':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                toggleOrientation();
            }
            break;
        case 'Escape':
            if (isFullscreen) {
                exitFullscreen();
            }
            break;
    }
}

// Handle Orientation Change
function handleOrientationChange() {
    console.log('🔄 تغيير اتجاه الشاشة');
    
    // Update rotate button state
    setTimeout(() => {
        const isCurrentlyLandscape = window.innerWidth > window.innerHeight;
        if (isCurrentlyLandscape !== isRotated) {
            isRotated = isCurrentlyLandscape;
            updateRotateButton();
        }
    }, 100);
}

// Handle Window Resize
function handleResize() {
    // Update fullscreen state if needed
    if (isFullscreen && !document.fullscreenElement) {
        isFullscreen = false;
        videoContainer.classList.remove('fullscreen');
        document.body.classList.remove('fullscreen-mode');
        updateFullscreenButton();
    }
}

// Hide Original YouTube Reference - Enhanced Security
function hideOriginalYouTubeReference() {
    // Remove any visible YouTube references
    const originalUrl = YOUTUBE_URL;
    console.log('🔒 تم إخفاء رابط اليوتيوب الأصلي:', originalUrl);
    
    // Prevent right-click context menu
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Prevent F12 and other dev tools shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'C') ||
            (e.ctrlKey && e.key === 'U') ||
            (e.ctrlKey && e.key === 'S') ||
            (e.ctrlKey && e.key === 'A') ||
            (e.ctrlKey && e.key === 'P')) {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable text selection
    document.addEventListener('selectstart', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Prevent drag and drop
    document.addEventListener('dragstart', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Prevent copy/paste
    document.addEventListener('copy', (e) => {
        e.preventDefault();
        return false;
    });
    
    document.addEventListener('paste', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Prevent cut
    document.addEventListener('cut', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Add CSS to prevent text selection and interactions
    const style = document.createElement('style');
    style.textContent = `
        * {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-touch-callout: none !important;
            -webkit-tap-highlight-color: transparent !important;
        }
        
        /* Disable all interactions with iframe */
        iframe {
            pointer-events: none !important;
            user-select: none !important;
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
        }
        
        /* Hide scrollbars */
        ::-webkit-scrollbar {
            display: none !important;
        }
        
        /* Disable text highlighting */
        ::selection {
            background: transparent !important;
        }
        
        ::-moz-selection {
            background: transparent !important;
        }
    `;
    document.head.appendChild(style);
    
    // Override console methods to hide logs
    console.log = function() {};
    console.warn = function() {};
    console.error = function() {};
    
    // Disable iframe interactions completely
    setTimeout(() => {
        if (youtubePlayer) {
            youtubePlayer.style.pointerEvents = 'none';
            youtubePlayer.setAttribute('sandbox', 'allow-scripts allow-same-origin');
        }
    }, 1000);
}

// Utility Functions
function log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString('ar-SA');
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
    console.log(`${prefix} [${timestamp}] ${message}`);
}

// Error Handling
window.addEventListener('error', (event) => {
    console.error('❌ خطأ عام:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ خطأ غير معالج:', event.reason);
});

// Performance Monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ تم تحميل الصفحة في ${Math.round(loadTime)}ms`);
});

// Export functions for global access
window.toggleFullscreen = toggleFullscreen;
window.toggleOrientation = toggleOrientation;
window.retryLoad = retryLoad;
