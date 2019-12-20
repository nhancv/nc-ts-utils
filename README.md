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
https://www.digitalocean.com/community/tutorials/how-to-install-redis-from-source-on-ubuntu-18-04
$ sudo apt update
$ sudo apt install build-essential tcl
$ cd /tmp &&\
    curl http://download.redis.io/redis-stable.tar.gz | tar xz &&\
    cd redis-stable &&\
    make distclean &&\
    make clean &&\
    make &&\
    make test &&\
    sudo make install


$ sudo mkdir /etc/redis
$ sudo cp /tmp/redis-stable/redis.conf /etc/redis

# Update config file
$ sudo nano /etc/redis/redis.conf
….
# If you run Redis from upstart or systemd, Redis can interact with your
# supervision tree. Options:
#   supervised no      - no supervision interaction
#   supervised upstart - signal upstart by putting Redis into SIGSTOP mode
#   supervised systemd - signal systemd by writing READY=1 to $NOTIFY_SOCKET
#   supervised auto    - detect upstart or systemd method based on
#                        UPSTART_JOB or NOTIFY_SOCKET environment variables
# Note: these supervision methods only signal "process is ready."
#       They do not enable continuous liveness pings back to your supervisor.
supervised systemd

…...
# The working directory.
#
# The DB will be written inside this directory, with the filename specified
# above using the 'dbfilename' configuration directive.
#
# The Append Only File will also be created inside this directory.
#
# Note that you must specify a directory here, not a file name.
dir /var/lib/redis
….


# Creating a Redis systemd Unit File
$ sudo nano /etc/systemd/system/redis.service
[Unit]
Description=Redis In-Memory Data Store
After=network.target

[Service]
User=redis
Group=redis
ExecStart=/usr/local/bin/redis-server /etc/redis/redis.conf
ExecStop=/usr/local/bin/redis-cli shutdown
Restart=always

[Install]
WantedBy=multi-user.target


# Creating the Redis User, Group, and Directories
$ sudo adduser --system --group --no-create-home redis
$ sudo mkdir /var/lib/redis
$ sudo chown redis:redis /var/lib/redis
$ sudo chmod 770 /var/lib/redis

-------------------
# Command
Restart Redis
$ sudo systemctl restart redis
$ sudo systemctl enable redis


View Redis status
$ sudo systemctl status redis


Test if Redis server is running
$ redis-cli
> ping
PONG
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
