<?php

// This is the main Web application configuration. Any writable
// application properties can be configured here.
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'开源安装',

	// autoloading model and component classes
	'import'=>array(
//		'application.models.*',
		'application.components.*',
	),
);