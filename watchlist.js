document.addEventListener("DOMContentLoaded", function() {
    var watchlistJSON = localStorage.getItem("watchlist");
    var watchlist = JSON.parse(watchlistJSON);
    console.log(watchlist);
    var movieHTML = `${watchlist.map(currentMovie => `
            <div class="movie">
                <img src="${currentMovie.Poster}"><img>
                <h5>${currentMovie.Title}<span>${currentMovie.Year}</span></h5>
                <button type="button" onclick="unsaveToWatchlist('${currentMovie.imdbID}')">Remove!</button>
            </div>
        `).join("")}`;
    document.querySelector(".movies-container").innerHTML = movieHTML;
});

function unsaveToWatchlist(imdbID) {  // to remove movie from watchlist
    var movie = movieData.find(function(currentMovie) {
        return currentMovie.imdbID == imdbID;
    });
    var watchlistJSON = localStorage.getItem("watchlist");
    var watchlist = JSON.parse(watchlistJSON);
    if (watchlist === null) {
        watchlist = [];
    } 
    console.log(movie);
    console.log(typeof(watchlist));
    var index = watchlist.indexOf(movie);
    console.log(index);
    watchlist.splice(index, 1);
    watchlistJSON = JSON.stringify(watchlist);
    localStorage.setItem("watchlist", watchlistJSON);
};