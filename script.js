const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

//Unsplash API
const count = 10;
const apiKey ='pe8VJRTZkdCmAwZhHkkVSPqvYfnTfKPAXhQGR2ZsVNc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded(){
    console.log('image loaded');
}

function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}

// Pravljenje elemenata za linkove i slike
function displayPhotos(){
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        })
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Skidanje slika sa APIa
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        console.log()
    } catch(error){
        // Error
    }
}

// Trigger
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
        getPhotos();
    }
});

// Pokretanje
getPhotos();