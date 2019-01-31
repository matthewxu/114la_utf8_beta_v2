<?php

class DefaultController extends XBackendBase
{

    public function actionIndex()
    {
        $this->render('admin');
    }

    public function actionTop()
    {
        $menu = backendMenu();
        foreach ($menu as $key => $value)
        {
            $menu[$key]['c'] =  $value['controller'];
            $menu[$key]['a'] =  $value['acl'];
        }
        $this->render('top',array('menu'=>$menu));
    }
    
    public function actionMenu()
    {
        $c = reqGet('c');
        $menu = backendMenu();
        $menuTemp = $firstMenu = null;
        $i = 1;
        foreach ($menu as $key=>$value)
        {
            if ($value['controller'] == $c)
            {
                $menuTemp[$key] =  $value;
                break;
            }
            if ($i == 1)
            {
                $firstMenu[$key] = $value;
            }
            $i++;
        }
        if (empty($menuTemp))
        {
            $menuTemp = $firstMenu;
        }
        unset($menu,$firstMenu);

        $this->render('menu',array('menu'=>$menuTemp));
    }
    
    public function actionWelcome()
    {
        cacheFlush();
        $data = array();
 // 系统基本信息
        $serverapi = strtoupper(php_sapi_name());
        $phpversion = PHP_VERSION;
        $systemversion = explode(" ", php_uname());
        $sysReShow = 'none';
        switch (PHP_OS)
        {
            case "Linux":
                $sysReShow = (false !== ($sysInfo = XUtils::sys_linux())) ? "show" :
                        "none";
                $sysinfo = $systemversion[0] . '   ' . $systemversion[2];
                break;
            case "FreeBSD":
                $sysReShow = (false !== ($sysInfo = XUtils::sys_freebsd())) ? "show" :
                        "none";
                $sysinfo = $systemversion[0] . '   ' . $systemversion[2];
                break;
            default:
                $sysinfo = $systemversion[0] . '  ' . $systemversion[1] . ' ' . $systemversion[3] . $systemversion[4] . $systemversion[5];
                break;
        }
        if ($sysReShow == 'show')
        {
            $pmemory = '共' . $sysInfo['memTotal'] . 'M, 已使用' . $sysInfo['memUsed'] . 'M, 空闲' . $sysInfo['memFree'] . 'M, 使用率' . $sysInfo['memPercent'] . '%';
            $pmemorybar = $sysInfo['memPercent'];
            $swapmomory = '共' . $sysInfo['swapTotal'] . 'M, 已使用' . $sysInfo['swapUsed'] . 'M, 空闲' . $sysInfo['swapFree'] . 'M, 使用率' . $sysInfo['swapPercent'] . '%';
            $swapmemorybar = $sysInfo['swapPercent'];
            $syslaodavg = $sysInfo['loadAvg'];
        }
        
        $mysql = Yii::app()->db->createCommand("SELECT VERSION() AS dbversion")->queryAll();
        $mysql = $mysql[0]['dbversion'];

        $phpsafe = $this->getcon("safe_mode");
        $dispalyerror = $this->getcon("display_errors");
        $allowurlopen = $this->getcon("allow_url_fopen");
        $registerglobal = $this->getcon("register_globals");
        $maxpostsize = $this->getcon("post_max_size");
        $maxupsize = $this->getcon("upload_max_filesize");
        $maxexectime = $this->getcon("max_execution_time") . 's';
        $mqqsp = get_magic_quotes_gpc() === 1 ? 'YES' : 'NO';
        $mprsp = get_magic_quotes_runtime() === 1 ? 'YES' : 'NO';
        $zendoptsp = (get_cfg_var("zend_optimizer.optimization_level") || get_cfg_var("zend_extension_manager.optimizer_ts") || get_cfg_var("zend_extension_ts")) ? 'YES' : 'NO';
        $iconvsp = XUtils::isfun('iconv');
        $curlsp = XUtils::isfun('curl_init');
        $gdsp = XUtils::isfun('gd_info');
        $zlibsp = XUtils::isfun('gzclose');
        $eaccsp = XUtils::isfun('eaccelerator_info');
        $xcachesp = extension_loaded('XCache') ? 'YES' : 'NO';
        $sessionsp = XUtils::isfun("session_start");
        $cookiesp = isset($_COOKIE) ? 'YES' : 'NO';
        $serverip = @gethostbyname($_SERVER['SERVER_NAME']);
        $serverip = $serverip == '' ? '' : "  ($serverip)";
        $systime = gmdate("Y年n月j日 H:i:s", time() + 8 * 3600);
        $phpversionsp = $phpversion > '5.0' ? 'YES' : 'NO';
        $mysqlversionsp = $mysql['dbversion'] > '4.1' ? 'YES' : 'NO';
        $dbasp = extension_loaded('dba') ? 'YES' : 'NO';
        // 数据库大小
        $databasesize = 0;
        $rt = Yii::app()->db->createCommand("SHOW TABLE STATUS")->queryAll();
        
        foreach ($rt AS $rsarr)
        {
            $databasesize +=$rsarr['Data_length'] + $rsarr['Index_length'];
        }
        $databasesize = XUtils::bytes_to_string($databasesize);
        //站点统计
        $rt = Yii::app()->db->createCommand("SELECT count(*) as sum FROM {{links}}")->queryAll();
        $sitesum = $rt[0]['sum'];

        $data['serverip'] = $serverip;
        $data['systime'] = $systime;
        $data['sysinfo'] = $sysinfo;
        $data['phpversion'] = $phpversion;
        $data['dbversion'] = $mysql;
        $data['dispalyerror'] = $dispalyerror;
        $data['serverapi'] = $serverapi;
        $data['phpsafe'] = $phpsafe;
        $data['sessionsp'] = $sessionsp;
        $data['cookiesp'] = $cookiesp;
        $data['zendoptsp'] = $zendoptsp;
        $data['eaccsp'] = $eaccsp;
        $data['xcachesp'] = $xcachesp;
        $data['registerglobal'] = $registerglobal;
        $data['mqqsp'] = $mqqsp;
        $data['mprsp'] = $mprsp;
        $data['maxupsize'] = $maxupsize;
        $data['maxpostsize'] = $maxpostsize;
        $data['maxexectime'] = $maxexectime;
        $data['allowurlopen'] = $allowurlopen;
        $data['curlsp'] = $curlsp;
        $data['iconvsp'] = $iconvsp;
        $data['zlibsp'] = $zlibsp;
        $data['gdsp'] = $gdsp;
        $data['dbasp'] = $dbasp;
        $data['datasize'] = $databasesize;
        $data['sitesum'] = $sitesum;

        $tmp = explode('/', dirname($_SERVER['PHP_SELF']));
        $data['safe_notice'] = (is_array($tmp) && !empty($tmp[count($tmp)-1]) && $tmp[count($tmp)-1] == 'admin') ? 1 : 0;
            
        //判断admin目录是否存在
        is_dir(SITE_PATH.'admin/') && $data['tips']['backend'] = 1;
        
        //判断install目录是否存在
        is_dir(SITE_PATH.'install/') && $data['tips']['install'] = 1;
        
        $this->render('welcome',array('data'=>$data));
    }
    
    
    
    private function getcon($varName)
    {
        switch ($res = get_cfg_var($varName))
        {
            case 0:
                return 'NO';
                break;
            case 1:
                return 'YES';
                break;
            default:
                return $res;
                break;
        }
    }
    
}