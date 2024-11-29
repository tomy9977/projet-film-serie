//gestion du menu latéral
let openBtn = document.getElementById("nav-open");
let closeBtn = document.getElementById("nav-close");
let navWrapper = document.getElementById("nav-wrapper");
let navLatteral = document.getElementById("nav-latteral");

const openNav = () => {
    navWrapper.classList.add("active");
    navLatteral.style.left = "0";
}

const closeNav = () => {
    navWrapper.classList.remove("active");
    navLatteral.style.left = "-100%";
}

openBtn .addEventListener("click" , openNav)
closeBtn .addEventListener("click" , closeNav)
navWrapper .addEventListener("click" , closeNav)



//clé api c18a944fa153e0a4327a36d2b9ea020d
// création du l'url genre
const baseUrl = `https://api.themoviedb.org/3`;
const genreUrl = `/genre/movie/list?language=fr`;

const genreLien = `${baseUrl}${genreUrl}`;

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMThhOTQ0ZmExNTNlMGE0MzI3YTM2ZDJiOWVhMDIwZCIsIm5iZiI6MTcyOTg5MDUzNy4wMDg5MDYsInN1YiI6IjY3MTdkNWEzYTc3YWYxZGJiYWY4YmEzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xvjyNliU2iApKKlX17SsPrHqlmBx_VXd8B9i9uGOhiA'
    }
  };



async function afficherGenre() {

    const response = await fetch(genreLien, options);
    const genre = await response.json();
    const genres = genre.genres;
    

    for (let i = 0; i < genres.length; i++) {
    
        const sectionCategories = document.querySelector(".categories");
        const categoriesElement = document.createElement("button");
        categoriesElement.classList.add("genreButton");
        categoriesElement.id = genres[i].id;
        categoriesElement.innerText = genres[i].name;
        categoriesElement.addEventListener("click", (event)=> {
            afficherFilmsParGenre(event.target.id, genres[i].name);
        })
        
        sectionCategories.appendChild(categoriesElement);
    
    }
    
}

afficherGenre();



// création de l'URL films du moment
const NowUrl = `/movie/now_playing?language=fr`

const NowLien = `${baseUrl}${NowUrl}`;



async function afficherImage (size, imgUrl) {
    const response = await fetch(`https://image.tmdb.org/t/p/${size}${imgUrl}?api_key=c18a944fa153e0a4327a36d2b9ea020d`);
    return response;
} 



async function afficherFilmsDuMoment() {
    const response = await fetch(NowLien, options);
    const now = await response.json();
    const nowPlaying = now.results;
    

    for (let i = 0; i < nowPlaying.length; i++) {

        const sectionAffiches = document.querySelector(".affiches");
        const affichesElement = document.createElement("img");
        affichesElement.src = (await afficherImage("w200", nowPlaying[i].poster_path)).url;

        sectionAffiches.appendChild(affichesElement);
    }
}

afficherFilmsDuMoment();



// Gestion du bouton "Voir plus de film"

let page = 1;

async function afficherPage (page) {

    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=fr&page=${page}`, options);
    const now = await response.json();
    const nowPlaying = now.results;
    

    for (let i = 0; i < nowPlaying.length; i++) {

        const sectionAffiches = document.querySelector(".affiches");
        const affichesElement = document.createElement("img");
        affichesElement.src = (await afficherImage("w200", nowPlaying[i].poster_path)).url;

        sectionAffiches.appendChild(affichesElement);
    }
}

const button = document.getElementById("voirPlusDeFilms");
button.addEventListener("click", async () => {
    page++;
    afficherPage(page);

})




// afficher les films selon les genres
async function afficherFilmsParGenre(genreId, genreName) {

    document.querySelector(".affiches").innerHTML = "";

    button.innerHTML = `Voir plus de films de type : ${genreName}`;

    for (page = 1; page < 300; page ++) {

        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=fr&page=${page}`, options);
        const now = await response.json();
        const nowPlaying = now.results;
    
        const filmParGenre = nowPlaying.filter((film) => {

            return film.genre_ids.includes(parseInt(genreId));
        })
        
        for (let i = 0; i < filmParGenre.length; i++) {

            const sectionAffiches = document.querySelector(".affiches");
            const affichesElement = document.createElement("img");
            affichesElement.src = (await afficherImage("w200", filmParGenre[i].poster_path)).url;
                
            sectionAffiches.appendChild(affichesElement);

            const image = document.querySelectorAll("img")
            if (image.length > 19) {
            break;
            }
        }

        const image = document.querySelectorAll("img")
        if (image.length > 19) {
            break;
        }
        
    }
    
}



// passer de films à series
const boutonSeries = document.getElementById("series");
boutonSeries.addEventListener("click", ()=> {
    document.location.href="series.html";
})

// au click sur le film

