const myMovies = document.getElementById("addingMovies")
const comment = document.getElementById("emptyPage")
let addingMovies = JSON.parse(localStorage.getItem("addingMovies")) || []

document.addEventListener('click', function(e){
    if(e.target.dataset.remove){
       removeMovie(e.target.dataset.remove) 
    }
})

function removeMovie(movieId){
    addingMovies = addingMovies.filter(movie => movie.imdbID !== movieId);
    localStorage.setItem("addingMovies", JSON.stringify(addingMovies));
    
    renderMyMovies(addingMovies)
}

function renderMyMovies(d){
    if(addingMovies.length !== 0){
        comment.classList.add('hidden')
    }else if(addingMovies.length === 0){
        comment.classList.remove('hidden')
    }

    myMovies.innerHTML = ""
    d.forEach(c => {
        const div = document.createElement("div");
        const box = document.createElement("div")
        div.style.backgroundColor = "transparent"
        div.style.display = "block";
        div.style.borderBottom = "1.5px solid #2C2C2C"
        div.innerHTML = `<img src="${c.Poster}" <hr>` 
        box.innerHTML += `<h3>${c.Title} (${c.Year})</h3>
        <div class="descr">
            <p>${c.Runtime}</p>
            <p>${c.Genre}</p>
            <a id="remove" href="#"><i class="fa-solid fa-minus" data-remove=${c.imdbID}></i>Remove</a>
        </div>
            <p>${c.Plot}</p>` 
        div.appendChild(box)
        div.style.display ="flex"
        myMovies.appendChild(div)
    }) 
}

renderMyMovies(addingMovies)