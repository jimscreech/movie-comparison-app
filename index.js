// TODO 1: GET API KEY 
const apiKey = "e455077";

// TODO 2: DEFINE A FXN TO MAKE AN API CALL BASED ON USER INPUT
//fxn fetchData makes an api request 
const fetchData = async (searchMovie) => {
    //response obj displays all the info for the url we requested; axios.get returns a promise
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: apiKey,
            s: searchMovie
        }
    });

    //if no movie found, returns no reuslt
    if (response.data.Error) {
        return [];
    }
    return response.data.Search; //returns an arr of search data from the api call
};

// TODO 4: DEFINE ROOT HTML TEMPLATE FOR DROPDOWN MENU 
const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search For a Movie:</b></label>
    <input class="input"/>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

// TODO 3: SELECT HTML ELEMENTS 
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

// TODO 5: CALLS FETCH DATA FXN AFTER USER HAS COMPLETELY TYPED
const onInput = async (e) => {
    const movies = await fetchData(e.target.value); //makes an api call based on the text input, and returns it

    //closes the dropdown menu if no search results
    if (!movies.length) {
        dropdown.classList.remove('is-active');
        return;
    }

    // TODO 6: CLEARS SEARCH RESULT AFTER EVERY SEARCH AND SHOWS DROPDOWN MENU BEFORE MOVIES ARE SHOWN 

    //clears search results before every search
    resultsWrapper.innerHTML = ''; 
    //opens the dropdown menu before the data is fetched
    dropdown.classList.add('is-active');
    

    // TODO 7: CREATES HTML ELEMENTS FOR EACH MOVIE RETRIEVED FROM API CALL 
    for (let movie of movies) {
        //creates a div element for each movie and checks if img src is N/A
        const movieOption = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster

        movieOption.classList.add('dropdown-item');
        //adds innerHTML to each newly created div
        movieOption.innerHTML = `
            <img src="${imgSrc}"/>
            ${movie.Title}
        `;

        // TODO 8: SHOWS SUMMARY OF MOVIE WHEN CLICKED FROM SEARCH DROPDOWN 
        //handles event when a movie option is selected
        movieOption.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            onMovieSelect(movie);
        })

        //appends each newly created div to a target html element
        resultsWrapper.appendChild(movieOption);
    };

};


// TODO 9: DEBOUNCER, ENSURES THAT AN API CALL IS NOT MADE AFTER EVERY CHAR IS TYPED
//listens for text input in the search field but only makes a request 0.5s after user stops typing
input.addEventListener('input', debounce(onInput, 500));

// TODO 10: CLOSES DROPDOWN MENU IF USER CLICKS ON DOCUMENT OUTSIDE OF IT                                                                   
//listens for user click outside of dropdown menu and closes the menu if that is the case
document.addEventListener('click', (e) => {
    if (!root.contains(e.target)) {
        dropdown.classList.remove('is-active');
    };
})