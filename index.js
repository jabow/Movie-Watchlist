// import {
// 	renderWatchlist,
// 	createMovieHtml,
// 	watchlistArray,
// } from "./watchlist.js";

const searchBtn = document.getElementById("searchButton");
const movies = document.getElementById("find-movies");
const noMovies = document.getElementById("no-items");
// const addWatchlist = document.getElementById("add-watchlist");
// const watchlist = document.getElementById("watchlist");

//TESTING
document.getElementById("main-section").classList.remove("empty");
noMovies.style.display = "none";
handleSearch();

//END TESTING

//Search button
searchBtn.addEventListener("click", function () {
	document.getElementById("main-section").classList.remove("empty");
	noMovies.style.display = "none";
	handleSearch();
});

//Add to watchlist listener
movies.addEventListener("click", (e) => {
	if (e.target.classList.contains("add-watchlist")) {
		addToWatchlist(e.target.getAttribute("movie-id"));
	}
});

async function handleSearch() {
	const searchTerm = document.getElementById("searchTerm").value;
	const res = await fetch(
		`http://www.omdbapi.com/?s=${searchTerm}&type=movie&apikey=b7d2a6fb`
	);
	const data = await res.json();
	movies.innerHTML = "";
	//Map through all the movies returned and search based on their ID to find more detailed info
	data.Search.map(async (film) => {
		const result = await fetch(
			`http://www.omdbapi.com/?i=${film.imdbID}&apikey=b7d2a6fb`
		);
		const movieData = await result.json();
		movies.innerHTML += createMovieHtml(movieData);
	});
	// console.log(watchlistArray);
}

function createMovieHtml(movieData) {
	return `
    <div class="movie">
        <img src="${movieData.Poster}" class="movie-poster"/>
        <div class="sections">
            <div class="first-section">
                <h1 class="movie-title">${movieData.Title}</h1>
                <h2 class="movie-rating"><i class="fa-solid fa-star"></i> ${movieData.imdbRating}</h2>
            </div>
            <div class="second-section">
                <h2 class="movie-length">${movieData.Runtime}</h2>
                <h2 class="movie-genre">${movieData.Genre}</h2>
                <h2 class="add-watchlist" movie-id="${movieData.imdbID}"><i class="fa-solid fa-circle-plus add-watchlist" movie-id="${movieData.imdbID}"></i> Add to watchlist</h2>
            </div>
            <p class="movie-plot">${movieData.Plot}</p>   
        </div>
    </div> 
    <hr>
    `;
}

function addToWatchlist(movieId) {
	//Get the current storage array and push the new id to it before setting the localStorage including the new ID
	let arr = JSON.parse(localStorage.getItem("watchlist-movie-ids"));
	if (arr === null) {
		arr = new Array();
	}
	arr.push(movieId);
	console.log(arr);
	localStorage.setItem("watchlist-movie-ids", JSON.stringify(arr));

	//Add something to notify user item has been added to watchlist
}

// function renderWatchlist() {
// 	console.log(watchlistArray);
// 	watchlist.innerHTML += "<div>hello</div>";
// 	watchlistArray.map(
// 		(movie) => console.log("movie") //(watchlist.innerHTML += createMovieHtml(movie)
// 	);
// }

async function getMovieById(id) {
	const res = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=b7d2a6fb`);
	const data = await res.json();
	return data;
}

//Get users system theme setting
getTheme();
function getTheme() {
	if (
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	) {
		// dark mode
		toggleDarkLightMode();
	}
}

//check for changes in users system theme setting
window
	.matchMedia("(prefers-color-scheme: dark)")
	.addEventListener("change", (event) => {
		//Check the current setting and only change if it doesnt match
		if (event.matches && !document.body.classList.contains("dark-theme")) {
			//dark
			toggleDarkLightMode();
		} else if (
			!event.matches &&
			document.body.classList.contains("dark-theme")
		) {
			//light
			toggleDarkLightMode();
		}
	});

function toggleDarkLightMode() {
	document.body.classList.toggle("dark-theme");
}

function toggleHide(id) {
	var x = document.getElementById(id);
	if (x.style.display === "none") {
		x.style.display = "flex";
	} else {
		x.style.display = "none";
	}
}
