# twitter-stream-cli

Twitter streams **cli tool**

- Export results as JSON
- Can track multiples words
- Send results to firebase (optional)

## Install

```sh
npm install twitter-stream-cli -g
```

----------

Create an `.env` file:

```sh
touch .env
```


----------

Edit `.env` file. Replace `__XXX__` with real valeus:

```sh
CONSUMER_KEY=__XXX__
CONSUMER_SECRET=__XXX__
TOKEN=__XXX__
TOKEN_SECRET=__XXX__
FIREBASE_URL=https://__XXX__.firebaseio.com
```


----------

## Run

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

```sh
twitter-stream-cli banana --send
```


-----------

## Run multiples instances with pm2

We can easily run multiples instances of this tool with `pm2`.

#### install pm2

```sh
# install pm2
npm i pm2 -g
```

#### create configuration files

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

## Test and run locally

```sh
git clone git@github.com:saitodisse/twitter-stream-cli.git
cd twitter-stream-cli
npm install
npm test
node ./bin/twitter-stream-cli.js -h
```

