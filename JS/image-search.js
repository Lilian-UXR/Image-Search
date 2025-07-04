const SearchInput = document.getElementById("image-search-input");

const ImageContainer = document.querySelector(".js-image-container"); //where images should populate
let form = document.querySelector(".js-search-form");

const apikey = "api_key=2T5hIWRqWzcVN4P6Qj3xVFzwRanNS4ur"; //need key insert for it to work
const url = `https://api.giphy.com/v1/stickers/search?`;
const bounds = "&rating=pg&lang=en";

// [X] confirm I have to use SASS as a styling sheet? can use css in project
// [X] how to use secret api key and keep it a secret? no need api key to launch project
// [X] user input search item for images in HTML form
// [X] user input in HTML is linked in Javascript
// [X] javascript needs image search item to connect to api url
// [X] api url needs to link to gif associated with search
// [X] gif url need to generate and render HTML to display on page (innerHTML)
// [X] reset search output after submission

async function getData() {
  if (!SearchInput.value.trim()) {
    return;
  }
  const imageBeingSearched = `&q=${SearchInput.value}`;
  let ImageUrl = url + apikey + imageBeingSearched + bounds;
  console.log(ImageUrl);
  try {
    const response = await fetch(ImageUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    let html = '<ul class="gif-images">';
    ImageContainer.innerHTML='';
    for (let i = 0; i <= 29; ++i) {
      const gifUrl = data.data[i].images.original.url;
      ImageContainer.innerHTML += `
        <div class="images">
          <img src="${gifUrl}" alt="${SearchInput.value} gif" />
        </div>
      `;
    }
    html += "</ul>";
    return html;
  } catch (error) {
    console.error(error.message);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getData();
  document.getElementById("image-search-input")='';
});
