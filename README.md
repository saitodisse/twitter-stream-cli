# twitter-stream-cli 0.2.1

Twitter streams. This is a **cli tool** and also a **npm lib**.

- Track multiples words
- Output results in several formats
- Send results to a `Firebase Database`
- Instructions to run severals instances with `pm2`

## Install

> This tool requires node.js. I suggest you to use [nvm](https://github.com/creationix/nvm)

[![asciicast](https://asciinema.org/a/0umhwhnylfya0cgbdav7oe2v1.png)](https://asciinema.org/a/0umhwhnylfya0cgbdav7oe2v1)

```sh
npm install twitter-stream-cli -g
```

### Configure .env file

1) Create an `.env` file:

```sh
touch .env
# or use wget
wget https://raw.githubusercontent.com/saitodisse/twitter-stream-cli/master/.env-example -O .env
```

2) Create an app on https://apps.twitter.com/ and put keys on `.env` file:

```sh
# Twitter API keys: https://apps.twitter.com
CONSUMER_KEY=__XXX__
CONSUMER_SECRET=__XXX__
TOKEN=__XXX__
TOKEN_SECRET=__XXX__

# [optional] Firebase: https://console.firebase.google.com
FIREBASE_APIKEY=__XXX__
FIREBASE_DATABASEURL=__XXX__
```

----------

## Run as cli tool

[![asciicast](https://asciinema.org/a/9n691flwjn4d43kc9xb9faz8w.png)](https://asciinema.org/a/9n691flwjn4d43kc9xb9faz8w)

```sh
# will track banana
twitter-stream-cli banana

# will track banana tweets OR chocolate tweets
twitter-stream-cli banana chocolate

# will track banana and chocolate in the same tweet message
twitter-stream-cli "banana chocolate"
```

### Format output

```sh
twitter-stream-cli banana --short          #output: @user (lang): 80 char tweet text
twitter-stream-cli banana --long           #output: @user (lang, id, date): full tweet text
twitter-stream-cli banana --json           #output: full json result
twitter-stream-cli banana --json-formatted #output: full formatted json result
twitter-stream-cli banana --json-inspect   #output: inspect json result with colors
```

### Send json result to Firebase

1) Edit `.env` file. Replace `__XXX__` on `FIREBASE_URL=https://__XXX__.firebaseio.com`:

2) Send results

```sh
twitter-stream-cli banana --send
```


-----------

## Run multiples instances with pm2

We can easily run multiples instances of this tool with `pm2`.

#### Install pm2

```sh
npm i pm2 -g
```

#### Create configuration files

Create `app.json`

```sh
mkdir pm2
touch pm2/app.json
```


-------------

Edit `app.json`:

```js
{
  "apps" : [
    {
      "name"              : "banana",
      "script"            : "twitter-stream-cli",
      "args"              : ["banana"],
      "log_date_format"   : "YYYY-MM-DD HH:mm:ss Z",
      "autorestart"       : true,
      "exec_mode"         : "fork",
      "max_memory_restart": "100M",
    },
    {
      "name"              : "chocolate",
      "script"            : "twitter-stream-cli",
      "args"              : ["chocolate"],
      "log_date_format"   : "YYYY-MM-DD HH:mm:ss Z",
      "autorestart"       : true,
      "exec_mode"         : "fork",
      "max_memory_restart": "100M",
    },
  ]
}
```


-------------

Now you can start watching banana & cholocate in separeted instances.
This will send to differents firebase URLs.

```sh
# edit pm2/app.json with your tracking terms
pm2 start pm2/app.json
```


-------------

Check is everything is running ok:

```sh
# you can see logs and monitore
pm2 list
pm2 monit

# delete and stop all instances
pm2 delete all
```

-----------

## Use as lib

#### Install

```sh
npm install twitter-stream-cli --save
```

#### Use

```js
// ES5
var TwiterStream require('twitter-stream-cli');
var twiterStream = new TwiterStream({
  track: 'banana'
});
return twiterStream.run();
```

```js
// ES6
import TwiterStream from 'twitter-stream-cli';
const twiterStream = new TwiterStream({
  track: 'banana'
});
return twiterStream.run();
```

---------

## Test and run locally

```sh
git clone git@github.com:saitodisse/twitter-stream-cli.git
cd twitter-stream-cli
npm install
npm test
node ./bin/twitter-stream-cli.js -h

# all available tasks
gulp help
```

