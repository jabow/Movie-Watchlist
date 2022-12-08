const baseUrl = "https://www.omdbapi.com/?";

//Get users system theme setting
// getTheme();
function getTheme() {
	if (
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	) {
		// dark mode
		toggleDarkLightMode();
	}
}

function toggleDarkLightMode() {
	document.body.classList.toggle("dark-theme");
}

function toggleHide(x) {
	// var x = document.getElementById(id);
	if (x.style.display === "none") {
		x.style.display = "flex";
	} else {
		x.style.display = "none";
	}
}

function createMovieHtml(movieData, isOnWatchlist) {
	return `
    <div class="movie">
        <img src="${movieData.Poster}" class="movie-poster"/>
        <div class="sections">
            <div class="first-section">
                <h1 class="movie-title">${movieData.Title}</h1>
                <h2 class="movie-rating"><i class="fa-solid fa-star"></i> ${
					movieData.imdbRating
				}</h2>
            </div>
            <div class="second-section">
                <h2 class="movie-length">${movieData.Runtime}</h2>
                <h2 class="movie-genre">${movieData.Genre}</h2>
                <h2 class="add-remove-watchlist" movie-id="${
					movieData.imdbID
				}"><i class="fa-solid ${
		isOnWatchlist ? "fa-circle-minus" : "fa-circle-plus"
	} add-remove-watchlist" movie-id="${
		movieData.imdbID
	}"></i> Add to watchlist</h2>
            </div>
            <p class="movie-plot">${movieData.Plot}</p>   
        </div>
    </div> 
    <hr>
    `;
}

export { getTheme, toggleDarkLightMode, toggleHide, createMovieHtml, baseUrl };
