const searchingForm = document.querySelector('form#searchStuff');

searchingForm.onsubmit = (e) => {
    e.preventDefault();
    searchLogoDiv.children[0].value = e.target.elements.search.value;
    const value = e.target.elements.search.value.replace(' ','%20');
    sessionStorage.setItem('searchValue', value);
    const page = 1;
    searchValue(value, page);
};

const searchValue = async (value, page) => {
    const response = await searchItem(value, page);
    containerDiv.innerHTML = "";
    getSearchData(response);
};


const getSearchInitialHtml = async () => {
    const div = document.createElement('div');
    div.setAttribute('class', 'searchDiv');
    await containerDiv.appendChild(div);
    const parentDiv = document.querySelector('div.searchDiv');
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'searchData');
    parentDiv.appendChild(newDiv);
    const pagDiv = document.createElement('div');
    pagDiv.setAttribute('class', 'searchPagination');
    parentDiv.appendChild(pagDiv);
    searchLogoDiv.style.display = "block";
    if(searchLogoDiv.style.display === "block")
    {
        parentDiv.style.marginTop = "110px";
    }
};

const getSearchData = async (response) => {
    const dataList = response.results;
    await getSearchInitialHtml();
    getSearchPagination(response);
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

const getSearchPagination = async (response) => {
    const paginationDiv = document.querySelector('div.searchPagination');
    const value = sessionStorage.getItem('searchValue');
    if(response.total_pages>1)
    {
        if(response.page>1)
        {
            const previous = document.createElement('h5');
            previous.innerText = `Previous`;
            previous.setAttribute('id','prevPage');
            await paginationDiv.appendChild(previous);
            const prevPage = document.querySelector('h5#prevPage');
            prevPage.onclick = () => {
                let curPage = document.querySelector('h5.currentPage');
                curPage = Number(curPage.innerText);
                searchValue(value, curPage-1);
            };
        }
        for(let i=1;i<=response.total_pages;i++)
        {
            const num = document.createElement('h5');
            num.setAttribute('id', `page-${i}`);
            if(i===response.page)
            {
                num.setAttribute('class','currentPage');
            }
            num.innerText = `${i}`;
            await paginationDiv.appendChild(num);
            const pageNum = document.querySelector(`h5#page-${i}`);
            pageNum.onclick = () => {
                searchValue(value, i);
            };
        }
        if(response.page<response.total_pages)
        {
            const next = document.createElement('h5');
            next.innerText = `Next`;
            next.setAttribute('id','nextPage');
            await paginationDiv.appendChild(next);
            const nextPage = document.querySelector('h5#nextPage');
            nextPage.onclick = () => {
                let curPage = document.querySelector('h5.currentPage');
                curPage = Number(curPage.innerText);
                searchValue(value, curPage+1);
            };
        }   
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
        itemClicked(data.id);  
    };
};
