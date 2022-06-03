- Make sure we have live sever started else thsi will not work.

- if we get en error regaring **require**,

    - Use below command to browserify the javascript file
        ```
        npx browserify index.js --standalone bundle -o ./dist/bundle.js
        ```

    - Change the script import as below
        ```
        <script src="./dist/bundle.js"></script>
        ```

    - Lastly chage all function call in index file as:
        ```
        bundle.functionName()
        ```

- In order to check if a bowser has metamask as an extention, we can use **window.ethereum**.
    ```
    <script>
        if(window.ethereum) {
            cosole.log('Metamask is installed');
        } else {
            console.log("Metamask is not installed");
        }
    </script>
    ```

- (Deprecated) In order to connect to metamask, we need to call enbaled function on window.ethereum. This will pop up metamask and ask permession from user to get connected to the website.
    ```
    window.etehreum.enabled();
    ```

- In order to connect to metamas, we use the **request** function of the *window.ethereum* and pass **wallet_requestPermissions** as an argument.
    ```
    <script>
        if (windows.ethereum) {
            try {
                const result = async () => {
                        await window.ethereum.request({
                            method: 'eth_requestPermission'
                        });
                    }
                console.log(`You are logged in using ${} address`);
            } catch(error) {
                console.log(error);
            }
        }
    </script>
    ```

- Inorder to know if we providers ae available and web3 canbe connected to a blckchain, we use below command that returns bool
    ```
    await window.etherem.isConected();
    ```