let inventory = 0;
let coins = 0;
let currUser = null;
window.addEventListener( "load", function () {
    if (localStorage.getItem('logged') === 'yes') {
        hideHomePage();
        hideStartButton();
        showGamePage();
        document.getElementById('loginuser').setAttribute('value', localStorage.getItem('user'));
        document.getElementById('loginpass').setAttribute('value', localStorage.getItem('pass'));

        const loginForm = document.getElementById( "login" );
        const sendRequest = new XMLHttpRequest();
        const loginInfo = new URLSearchParams(new FormData( loginForm ));

        sendRequest.onreadystatechange = function() {
            currUser = JSON.parse(sendRequest.response);
        }
        sendRequest.open("POST", "http://localhost:5000/app/login/user");
        sendRequest.send( loginInfo );
        
    } else {
        hideStartButton();
        hideGamePage();
        showHomePage();
    }

    function hideStartButton() {
        document.getElementById("start").style.display="None";
    }
    function showStartButton() {
        document.getElementById("start").style.display="block";
    }

    function hideHomePage() {
        document.getElementById("home").style.display="None";
    }
    function showHomePage() {
        document.getElementById("home").style.display="block";
    }

    function hideGamePage() {
        document.getElementById("game").style.display="None";
    }
    function showGamePage() {
        document.getElementById("game").style.display="block";
    }

    function updateLogin() {
        alert("updateLogin called");

        const sendRequest = new XMLHttpRequest();
        let paramsObj = {
            user: currUser.user,
            coins: currUser.coins,
            pass: currUser.pass,
            inventory: currUser.inventory,
            id: currUser.group_id, 
            login: currUser.login + 1};
        let searchParams = new URLSearchParams(paramsObj);

        sendRequest.addEventListener( "load", function ( event ) {
            alert( 'Login updated!');
        });

        sendRequest.addEventListener( "error", function ( event ) {
            alert('Login update unsuccessful.');
        });

        sendRequest.open("PATCH", "http://localhost:5000/app/update/user/" + currUser.group_id);
        sendRequest.send(searchParams);
    };

    function handleHarvest() {
        alert("handleHarvest called");

        const sendRequest = new XMLHttpRequest();
        let paramsObj = {
            user: currUser.user,
            coins: currUser.coins - 1,
            pass: currUser.pass,
            inventory: currUser.inventory + 1,
            id: currUser.group_id, 
            login: currUser.login};
        let searchParams = new URLSearchParams(paramsObj);

        sendRequest.addEventListener( "load", function ( event ) {
            alert( 'harvested!');
            inventory = currUser.inventory;
            coins = currUser.coins;
        });

        sendRequest.addEventListener( "error", function ( event ) {
            alert('harvest unsuccessful.');
        });

        sendRequest.open("PATCH", "http://localhost:5000/app/update/user/" + currUser.group_id);
        sendRequest.send(searchParams);
    }

    function handleSell() {
        alert("handleSell called");

        const sendRequest = new XMLHttpRequest();
        let paramsObj = {
            user: currUser.user,
            coins: currUser.coins + 2,
            pass: currUser.pass,
            inventory: currUser.inventory - 1,
            id: currUser.group_id, 
            login: currUser.login};
        let searchParams = new URLSearchParams(paramsObj);

        sendRequest.addEventListener( "load", function ( event ) {
            event.preventDefault();
            alert( 'sold!');
            inventory = currUser.inventory;
            coins = currUser.coins;
        });

        sendRequest.addEventListener( "error", function ( event ) {
            event.preventDefault();
            alert('sale unsuccessful.');
        });

        sendRequest.open("PATCH", "http://localhost:5000/app/update/user/" + currUser.group_id);
        sendRequest.send(searchParams);
    }

    function sendData() {
        const sendRequest = new XMLHttpRequest();
        
        const signupInfo = new URLSearchParams(new FormData( signupForm ));

        sendRequest.addEventListener( "load", function ( event ) {
            alert( 'Your account was created!');
        });

        sendRequest.addEventListener( "error", function ( event ) {
            alert('Submission unsuccessful! Please try again.');
        });

        sendRequest.open( "POST", "http://localhost:5000/app/new/user" );

        sendRequest.send( signupInfo );

    }

    function getData() {
        const sendRequest = new XMLHttpRequest();
        const loginInfo = new URLSearchParams(new FormData( loginForm ));

        sendRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                localStorage.setItem('logged','yes');
                localStorage.setItem('user',document.getElementById('loginuser').value);
                localStorage.setItem('pass',document.getElementById('loginpass').value);
                currUser = JSON.parse(sendRequest.response);
                showStartButton();
                alert("Login successful! " + currUser.group_id);
            } else if ( this.status != 200 ) {
                alert("Attempting log in...");
            }
        }

        sendRequest.open("POST", "http://localhost:5000/app/login/user");
        sendRequest.send( loginInfo );
    };

    const signupForm = document.getElementById( "signup" );
    signupForm.addEventListener( "submit", function ( event ) {
        event.preventDefault();
        sendData();
    });

    const loginForm = document.getElementById( "login" );
    loginForm.addEventListener( "submit", function ( event ) {
        event.preventDefault();
        getData();
    });

    const harvestButton = document.getElementById( "harvest" );
    harvestButton.addEventListener( "click", function ( event ) {
        handleHarvest();
    });

    const sellButton = document.getElementById( "sell" );
    sellButton.addEventListener( "click", function ( event ) {
        handleSell();
    });

    const startButton = document.getElementById( "start" );
    startButton.addEventListener( "click", function(event) {
        event.preventDefault();
        alert("starting game");
        
        hideHomePage();
        showGamePage();
    });


    const infoBox = document.getElementById("info");
    infoBox.addEventListener("click", function(event){
        event.preventDefault();
        document.getElementById("infobox").innerHTML = `Username: ${currUser.user}, 
        Inventory: ${currUser.inventory}, 
        Coins: ${currUser.coins}`

    });

    const exitButton = document.getElementById("exit");
    exitButton.addEventListener("click" , function(event) {
        event.preventDefault();
        currUser = null;
        localStorage.setItem('logged','no');
        hideStartButton();
        hideGamePage();
        showHomePage();
        document.getElementById('loginuser').setAttribute('value', '');
        document.getElementById('loginpass').setAttribute('value', '');
    });
});

