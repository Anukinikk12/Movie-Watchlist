const searchBtn = document.getElementById("search-btn")
const searchTitle = document.getElementById("searchtitle")
const movies = document.getElementById("movies")
const comment = document.getElementById("emptyPage")
let addingMovies = JSON.parse(localStorage.getItem("addingMovies")) || []
console.log(addingMovies)
document.addEventListener('click', function(e){
    if(e.target.dataset.add){
       addMovie(e.target.dataset.add) 
    }
})

if (searchBtn) {
  searchBtn.addEventListener("click", async () => {
    let title = searchTitle.value;
    const resp = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=49951e7f`);
    const data = await resp.json();
    renderMovie(data);
  });
}

async function addMovie(movieId){
    const resp = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=49951e7f`)
    const data = await resp.json()
    if(addingMovies.some(m => m.imdbID === movieId)){
        return
    }
    addingMovies.unshift(data)
    localStorage.setItem("addingMovies", JSON.stringify(addingMovies));
}

function renderMovie(d){
    console.log(d.Search)
    if(d.Search){
        comment.classList.add('hidden')
    }else if(!d.Search){
        comment.innerHTML = "<h3>Unable to find what you’re looking for. Please try another search.</h3>"
        return
    }
    movies.innerHTML =""
    d.Search.forEach(async c => {
        const movieResp = await fetch(`https://www.omdbapi.com/?i=${c.imdbID}&apikey=49951e7f`);
        const movieDetails = await movieResp.json();
        console.log(movieDetails)
        const div = document.createElement("div");
        const box = document.createElement("div")
        div.style.backgroundColor = "transparent"
        div.style.display = "block";
        div.style.borderBottom = "1.5px solid #2C2C2C"
        div.innerHTML = `<img src="${c.Poster}" <hr>` 
        box.innerHTML += `<div class="descr">
        <h3>${movieDetails.Title} (${movieDetails.Year})</h3>
        <p><i class="fa-solid fa-star star"></i>${movieDetails.imdbRating}</p>
        </div>
        <div class="descr">
            <p>${movieDetails.Runtime}</p>
            <p>${movieDetails.Genre}</p>
            <a id="adding" href="#"><i class="fa-solid fa-plus add" data-add=${c.imdbID}></i>Watchlist</a>
        </div>
            <p>${movieDetails.Plot}</p>` 
        div.appendChild(box)
        div.style.display ="flex"
        movies.appendChild(div)
    }) 
}