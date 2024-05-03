# Shorterms Chrome Extension Client

## [End Users] Installing on your Chrome browser
As we are still waiting for approval to publish on the Chrome Web Store, you can kindly try out the extension by using the ZIP file in our latest release.

### Procedures:
#### Installing the build folder on your machine
1. Go to Shorterms' repository and find the `Release` section - `https://github.com/kerisai/shorterms-client/releases/tag/alpha` <br> ![image](https://github.com/kerisai/shorterms-client/assets/42536973/dd0b76b0-4cd8-468b-98c7-eaaa20793753)

2. Install our release ZIP file (`shorterms-0.0.1-release.zip`) <br>![image](https://github.com/kerisai/shorterms-client/assets/42536973/1bec1f69-d81f-49dc-80f0-9fa69324c389)

3. After installation, unzip the file on your local computer, and ensure that a new folder with the same name is created <br> ![image](https://github.com/kerisai/shorterms-client/assets/42536973/02983942-4995-4eab-b950-9b67a483cb89)

#### Installing the extension on Chrome
4. Open Google Chrome, and type in this link on the search bar / omnibox: `chrome://extensions/` <br>  ![image](https://github.com/kerisai/shorterms-client/assets/42536973/6b365398-d2fb-4045-8ae9-3ae1be034405)

5. Activate `Developer Mode` toggle on the top right corner <br> ![image](https://github.com/kerisai/shorterms-client/assets/42536973/43d2485e-f27f-4e31-972c-330eabe88de3)

6. Click `Load Unpacked` on the top left corner of the screen

7. Upload the folder that you extracted on step 4. Note that you must upload the entire folder for this step to work. <br> ![image](https://github.com/kerisai/shorterms-client/assets/42536973/a7b5fdac-d9b4-4085-9de2-9cced4ca9dea)

#### Trying out the Shorterms Extension
8. Ensure that Shorterms extension is now installed on Chrome <br> ![image](https://github.com/kerisai/shorterms-client/assets/42536973/42156f2c-add8-40f0-ac0d-fd82b885cfc4)

9. Go to any site that has a Terms of Service link somewhere inside it - we'll use `github.com/signup` for this one. You'll see that the Chrome Extension automatically searches for ToS links and shows a Modal on the top right corner if they're found. 

10. Click Cmd + Shift + S to open the extension, and you can now summarize any Terms of Service on any site within a click, using Google's Gemini AI model!

<hr>

## [Developers] Installing and Running
### Procedures:

1. Check if your [Node.js](https://nodejs.org/) version is >= **18**.
2. Clone this repository.
3. Change the package's `name`, `description`, and `repository` fields in `package.json`.
4. Change the name of your extension on `src/manifest.json`.
5. Run `npm install` to install the dependencies.
6. Run `npm start`
7. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.
8. Happy hacking.

## Structure

All your extension's code must be placed in the `src` folder.

The boilerplate is already prepared to have a popup, an options page, a background page, and a new tab page (which replaces the new tab page of your browser). But feel free to customize these.

## TypeScript

This boilerplate now supports TypeScript! The `Options` Page is implemented using TypeScript. Please refer to `src/pages/Options/` for example usages.

## Webpack auto-reload and HRM

To make your workflow much more efficient this boilerplate uses the [webpack server](https://webpack.github.io/docs/webpack-dev-server.html) to development (started with `npm start`) with auto reload feature that reloads the browser automatically every time that you save some file in your editor.

You can run the dev mode on other port if you want. Just specify the env var `port` like this:

```
$ PORT=6002 npm run start
```

## Content Scripts

Although this boilerplate uses the webpack dev server, it's also prepared to write all your bundles files on the disk at every code change, so you can point, on your extension manifest, to your bundles that you want to use as [content scripts](https://developer.chrome.com/extensions/content_scripts), but you need to exclude these entry points from hot reloading [(why?)](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate/issues/4#issuecomment-261788690). To do so you need to expose which entry points are content scripts on the `webpack.config.js` using the `chromeExtensionBoilerplate -> notHotReload` config. Look the example below.

Let's say that you want use the `myContentScript` entry point as content script, so on your `webpack.config.js` you will configure the entry point and exclude it from hot reloading, like this:

```js
{
  …
  entry: {
    myContentScript: "./src/js/myContentScript.js"
  },
  chromeExtensionBoilerplate: {
    notHotReload: ["myContentScript"]
  }
  …
}
```

and on your `src/manifest.json`:

```json
{
  "content_scripts": [
    {
      "matches": ["https://www.google.com/*"],
      "js": ["myContentScript.bundle.js"]
    }
  ]
}
```

## Packing

After the development of your extension run the command

```
$ NODE_ENV=production npm run build
```

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.

## Secrets

If you are developing an extension that talks with some API you probably are using different keys for testing and production. Is a good practice you not commit your secret keys and expose to anyone that have access to the repository.

To this task this boilerplate import the file `./secrets.<THE-NODE_ENV>.js` on your modules through the module named as `secrets`, so you can do things like this:

_./secrets.development.js_

```js
export default { key: '123' };
```

_./src/popup.js_

```js
import secrets from 'secrets';
ApiCall({ key: secrets.key });
```

:point_right: The files with name `secrets.*.js` already are ignored on the repository.

## Resources:

- [Webpack documentation](https://webpack.js.org/concepts/)
- [Chrome Extension documentation](https://developer.chrome.com/extensions/getstarted)
