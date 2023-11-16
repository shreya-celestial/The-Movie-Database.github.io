window.onscroll = async () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        if(document.querySelector('div.moviesOfOption'))
        {
            const optionsContents = document.querySelector('div.optionsContents');
            let dataList = '';
            optionPage++;
            if(option === 'popular')
            {
                dataList = await getMoviePopularOption(optionPage);
            }else if(option === 'topRated')
            {
                dataList = await getMovieTopRatedOption(optionPage);
            }else if(option === 'params')
            {
                const filterParams = JSON.parse(sessionStorage.getItem('params'));
                dataList = await getFilteredData(filterParams, optionPage);
            }
            if(dataList.results === undefined || dataList.results.length === 0)
            {
                option = '';
            }
            else
            {
                dataList.results.forEach((dataItem)=>{
                    optionItem(dataItem, optionsContents);
                });
            }
        }
        
        if(document.querySelector('div.userWatchList'))
        {
            profilePage++;
            const user = JSON.parse(sessionStorage.getItem('user'));
            const userWatchList = document.querySelector('div.userWatchList');
            let dataList = await getWatchlist(user.id, profilePage, movieOrShow);
            dataList.results.forEach((data)=>{
                watchListContents(data, userWatchList);
            });
            if(dataList.results.length < 20)
            {
                dataList = '';
            }
        }
    }
};