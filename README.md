# YouTube App Wrapper

A simple Electron-based desktop application that wraps YouTube in a standalone window and provides a tray icon for easy access. The application allows you to view YouTube directly from your desktop with features like hiding/showing the window via the tray icon.

## Features

- Loads YouTube in a native Electron browser window.
- Displays a tray icon with YouTube's favicon.
- Allows toggling visibility of the main window from the tray icon.
- Includes a "Quit" option in the tray context menu.
- Runs in the background without closing when the window is hidden.

## Installation

1. Go to the [Releases page](https://github.com/TymonMarek/youtube-app/releases/) of this repository.
2. Download the newest setup file: `YouTube.Setup.*.*.*.exe`.
3. Run the installer and follow the instructions to complete the installation.

## Development
To contribute to the project or make changes:

1. Clone the repository:
```bash
git clone https://github.com/yourusername/youtube-app-wrapper.git
```
2. Install dependencies:
```bash
npm install
```
3. Make your changes, and create a pull request.

### Packaging the App
To package the app for distribution, use the following command:
```bash
npm run package
```
This will generate an executable for your platform in the `dist` folder.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/TymonMarek/youtube-app/blob/main/LICENSE.md) file for details.

The MIT license applies **only** to the code in this repository. The YouTube content and service itself are not covered by this license and are the property of YouTube, Google, or other third parties.

This project is **NOT** associated or endorsed by YouTube, Google, or any other parties. 

This project is **NOT** responsible for any misuse, legal issues, or other consequences arising from the use of YouTube or its content through this application. Please comply with YouTube’s Terms of Service and other relevant policies while using this app.

For any takedown requests, please email [tymon.marek@ulur.org](mailto:tymon.marek@ulur.org).

## Acknowledgments
Electron - Framework for building native desktop apps with web technologies.

axios - Promise-based HTTP client for the browser and Node.js.

sharp - Image processing library for resizing and manipulating images.
