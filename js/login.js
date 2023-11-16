const loginButton = document.querySelector('h3#loginButton');
let movieOrShow = '';

loginButton.onclick = async () => {
    if(!sessionStorage.getItem('user'))
    {
        login();
    }
    else
    {
        window.scrollTo(0, 0);
        const user = JSON.parse(sessionStorage.getItem('user'));
        getProfilePage(user);
        movieOrShow = 'movies';
    }
};

const login = async () => {
    const token  = await getRequestToken();
    await getLoginPage();
    const loginForm = document.querySelector('form#loginElementsDiv');
    loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const body = {
            username: e.target.elements.username.value,
            password: e.target.elements.password.value,
            request_token: token.request_token
        };
        const data = await createSessionWithLogin(body);
        if(!data.success)
        {
            alert('Re-enter Details');
        }
        else
        {
            const accountDetails = await getAccountId(data.session_id);
            sessionStorage.setItem('user', JSON.stringify(accountDetails));
            getProfilePage(accountDetails);
            resetLoginStyle(accountDetails);
        }
    };    
};

const getLoginPage = () => {
    containerDiv.innerHTML = `
        <div class="initialLoginPage">
            <form id="loginElementsDiv">
                <h2>Login to your account</h2>
                <label for="username">Username</label>
                <input type="text" name="username">
                <label for="password">Password</label>
                <input type="password" name="password">
                <button>Login</button>
            </form>
        </div>
    `;
    return;
};

const resetLoginStyle = (userDetails) => {
    loginButton.innerText = `${userDetails.username}`;
    const searchLogo = document.querySelector('img#searchLogo');
    searchLogo.style.width = '17%';
};

if(sessionStorage.getItem('user'))
{
    const accountDetails = JSON.parse(sessionStorage.getItem('user'));
    resetLoginStyle(accountDetails);
}
