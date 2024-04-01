window.onload = function() {
    const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    displayImages(savedImages);
};

document.getElementById('saveBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('imageInput');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        saveToLocalStorage(file);
        fileInput.value = '';
    } else {
        alert('Please select an image file.');
    }
});

function saveToLocalStorage(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        let savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
        savedImages.push(event.target.result);
        localStorage.setItem('savedImages', JSON.stringify(savedImages));
        displayImages(savedImages);
        alert('Image saved successfully!');
    };
    reader.readAsDataURL(file);
}

function displayImages(images) {
    const galleryDiv = document.querySelector('.gallery');
    galleryDiv.innerHTML = '';
    images.forEach(imgUrl => {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-lg-4', 'col-sm-6');

        const thumbnailDiv = document.createElement('div');
        thumbnailDiv.classList.add('thumbnail');

        const imgElement = document.createElement('img');
        imgElement.src = imgUrl;
        imgElement.classList.add('img-responsive');

        thumbnailDiv.appendChild(imgElement);
        colDiv.appendChild(thumbnailDiv);
        galleryDiv.appendChild(colDiv);
    });
}