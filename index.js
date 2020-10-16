document.addEventListener("DOMContentLoaded", function() {
    function renderMovies(movieArray) {
        return `${movieArray.map(currentMovie => `
                    <div class="movie">
                        <img src="${currentMovie.Poster}"><img>
                        <h5>${currentMovie.Title}<span>${currentMovie.Year}</span></h5>
                        <button type="button" onclick="saveToWatchlist('${currentMovie.imdbID}')">Add!</button>
                    </div>
                `).join("")}`;
    }
    
    document.getElementById("search-form").addEventListener("submit", function(e){
        e.preventDefault();

        var searchString = document.querySelector(".search-bar").value;
        console.log(searchString);

        var urlEncodedSearchString = encodeURIComponent(searchString);

        axios.get("http://www.omdbapi.com/?apikey=e4194de2&s=" + urlEncodedSearchString)
        .then(function(response) {
            console.log(response.data);
            var movieHTML = renderMovies(response.data.Search);
            document.querySelector(".movies-container").innerHTML = movieHTML;

        });
    });

   
})

function saveToWatchlist(imdbID) {
    var movie = movieData.find(function(currentMovie) {
        return currentMovie.imdbID == imdbID;
    });
    var watchlistJSON = localStorage.getItem("watchlist");
    var watchlist = JSON.parse(watchlistJSON);
    if (watchlist === null) {
        watchlist = [];
    } 
    console.log(movie);
    watchlist.push(movie);
    watchlistJSON = JSON.stringify(watchlist);
    localStorage.setItem("watchlist", watchlistJSON);
};
