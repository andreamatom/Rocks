  // SIZE OF GRID
  function updateColumns(value) {
    const maxValue = 17;
    const minValue = 4;
    const numColumns = maxValue + minValue - parseInt(value); // Inverts the range
    const grid = document.querySelector('.image-grid');
    grid.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
    console.log("Number of columns:", numColumns);
}

  // ABOUT BUTTON
function togglePopup() {
    var popup = document.getElementById('aboutPopup');
    var background = document.getElementById('popupBackground');
    if (popup.style.display === 'none') {
        popup.style.display = 'block';
        background.style.display = 'block'; // Show the background
    } else {
        popup.style.display = 'none';
        background.style.display = 'none'; // Hide the background
    }
}

// Connect the button to the toggle function
document.getElementById('aboutBtn').addEventListener('click', togglePopup);


  // FILTER 
        function filterImages(category) {
    const images = document.querySelectorAll('.image-item');

    images.forEach((image) => {
        if (category === 'all' || image.dataset.category === category) {
            image.style.display = 'block';
        } else {
            image.style.display = 'none';
        }
    });
}

 // ACTIVE BUTTON

function setActiveButton(clickedButton) {
    // Get all buttons
    const buttons = document.querySelectorAll('.filter-btn');

    // Remove the active class from all buttons
    buttons.forEach(button => {
        button.classList.remove('active-button');
    });

    // Add the active class to the clicked button
    clickedButton.classList.add('active-button');
}

// Add click event listeners to buttons
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        setActiveButton(this);
    });
});


    // SHUFFLE IMAGES 
function shuffleImages() {
    const grid = document.querySelector('.image-grid');
    const images = Array.from(grid.children); // Get all the image elements as an array
    let currentIndex = images.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = images[currentIndex];
        images[currentIndex] = images[randomIndex];
        images[randomIndex] = temporaryValue;
    }

    // Remove all existing images from the grid
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    // Append shuffled images back to the grid
    images.forEach(image => grid.appendChild(image));
}
    

 // SLIDESHOW 
 let modal = document.getElementById('imageModal');
let modalImg = document.getElementById('modalImage');
let images = document.querySelectorAll('.image-item img'); // Select all images you want to include in the slideshow
let currentIndex = 0;

// Function to open modal
function openModal(index) {
  modal.style.display = "block";
  modalImg.src = images[index].src; // Assuming images have a src attribute
  currentIndex = index;
}

// Close the modal
document.querySelector('.close').onclick = function() {
  modal.style.display = "none";
}

// Show previous image
document.querySelector('.prev').onclick = function() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  modalImg.src = images[currentIndex].src;
}

// Show next image
document.querySelector('.next').onclick = function() {
  currentIndex = (currentIndex + 1) % images.length;
  modalImg.src = images[currentIndex].src;
}

// Adding click event to images
images.forEach((img, index) => {
  img.onclick = () => openModal(index);
});

// Close button
document.getElementById('closeButton').addEventListener('click', function() {
    document.getElementById('imageModal').style.display = 'none';
});

// previous and next buttons 
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex].src;
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex].src;
});

// previous and next buttons (using keyboard shortcuts)
document.addEventListener('keydown', function(event) {
    if (modal.style.display === 'block') {  // Only respond if the modal is visible
        if (event.key === "ArrowRight") {  // Check if the right arrow key was pressed
            moveNext();  // Function to move to the next image
        } else if (event.key === "ArrowLeft") {  // Check if the left arrow key was pressed
            movePrev();  // Function to move to the previous image
        }
    }
});

function moveNext() {
    currentIndex = (currentIndex + 1) % images.length;  // Move to the next image
    modalImg.src = images[currentIndex].src;  // Update the source of the modal image
}

function movePrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;  // Move to the previous image, accounting for wrap-around
    modalImg.src = images[currentIndex].src;  // Update the source of the modal image
}

// Update existing click event listeners to use these functions
document.querySelector('.next').addEventListener('click', moveNext);
document.querySelector('.prev').addEventListener('click', movePrev);
