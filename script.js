let currentIndex = 0;
let isVideo = false;

function showImage(imageSrc) {
    document.getElementById('main-image').src = imageSrc;
    document.getElementById('main-image').style.display = 'block';
    document.getElementById('main-video').style.display = 'none';
    isVideo = false;
}

function showVideo(videoSrc) {
    document.getElementById('main-image').style.display = 'none';
    const videoElement = document.getElementById('main-video');
    videoElement.src = videoSrc;
    videoElement.style.display = 'block';
    isVideo = true;
}

function showNext() {
    currentIndex++;
    updateGallery();
}

function showPrev() {
    currentIndex--;
    updateGallery();
}

function updateGallery() {
    
    const thumbnails = document.getElementsByClassName('thumbnail');
    const totalItems = thumbnails.length;

    if (currentIndex >= totalItems) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalItems - 1;
    }

    for (let i = 0; i < totalItems; i++) {
        thumbnails[i].classList.remove('highlight');
    }

    const selectedElement = thumbnails[currentIndex];

    selectedElement.classList.add('highlight');

    if (selectedElement.tagName === 'IMG') {
        showImage(selectedElement.src);
    } else if (selectedElement.tagName === 'VIDEO') {
        const videoSrc = selectedElement.querySelector('source').src;
        showVideo(videoSrc);
    }
}


window.addEventListener('load', function () {
    updateGallery();
});

document.getElementById('next-btn').addEventListener('click', function () {
    if (isVideo) {
        currentIndex++;
    }
    updateGallery();
});

document.getElementById('prev-btn').addEventListener('click', function () {
    if (isVideo) {
        currentIndex--;
    }
    updateGallery();
});