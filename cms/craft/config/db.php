<?php

//DB Configs come from grunt server params or actual Apache/NGINX Server params

$host = getenv('DATABASE_HOST');
$user = getenv('DATABASE_USER');
$pass = getenv('DATABASE_PASS');
$name = getenv('DATABASE_NAME');

return array(
    '*' => array(
        'server' => isset($host)?$host:$_SERVER['DATABASE_HOST'],
        'user' => isset($user)?$user:$_SERVER['DATABASE_USER'],
        'password' => isset($pass)?$pass:$_SERVER['DATABASE_PASS'],
        'database' => isset($name)?$name:$_SERVER['DATABASE_NAME'],
        'tablePrefix' => 'craft',
    )
);
