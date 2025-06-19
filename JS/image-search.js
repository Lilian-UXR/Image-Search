const SearchInput = document.getElementById("image-search-input");

const ImageContainer = document.querySelector(".js-image-container"); //where images should populate
let form = document.querySelector(".js-search-form");

const apikey = "api_key=inputkey"; //need key insert for it to work
const url = `https://api.giphy.com/v1/stickers/search?`;
const bounds = "&limit=25&rating=pg&lang=en";

// [ ] how to use secret api key and keep it a secret?
// [X] user input search item for images in HTML form
// [X] user input in HTML is linked in Javascript
// [X] javascript needs image search item to connect to api url
// [ ] api url needs to link to gif associated with search
// [ ] gif url need to generate and render HTML to display on page (innerHTML)

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

async function loadImages(SearchInput) {
  ImageContainer.innerHTML = "";
  if (SearchInput === null) {
    await getData();
  }
  return `
        <div class="images"> 
            <img src="${stickers.data.images.orignial.url}" 
            alt="${SearchInput.value} gif" />
        </div>
    `;
}
