const SearchInput = document.getElementById('image-search-input');

let SearchContainer = document.querySelector('.js-search-container');
let form = document.querySelector('.js-search-form');

const imageBeingSearched = `&q=${SearchInput.value}`;
const apikey = 'api_key=ihLC7ZyuQR0EdKRSflFGUrR3mv3tPAYn';
const url = `https://api.giphy.com/v1/stickers/search?`
const bounds = '&limit=25&rating=pg&lang=en'

// user input search item for images
// get image search item
// javascript needs image search item to connect to api url
// generate image gifs

async function getData() {
    let ImageUrl = url + apikey + imageBeingSearched + bounds;
    try {
        const response = await fetch(ImageUrl);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
    } catch (error) {
        console.error(error.message);
    }
}