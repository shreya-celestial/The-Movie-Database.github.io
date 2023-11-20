const popularButtons = Array.from(document.querySelector('div.buttonsPopular').children);

popularButtons.forEach((button)=>{
    button.onclick = (e) => {
        const genre = button.id.split('Popular');
        getPopular(genre[0]);
        resetPopularButtons();
        button.style.cssText = `
            background-color: rgba(3,37,65,1);
        `;
        button.children[0].style.cssText = `
            background: linear-gradient(to right,#c0fecf 0,#1ed5a9 100%);
            background-clip: linear-gradient(to right,#c0fecf 0,#1ed5a9 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        `;
    };
});

const resetPopularButtons = () => {
    popularButtons.forEach((button)=>{
        button.style.cssText = `
            background-color: #fff;
            color: rgba(3,37,65,1);
        `;
        button.children[0].style.cssText = `
            color: rgba(3,37,65,1);
            background-color: #fff;
            -webkit-text-fill-color: unset;
        `;
    });
};

const getPopular = async (genre) => {
    const response = await getPopularContents(genre);
    const popularData = response.results;
    loadPopularHtml(popularData, genre);
};

const loadPopularHtml = (popularData, genre) => {
    const popularContentsDiv = document.querySelector('div.popularContents');
    popularContentsDiv.innerHTML = `
        <div class="extraContent"><div>
    `;
    popularData.forEach((data)=>{
        popularItem(data, popularContentsDiv, genre);
    });
    popularContentsDiv.innerHTML += `
        <div class="extraContent"><div>
    `;
};

const popularItem = async (data, parentElement, genre) => {
    const div = document.createElement('div');
    div.setAttribute('id',`popular-${data.id}`);
    let imgSrc = `${imgUrl}${data.poster_path}`;
    if(data.poster_path === undefined || data.poster_path === null)
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
        itemClicked(data.id, genre);        
    };
};

getPopular('movie');