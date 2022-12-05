const searchBtn = document.getElementById("searchButton");

searchBtn.addEventListener("click", handleSearch);

async function handleSearch() {
	const searchTerm = document.getElementById("searchTerm").value;
	const res = await fetch(
		`http://www.omdbapi.com/?s=${searchTerm}&type=movie&apikey=b7d2a6fb`
	);
	const data = await res.json();
	console.log(data);
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
	document.getElementById("theme").classList.toggle("fa-sun");
	document.getElementById("theme").classList.toggle("fa-moon");
}
