const watchlist = document.getElementById("watchlist");
const noMovies = document.getElementById("no-items");

renderWatchlist();

//Clear the local storage
document.getElementById("clear").addEventListener("click", function () {
	console.log("here");
	localStorage.clear();
});

//Remove from watchlist listener
watchlist.addEventListener("click", (e) => {
	if (e.target.classList.contains("remove-watchlist")) {
		removeFromWatchlist(e.target.getAttribute("movie-id"));
	}
});

async function renderWatchlist() {
	let movieIdArray = JSON.parse(localStorage.getItem("watchlist-movie-ids"));
	console.log(movieIdArray);
	// console.log(movieIdArray.length);
	//If no items
	if (!Array.isArray(movieIdArray) || !movieIdArray.length) {
		console.log("clear");
		noMovies.style.display = "flex";
		document.getElementById("main-section").classList.add("empty");
		noMovies.innerHTML = `
			<h2>Your watchlist is looking a little empty...</h2>
			<a href="./index.html" class="add-movies">
				<i class="fa-solid fa-circle-plus"></i>
				<h3>Let’s add some movies!</h3>
			</a>
		`;
		return 0;
	}

	movieIdArray.map(async (movieId) => {
		const result = await fetch(
			`http://www.omdbapi.com/?i=${movieId}&apikey=b7d2a6fb`
		);
		const movieData = await result.json();

		document.getElementById("main-section").classList.remove("empty");
		noMovies.style.display = "none";

		watchlist.innerHTML += `
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
                <h2 class="remove-watchlist" movie-id="${movieData.imdbID}"><i class="fa-solid fa-circle-minus remove-watchlist" movie-id="${movieData.imdbID}"></i> Remove from watchlist</h2>
            </div>
            <p class="movie-plot">${movieData.Plot}</p>   
        </div>
    </div> 
    <hr>
    `;
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
	watchlist.innerHTML = "";
	renderWatchlist();

	//Add something to notify user item has been removed to watchlist

	//If array is no empty display empty items again
}

//DUPLICATED CODE FROM INDEX.JS
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
