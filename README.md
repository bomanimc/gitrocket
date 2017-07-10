# gitrocket
A fun plugin for the [Hyper](https://hyper.is/) terminal that launches a rocket
ship when you push code with Git.

![gitrocker usage GIF](https://user-images.githubusercontent.com/6589909/28026422-9dc92218-655b-11e7-8852-3ee8d57c87d5.gif)

### Installation
To use this plugin, first install the plugin in your `~/.hyper_plugins`
folder.
```
$ cd ~/.hyper_plugins
$ npm install gitrocket
```
Then add the plugin's name in your `~/.hyper.js` file as an item in the
`plugins` array.
```
plugins: [
  "gitrocket"
],
```

Afterwards, refresh your Hyper terminal with _View > Full Reload_.

### Development
To run a local version of this plugin, clone it in your
`~/.hyper_plugins/local` folder.
```
$ cd ~/.hyper_plugins/local
$ git clone git@github.com:bomanimc/gitrocket.git
```
Then add the plugin's name in your `~/.hyper.js` file as an item in the
`plugins` array.
```
localPlugins: [
  "gitrocket"
],
```
Afterwards, use `npm run build` to create a `/dist` folder. Lastly, refresh
you terminal.
