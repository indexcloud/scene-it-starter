document.addEventListener("DOMContentLoaded", function() {
    var watchlistJSON = localStorage.getItem("watchlist");
    var watchlist = JSON.parse(watchlistJSON);
    console.log(watchlist);
    var movieHTML = `${watchlist.map(currentMovie => `
            <div class="movie">
                <img src="${currentMovie.Poster}">
                <h5>${currentMovie.Title}<span>${currentMovie.Year}</span></h5>
                <button type="button" onclick="removeFromWatchlist('${currentMovie.imdbID}')">Remove!</button>
            </div>
        `).join("")}`;
    document.querySelector(".movies-container").innerHTML = movieHTML;
});

function removeFromWatchlist(imdbID) {  // to remove movie from watchlist
   
    var watchlistJSON = localStorage.getItem("watchlist");
    var watchlist = JSON.parse(watchlistJSON);

    var movie = watchlist.find(function(currentMovie) {
        return currentMovie.imdbID == imdbID;
    });

    for (var i = 0; i < watchlist.length; i++) {
        if (watchlist[i] === movie) {
            watchlist.splice(i, 1);
        };
    }

    watchlistJSON = JSON.stringify(watchlist);
    localStorage.setItem("watchlist", watchlistJSON);

    location.reload();
};