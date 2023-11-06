const containerDiv = document.querySelector('div.container');

const getTrending = async () => {
    const response = await getTrendingContents();
    const trendingData = response.results;
    loadTrendingHtml(trendingData);
};

const loadTrendingHtml = (trendingData) => {
    const trendingContentsDiv = document.querySelector('div.trendingContents');
    trendingContentsDiv.innerHTML = `
        <div class="extraContent"><div>
    `;
    trendingData.forEach((data)=>{
        trendingItem(data, trendingContentsDiv);
    });
    trendingContentsDiv.innerHTML += `
        <div class="extraContent"><div>
    `;
};

const trendingItem = async (data, parentElement) => {
    const div = document.createElement('div');
    div.setAttribute('id',`div-${data.id}`);
    div.innerHTML = `
        <img src="https://image.tmdb.org/t/p/original${data.poster_path}">
        <h3>${data.title || data.name}</h3>
        <h4>${moment(data.release_date).format("MMM DD, YYYY")}</h4>
    `;
    await parentElement.appendChild(div);

    const itemDiv = document.querySelector(`div#div-${data.id}`);
    itemDiv.onclick = () => {
        itemClicked(data);        
    };
};

const itemClicked = (data) => {
    console.log(data);
    containerDiv.innerHTML = `
        <div class="bgMovie">
            <div class="bgOverlay">
                <img src="https://image.tmdb.org/t/p/original${data.poster_path}">
            </div>
        </div>
    `;
    const bgMovieDiv = document.querySelector('div.bgMovie');
    bgMovieDiv.style.cssText = `
        background-image: url('https://image.tmdb.org/t/p/original${data.backdrop_path}');
    `;
};

getTrending();

