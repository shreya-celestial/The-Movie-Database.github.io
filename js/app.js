const homeLogo = document.querySelector('img#homeLogo');
const searchLogo = document.querySelector('img#searchLogo');
const movieNav = document.querySelector('h3#movieNav');
const movieOptionsDiv = document.querySelector('div#movieNavOptionsDiv');

homeLogo.onclick = () => {
    location.reload();
    sessionStorage.removeItem('params');
};

let count = 0;
const handleSearchLogoClick = () => {
    count++;
    if(count === 0 || count%2 === 0 )
    {
        searchLogoDiv.style.display = "none";
        const bgMovieDiv = document.querySelector('div.bgMovie');
        if(bgMovieDiv)
        {
            bgMovieDiv.style.marginTop = 'unset';
        }
    }
    else
    {
        searchLogoDiv.style.display = "block";
        const bgMovieDiv = document.querySelector('div.bgMovie');
        if(bgMovieDiv)
        {
            bgMovieDiv.style.marginTop = '105px';
        }
    }
};

searchLogo.onclick = () => {
    handleSearchLogoClick();
};

searchLogoDiv.onsubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.search.value.replace(' ','%20');
    sessionStorage.setItem('searchValue', value);
    const page = 1;
    searchValue(value, page);
};

movieNav.onmouseover = async (e) => {
    const left = e.clientX;
    const top = e.clientY;
    movieOptionsDiv.style.left = `${left}px`;
    movieOptionsDiv.style.top = `${top}px`;
    movieOptionsDiv.style.display = `block`;
};

movieNav.onmouseout = () => {
    if(!movieOptionsDiv.matches(':hover'))
    {
        movieOptionsDiv.style.display = "none";
    }
};

movieOptionsDiv.onmouseover = () => {
    movieOptionsDiv.style.display = "block";
};

movieOptionsDiv.onmouseout = () => {
    movieOptionsDiv.style.display = "none";
};
