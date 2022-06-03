let userAddress = null;
let networkID = null;

// handeling button that aloows to connect to metamask
const handleConnectBtn = action => {
    if (action === 'disable') {
        document.getElementById('loginBTN').setAttribute('disable', true);
        document.getElementById('loginBTN').innerText = `You are logged in using ${userAddress} address`;
    } else {
        document.getElementById('loginBTN').removeAttribute('disable');
        document.getElementById('loginBTN').innerText = `Login & Save ETH Address`;
    }
}

// function used to hide/unhide a button
const btnHideUnhide = (el, action) => {
    const list = el.classList;
    if (action === 'hide') {
        if (!list.contains('hidden')) {
            el.classList.add('hidden');
        }
    } else if (action === 'show') {
        if (list.contains('hidden')) {
            el.classList.remove('hidden');
        }
    }
}

// functioned when page is loaded
function onLoad() {
    // continue is metamask in installed in browser
    if(window.ethereum) {
        if (checkMetamaskConnection()) {

        }
    } else {
        alert("Metamask is not installed.")
    }
    handleConnectBtn();
    console.log(window.ethereum.network);
    console.log(window.ethereum.address);
}

// testing metamask functionalities
if (window.ethereum) {
    // if chain is changed - returns new chain ID in hex
    window.ethereum.on("chainChanged", event => {
        networkID = parseInt(event, 16);
        console.log(`Event: chainChanged, ${networkID}`);
        alert(`You changed network to ID ${networkID}`);
        showNetwork();
    });

    // if account is changed - returns account address that is connected
    window.ethereum.on("accountsChanged", accounts => {
        console.log(`Event: accountChanged || ${accounts}`);
        userAddress = accounts[0];
        alert(`You are now connected with ${userAddress} address`);
        handleConnectBtn('disable');
    })

    // if any message is sent from metamask
    window.ethereum.on("message", message => console.log(`Event: message || ${message}`));

    // when connected to Metamask
    window.ethereum.on("connect", info => console.log(`Event: connect || ${info}`));

    // when disconnected from metamask
    window.ethereum.on("disconnect", error => console.log(`Event: disconnect || ${error}`));

    // // get provider details
    // const provider = Web3.providers.WebsocketProvider(window.ethereum);
    // console.log(`Provider: ${provider}`);

    // // get signer details
    // const signer = provider.getSigner();
    // console.log(`Signer: ${signer}`);
}

const checkMetamaskConnection = async () => {
    let accounts = await window.ethereum.request({method: 'eth_accounts'});
    console.log(accounts)
    if (accounts.length == 0) {
        console.log("Not conncted to metamask");
        return false;
    } else {
        userAddress = accounts[0];
        console.log(`Conncted to metamask using address: ${accounts[0]}`);
        return true;
    }
}

// connecting site to metamask
const loginWithMetamask = async () => {
    if (window.ethereum) {
        // NEW METHOD to get permission to get connected to metamask
        try{
            let result = await window.ethereum.request({
                method: 'wallet_requestPermissions',
                params: [{
                    eth_accounts: {}
                }]
            });
            console.log(result);
            userAddress = result[0]['caveats'][0]['value'][0];
            console.log(`You are logged in using ${userAddress} address`);
            // setupWeb3();
            handleConnectBtn('disable');
            btnHideUnhide(document.getElementById("showNetwork"), "show");
        } catch(error) {
            console.log(error);
        }

        // get accounts conneted o the website via Metamask
        try {
            let accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            console.log(accounts);
        } catch(error) {
            console.log(error);
        }
    } else{
        console.log("4");
    }
}

// show network ID
const showNetwork = async () => {
    if (window.ethereum && userAddress) {
        networkID = await window.ethereum.networkVersion;
        let networkName = null;
        if (networkID === '1') {
            networkName = "Mainnet";
        } else if (networkID === '3') {
            networkName = "Ropsten";
        } else if (networkID === '4') {
            networkName = "Rinkeby";
        } else if (networkID === '5') {
            networkName = "Goerli";
        } else if (networkID === '42') {
            networkName = "Kovan";
        } else {
            networkName = "Localhost";
        }
        document.getElementById("showNetwork").innerText = `Connected to network with ID: ${networkID} (${networkName})`;
    }
}
