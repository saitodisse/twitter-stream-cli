# twitter-stream-to-firebase

**Cli tool** to send twitter streams to firebase

### Install

```sh
npm install twitter-stream-to-firebase -g
```

### Run solo

```sh
# will track banana
twitter-stream-to-firebase banana
```

### Run multiples with pm2

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
      "script"            : "./bin/twitter-stream-to-firebase.js",
      "args"              : ["banana"],
      "instances"         : 1,
      "log_date_format"   : "YYYY-MM-DD HH:mm:ss Z",
      "error_file"        : "./pm2/logs/banana.log",
      "out_file"          : "./pm2/logs/banana.log",
      "autorestart"       : true,
      "max_memory_restart": "100M", // 1 megabytes, e.g.: "2G", "10M", "100K", 1024 the default unit is byte.
    },
    {
      "name"              : "chocolate",
      "script"            : "./bin/twitter-stream-to-firebase.js",
      "args"              : ["chocolate"],
      "instances"         : 1,
      "log_date_format"   : "YYYY-MM-DD HH:mm:ss Z",
      "error_file"        : "./pm2/logs/chocolate.log",
      "out_file"          : "./pm2/logs/chocolate.log",
      "autorestart"       : true,
      "max_memory_restart": "100M", // 1 megabytes, e.g.: "2G", "10M", "100K", 1024 the default unit is byte.
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

### Test and run locally

```sh
npm install
npm test
node ./bin/twitter-stream-to-firebase.js -h
```

