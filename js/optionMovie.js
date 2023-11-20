const popularMovieOption = document.querySelector('li#popularMovieOption');
const topRatedMovieOption = document.querySelector('li#topRatedMovieOption');
let option = '';
let optionPage = '';

topRatedMovieOption.onclick = async () => {
    const heading = 'Top Rated';
    option = 'topRated';
    optionPage = 1;
    const dataList = await getMovieTopRatedOption(optionPage);
    loadOptionsInitialHtml(dataList, heading);
};

popularMovieOption.onclick = async () => {
    const heading = 'Popular';
    option = 'popular';
    optionPage = 1;
    const dataList = await getMoviePopularOption(optionPage);
    loadOptionsInitialHtml(dataList, heading);
};

const loadOptionsInitialHtml = (dataList, heading) => {
    window.scrollTo(0, 0); 
    const divHtml = ` 
        <h2 class="optionHeadings">${heading} Movies</h2>
        <div class = "optionsDiv">
            <div class="filters"></div>
            <div class="optionsContents">
                <h1>Loading...</h1>
            </div> 
        </div>
    `;
    containerDiv.innerHTML = divHtml;
    loadFiltersHtml();
    loadOptionMovieHtml(dataList);
};

const loadFiltersHtml = async () => {
    await allFiltersHtml();
    const genresSelected = new Map();
    loadAllGenres(genresSelected);
    loadOptionFilterFunctions(genresSelected);
};

const loadAllGenres = async (genresSelected) => {
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
            count = genreClicked(count, currentDiv, genresSelected);
        };
    });
};

const genreClicked = (count, currentDiv, map) => {
    count++;
    document.querySelector('button#filterSearchButton').removeAttribute('disabled');
    if(count===0 || count%2!==0)
    {
        currentDiv.style.backgroundColor = "rgba(1,180,228,1)";
        currentDiv.style.border = "none";
        currentDiv.style.color = "#fff";
        const id = currentDiv.id.split('genre-');
        map.set(currentDiv.id, id[1]);
    }
    else
    {
        currentDiv.style.backgroundColor = "unset";
        currentDiv.style.border = "1px solid rgb(197, 197, 197)";
        currentDiv.style.color = "unset";
        map.delete(currentDiv.id);
    }
    return count;
};

const loadOptionFilterFunctions = (genresSelected) => {
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

    setAllFilters.onsubmit = async (e) => {
        e.preventDefault();
        window.scrollTo(0, 0); 
        const genreString = await genresToString(genresSelected);
        const filterParams = {
            sort: e.target.elements.sort.value,
            genres: genreString,
            minScore: e.target.elements.minScore.value,
            maxScore: e.target.elements.maxScore.value,
            minVotes: e.target.elements.minVotes.value
        };
        sessionStorage.setItem('params', JSON.stringify(filterParams));
        option = 'params';
        optionPage = 1;
        const data = await getFilteredData(filterParams, optionPage);
        loadOptionMovieHtml(data);
    };
    sortLabelDiv.onclick = () => {
        sortDDDisplayCount = sortContentDivDisplay(sortDDDisplayCount);
    };
    sortingDD.onchange = () => {
        document.querySelector('button#filterSearchButton').removeAttribute('disabled');
    };
    rangeInput.forEach((input) => {
        rangeDisplay.style.display = "none";
        rangeChanging(input, rangeInput, range, rangeDisplay);
    });
    minVotesId.oninput = ()=> {
        value = (minVotesId.value-minVotesId.min)/(minVotesId.max-minVotesId.min)*100;
        minVotesId.style.background = 'linear-gradient(to right, rgba(1,180,228,1) 0%, rgba(1,180,228,1) ' + value + '%, #e1e9f6 ' + value + '%, #e1e9f6 100%)';
        votesRangeDisplay.innerText = `${parseInt(minVotesId.value)}`;
        votesRangeDisplay.style.display = "block";
        document.querySelector('button#filterSearchButton').removeAttribute('disabled');
    };
    minVotesId.onmouseleave = () => {
        votesRangeDisplay.style.display = "none";
    };
    filterLabelDiv.onclick = () => {
        filterDDDisplayCount = filterContentDivDisplay(filterDDDisplayCount);
    };
};

const genresToString = (genresSelected) => {
    let str = '';
    genresSelected.forEach((value)=>{
        str += (value + '%2C');
    });
    if(str.length)
        return str.substring(0, str.length - 3);
    else
        return str;
};

const rangeChanging = (input, rangeInput, range, rangeDisplay) => {
    input.oninput = () => {
        const minRange = parseInt(rangeInput[0].value);
        const maxRange = parseInt(rangeInput[1].value);
        range.style.left = (minRange / rangeInput[0].max) * 100 + "%";
        range.style.right = 100 - (maxRange / rangeInput[1].max) * 100 + "%";
        rangeDisplay.innerText = `${minRange} - ${maxRange}`;
        rangeDisplay.style.display = 'block';
        document.querySelector('button#filterSearchButton').removeAttribute('disabled');
    };
    input.onmouseleave = () => {
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

const loadOptionMovieHtml = (response) => {
    const data = response.results;
    const optionsContents = document.querySelector('div.optionsContents');
    if(data.length > 0)
    {
        optionsContents.innerHTML = "";
        data.forEach((dataItem)=>{
            optionItem(dataItem, optionsContents);
        });
    }
    else
    {
        option = '';
        optionsContents.innerHTML = "<h3>Nothing to show here</h3>";
    }
};

const optionItem = async (data, parentElement) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'moviesOfOption');
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

const allFiltersHtml = () => {
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
                    <option value="popularity.desc">Popularity Descending</option>
                    <option value="popularity.asc">Popularity Ascending</option>
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
                            <input type="range" class="min" name="minScore" min="0" max="10" value="0" step="1">
                            <input type="range" class="max" name="maxScore" min="0" max="10" value="10" step="1">
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
        <button class="filterSearchButton" id="filterSearchButton" disabled="true">Search</button>
    `;
    filters.appendChild(form);
};


