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
    calculateShippingDate(); // Call the function to calculate and display the shipping date on load
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


function getShippingDate() {
    var pincode = document.getElementById('pincode').value.trim(); // Trim to remove leading and trailing spaces
    if (pincode === '') {
        document.getElementById('shipping-date').innerText = '';
        document.getElementById('shipping-message').style.display = 'none';
        return;
    }
    var shippingDate = calculateShippingDate(); 
    document.getElementById('shipping-date').innerText = shippingDate;
    document.getElementById('shipping-message').style.display = 'block';
}

function calculateShippingDate() {
    var today = new Date();
    var shippingDate = new Date(today);
    shippingDate.setDate(today.getDate() + 15); 

    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var formattedShippingDate = "Guranteed Delivered by \n" + shippingDate.toLocaleDateString('en-US', options);

    return formattedShippingDate;
}


function updatePrice() {
    var quantity = document.getElementById('quantity').value;

    var basePrice = 899; 
    if (quantity == 1){
        var totalPrice = basePrice;
    }
    else if (quantity ==2){
        var totalPrice = 1599;
    }
    else if (quantity ==3){
        var totalPrice = 2199;
    }
    else if (quantity ==4){
        var totalPrice = 2799;
    }
    else if (quantity ==5){
        var totalPrice = 3299;
    }
    totalPrice = Math.round(totalPrice);
    

    document.getElementById('product-price').innerText = '₹ ' + totalPrice;
}

function shareContent() {
    if (navigator.share) {
        navigator.share({
            title: 'Customizable YouTube Play Button',
            text: 'Check out this amazing product!',
            url: window.location.href
        })
            .then(() => console.log('Shared successfully'))
            .catch((error) => console.error('Error sharing:', error));
    } else {
        alert('Web Share API is not supported in your browser. You can manually copy the link.');
    }
}

