document.addEventListener("DOMContentLoaded", function() {
    function renderMovies(movieArray) {
        let movieHTML = `${movieArray.map(currentMovie => `
            <div class="movie">
            <img src="${currentMovie.Poster}"><img>
            <h5>${currentMovie.Title}</h5>
            <span>${currentMovie.Year}</span>
            <button>Add!</button>
            </div>
        `).join("")}`;
        return movieHTML;
    }
    
    document.getElementById(‘search-form’).addEventListener(‘submit’, function(e){
        e.preventDefault();
        document.querySelector(".movies-container").innerHTML = renderMovies(movieData);
    }
})
