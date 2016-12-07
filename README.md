#CRAFT BOILERPLATE (WORK IN PROGRESS)

###Digital Ocean LEMP Stack install
####Requirements
```
sudo apt-get update

sudo php5enmod mcrypt
sudo apt-get install php5-imagick
sudo php5enmod imagick

service php5-fpm restart
sudo service nginx restart

```
To get the MYSQL password use `cat /root/.digitalocean_password`
