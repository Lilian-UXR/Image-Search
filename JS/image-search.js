const SearchInput = document.getElementById("image-search-input");

let SearchContainer = document.querySelector(".js-search-container"); //where images should populate
let form = document.querySelector(".js-search-form");

const apikey = "api_key=insertapikeylater"; //need key insert for it to work
const url = `https://api.giphy.com/v1/stickers/search?`;
const bounds = "&limit=25&rating=pg&lang=en";

// how to use secret api key and keep it a secret?
// user input search item for images in HTML form
// use input in HTML is linked in Javascript
// javascript needs image search item to connect to api url
// api url links need to generate and render HTML to display on page (innerHTML)

async function getData() {
  const imageBeingSearched = `&q=${SearchInput.value}`;
  let ImageUrl = url + apikey + imageBeingSearched + bounds;
  console.log(ImageUrl);
  try {
    const response = await fetch(ImageUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getData();
});
