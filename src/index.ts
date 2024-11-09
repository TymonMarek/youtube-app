import { app, BrowserWindow, Tray, Menu, nativeImage, NativeImage } from 'electron';
import path from 'path';
import axios from 'axios';
import sharp from 'sharp';

declare global {
  namespace Electron {
    interface App {
      isQuiting?: boolean;
    }
  }
}

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

async function fetchFavicon(): Promise<NativeImage> {
  try {
    // Fetch the HTML of the website to extract the favicon URL
    const response = await axios.get('https://youtube.com');
    const html = response.data;

    // Regex to find the favicon URL
    const regex = /<link rel="icon" href="([^"]+)"/;
    const match = html.match(regex);

    if (match && match[1]) {
      // Absolute URL of the favicon
      const faviconUrl = match[1];
      const faviconResponse = await axios.get(faviconUrl, { responseType: 'arraybuffer' });

      // Convert the image data into a nativeImage using sharp
      const faviconImage = sharp(faviconResponse.data);
      const buffer = await faviconImage.resize(16, 16).toBuffer();
      return nativeImage.createFromBuffer(buffer);
    } else {
      throw new Error('Favicon not found');
    }
  } catch (error) {
    console.error('Error fetching favicon:', error);
    // Fallback to a local image if the fetch fails
    return nativeImage.createFromPath(path.join(__dirname, 'assets', 'favicon.ico'));
  }
}

async function createWindow(): Promise<void> {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true, // Hide the default menu bar
    icon: path.join(__dirname, 'assets', 'favicon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL('https://youtube.com');

  mainWindow.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow?.hide();
    }
  });
}

async function createTray(): Promise<void> {
  const trayIcon = await fetchFavicon();
  tray = new Tray(trayIcon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      click: () => {
        app.isQuiting = true;
        app.quit();
      },
    },
  ]);

  tray.setToolTip('YouTube');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    if (mainWindow?.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow?.show();
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {});

app.on('before-quit', () => {
  app.isQuiting = true;
});
