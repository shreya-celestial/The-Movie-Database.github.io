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