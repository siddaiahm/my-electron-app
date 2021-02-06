# Mantis Dashboard App

This is the mantis dashboard app built using react and electron.

## Available Scripts

In the project directory, you can run:

### `npm run win-start` in windows

### `npm run lin-start` in linux

Runs the app in the development mode.\

to relode the page when edit happens un comment the require("electron-relode") line in electron/main.js.
**Note: this needs to be commented back. else in production app you will get error!**

### `npm run start-electron-win` in windows

### `npm run start-electron-lin` in linux

Launches the electron app running in development mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run lin-build-electrin` in linux

### `npm run win-build-electron` in windows

**Note: in windows you will get error hence run these commands one by one `mkdir build/src` ,`robocopy electron/. build/electron` , `robocopy src/shared/. build/src/shared` !**

This command is to copy the shared files to build folder for packaging electron app. If you dont copy these folders , app wont run in production mode.

### `npm run package`

**Note: above step should be done before running this command !:**
this will package the build folder to .exe (exicutable) file for production.
