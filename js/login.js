const loginButton = document.querySelector('h3#loginButton');
let movieOrShow = '';
let profilePage = '';

loginButton.onclick = async () => {
    if(!sessionStorage.getItem('user'))
    {
        await login();
    }
    window.scrollTo(0, 0);
    const user = JSON.parse(sessionStorage.getItem('user'));
    getProfilePage(user);
};

const login = async () => {
    const accountId = await sessionStorage.getItem('accountId');
    const userDetails = await getUserDetails(accountId);
    loginButton.innerText = `${userDetails.username}`;
    await sessionStorage.setItem('user',JSON.stringify(userDetails));
    const searchLogo = document.querySelector('img#searchLogo');
    searchLogo.style.width = '17%';
};

const getProfilePage = async (user) => {
    containerDiv.innerHTML = `
        <div class="bgUserDetails">
            <div class="userDetails">
                <span class="userLogo">S</span>
                <h1>${user.username}</h1>
            </div>
        </div>
        <div class="userProfile">
            <div class="userWatchListHeadings">
                <h1>WatchList</h1>
                <div class="buttons">
                    <button id="moviesWatchList"><h4>Movies</h4></button>
                    <button id="tvWatchList"><h4>TV Shows</h4></button>
                </div>
                <div class="userWatchList"></div>
            </div>
        </div>
    `;
    switchedGenre(user);
    const moviesWatchList = document.querySelector('button#moviesWatchList');
    const tvWatchList = document.querySelector('button#tvWatchList');
    moviesWatchList.onclick = () => {
        setButtonStyles(moviesWatchList,tvWatchList);
        switchedGenre(user);
    };
    tvWatchList.onclick = () => {
        setButtonStyles(tvWatchList,moviesWatchList);
        switchedGenre(user, 'tv');
    };
};

const switchedGenre = async (user, genre = "movies") => {
    const userWatchList = document.querySelector('div.userWatchList');
    userWatchList.innerHTML = '';
    profilePage = 1;
    movieOrShow = genre;
    const dataList = await getWatchlist(user.id, profilePage, movieOrShow);
    dataList.results.forEach((data)=>{
        searchListItem(data, userWatchList);
    });
};

if(sessionStorage.getItem('user'))
{
    login();
}
