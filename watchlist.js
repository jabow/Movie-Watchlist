import { getTheme, toggleDarkLightMode, createMovieHtml } from "./utils.js";

const watchlist = document.getElementById("find-movies");
const noMovies = document.getElementById("no-items");

getTheme();
renderWatchlist();

//Clear the local storage FOR TESTING PURPOSES
function clearLocalStorage() {
	localStorage.clear();
}

//Remove from watchlist listener
watchlist.addEventListener("click", (e) => {
	if (e.target.classList.contains("add-remove-watchlist")) {
		removeFromWatchlist(e.target.getAttribute("movie-id"));
	}
});

async function renderWatchlist() {
	let movieIdArray = JSON.parse(localStorage.getItem("watchlist-movie-ids"));

	//If no items
	if (!Array.isArray(movieIdArray) || !movieIdArray.length) {
		noMovies.style.display = "flex";
		document.getElementById("main-section").classList.add("empty");
		noMovies.innerHTML = `
			<h2>Your watchlist is looking a little empty...</h2>
			<a href="./index.html" class="add-movies">
				<i class="fa-solid fa-circle-plus"></i>
				<h3>Let’s add some movies!</h3>
			</a>
		`;
		return;
	}

	movieIdArray.map(async (movieId) => {
		const result = await fetch(
			`http://www.omdbapi.com/?i=${movieId}&apikey=b7d2a6fb`
		);
		const movieData = await result.json();
		document.getElementById("main-section").classList.remove("empty");
		noMovies.style.display = "none";
		watchlist.innerHTML += createMovieHtml(movieData, true);
	});
}

function removeFromWatchlist(movieId) {
	//Get the current storage array and push the new id to it before setting the localStorage including the new ID
	let arr = JSON.parse(localStorage.getItem("watchlist-movie-ids"));
	var index = arr.indexOf(movieId);
	if (index !== -1) {
		arr.splice(index, 1);
	}
	localStorage.setItem("watchlist-movie-ids", JSON.stringify(arr));
	console.log("removed");
	watchlist.innerHTML = "";
	renderWatchlist();

	//Add something to notify user item has been removed to watchlist
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
