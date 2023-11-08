const homeLogo = document.querySelector('img#homeLogo');
const searchLogo = document.querySelector('img#searchLogo');

homeLogo.onclick = () => {
    location.reload();
};

let count = 0;
searchLogo.onclick = () => {
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

searchLogoDiv.onsubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.search.value.replace(' ','%20');
    sessionStorage.setItem('searchValue', value);
    const page = 1;
    searchValue(value, page);
};