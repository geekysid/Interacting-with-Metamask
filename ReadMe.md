# Interacting with Metamask using Javascript
---

In this project, I'm just trying to learn how to interact with metamask using JS. This project I'm not trying to do any kind of interaction with smart contract. It is only limited to understanding, how to connect to Metamask, how to handle events like, user changing his address in Metmask or moving to different network in Metamask.

- Make sure we have live sever started else this will not work.

- In order to check if a bowser has metamask as an extention, we can use **window.ethereum**.
    ```javascript
    <script>
        if(window.ethereum) {
            cosole.log('Metamask is installed');
        } else {
            console.log("Metamask is not installed");
        }
    </script>
    ```

- (**Deprecated**) In order to connect to metamask, we need to call enbaled function on window.ethereum. This will pop up metamask and ask permession from user to get connected to the website.
    ```javascript
    window.etehreum.enabled();
    ```

- Inoder to check f the wbesite are already connected to the Metamask, we use *request* function of *window.ethereum* and pass a method called **eth_accounts**. This function will return a promise which on resolve, gives the accounts that ae available on metamask and conncted ot the website. If the number of account retuned is 0, then it caan assumed that our website is not connceted to the metamask.
    ```javascript
    <script>
        let accounts = await window.ethereum.request({method: 'eth_accounts'});
        if (accounts.length == 0) {
            console.log("Not conncted to metamask");
        } else {
            console.log(`Connected to metamask using ${accounts[0]} account`);
        }
    </script>
    ```

- In order to connect to metamask, we pass **eth_requestAccounts** to the **request** function of the *window.ethereum* object. This will open Metamask and ask user to give permession to connect the account to the website. This function returns a promise. If user grants permession, promise is resolved and give arrya of accounts for which permession is granted. If user rejects the permession, then it throws an error
    ```javascript
    <script>
        if (windows.ethereum) {
            try {
                const accounts = async () => {
                        await window.ethereum.request({
                            method: 'eth_requestAccounts'
                        });
                    }
                console.log(`You are logged in using ${accounts[0]} address`);
            } catch(error) {
                console.log(error);
            }
        }
    </script>
    ```

- In order to know the network that accounts is linked to, we can use the inbuilt property, **networkVersion**, of *window.ethereum* object. This returns a promise and on resolving, it gives the ID of the network associated with the address in hexadecimal number.

    ```javascript
    await window.ethereum.networkVersion;
    ```

- window.etherem also provides fome events that can be captured and woked on.
    - **chainChanged** - this event is triggered whenever user changes his chain/network in metamask.

        ```javascript
        window.ethereum.on("chainChanged", event => {
            networkID = parseInt(event, 16);
            console.log(`Event: chainChanged, ${networkID}`)
        });
        ```

    - **accountsChanged** - this event is triggered whenever user changes his address in metamask.

        ```javascript
        window.ethereum.on("accountsChanged", accounts => {
            alert(`You are now connected with ${accounts[0]} address`);
        });
        ```

    - **connect** - this event is triggered whenever user connects to metamask.

        ```javascript
        window.ethereum.on("connect", info => console.log(`Event: connect || ${info}`));
        ```

    - **disconnect** - this event is triggered whenever user disconnects his metamask from website.

        ```javascript
        window.ethereum.on("disconnect", () => console.log(`Event: disconnect`));
}
        ```
