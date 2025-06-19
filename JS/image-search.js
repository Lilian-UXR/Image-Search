const SearchInput = document.getElementById('image-search-input');

let SearchContainer = document.querySelector('.js-search-container'); //where images should populate
let form = document.querySelector('.js-search-form');

const imageBeingSearched = `&q=${SearchInput.value}`;
const apikey = 'api_key=ihLC7ZyuQR0EdKRSflFGUrR3mv3tPAYn'; //note this is old key
const url = `https://api.giphy.com/v1/stickers/search?`
const bounds = '&limit=25&rating=pg&lang=en'

// user input search item for images in HTML form
// use input in HTML is linked in Javascript
// javascript needs image search item to connect to api url
// api url links need to generate and render HTML to display on page (innerHTML)

async function getData() {
    let ImageUrl = url + apikey + imageBeingSearched + bounds;
    try {
        const response = await fetch(ImageUrl);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const blob = await response.blob();
        const objectURL = ImageUrl.createObjectURL(blob);
        image.src = objectURL;
    } catch (error) {
        console.error(error.message);
    }
}