const watchlist = document.getElementById("watchlist");
const noMovies = document.getElementById("no-items");

renderWatchlist();

//Clear the local storage
document.getElementById("clear").addEventListener("click", function () {
	console.log("here");
	localStorage.clear();
});

async function renderWatchlist() {
	let movieIdArray = JSON.parse(localStorage.getItem("watchlist-movie-ids"));
	console.log(movieIdArray);

	//If no items
	if (movieIdArray === null) {
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
                <h2 id="add-watchlist"><i class="fa-solid fa-circle-minus" movie-id="${movieData.imdbID}"></i> Add to watchlist</h2>
            </div>
            <p class="movie-plot">${movieData.Plot}</p>   
        </div>
    </div> 
    <hr>
    `;
	});
}

// export { renderWatchlist, createMovieHtml, watchlistArray };

// `
//     <div class="movie">
//         <img src="${movieData.Poster}" class="movie-poster"/>
//         <div class="sections">
//             <div class="first-section">
//                 <h1 class="movie-title">${movieData.Title}</h1>
//                 <h2 class="movie-rating">${movieData.imdbRating}</h2>
//             </div>
//             <div class="second-section">
//                 <h2 class="movie-length">${movieData.Runtime}</h2>
//                 <h2 class="movie-genre">${movieData.Genre}</h2>
//                 <h2 id="add-watchlist">Add to watchlist</h2>
//             </div>
//             <p class="movie-plot">${movieData.Plot}</p>
//         </div>
//     </div>
//     <hr>
//     `

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
