<?php

ini_set('memory_limit', '128M');
set_time_limit(300);

header('Content-Type: text/html; charset=utf-8');

define('YLMF_ROOT', dirname(YLMF_INSTALL).'/'); 
define('YLMF_BACKEND', YLMF_ROOT . 'admin/'); 
define('YLMF_APP', YLMF_BACKEND . 'protected/'); 
define('YLMF_COMP', YLMF_APP . 'components/'); 
define('APP_CFG', YLMF_APP . 'config/'); 
define('APP_DB', APP_CFG . 'db.php'); 
define('APP_VERSION', '2.0'); 

class UserIdentity extends CUserIdentity
{

    private $_id;
    public $group_id;

    public function authenticate()
    {
        $username = strtolower($this->username);
        $user = Admin::model()->find('LOWER(username)=? ', array($username));
        if ($user === null)
        {
            $this->errorCode = self:: ERROR_USERNAME_INVALID;
        } else if (!$user->validatePassword($this->password))
        {
            $this->errorCode = self:: ERROR_PASSWORD_INVALID;
        } else
        {
            $this->_id = $user->id;
            $this->username = $user->username;
            $this->group_id = $user->group_id;
            $this->errorCode = self:: ERROR_NONE;
        }

        return $this->errorCode == self:: ERROR_NONE;
    }

    public function getId()
    {
        return $this->_id;
    }

}

function checkServerVar()
{
    $vars = array('HTTP_HOST', 'SERVER_NAME', 'SERVER_PORT', 'SCRIPT_NAME', 'SCRIPT_FILENAME', 'PHP_SELF', 'HTTP_ACCEPT', 'HTTP_USER_AGENT');
    $missing = array();
    foreach ($vars as $var)
    {
        if (!isset($_SERVER[$var]))
            $missing[] = $var;
    }
    if (!empty($missing))
        return t('yii', '$_SERVER does not have {vars}.', array('{vars}' => implode(', ', $missing)));

    if (!isset($_SERVER["REQUEST_URI"]) && isset($_SERVER["QUERY_STRING"]))
        return t('yii', 'Either $_SERVER["REQUEST_URI"] or $_SERVER["QUERY_STRING"] must exist.');

    if (!isset($_SERVER["PATH_INFO"]) && strpos($_SERVER["PHP_SELF"], $_SERVER["SCRIPT_NAME"]) !== 0)
        return t('yii', 'Unable to determine URL path info. Please make sure $_SERVER["PATH_INFO"] (or $_SERVER["PHP_SELF"] and $_SERVER["SCRIPT_NAME"]) contains proper value.');

    return '';
}

function checkCaptchaSupport()
{
    if (extension_loaded('imagick'))
    {
        $imagick = new Imagick();
        $imagickFormats = $imagick->queryFormats('PNG');
    }
    if (extension_loaded('gd'))
        $gdInfo = gd_info();
    if (isset($imagickFormats) && in_array('PNG', $imagickFormats))
        return '';
    elseif (isset($gdInfo))
    {
        if ($gdInfo['FreeType Support'])
            return '';
        return t('yii', 'GD installed,<br />FreeType support not installed');
    }
    return t('yii', 'GD or ImageMagick not installed');
}

function getYiiVersion()
{
    $coreFile = dirname(__FILE__) . '/../framework/YiiBase.php';
    if (is_file($coreFile))
    {
        $contents = file_get_contents($coreFile);
        $matches = array();
        if (preg_match('/public static function getVersion.*?return \'(.*?)\'/ms', $contents, $matches) > 0)
            return $matches[1];
    }
    return '';
}

/**
 * Returns a localized message according to user preferred language.
 * @param string message category
 * @param string message to be translated
 * @param array parameters to be applied to the translated message
 * @return string translated message
 */
function t($category, $message, $params = array())
{
    static $messages;

    if ($messages === null)
    {
        $messages = array();
        if (($lang = getPreferredLanguage()) !== false)
        {
            $file = dirname(__FILE__) . "/messages/$lang/yii.php";
            if (is_file($file))
                $messages = include($file);
        }
    }

    if (empty($message))
        return $message;

    if (isset($messages[$message]) && $messages[$message] !== '')
        $message = $messages[$message];

    return $params !== array() ? strtr($message, $params) : $message;
}

function getPreferredLanguage()
{
    if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) && ($n = preg_match_all('/([\w\-]+)\s*(;\s*q\s*=\s*(\d*\.\d*))?/', $_SERVER['HTTP_ACCEPT_LANGUAGE'], $matches)) > 0)
    {
        $languages = array();
        for ($i = 0; $i < $n; ++$i)
            $languages[$matches[1][$i]] = empty($matches[3][$i]) ? 1.0 : floatval($matches[3][$i]);
        arsort($languages);
        foreach ($languages as $language => $pref)
        {
            $lang = strtolower(str_replace('-', '_', $language));
            if (preg_match("/^en\_?/", $lang))
                return false;
            if (!is_file($viewFile = dirname(__FILE__) . "/views/$lang/index.php"))
                $lang = false;
            else
                break;
        }
        return $lang;
    }
    return false;
}

function getServerInfo()
{
    $info[] = isset($_SERVER['SERVER_SOFTWARE']) ? $_SERVER['SERVER_SOFTWARE'] : '';
    $info[] = '<a href="http://www.yiiframework.com/">Yii Framework</a>/' . getYiiVersion();
    $info[] = @strftime('%Y-%m-%d %H:%M', time());

    return implode(' ', $info);
}

function renderFile($_file_, $_params_ = array())
{
    extract($_params_);
    require($_file_);
}
/*
 * 优先get,无则post
 */

function reqReq($param)
{
    return Yii::app()->request->getParam($param);
}

/*
 * get
 */

function reqGet($param)
{
    return Yii::app()->request->getQuery($param);
}

/*
 * post
 */

function reqPost($param)
{
    return Yii::app()->request->getPost($param);
}

function ebr($param, $stop = 0)
{
    echo '<hr>';
    echo $param;
    echo '<hr><br />';
    if ($stop)
    {
        exit();
    }
}

function ppr($param, $stop = 0)
{
    echo '<hr>';
    echo '<pre>';
    print_r($param);
    echo '</pre><hr>';
    if ($stop)
    {
        exit();
    }
}
?>