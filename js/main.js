$(document).ready(() => {
	$('#searchForm').on('submit', (e) => {
		console.log($('#searchText').val());
		let searchText = $('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
	});
});
function getMovies(searchText) {
	axios.get('https://www.omdbapi.com/?apikey=83dfa283&s=' + searchText)
		.then((response) => {
			console.log(response);
			let movies = response.data.Search;
			let output = '';
			$.each(movies, (index, movie) => {
				output += `
               <div class="col-md-3">
                <div class = "well text-center">
                <img src = "${movie.Poster}">
                <h5> ${movie.Title}</h5>
                <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#"> More Details</a>
                </div>
                </div>
				`	});
			$('#movies').html(output);
		})
		.catch((err) => {
			console.log(err);
		});
}
function movieSelected(id) {
	sessionStorage.setItem('movieId', id);
	window.location = 'movie.html';
	return false;
}
function getMovie() {
	let movieId = sessionStorage.getItem('movieId');
	axios.get('https://www.omdbapi.com/?apikey=83dfa283&i=' + movieId)
		.then((response) => {
			console.log(response);
			let movie = response.data;
			let output = `

          <div class="row">
          	<div class="col-md-4">
                <img src="${movie.Poster}" class="thumbnail">
                <h3 class="text-danger"> IMDB rating:${movie.imdbRating}</h3>
                
          	</div>
          	<div class"col-mid-8>
              <h2>${movie.Title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong>${movie.Genre}</li>
              	<li class="list-group-item"><strong>Actors:</strong>${movie.Actors}</li>
              	<li class="list-group-item"><strong>Director:</strong>${movie.Director}</li>
              	<li class="list-group-item"><strong>Awards:</strong>${movie.Awards}</li>
              	<li class="list-group-item"><strong>Writer:</strong>${movie.Writer}</li>
              	<li class="list-group-item"><strong>Language:</strong>${movie.Language}</li>
              	<li class="list-group-item"><strong>Production:</strong>${movie.Production}</li>
              	<li class="list-group-item"><strong>Released:</strong>${movie.Released}</li>
              	</ul>
            </div> 
         </div>
         <div class="row">
         	<div class="well">
         		<h3 class="text-info"> Plot </h3> 
         		${movie.Plot}
         		<hr>
         		<a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">IMDB </a>
         		<a href="index.html" class ="btn btn-default">Back to the search page</a>

            </div>
         </div>
		`;
			$('#movie').html(output);



		})
		.catch((err) => {
			console.log(err);
		});
}