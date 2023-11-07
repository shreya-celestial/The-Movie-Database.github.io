const getPopular = async () => {
    const response = await getPopularContents();
    const popularData = response.results;
    loadPopularHtml(popularData);
};

const loadPopularHtml = (popularData) => {
    const popularContentsDiv = document.querySelector('div.popularContents');
    popularContentsDiv.innerHTML = `
        <div class="extraContent"><div>
    `;
    popularData.forEach((data)=>{
        popularItem(data, popularContentsDiv);
    });
    popularContentsDiv.innerHTML += `
        <div class="extraContent"><div>
    `;
};

const popularItem = async (data, parentElement) => {
    const div = document.createElement('div');
    div.setAttribute('id',`popular-${data.id}`);
    let imgSrc = `https://image.tmdb.org/t/p/original${data.poster_path}`;
    if(data.poster_path === null)
    {
        imgSrc = "./assets/noImg.jpg";
    }
    div.innerHTML = `
        <img src=${imgSrc}>
        <h3>${data.title || data.name}</h3>
        <h4>${moment(data.release_date).format("MMM DD, YYYY")}</h4>
    `;
    await parentElement.appendChild(div);

    const itemDiv = document.querySelector(`div#popular-${data.id}`);
    itemDiv.onclick = () => {
        itemClicked(data.id);        
    };
};

getPopular();