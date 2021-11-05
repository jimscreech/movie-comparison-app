//file for all the utility fxns in the project

//DEBOUNCING: delays the api request search until after the use stops typing
const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        //clears the timeout for every key press
        if (timeoutId) {
            clearInterval(timeoutId);
        };
        //makes the actual api req after key press stops
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay)
    }
};

//onMovieSelect makes a request for the movie the user clicks on and generates an html template to display a summary of data
const onMovieSelect = async (movieOption) => {
    // const movieId = movieOption.imdbID;
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: apiKey,
            i: movieOption.imdbID
        }
    });

    //sets innerHTML of div element as html template populated with the movie's data
    document.querySelector('#summary').innerHTML = movieTemplate(response.data);

};

//generates the HTML template to display info gotten from api call for movie selected
const movieTemplate = (movieDetail) => {
    
    //returns HTML template with movie details
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}">
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>

        <article class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>

        <article class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>

        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>

        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
};

