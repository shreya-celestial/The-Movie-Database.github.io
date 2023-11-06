const searchingForm = document.querySelector('form#searchStuff');

searchingForm.onsubmit = async (e) => {
    e.preventDefault();
    const value = e.target.elements.search.value.replace(' ','%20');
    sessionStorage.setItem('searchValue', value);
    const response = await searchItem(value);
    containerDiv.innerHTML = "";
    getSearchData(response);
};

const getSearchData = async (response) => {
    const dataList = response.results;
    const div = document.createElement('div');
    div.setAttribute('class', 'searchDiv');
    await containerDiv.appendChild(div);
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'searchData');
    await document.querySelector('div.searchDiv').appendChild(newDiv);
    const searchDataDiv = document.querySelector('div.searchData');
    if(dataList.length>0)
    {
        dataList.forEach((data)=>{
            searchListItem(data, searchDataDiv);
        });
    }
    else
    {
        searchDataDiv.innerHTML = "Nothing Found!";
    }
};

const searchListItem = async (data, parentElement) => {
    const div = document.createElement('div');
    div.setAttribute('id',`search-${data.id}`);
    let imgSrc = `https://image.tmdb.org/t/p/original${data.poster_path}`;
    if(data.poster_path === null)
    {
        imgSrc = "./assets/noImg.jpg";
    }
    div.innerHTML = `
        <img src=${imgSrc}>
        <div class="contents">
            <h3>${data.title || data.name}</h3>
            <h4>${moment(data.release_date).format("MMM DD, YYYY")}</h4>
            <p>${data.overview}</p>
        </div>
    `;
    await parentElement.appendChild(div);
    const itemDiv = document.querySelector(`div#search-${data.id}`);
    itemDiv.onclick = () => {
        itemClicked(data);  
    };
};
