const btn = document.querySelector("#button-addon2");
let inp = document.querySelector(".form-control");
let errorMsg = document.querySelector(".error-msg ");
let moviePoster = document.querySelector("#movie-poster");

btn.addEventListener("click", setContent);

async function getRes(title) {
  const url = `https://www.omdbapi.com/?t=${title}&apikey=a00e3963`;
  try {
    const res = await axios.get(url);
    if (res.data.Response === "False") throw new Error(res.data.Error);
    return res.data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function setContent() {
  if (!inp.value.trim()) {
    alert("Please enter a movie name!");
    inp.focus();
    return;
  }

  btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
  const movieData = await getRes(inp.value.trim());
  inp.value = "";
  if (!movieData) {
    btn.innerHTML = "Search Movie";
    showErrors();
  } else {
    btn.innerHTML = "Search Movie";
    showMovieDetails(movieData);
  }
}

function updateElements(selector, content) {
  document.querySelector(selector).textContent = content ?? "N/A";
}

function showMovieDetails(movieData) {
  moviePoster.setAttribute(
    "src",
    movieData.Poster !== "N/A"
      ? movieData.Poster
      : "https://placehold.jp/30/cccccc/666666/400x600.png?text=NO+IMAGE+AVAILABLE"
  );
  updateElements("#movie-title", movieData.Title);
  updateElements("#movie-year", movieData.Year);
  updateElements("#movie-genre", movieData.Genre);
  updateElements("#movie-director", movieData.Director);
  updateElements("#movie-actors", movieData.Actors);
  updateElements("#movie-language", movieData.Language);
  updateElements("#movie-runtime", movieData.Runtime);
  updateElements("#movie-awards", movieData.Awards);
  updateElements("#movie-plot", movieData.Plot);
  updateElements("#movie-rating", movieData.imdbRating);
  updateElements("#movie-box-office", movieData.BoxOffice);
  updateElements("#movie-country", movieData.Country);
  errorMsg.textContent = "";
  errorMsg.style.display = "none";
}

function showErrors() {
  inp.focus();
  errorMsg.textContent = "Movie not found!";
  errorMsg.style.display = "block";
  errorMsg.style.color = "red";
  moviePoster.setAttribute(
    "src",
    "https://placehold.jp/30/cccccc/666666/400x600.png?text=NO+IMAGE+AVAILABLE"
  );
  [
    "#movie-title",
    "#movie-year",
    "#movie-genre",
    "#movie-director",
    "#movie-actors",
    "#movie-language",
    "#movie-runtime",
    "#movie-awards",
    "#movie-plot",
    "#movie-rating",
    "#movie-box-office",
    "#movie-country",
  ].forEach((selector) => updateElements(selector, "N/A"));
}
