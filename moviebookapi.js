const API_KEY = "44714b46445a1a207ba9b9fbf874d430";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function searchmovie() {
  const query = document.getElementById("searchInpute").value;
  if (!query) {
    alert("Please enter movie name");
    return;
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=44714b46445a1a207ba9b9fbf874d430&query=avatar`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMovies(data.results))
    .catch((err) => console.error(err));
}

function displayMovies(movies) {
    const container = document.getElementById("movieResults");
    container.innerHTML = "";

    if (movies.length === 0) {
        container.innerHTML = "<p>no movies found</p>";
        return;
    }
    movies.forEach((movie) => {
      const poster = movie.poster_path
      ? IMAGE_BASE + movie.poster_path
        : "https://via.placeholder.com/300x450?text=No+Image";

      container.innerHTML += `
        <div class="col-md-3 mb-4">
        <div class="card h-100 shadow-sm">
        <img src="${poster}" class="card-img-top" alt="${movie.title}">
        <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <h1 class="card-title">${movie.title}</h1>
            <p class="card-text small">
                ⭐ ${movie.vote_average} <br>
                📅 ${movie.release_date || "N/A"}
            </p>
            <p class="card-text small">
                ${movie.overview.substring(0, 100)}...
            </p>
        </div>
    </div>
</div>
    `;
    });
}