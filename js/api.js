const getTrendingContents = async () => {
    document.querySelector('div.trendingContents').innerHTML = "<h1>Loading...</h1>";
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzgyNzM0OGI4ZWY5OGI3NGUyOTg4ODk0NGJhZTZlYyIsInN1YiI6IjY1NDMzZmVmZTFhZDc5MDBlYTU3OWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-87S7MvmbnW2pQX9XdN87KazRKzPDGRa_aZwO8BttGI'
        }
    };
    const url = `https://api.themoviedb.org/3/trending/all/day?language=en-US`;
    const response = await fetch(url, options);
    const trendingData = await response.json();
    return trendingData;
};