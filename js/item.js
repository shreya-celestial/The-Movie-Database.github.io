const searchLogoDiv = document.querySelector('form.searchLogoDiv');
const itemClicked = async (id, genre = "movie") => {
    const data = await getClickedItem(id, genre);
    console.log(data);
    containerDiv.innerHTML = `
        <div class="bgMovie">
            <div class="bgOverlay">
                <img src="https://image.tmdb.org/t/p/original${data.poster_path}">
                <div class = "movieContents">
                    <span><b>${data.title || data.name}</b> (${moment(data.release_date).format("YYYY")})</span>
                </div>
            </div>
        </div>
    `;
    const bgMovieDiv = document.querySelector('div.bgMovie');
    bgMovieDiv.style.cssText = `
        background-image: url('https://image.tmdb.org/t/p/original${data.backdrop_path}');
    `;
    if(searchLogoDiv.style.display === "block")
    {
        bgMovieDiv.style.marginTop = "105px";
    }
};

getTrending("day");
