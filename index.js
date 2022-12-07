import { getTheme, toggleDarkLightMode, createMovieHtml } from "./utils.js";

const searchBtn = document.getElementById("searchButton");
const movies = document.getElementById("find-movies");
const noMovies = document.getElementById("no-items");

getTheme();

//Search button clicked
searchBtn.addEventListener("click", function () {
	document.getElementById("main-section").classList.remove("empty");
	noMovies.style.display = "none";
	handleSearch();
});

//Add to watchlist clicked
movies.addEventListener("click", (e) => {
	if (e.target.classList.contains("add-remove-watchlist")) {
		addToWatchlist(e.target.getAttribute("movie-id"));
	}
});

async function handleSearch() {
	const searchTerm = document.getElementById("searchTerm").value;

	//If search value is empty
	if (!searchTerm) {
		noFilms("Nothing was entered in the search box");
		return;
	}

	const res = await fetch(
		`http://www.omdbapi.com/?s=${searchTerm}&type=movie&apikey=b7d2a6fb`
	);
	const data = await res.json();

	//If no movies are found
	if (data.Response === "False") {
		noFilms(data.Error);
		return;
	}

	movies.innerHTML = "";
	//Map through all the movies returned and search based on their ID to find more detailed info
	data.Search.map(async (film) => {
		const result = await fetch(
			`http://www.omdbapi.com/?i=${film.imdbID}&apikey=b7d2a6fb`
		);
		const movieData = await result.json();
		movies.innerHTML += createMovieHtml(movieData, false);
	});
}

function addToWatchlist(movieId) {
	let arr = JSON.parse(localStorage.getItem("watchlist-movie-ids"));
	if (arr === null) {
		arr = new Array();
	}
	arr.push(movieId);
	localStorage.setItem("watchlist-movie-ids", JSON.stringify(arr));
	console.log("added");
	//Add something to notify user item has been added to watchlist
}

function noFilms(message) {
	console.log("clear");
	document.getElementById("main-section").classList.add("empty");
	noMovies.style.display = "flex";
	movies.innerHTML = "";
	noMovies.innerHTML = `
        <h2>${message} Please try another search.</h2>
    `;
	return;
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
