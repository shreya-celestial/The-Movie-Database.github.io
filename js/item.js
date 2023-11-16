const searchLogoDiv = document.querySelector('form.searchLogoDiv');
const itemClicked = async (id, genre = "movie") => {
    const data = await getClickedItem(id, genre);
    let imgSrc = `https://image.tmdb.org/t/p/original${data.poster_path}`;
    if(data.poster_path === undefined || data.poster_path === null)
    {
        imgSrc = "./assets/noImg.jpg";
    }
    let genresInvolved = '';
    if(data.genres.length>0)
    {
        genresInvolved = '&bull;  ';
        data.genres.forEach((genre)=>{
            genresInvolved+=(genre.name+',');
        });
    }
    genresInvolved = genresInvolved.substring(0,genresInvolved.length-1);
    let runtime = `${Math.trunc(data.runtime/(60))}hrs`;
    if(data.runtime%60 !== 0)
    {
        runtime+= ` ${data.runtime%60}mins`;
    }
    if(data.runtime)
    {
        runtime = `&bull;  ${runtime}`;
    }
    else
    {
        runtime = '';
    }
    containerDiv.innerHTML = `
        <div class="bgMovie">
            <div class="bgOverlay">
                <img src="${imgSrc}">
                <div class = "movieContents">
                    <span><b>${data.title || data.name}</b> (${moment(data.release_date || data.first_air_date).format("YYYY")})</span>
                    <p class="minorDetailsP">${moment(data.release_date || data.first_air_date).format("DD/MM/YYYY")}  ${genresInvolved}  ${runtime}</p>
                    <img src="./assets/save.png" id="wishlist">
                    <div class="wishlistMsg">Login to add this movie to your watchlist</div>
                    <p><i>${data.tagline}</i></p>
                    <h4>Overview</h4>
                    <p class="movieOverview">${data.overview}</p>
                </div>
            </div>
        </div>
    `;
    const bgMovieDiv = document.querySelector('div.bgMovie');
    window.scrollTo(0, 0); 
    bgMovieDiv.style.cssText = `
        background-image: url('https://image.tmdb.org/t/p/original${data.backdrop_path}');
    `;
    if(searchLogoDiv.style.display === "block")
    {
        bgMovieDiv.style.marginTop = "105px";
    }
    const wishlist = document.querySelector('img#wishlist');
    wishlist.onclick = async () => {
        if(sessionStorage.getItem('user'))
        {
            const accountId = sessionStorage.getItem('accountId');
            const body = {
                media_type: (data.last_air_date ? 'tv' : 'movie'), 
                media_id: data.id, 
                watchlist: true
            };
            await addToWatchlist(body, accountId);
            wishlist.style.background = 'none';
        }
    };
    wishlist.onmouseover = (e) => {
        if(!sessionStorage.getItem('user'))
        {
            const msg = document.querySelector('div.wishlistMsg');
            const left = e.clientX;
            const top = e.clientY;
            msg.style.left = `${left}px`;
            msg.style.top = `${top}px`;
            msg.style.display = `block`;
        }
    };
    wishlist.onmouseout = () => {
        document.querySelector('div.wishlistMsg').style.display = `none`;
    };
};

