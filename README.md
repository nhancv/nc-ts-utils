# TS Template

- Email notifier
- MongoDB
- Telegraf
- Dotenv
- ExpressJS
- Excel4node
- Data-store
- BullMQ
- Cron

## Install
```
npm install
```
### To use BullMQ, you must install Redis local server
- For macOS
```
# Install
https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298
$ brew install redis

---------
# Command
Launch Redis on computer starts.
$ ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents

Start Redis server via “launchctl”.
$ launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist

Start Redis server using configuration file.
$ redis-server /usr/local/etc/redis.conf

Stop Redis on autostart on computer start.
$ launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.redis.plist

Location of Redis configuration file.
/usr/local/etc/redis.conf

Uninstall Redis and its files.
$ brew uninstall redis
$ rm ~/Library/LaunchAgents/homebrew.mxcl.redis.plist

Start Redis manually
$ brew services start redis

Get Redis package information.
$ brew info redis

Test if Redis server is running.
$ redis-cli ping
If it replies “PONG”, then it’s good to go!
```
- For ubuntu
```
# Install
https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04
https://codewithhugo.com/install-just-redis-cli-on-ubuntu-debian-jessie/
$ sudo apt update
$ sudo apt upgrade
$ sudo apt install redis-server

Update config file
$ sudo nano /etc/redis/redis.conf
….
supervised systemd
….
$ sudo systemctl restart redis-server

---------
# Command
Restart Redis
$ sudo systemctl restart redis-server
$ sudo systemctl enable redis-server


View Redis status
$ sudo systemctl status redis-server

Test if Redis server is running
$ redis-cli
> ping
PONG

## To upgrade redis-cli, run below command
cd /tmp &&\
    curl http://download.redis.io/redis-stable.tar.gz | tar xz &&\
    make -C redis-stable &&\
    cp redis-stable/src/redis-cli /usr/local/bin &&\
    rm -rf /tmp/redis-stable
logout and login again
$ redis-cli --version
```


## Update .env
- Copy `.env_sample` to `.env`
- Correct value in `.env`

## Dev
```
npm start
```

## Build release for prod and staging
```
npm run build

# Note for windows need install win-node-env first
npm install -g win-node-env

# Run production code
npm run production
```

## Deploy to integration [HEROKU]

### Getting started with Heroku
```
heroku login
heroku create <app name>
git add .
git commit -m 'deploy to heroku'
git push heroku master

Test at: <app name>.herokuapp.com
Log view: heroku logs -t
```
