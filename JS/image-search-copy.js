let SearchContainer = document.querySelector('.js-search-container');
let form = document.querySelector('.js-search-form');
let SearchInput = document.querySelector('[name=search-name]');

const q = SearchInput.value;
const apikey = 'ihLC7ZyuQR0EdKRSflFGUrR3mv3tPAYn';
const path = `https://api.giphy.com/v1/stickers/search?api_key=${apikey}&q=${q}&limit=25&lang=en'


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