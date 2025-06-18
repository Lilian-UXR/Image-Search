let SearchContainer = document.querySelector('.js-search-container');
let form = document.querySelector('.js-search-form');
let SearchInput = document.querySelector('[name=search-name]');

const q = SearchInput.value;
const apikey = 'ihLC7ZyuQR0EdKRSflFGUrR3mv3tPAYn';
const path = `https://api.giphy.com/v1/stickers/search?api_key=${apikey}&q=${q}&limit=25&lang=en'

function fetchRepo(repoName) {
    fetch(`https://api.github.com/users/${repoName}/repos`)
        .then(data => data.json())
        .then(response => {
            // erroneous response is not an array, but an object
            if (!Array.isArray(response)) {
                throw 'Erroneous response';
            }
            let processedResponse = '<ul>' + response
                .map(repo => `
                    <li>
                        <a href="${repo.url}">${repo.name}</a>
                        (forks: ${repo.forks})
                    </li>
                `)
                .join('') + '</ul>';
            repoContainer.innerHTML = processedResponse;
        });
        .catch(err => {
            console.warn(err);
            repoContainer.innerHTML = `<p>Error fetching repo ${repoName}</p>`;
        });
}

function formSubmitted(event) {
    event.preventDefault();
    //prevent default to prevent auto reloading of the page
    let repoName = repoInput.value;
    fetchRepo(repoName);
}

form.addEventListener('submit', formSubmitted);


const categoryContainer = document.querySelector('.js-category-container');
let categories = null;
const imageContainer = document.querySelector('.js-image-container');

function getCategoryById(id) {
    if (categories === null) {
        return null;
    }
    return categories.find(category => category.idCategory === String(id));
}

async function loadCategories() {
    imageContainer.innerHTML = '';
    if (categories === null) {
        await fetchCategories()
    }
    displayCategories();
}

function renderCategory(category, wide=false) {
    return `
        <div 
            class="category-item ${wide===true ? 'wide' : ''}" 
            data-id="${category.idCategory}">
            <h2>${category.strCategory}</h2>
            <img
                src="${category.strCategoryThumb}"
                alt="${category.strCategory}" />
            <p>${category.strCategoryDescription}</p>
        </div>
    `;
} 


function displayCategories() {
    if (categories === null) {
        return;
    }
    categoryContainer.innerHTML = categories
        .map(category => renderCategory(category))
        .join('');
}

async function fetchCategories() {
    const data = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    const response = await data.json();
    categories = response.categories;
    return {
        categoriesLoaded: true
    }; 
} 

function renderImages(image) {
    let html = '<ul class="image-list">';
    for (let i = 1; i <= 20; ++i) {
        const imageValue = meal['strImage' + i];
        const imageMeasure = meal['strMeasure' + i];
        if (typeof imageValue === 'string' && imageValue.length > 0) {
            html += `<li>${imageValue} (${imageMeasure})</li>`;
        }
    }
    html += '</ul>';
    return html;
}

function renderImage(image) {
    const imagesHtml = renderImages(image);

    return `
        <div class="meal wide">
            <h2>${image.strImage}</h2>
            <img src="${image.strMealThumb}" alt="${image.strMeal}" />
            <p>${image.strInstructions}</p>
            ${imagesHtml}
        </div>
    `;
}

function isPromiseFulfilled(response) {
    return response => response.status === 'fulfilled';
}

function displayImageDetails(ImageResponses) {
    imageContainer.innerHTML = ImageResponses
        .filter(isPromiseFulfilled)
        .map(response => response.value.images[0]) //these arrays have a length of 1
        .map(image => renderMeal(image))
        .join('');
}

async function loadImagesByCategory(response) {
    const imageList = response.images.slice(0, 10); 

    const imagePromiseList = imageList.map(meal =>
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
            .then(data => data.json())
    );

    let results = await Promise.allSettled(imagePromiseList);
    await displayImageDetails(results);
}

async function fetchImageListByCategory(currentCategory) {
    const categoryName = currentCategory.strCategory;
    const URL_PREFIX = `https://www.themealdb.com/api/json/v1/1/filter.php?c=`;

    const data = await fetch(URL_PREFIX + categoryName);
    return data.json();
}

async function categoryClicked(event) {
    const id = event.target.dataset.id || event.target.parentElement.dataset.id;
    if (typeof id === 'undefined') {
        return;
    } else if (id === 'all') {
        loadCategories();
    } else {
        const currentCategory = getCategoryById(id);
        categoryContainer.innerHTML = `
            ${renderCategory(currentCategory, true)}
            <button data-id="all">Choose another category</button>
        `;

        imageContainer.innerHTML = 'Loading...'; //everything above was regular synchronous code until here

        let imageList = await fetchMealListByCategory(currentCategory);
        await loadImagesByCategory(imageList);
    }
} 

categoryContainer.addEventListener('click', categoryClicked);
loadCategories();



$(document).ready(() => {
    $("#submit").click(() => {
        let userInput=$("#search").val()
        //alert('clicked!')
        $.ajax({
            url:`https://api.giphy.com/v1/stickers/search?api_key=${apikey}&q=${q}&limit=25&lang=en'
        })
        .done((res) => {
            let images = res.Search
            $.each(images, (i, e) => {
                let image = e.image
                console.log("image", image)
                $("body").append(`<img src="${image}" alt="image" />`)
            })
        })
    })
})

const q = 'cats'
const apikey = 'ihLC7ZyuQR0EdKRSflFGUrR3mv3tPAYn'
const path = `https://api.giphy.com/v1/stickers/search?api_key=${apikey}&q=${q}&limit=25&lang=en'
https://api.giphy.com/v1/stickers/search?api_key=ihLC7ZyuQR0EdKRSflFGUrR3mv3tPAYn&q=cats&limit=25&lang=en

const p = fetch(path)

fetch(path)
    .then(function(response) {
    return response.json()
}) 
    .then(function(json) {
    console.log(json)
})