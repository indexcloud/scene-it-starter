var movieSearchDatas; 

document.addEventListener("DOMContentLoaded", function() {
    function renderMovies(movieArray) {
        return `${movieArray.map(currentMovie => `
                    <div class="movie">
                        <img src="${currentMovie.Poster}">
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
            
            moviesSearchDatas = response.data.Search;
            console.log(moviesSearchDatas);
          
            for (var i = 0; i < moviesSearchDatas.length; i++) {
                if (moviesSearchDatas[i].Poster === "N/A") {
                    moviesSearchDatas[i].Poster = "no_image.png";
                }
            }
            console.log(moviesSearchDatas);
            var movieHTML = renderMovies(moviesSearchDatas);
            document.querySelector(".movies-container").innerHTML = movieHTML;

        });
    });

});

function saveToWatchlist(imdbID) {
    var movie = moviesSearchDatas.find(function(currentMovie) {
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
