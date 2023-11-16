let profilePage = '';

const getProfilePage = async (user) => {
    containerDiv.innerHTML = `
        <div class="bgUserDetails">
            <div class="userDetails">
                <span class="userLogo">${user.username.substring(0,1).toUpperCase()}</span>
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
    userWatchList.innerHTML = '<h5>Loading...</h5>';
    profilePage = 1;
    movieOrShow = genre;
    const dataList = await getWatchlist(user.id, profilePage, movieOrShow);
    if(dataList.results.length === 0)
    {
        userWatchList.innerHTML = '<h5>Nothing To Show!</h5>';
    }
    else
    {
        userWatchList.innerHTML = '';
        dataList.results.forEach((data)=>{
            watchListContents(data, userWatchList);
        });
    }
};

const watchListContents = async (data, userWatchList) => {
    searchListItem(data, userWatchList);
    const div = document.querySelector(`div#search-${data.id}`);
    const delDiv = document.createElement('div');
    delDiv.setAttribute('class', 'deleteDiv');
    delDiv.setAttribute('id', `del-${data.id}`);
    delDiv.innerHTML = `
        <img src="./assets/delete.png" class="delButton" alt="">
    `;
    await div.appendChild(delDiv);
    div.onclick = () => {
        if(movieOrShow === 'movies'){
            itemClicked(data.id, 'movie');  
        }else if(movieOrShow === 'tv'){
            itemClicked(data.id, movieOrShow);  
        }
    };
    const deleteFromWatchlist = document.querySelector(`div#del-${data.id}`);
    deleteFromWatchlist.onclick = async (e) => {
        e.stopPropagation();
        const user = JSON.parse(sessionStorage.getItem('user'));
        const body = {
            media_type: (data.first_air_date ? 'tv' : 'movie'), 
            media_id: data.id, 
            watchlist: false
        };
        await addToWatchlist(body, user.id);
        switchedGenre(user, (data.first_air_date ? 'tv' : 'movies'));
    };
};
