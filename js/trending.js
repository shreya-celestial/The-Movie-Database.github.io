const containerDiv = document.querySelector('div.container');
const dayButton = document.querySelector('button#todaysTrending');
const weekButton = document.querySelector('button#thisWeekTrending');

const imgUrl = 'https://image.tmdb.org/t/p/original';

weekButton.onclick = () => {
    setButtonStyles(weekButton,dayButton);
    getTrending("week");
};

dayButton.onclick = () => {
    setButtonStyles(dayButton,weekButton);
    getTrending("day");
};

const setButtonStyles = (clickedElement, otherElement) => {
    clickedElement.style.cssText = `
        background-color: rgba(3,37,65,1);
    `;
    clickedElement.children[0].style.cssText = `
        background: linear-gradient(to right,#c0fecf 0,#1ed5a9 100%);
        background-clip: linear-gradient(to right,#c0fecf 0,#1ed5a9 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    `;
    otherElement.style.cssText = `
        background-color: #fff;
        color: rgba(3,37,65,1);
    `;
    otherElement.children[0].style.cssText = `
        color: rgba(3,37,65,1);
        background-color: #fff;
        -webkit-text-fill-color: unset;
    `;
};

const getTrending = async (dayOrWeek) => {
    const response = await getTrendingContents(dayOrWeek);
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
    let imgSrc = `${imgUrl}${data.poster_path}`;
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

    const itemDiv = document.querySelector(`div#div-${data.id}`);
    itemDiv.onclick = () => {
        itemClicked(data.id, data.media_type);        
    };
};

getTrending("day");