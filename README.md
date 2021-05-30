# Wol-NodeJS
A NodeJS based express server that has support for WakeOnLan.

## Usage
- Get /status    
    Using the /status endpoint you can check if Wol-NodeJS is working
    ### Example
    ``` JSON
        "message": "🚀 The rocket has launched 🚀"
    ``` 
- Post /wol   
    Using the /wol endpoint you can wake a device up
    ### Client Request (Post)
    ``` JSON
        "pass": "Password1234!",
        "mac": "01:23:45:67:89:AB",
        "check": "true", (optional)
        "ip": "192.168.10.1"
    ```
    ### Response 
    #### Mac Address
    ``` JSON
        "success": "true",
        "message": "Sent WOL request to 01:23:45:67:89:AB"
    ``` 
    #### Mac Address With check
    ``` JSON
        "success": "true",
        "message": "Successfuly sent WOL request to 192.168.10.1 (01:23:45:67:89:AB)"
            
    ```

## Setup
You must create a .env file in the same folder as server.js and place your password and delay (in seconds) in there (Don't use Password1234!)   
.env example
``` TEXT
    password=Password1234!
    delay=90
```

## Running
Launch Wol-NodeJS with npm
``` SHELL
    npm run start
```