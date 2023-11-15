const getTrendingContents = async (dayOrWeek) => {
    document.querySelector('div.trendingContents').innerHTML = "<h1>Loading...</h1>";
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzgyNzM0OGI4ZWY5OGI3NGUyOTg4ODk0NGJhZTZlYyIsInN1YiI6IjY1NDMzZmVmZTFhZDc5MDBlYTU3OWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-87S7MvmbnW2pQX9XdN87KazRKzPDGRa_aZwO8BttGI'
        }
    };
    const url = `https://api.themoviedb.org/3/trending/all/${dayOrWeek}?language=en-US`;
    const response = await fetch(url, options);
    const trendingData = await response.json();
    return trendingData;
};

const searchItem = async (searchThis, page) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzgyNzM0OGI4ZWY5OGI3NGUyOTg4ODk0NGJhZTZlYyIsInN1YiI6IjY1NDMzZmVmZTFhZDc5MDBlYTU3OWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-87S7MvmbnW2pQX9XdN87KazRKzPDGRa_aZwO8BttGI'
        }
    };
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchThis}&language=en-US&page=${page}`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

const getClickedItem = async (id, genre) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzgyNzM0OGI4ZWY5OGI3NGUyOTg4ODk0NGJhZTZlYyIsInN1YiI6IjY1NDMzZmVmZTFhZDc5MDBlYTU3OWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-87S7MvmbnW2pQX9XdN87KazRKzPDGRa_aZwO8BttGI'
        }
    };
    const url = `https://api.themoviedb.org/3/${genre}/${id}?language=en-US`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

const getPopularContents = async (genre) => {
    document.querySelector('div.popularContents').innerHTML = "<h1>Loading...</h1>";
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzgyNzM0OGI4ZWY5OGI3NGUyOTg4ODk0NGJhZTZlYyIsInN1YiI6IjY1NDMzZmVmZTFhZDc5MDBlYTU3OWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-87S7MvmbnW2pQX9XdN87KazRKzPDGRa_aZwO8BttGI'
        }
    };
    const url = `https://api.themoviedb.org/3/${genre}/popular?language=en-US&page=1`;
    const response = await fetch(url, options);
    const popularData = await response.json();
    return popularData;
};

const getMoviePopularOption = async (page) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzgyNzM0OGI4ZWY5OGI3NGUyOTg4ODk0NGJhZTZlYyIsInN1YiI6IjY1NDMzZmVmZTFhZDc5MDBlYTU3OWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-87S7MvmbnW2pQX9XdN87KazRKzPDGRa_aZwO8BttGI'
        }
    };
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

const getMovieTopRatedOption = async (page) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzgyNzM0OGI4ZWY5OGI3NGUyOTg4ODk0NGJhZTZlYyIsInN1YiI6IjY1NDMzZmVmZTFhZDc5MDBlYTU3OWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-87S7MvmbnW2pQX9XdN87KazRKzPDGRa_aZwO8BttGI'
        }
    };
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

const getAllGenres = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzgyNzM0OGI4ZWY5OGI3NGUyOTg4ODk0NGJhZTZlYyIsInN1YiI6IjY1NDMzZmVmZTFhZDc5MDBlYTU3OWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-87S7MvmbnW2pQX9XdN87KazRKzPDGRa_aZwO8BttGI'
        }
    };
    const url = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

const getFilteredData = async (filterParams, page) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzgyNzM0OGI4ZWY5OGI3NGUyOTg4ODk0NGJhZTZlYyIsInN1YiI6IjY1NDMzZmVmZTFhZDc5MDBlYTU3OWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-87S7MvmbnW2pQX9XdN87KazRKzPDGRa_aZwO8BttGI'
        }
    };
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${filterParams.sort}&vote_average.gte=${filterParams.minScore}&vote_average.lte=${filterParams.maxScore}&vote_count.gte=${filterParams.minVotes}&with_genres=${filterParams.genres}`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

const getUserDetails = async (accountId) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzgyNzM0OGI4ZWY5OGI3NGUyOTg4ODk0NGJhZTZlYyIsInN1YiI6IjY1NDMzZmVmZTFhZDc5MDBlYTU3OWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-87S7MvmbnW2pQX9XdN87KazRKzPDGRa_aZwO8BttGI'
        }
    };
    const url = `https://api.themoviedb.org/3/account/${accountId}`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

const addToWatchlist = (body, accountId) => {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzgyNzM0OGI4ZWY5OGI3NGUyOTg4ODk0NGJhZTZlYyIsInN1YiI6IjY1NDMzZmVmZTFhZDc5MDBlYTU3OWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-87S7MvmbnW2pQX9XdN87KazRKzPDGRa_aZwO8BttGI'
        },
        body: JSON.stringify(body)
    };
    const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist`;
    return fetch(url, options);
};

const getWatchlist = async (id, page, genre) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzgyNzM0OGI4ZWY5OGI3NGUyOTg4ODk0NGJhZTZlYyIsInN1YiI6IjY1NDMzZmVmZTFhZDc5MDBlYTU3OWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-87S7MvmbnW2pQX9XdN87KazRKzPDGRa_aZwO8BttGI'
        }
    };
    const url = `https://api.themoviedb.org/3/account/${id}/watchlist/${genre}?language=en-US&page=${page}&sort_by=created_at.asc`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};