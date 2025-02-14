const btn = document.querySelector(".btn-primary");
const inp = document.querySelector(".form-control");
let errorMsg = document.querySelector(".error-msg");

btn.addEventListener("click", () => {
  setValues();
});

async function getRes(title) {
  let url = `http://www.omdbapi.com/?apikey=a00e3963&t=${title}`;
  try {
    let res = await axios.get(url);
    if (res.data.Response === "False") {
      throw new Error(res.data.Error);
    }
    return res.data;
  } catch (error) {
    errorMsg.textContent = error;
    errorMsg.style.color = "red";
    inp.focus();
    return null;
  }
}

async function setValues() {
  if (inp.value.trim() === "") {
    alert("Please enter a movie name!");
    inp.focus();
    return;
  }

  let data = await getRes(inp.value.trim());
  inp.value = "";

  let moviePoster = document.querySelector("#movie-poster");
  let movieTitle = document.querySelector("#movie-title");
  let movieYear = document.querySelector("#movie-year");
  let movieGenre = document.querySelector("#movie-genre");
  let movieDirector = document.querySelector("#movie-director");
  let movieActors = document.querySelector("#movie-actors");
  let movieLanguage = document.querySelector("#movie-language");
  let movieRuntime = document.querySelector("#movie-runtime");
  let movieAwards = document.querySelector("#movie-awards");

  let moviePlot = document.querySelector("#movie-plot");
  let movieRating = document.querySelector("#movie-rating");
  let movieBoxOffice = document.querySelector("#movie-box-office");
  let movieCountry = document.querySelector("#movie-country");

  if (!data) {
    moviePoster.setAttribute("src", "https://placehold.co/400x600");
    movieTitle.textContent = "Movie not found!";
    movieYear.textContent = "N/A";
    movieGenre.textContent = "N/A";
    movieDirector.textContent = "N/A";
    movieActors.textContent = "N/A";
    movieLanguage.textContent = "N/A";
    movieRuntime.textContent = "N/A";
    movieAwards.textContent = "N/A";

    moviePlot.textContent = "N/A";
    movieRating.textContent = "N/A";
    movieBoxOffice.textContent = "N/A";
    movieCountry.textContent = "N/A";
  } else {
    errorMsg.textContent = "";
    errorMsg.style.display = "none";
    moviePoster.setAttribute("src", data.Poster);
    movieTitle.textContent = data.Title;
    movieYear.textContent = data.Year;
    movieGenre.textContent = data.Genre;
    movieDirector.textContent = data.Director;
    movieActors.textContent = data.Actors;
    movieLanguage.textContent = data.Language;
    movieRuntime.textContent = data.Runtime;
    movieAwards.textContent = data.Awards;

    moviePlot.textContent = data.Plot;
    movieRating.textContent = data.imdbRating;
    movieBoxOffice.textContent = data.BoxOffice;
    movieCountry.textContent = data.Country;
  }
}
