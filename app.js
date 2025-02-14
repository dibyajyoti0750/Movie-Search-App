const btn = document.querySelector("#button-addon2");
let inp = document.querySelector(".form-control");
let errorMsg = document.querySelector(".error-msg ");

btn.addEventListener("click", setContent);

async function getRes(title) {
  const url = `http://www.omdbapi.com/?t=${title}&apikey=a00e3963`;
  try {
    const res = await axios.get(url);
    if (res.data.Response === "False") throw new Error(res.data.Error);
    return res.data;
  } catch (error) {
    errorMsg.textContent = error.message;
    errorMsg.style.color = "red";
    inp.focus();
    return null;
  }
}

async function setContent() {
  if (!inp.value.trim()) {
    alert("Please enter a movie name!");
    inp.focus();
    return;
  }

  const movieData = await getRes(inp.value.trim());
  inp.value = "";
  showMovieDetails(movieData);
}

function updateElements(selector, content) {
  document.querySelector(selector).textContent = content ?? "N/A";
}

function showMovieDetails(movieData) {
  document
    .querySelector("#movie-poster")
    .setAttribute(
      "src",
      movieData.Poster !== "N/A"
        ? movieData.Poster
        : "https://placehold.co/400x600"
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
