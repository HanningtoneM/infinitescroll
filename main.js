function getDocumentHeight() { // get the height of the document 
    const body = document.body; // get the body element
    const html = document.documentElement; // get the html element

    return Math.max( // get the maximum value of the body and html element
        body.scrollHeight, body.offsetHeight, // get the height of the body and offset height
        html.clientHeight, html.scrollHeight, html.offsetHeight // get the height of the html element and offset height
    );
};

function getScrollTop() { // get the scroll top value of the window
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop; // get the scroll top value of the window
}

function generateImageSourceUrl() { // generate the image source url
    const hash = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);  // generate a random number
    return `http://api.adorable.io/avatars/250/${hash}`; // return the image source url
}

function getElementImage() { // get the image element
    const cssImageClass = 'element-list__item__image';  // get the css image class
    const cssImageLoadingClass = `${cssImageClass}--loading`; // get the css image loading class
	
    const image = new Image; // create a new image element
    image.className = `${cssImageClass} ${cssImageLoadingClass}`; // set the image class name
    image.src = generateImageSourceUrl(); // set the image source url
    image.onload = function () { // on image load
        setTimeout(() => image.classList.remove(cssImageLoadingClass),5000) // remove the css image loading class after 5 seconds
    };

    return image; // return the image element
}

function getElement() { // get the element
    const elementImage = getElementImage(); // get the element image
    const element = document.createElement('div'); // create a new element
    element.className = 'element-list__item'; // set the element class name
    element.appendChild(elementImage);  // append the element image to the element
    return element; // return the element
}

function loadNextBatch(batchSize = 9) {     // load the next batch of elements
    while (batchSize--) {  // while the batch size is greater than 0
			  const element = getElement(); // get the element
        elementList.appendChild(element); // append the element to the element list
    }
}

const elementList = document.querySelector('.element-list'); // get the element list

// Load the first batch of elements
loadNextBatch(); // load the next batch of elements

// Load more batches when scorlling to the end
window.onscroll = function () { // on window scroll
    if (getScrollTop() < getDocumentHeight() - window.innerHeight) return; // if the scroll top is less than the document height minus the window height
    loadNextBatch(); // load the next batch of elements
};