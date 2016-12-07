<?php
$devMode = getenv('DEV_MODE');
return array(
    '*' => array(
        'siteUrl' => 'http://'.@$_SERVER['HTTP_HOST'],
        'omitScriptNameInUrls' => true,
        'generateTransformsBeforePageLoad' => true,
        'timezone' => 'America/New_York',
        'allowAutoUpdates' => true
    ),
    'localhost' => array(
        'devMode' => ($devMode)?true:false,
    )
);
