const popularMovieOption = document.querySelector('li#popularMovieOption');
popularMovieOption.onclick = async () => {
    containerDiv.innerHTML = ` 
        <h2 class="optionHeadings">Popular Movies</h2>
        <div class = "popularOptionDiv">
            <div class="filters"></div>
            <div class="popularOptionContents">
                <h1>Loading...</h1>
            </div> 
        </div>
    `;
    loadPopularFilterHtml();
    const dataList = await getMoviePopularOption();
    console.log(dataList.results);
    loadpopularMovieHtml(dataList.results);
};

const loadPopularFilterHtml = async () => {
    const filters = document.querySelector('div.filters');
    const form = document.createElement('form');
    form.setAttribute('id','setAllFilters');
    form.innerHTML = `
        <div class="sortingDiv">
            <div class="sortLabelDiv">
                <h3>Sort</h3>
                <img id="arrowSort" src="./assets/arrow.png">
            </div>
            <div class="sortContentDiv">
                <label for="sort">Sort Results By</label>
                <select name="sort" id="sortingDD">
                    <option value="popularity.asc">Popularity Ascending</option>
                    <option value="popularity.desc">Popularity Descending</option>
                </select>
            </div>
        </div>
        <div class="allFiltersDiv">
            <div class="filterLabelDiv">
                <h3>Filters</h3>
                <img id="arrowFilter" src="./assets/arrow.png">
            </div>
            <div class="filterContents">
                <div class="genres">
                    <label>Genres</label>
                    <div class="allGenres"></div>
                </div>
                <div class="userScoreFilter">
                    <label for="userScore">User Score</label>
                    <div class="rangeDisplay">
                        0 - 10
                    </div>
                    <div class="range">
                        <div class="range-slider">
                            <span class="range-selected"></span>
                        </div>
                        <div class="range-input">
                            <input type="range" class="min" min="0" max="10" value="0" step="1">
                            <input type="range" class="max" min="0" max="10" value="10" step="1">
                        </div>
                    </div>
                </div>
                <div class="minVotesFilter">
                    <label for="minVotes">Minimum User Votes</label>
                    <div class="votesRangeDisplay">
                        0
                    </div>
                    <input type="range" name="minVotes" id="minVotesId" min="0" max="500" value="0" step="100">
                </div>
            </div>
        </div>
        <button class="filterSearchButton">Search</button>
    `;
    await filters.appendChild(form);
    loadAllGenres();
    loadPopularFilterFunctions();
};

const loadAllGenres = async () => {
    const allGenres = document.querySelector('div.allGenres');
    const genreList = (await getAllGenres()).genres;
    genreList.forEach(async (genre)=>{
        const item = document.createElement('div');
        item.innerHTML = `${genre.name}`;
        item.setAttribute('id',`genre-${genre.id}`);
        await allGenres.appendChild(item);
        const currentDiv = document.querySelector(`div#genre-${genre.id}`);
        let count = 0;
        currentDiv.onclick = () => {
            count = genreClicked(count, currentDiv);
        };
    });
};

const genreClicked = (count, currentDiv) => {
    count++;
    if(count===0 || count%2!==0)
    {
        currentDiv.style.backgroundColor = "rgba(1,180,228,1)";
        currentDiv.style.border = "none";
        currentDiv.style.color = "#fff";
    }
    else
    {
        currentDiv.style.backgroundColor = "unset";
        currentDiv.style.border = "1px solid rgb(197, 197, 197)";
        currentDiv.style.color = "unset";
    }
    return count;
};

const loadPopularFilterFunctions = () => {
    let sortDDDisplayCount = 0;
    let filterDDDisplayCount = 0;
    const setAllFilters = document.querySelector('form#setAllFilters');
    const minVotesId = document.querySelector('input#minVotesId');
    const rangeDisplay = document.querySelector('div.rangeDisplay');
    const votesRangeDisplay = document.querySelector('div.votesRangeDisplay');
    const range = document.querySelector(".range-selected");
    const rangeInput = document.querySelectorAll(".range-input input");
    const sortLabelDiv = document.querySelector('div.sortLabelDiv');
    const sortingDD = document.querySelector('select#sortingDD');
    const filterLabelDiv = document.querySelector('div.filterLabelDiv');

    setAllFilters.onsubmit = (e) => {
        e.preventDefault();
        console.log(e);
    };
    sortLabelDiv.onclick = () => {
        sortDDDisplayCount = sortContentDivDisplay(sortDDDisplayCount);
    };
    sortingDD.onchange = () => {
        console.log(sortingDD.value);
    };
    rangeInput.forEach((input) => {
        rangeDisplay.style.display = "none";
        rangeChanging(input, rangeInput, range, rangeDisplay);
    });
    minVotesId.oninput = (e)=> {
        value = (minVotesId.value-minVotesId.min)/(minVotesId.max-minVotesId.min)*100;
        minVotesId.style.background = 'linear-gradient(to right, rgba(1,180,228,1) 0%, rgba(1,180,228,1) ' + value + '%, #e1e9f6 ' + value + '%, #e1e9f6 100%)';
        votesRangeDisplay.innerText = `${parseInt(minVotesId.value)}`;
        votesRangeDisplay.style.display = "block";
    };
    minVotesId.onmouseleave = (e) => {
        votesRangeDisplay.style.display = "none";
    };
    filterLabelDiv.onclick = () => {
        filterDDDisplayCount = filterContentDivDisplay(filterDDDisplayCount);
    };
};

const rangeChanging = (input, rangeInput, range, rangeDisplay) => {
    input.oninput = (e) => {
        const minRange = parseInt(rangeInput[0].value);
        const maxRange = parseInt(rangeInput[1].value);
        range.style.left = (minRange / rangeInput[0].max) * 100 + "%";
        range.style.right = 100 - (maxRange / rangeInput[1].max) * 100 + "%";
        rangeDisplay.innerText = `${minRange} - ${maxRange}`;
        rangeDisplay.style.display = 'block';
    };
    input.onmouseleave = (e) => {
        rangeDisplay.style.display = "none";
    };
};

const filterContentDivDisplay = (count) => {
    const filterContents = document.querySelector('div.filterContents');
    const arrowFilter = document.querySelector('img#arrowFilter');
    count++;
    if(count === 0 || count%2 === 0)
    {
        arrowFilter.style.transform = 'rotate(90deg)';
        filterContents.style.display = 'block';
    }
    else
    {
        arrowFilter.style.transform = 'rotate(0deg)';
        filterContents.style.display = 'none';
    }
    return count;
};

const sortContentDivDisplay = (sortDDDisplayCount) => {
    const sortContentDiv = document.querySelector('div.sortContentDiv');
    const arrowSort = document.querySelector('img#arrowSort');
    sortDDDisplayCount++;
    if(sortDDDisplayCount === 0 || sortDDDisplayCount%2 === 0)
    {
        arrowSort.style.transform = 'rotate(0deg)';
        sortContentDiv.style.display = 'none';
    }
    else
    {
        arrowSort.style.transform = 'rotate(90deg)';
        sortContentDiv.style.display = 'flex';
    }
    return sortDDDisplayCount;
};

const loadpopularMovieHtml = (data) => {
    const popularOptionContents = document.querySelector('div.popularOptionContents');
    popularOptionContents.innerHTML = "";
    data.forEach((dataItem)=>{
        optionItem(dataItem, popularOptionContents);
    });
};

const optionItem = async (data, parentElement) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'moviesOfPopularOption');
    div.setAttribute('id',`div-${data.id}`);
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
    const itemDiv = document.querySelector(`div#div-${data.id}`);
    itemDiv.onclick = () => {
        itemClicked(data.id, data.media_type);        
    };
};




window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        if(document.querySelector('div.moviesOfPopularOption'))
        {
            console.log('fgb');
        }
    }
}, {
    passive: true
});
