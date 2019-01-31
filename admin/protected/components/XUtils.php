<?php

/**
 * 系统助手类
 * 
 */
class XUtils
{

    /**
     * 友好显示var_dump
     */
    public static function dump($var, $echo = true, $label = null, $strict = true)
    {
        $label = ( $label === null ) ? '' : rtrim($label) . ' ';
        if (!$strict)
        {
            if (ini_get('html_errors'))
            {
                $output = print_r($var, true);
                $output = "<pre>" . $label . htmlspecialchars($output, ENT_QUOTES) . "</pre>";
            } else
            {
                $output = $label . print_r($var, true);
            }
        } else
        {
            ob_start();
            var_dump($var);
            $output = ob_get_clean();
            if (!extension_loaded('xdebug'))
            {
                $output = preg_replace("/\]\=\>\n(\s+)/m", "] => ", $output);
                $output = '<pre>' . $label . htmlspecialchars($output, ENT_QUOTES) . '</pre>';
            }
        }
        if ($echo)
        {
            echo $output;
            return null;
        }
        else
            return $output;
    }

    /**
     * 获取客户端IP地址
     */
    public static function getClientIP()
    {
        static $ip = NULL;
        if ($ip !== NULL)
            return $ip;
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        {
            $arr = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $pos = array_search('unknown', $arr);
            if (false !== $pos)
                unset($arr[$pos]);
            $ip = trim($arr[0]);
        } elseif (isset($_SERVER['HTTP_CLIENT_IP']))
        {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (isset($_SERVER['REMOTE_ADDR']))
        {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        // IP地址合法验证
        $ip = ( false !== ip2long($ip) ) ? $ip : '0.0.0.0';
        return $ip;
    }

    /**
     * 循环创建目录
     */
    public static function mkdir($dir, $mode = 0777)
    {
        if (is_dir($dir) || @mkdir($dir, $mode))
            return true;
        if (!mk_dir(dirname($dir), $mode))
            return false;
        return @mkdir($dir, $mode);
    }

    /**
      循环删除目录和文件函数
     */
    public static function delDirAndFile($dirName, $delDir = 0, $show = 0)
    {
        if ($handle = opendir("$dirName"))
        {
            while (false !== ( $item = readdir($handle) ))
            {
                if ($item != "." && $item != "..")
                {
                    $file = str_replace('//', '/', "$dirName/$item");
                    if (is_dir($file))
                    {

                        self::delDirAndFile($file, $delDir);
                    } else
                    {
                        if (unlink($file))
                        {
                            if ($show)
                            {
                                echo "成功删除文件： $file<br />\n";
                            }
                        }
                    }
                }
            }
            closedir($handle);
            if ($delDir == 1)
            {
                if (rmdir($dirName))
                {
                    if ($show)
                    {
                        echo "成功删除目录： $dirName<br />\n";
                    }
                }
            }
        }
    }

    /**
     * 格式化单位
     */
    public static function byteFormat($size, $dec = 2)
    {
        $a = array("B", "KB", "MB", "GB", "TB", "PB");
        $pos = 0;
        while ($size >= 1024)
        {
            $size /= 1024;
            $pos++;
        }
        return round($size, $dec) . " " . $a[$pos];
    }

    /**
     * 格式化秒数
     * @param type $num
     */
    public static function secondsFormat($num)
    {
        $hour = floor($num / 3600);
        $minute = floor(($num - 3600 * $hour) / 60);
        $second = floor((($num - 3600 * $hour) - 60 * $minute) % 60);
        echo $hour . ':' . $minute . ':' . $second;
    }

    /**
     * 下拉框，单选按钮 自动选择
     *
     * @param $string 输入字符
     * @param $param  条件
     * @param $type   类型
     *            selected checked
     * @return string
     */
    public static function selected($string, $param = 1, $type = 'select')
    {
        $return = $true = null;

        if (is_array($param))
        {
            $true = in_array($string, $param);
        } elseif ($string == $param)
        {
            $true = true;
        }

        if ($true)
        {
            $return = $type == 'select' ? 'selected="selected"' : 'checked="checked"';
        }

        echo $return;
    }

    /**
     * 获得来源类型 post get
     *
     * @return unknown
     */
    public static function method()
    {
        return strtoupper(isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET' );
    }

    /**
     * 提示信息
     */
    public static function message($action = 'success', $content = '', $redirect = 'javascript:history.back(-1);', $timeout = 4)
    {

        switch ($action)
        {
            case 'success':
                $titler = '操作完成';
                $class = 'message_success';
                $images = 'message_success.png';
                break;
            case 'error':
                $titler = '操作未完成';
                $class = 'message_error';
                $images = 'message_error.png';
                break;
            case 'errorBack':
                $titler = '操作未完成';
                $class = 'message_error';
                $images = 'message_error.png';
                break;
            case 'redirect':
                header("Location:$redirect");
                break;
            case 'script':
                if (empty($redirect))
                {
                    exit('<script language="javascript">alert("' . $content . '");window.history.back(-1)</script>');
                } else
                {
                    exit('<script language="javascript">alert("' . $content . '");window.location=" ' . $redirect . '   "</script>');
                }
                break;
        }

        // 信息头部
        $header = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title>操作提示</title>
<style type="text/css">
body{font:12px/1.7 "\5b8b\4f53",Tahoma;}
html,body,div,p,a,h3{margin:0;padding:0;}
.tips_wrap{ background:#EBF4D8;border:1px solid #DEEDF6;width:780px;padding:50px;margin:50px auto 0;}
.tips_inner{zoom:1;}
.tips_inner:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0;}
.tips_inner .tips_img{width:80px;float:left;}
.tips_info{float:left;line-height:35px;width:650px}
.tips_info h3{font-weight:bold;color:#1A90C1;font-size:16px;}
.tips_info p{font-size:14px;color:#999;}
.tips_info p.message_error{font-weight:bold;color:#F00;font-size:16px; line-height:22px}
.tips_info p.message_success{font-weight:bold;color:#1a90c1;font-size:16px; line-height:22px}
.tips_info p.return{font-size:12px}
.tips_info .time{color:#f00; font-size:14px; font-weight:bold}
.tips_info p a{color:#1A90C1;text-decoration:none;}
</style>
</head>

<body>';
        // 信息底部
        $footer = '</body></html>';

        $body = '<script type="text/javascript">
        function delayURL(url) {
        var delay = document.getElementById("time").innerHTML;
        //alert(delay);
        if(delay > 0){
        delay--;
        document.getElementById("time").innerHTML = delay;
    } else {
    window.location.href = url;
    }
    setTimeout("delayURL(\'" + url + "\')", 1000);
    }
    </script><div class="tips_wrap">
    <div class="tips_inner">

        <div class="tips_info">

            <p class="' . $class . '">' . $content . '</p>
            <p class="return">系统自动跳转在  <span class="time" id="time">' . $timeout . ' </span>  秒后，如果不想等待，<a href="' . $redirect . '">点击这里跳转</a></p>
        </div>
    </div>
</div><script type="text/javascript">
    delayURL("' . $redirect . '");
    </script>';

        exit($header . $body . $footer);
    }

    /**
     * 查询字符生成
     */
    public static function buildCondition(array $getArray, array $keys = array())
    {
        $arr = null;
        if ($getArray)
        {
            foreach ($getArray as $key => $value)
            {
                if (in_array($key, $keys) && $value)
                {
                    $arr[$key] = CHtml::encode(strip_tags($value));
                }
            }
            return $arr;
        }
    }

    /**
     * base64_encode
     */
    static function b64encode($string)
    {
        $data = base64_encode($string);
        $data = str_replace(array('+', '/', '='), array('-', '_', ''), $data);
        return $data;
    }

    /**
     * base64_decode
     */
    static function b64decode($string)
    {
        $data = str_replace(array('-', '_'), array('+', '/'), $string);
        $mod4 = strlen($data) % 4;
        if ($mod4)
        {
            $data .= substr('====', $mod4);
        }
        return base64_decode($data);
    }

    /**
     * 验证邮箱
     */
    public static function email($str)
    {
        if (empty($str))
            return true;
        $chars = "/^([a-z0-9+_]|\\-|\\.)+@(([a-z0-9_]|\\-)+\\.)+[a-z]{2,6}\$/i";
        if (strpos($str, '@') !== false && strpos($str, '.') !== false)
        {
            if (preg_match($chars, $str))
            {
                return true;
            } else
            {
                return false;
            }
        } else
        {
            return false;
        }
    }

    /**
     * 验证手机号码
     */
    public static function mobile($str)
    {
        if (empty($str))
        {
            return true;
        }

        return preg_match('#^13[\d]{9}$|14^[0-9]\d{8}|^15[0-9]\d{8}$|^18[0-9]\d{8}$#', $str);
    }

    /**
     * 验证固定电话
     */
    public static function tel($str)
    {
        if (empty($str))
        {
            return true;
        }
        return preg_match('/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/', trim($str));
    }

    /**
     * 验证qq号码
     */
    public static function qq($str)
    {
        if (empty($str))
        {
            return true;
        }

        return preg_match('/^[1-9]\d{4,12}$/', trim($str));
    }

    /**
     * 验证邮政编码
     */
    public static function zipCode($str)
    {
        if (empty($str))
        {
            return true;
        }

        return preg_match('/^[1-9]\d{5}$/', trim($str));
    }

    /**
     * 验证ip
     */
    public static function ip($str)
    {
        if (empty($str))
            return true;

        if (!preg_match('#^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$#', $str))
        {
            return false;
        }

        $ip_array = explode('.', $str);

        //真实的ip地址每个数字不能大于255（0-255）
        return ( $ip_array[0] <= 255 && $ip_array[1] <= 255 && $ip_array[2] <= 255 && $ip_array[3] <= 255 ) ? true : false;
    }

    /**
     * 验证身份证(中国)
     */
    public static function idCard($str)
    {
        $str = trim($str);
        if (empty($str))
            return true;

        if (preg_match("/^([0-9]{15}|[0-9]{17}[0-9a-z])$/i", $str))
            return true;
        else
            return false;
    }

    /**
     * 验证网址
     */
    public static function url($str)
    {
        if (empty($str))
            return true;

        return preg_match('#(http|https|ftp|ftps)://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?#i', $str) ? true : false;
    }

    /**
     * 根据ip获取地理位置
     * @param $ip
     * return :ip,beginip,endip,country,area
     */
    public static function getlocation($ip = '')
    {
        $ip = new XIp();
        $ipArr = $ip->getlocation($ip);
        return $ipArr;
    }

    /**
     * 中文转换为拼音
     */
    static function Pinyin($_String, $_Code = 'utf8')
    {
        $_DataKey = "a|ai|an|ang|ao|ba|bai|ban|bang|bao|bei|ben|beng|bi|bian|biao|bie|bin|bing|bo|bu|ca|cai|can|cang|cao|ce|ceng|cha" .
            "|chai|chan|chang|chao|che|chen|cheng|chi|chong|chou|chu|chuai|chuan|chuang|chui|chun|chuo|ci|cong|cou|cu|" .
            "cuan|cui|cun|cuo|da|dai|dan|dang|dao|de|deng|di|dian|diao|die|ding|diu|dong|dou|du|duan|dui|dun|duo|e|en|er" .
            "|fa|fan|fang|fei|fen|feng|fo|fou|fu|ga|gai|gan|gang|gao|ge|gei|gen|geng|gong|gou|gu|gua|guai|guan|guang|gui" .
            "|gun|guo|ha|hai|han|hang|hao|he|hei|hen|heng|hong|hou|hu|hua|huai|huan|huang|hui|hun|huo|ji|jia|jian|jiang" .
            "|jiao|jie|jin|jing|jiong|jiu|ju|juan|jue|jun|ka|kai|kan|kang|kao|ke|ken|keng|kong|kou|ku|kua|kuai|kuan|kuang" .
            "|kui|kun|kuo|la|lai|lan|lang|lao|le|lei|leng|li|lia|lian|liang|liao|lie|lin|ling|liu|long|lou|lu|lv|luan|lue" .
            "|lun|luo|ma|mai|man|mang|mao|me|mei|men|meng|mi|mian|miao|mie|min|ming|miu|mo|mou|mu|na|nai|nan|nang|nao|ne" .
            "|nei|nen|neng|ni|nian|niang|niao|nie|nin|ning|niu|nong|nu|nv|nuan|nue|nuo|o|ou|pa|pai|pan|pang|pao|pei|pen" .
            "|peng|pi|pian|piao|pie|pin|ping|po|pu|qi|qia|qian|qiang|qiao|qie|qin|qing|qiong|qiu|qu|quan|que|qun|ran|rang" .
            "|rao|re|ren|reng|ri|rong|rou|ru|ruan|rui|run|ruo|sa|sai|san|sang|sao|se|sen|seng|sha|shai|shan|shang|shao|" .
            "she|shen|sheng|shi|shou|shu|shua|shuai|shuan|shuang|shui|shun|shuo|si|song|sou|su|suan|sui|sun|suo|ta|tai|" .
            "tan|tang|tao|te|teng|ti|tian|tiao|tie|ting|tong|tou|tu|tuan|tui|tun|tuo|wa|wai|wan|wang|wei|wen|weng|wo|wu" .
            "|xi|xia|xian|xiang|xiao|xie|xin|xing|xiong|xiu|xu|xuan|xue|xun|ya|yan|yang|yao|ye|yi|yin|ying|yo|yong|you" .
            "|yu|yuan|yue|yun|za|zai|zan|zang|zao|ze|zei|zen|zeng|zha|zhai|zhan|zhang|zhao|zhe|zhen|zheng|zhi|zhong|" .
            "zhou|zhu|zhua|zhuai|zhuan|zhuang|zhui|zhun|zhuo|zi|zong|zou|zu|zuan|zui|zun|zuo";
        $_DataValue = "-20319|-20317|-20304|-20295|-20292|-20283|-20265|-20257|-20242|-20230|-20051|-20036|-20032|-20026|-20002|-19990" .
            "|-19986|-19982|-19976|-19805|-19784|-19775|-19774|-19763|-19756|-19751|-19746|-19741|-19739|-19728|-19725" .
            "|-19715|-19540|-19531|-19525|-19515|-19500|-19484|-19479|-19467|-19289|-19288|-19281|-19275|-19270|-19263" .
            "|-19261|-19249|-19243|-19242|-19238|-19235|-19227|-19224|-19218|-19212|-19038|-19023|-19018|-19006|-19003" .
            "|-18996|-18977|-18961|-18952|-18783|-18774|-18773|-18763|-18756|-18741|-18735|-18731|-18722|-18710|-18697" .
            "|-18696|-18526|-18518|-18501|-18490|-18478|-18463|-18448|-18447|-18446|-18239|-18237|-18231|-18220|-18211" .
            "|-18201|-18184|-18183|-18181|-18012|-17997|-17988|-17970|-17964|-17961|-17950|-17947|-17931|-17928|-17922" .
            "|-17759|-17752|-17733|-17730|-17721|-17703|-17701|-17697|-17692|-17683|-17676|-17496|-17487|-17482|-17468" .
            "|-17454|-17433|-17427|-17417|-17202|-17185|-16983|-16970|-16942|-16915|-16733|-16708|-16706|-16689|-16664" .
            "|-16657|-16647|-16474|-16470|-16465|-16459|-16452|-16448|-16433|-16429|-16427|-16423|-16419|-16412|-16407" .
            "|-16403|-16401|-16393|-16220|-16216|-16212|-16205|-16202|-16187|-16180|-16171|-16169|-16158|-16155|-15959" .
            "|-15958|-15944|-15933|-15920|-15915|-15903|-15889|-15878|-15707|-15701|-15681|-15667|-15661|-15659|-15652" .
            "|-15640|-15631|-15625|-15454|-15448|-15436|-15435|-15419|-15416|-15408|-15394|-15385|-15377|-15375|-15369" .
            "|-15363|-15362|-15183|-15180|-15165|-15158|-15153|-15150|-15149|-15144|-15143|-15141|-15140|-15139|-15128" .
            "|-15121|-15119|-15117|-15110|-15109|-14941|-14937|-14933|-14930|-14929|-14928|-14926|-14922|-14921|-14914" .
            "|-14908|-14902|-14894|-14889|-14882|-14873|-14871|-14857|-14678|-14674|-14670|-14668|-14663|-14654|-14645" .
            "|-14630|-14594|-14429|-14407|-14399|-14384|-14379|-14368|-14355|-14353|-14345|-14170|-14159|-14151|-14149" .
            "|-14145|-14140|-14137|-14135|-14125|-14123|-14122|-14112|-14109|-14099|-14097|-14094|-14092|-14090|-14087" .
            "|-14083|-13917|-13914|-13910|-13907|-13906|-13905|-13896|-13894|-13878|-13870|-13859|-13847|-13831|-13658" .
            "|-13611|-13601|-13406|-13404|-13400|-13398|-13395|-13391|-13387|-13383|-13367|-13359|-13356|-13343|-13340" .
            "|-13329|-13326|-13318|-13147|-13138|-13120|-13107|-13096|-13095|-13091|-13076|-13068|-13063|-13060|-12888" .
            "|-12875|-12871|-12860|-12858|-12852|-12849|-12838|-12831|-12829|-12812|-12802|-12607|-12597|-12594|-12585" .
            "|-12556|-12359|-12346|-12320|-12300|-12120|-12099|-12089|-12074|-12067|-12058|-12039|-11867|-11861|-11847" .
            "|-11831|-11798|-11781|-11604|-11589|-11536|-11358|-11340|-11339|-11324|-11303|-11097|-11077|-11067|-11055" .
            "|-11052|-11045|-11041|-11038|-11024|-11020|-11019|-11018|-11014|-10838|-10832|-10815|-10800|-10790|-10780" .
            "|-10764|-10587|-10544|-10533|-10519|-10331|-10329|-10328|-10322|-10315|-10309|-10307|-10296|-10281|-10274" .
            "|-10270|-10262|-10260|-10256|-10254";
        $_TDataKey = explode('|', $_DataKey);
        $_TDataValue = explode('|', $_DataValue);
        $_Data = (PHP_VERSION >= '5.0') ? array_combine($_TDataKey, $_TDataValue) : self::_Array_Combine($_TDataKey, $_TDataValue);
        arsort($_Data);
        reset($_Data);
        if ($_Code != 'gb2312')
            $_String = self::_U2_Utf8_Gb($_String);
        $_Res = '';
        for ($i = 0; $i < strlen($_String); $i++)
        {
            $_P = ord(substr($_String, $i, 1));
            if ($_P > 160)
            {
                $_Q = ord(substr($_String, ++$i, 1));
                $_P = $_P * 256 + $_Q - 65536;
            }
            $_Res .= self::_Pinyin($_P, $_Data);
        }
        return preg_replace("/[^a-z0-9]*/", '', $_Res);
    }

    static function _Pinyin($_Num, $_Data)
    {
        if ($_Num > 0 && $_Num < 160)
            return chr($_Num);
        elseif ($_Num < -20319 || $_Num > -10247)
            return '';
        else
        {
            foreach ($_Data as $k => $v)
            {
                if ($v <= $_Num)
                    break;
            }
            return $k;
        }
    }

    static function _U2_Utf8_Gb($_C)
    {
        $_String = '';
        if ($_C < 0x80)
            $_String .= $_C;
        elseif ($_C < 0x800)
        {
            $_String .= chr(0xC0 | $_C >> 6);
            $_String .= chr(0x80 | $_C & 0x3F);
        } elseif ($_C < 0x10000)
        {
            $_String .= chr(0xE0 | $_C >> 12);
            $_String .= chr(0x80 | $_C >> 6 & 0x3F);
            $_String .= chr(0x80 | $_C & 0x3F);
        } elseif ($_C < 0x200000)
        {
            $_String .= chr(0xF0 | $_C >> 18);
            $_String .= chr(0x80 | $_C >> 12 & 0x3F);
            $_String .= chr(0x80 | $_C >> 6 & 0x3F);
            $_String .= chr(0x80 | $_C & 0x3F);
        }
        return iconv('UTF-8', 'GBK', $_String);
    }

    static function _Array_Combine($_Arr1, $_Arr2)
    {
        for ($i = 0; $i < count($_Arr1); $i++)
            $_Res[$_Arr1[$i]] = $_Arr2[$i];
        return $_Res;
    }

    /**
     * 拆分sql
     *
     * @param $sql
     */
    public static function splitsql($sql)
    {
        $sql = preg_replace("/TYPE=(InnoDB|MyISAM|MEMORY)( DEFAULT CHARSET=[^; ]+)?/", "ENGINE=\\1 DEFAULT CHARSET=" . Yii::app()->db->charset, $sql);
        $sql = str_replace("\r", "\n", $sql);
        $ret = array();
        $num = 0;
        $queriesarray = explode(";\n", trim($sql));
        unset($sql);
        foreach ($queriesarray as $query)
        {
            $ret[$num] = '';
            $queries = explode("\n", trim($query));
            $queries = array_filter($queries);
            foreach ($queries as $query)
            {
                $str1 = substr($query, 0, 1);
                if ($str1 != '#' && $str1 != '-')
                    $ret[$num] .= $query;
            }
            $num++;
        }
        return ($ret);
    }

    /**
     * 字符截取
     *
     * @param $string
     * @param $length
     * @param $dot
     */
    public static function cutstr($string, $length, $dot = '...', $charset = 'utf-8')
    {
        if (strlen($string) <= $length)
            return $string;

        $pre = chr(1);
        $end = chr(1);
        $string = str_replace(array('&amp;', '&quot;', '&lt;', '&gt;'), array($pre . '&' . $end, $pre . '"' . $end, $pre . '<' . $end, $pre . '>' . $end), $string);

        $strcut = '';
        if (strtolower($charset) == 'utf-8')
        {

            $n = $tn = $noc = 0;
            while ($n < strlen($string))
            {

                $t = ord($string[$n]);
                if ($t == 9 || $t == 10 || ( 32 <= $t && $t <= 126 ))
                {
                    $tn = 1;
                    $n++;
                    $noc++;
                } elseif (194 <= $t && $t <= 223)
                {
                    $tn = 2;
                    $n += 2;
                    $noc += 2;
                } elseif (224 <= $t && $t <= 239)
                {
                    $tn = 3;
                    $n += 3;
                    $noc += 2;
                } elseif (240 <= $t && $t <= 247)
                {
                    $tn = 4;
                    $n += 4;
                    $noc += 2;
                } elseif (248 <= $t && $t <= 251)
                {
                    $tn = 5;
                    $n += 5;
                    $noc += 2;
                } elseif ($t == 252 || $t == 253)
                {
                    $tn = 6;
                    $n += 6;
                    $noc += 2;
                } else
                {
                    $n++;
                }

                if ($noc >= $length)
                {
                    break;
                }
            }
            if ($noc > $length)
            {
                $n -= $tn;
            }

            $strcut = substr($string, 0, $n);
        } else
        {
            for ($i = 0; $i < $length; $i++)
            {
                $strcut .= ord($string[$i]) > 127 ? $string[$i] . $string[++$i] : $string[$i];
            }
        }

        $strcut = str_replace(array($pre . '&' . $end, $pre . '"' . $end, $pre . '<' . $end, $pre . '>' . $end), array('&amp;', '&quot;', '&lt;', '&gt;'), $strcut);

        $pos = strrpos($strcut, chr(1));
        if ($pos !== false)
        {
            $strcut = substr($strcut, 0, $pos);
        }
        return $strcut . $dot;
    }

    /**
     * 描述格式化
     * @param  $subject
     */
    public static function clearCutstr($subject, $length = 0, $dot = '...', $charset = 'utf-8')
    {
        if ($length)
        {
            return XUtils::cutstr(strip_tags(str_replace(array("\r\n"), '', $subject)), $length, $dot, $charset);
        } else
        {
            return strip_tags(str_replace(array("\r\n"), '', $subject));
        }
    }

    /**
     * 检测是否为英文或英文数字的组合
     *
     * @return unknown
     */
    public static function isEnglist($param)
    {
        if (!eregi("^[A-Z0-9]{1,26}$", $param))
        {
            return false;
        } else
        {
            return true;
        }
    }

    /**
     * 将自动判断网址是否加http://
     *
     * @param $http
     * @return  string
     */
    public static function convertHttp($url)
    {
        if ($url == 'http://' || $url == '')
            return '';

        if (substr($url, 0, 7) != 'http://' && substr($url, 0, 8) != 'https://')
            $str = 'http://' . $url;
        else
            $str = $url;
        return $str;
    }

    /*
      标题样式格式化
     */

    public static function titleStyle($style)
    {
        $text = '';
        if ($style['bold'] == 'Y')
        {
            $text .='font-weight:bold;';
            $serialize['bold'] = 'Y';
        }

        if ($style['underline'] == 'Y')
        {
            $text .='text-decoration:underline;';
            $serialize['underline'] = 'Y';
        }

        if (!empty($style['color']))
        {
            $text .='color:#' . $style['color'] . ';';
            $serialize['color'] = $style['color'];
        }

        return array('text' => $text, 'serialize' => empty($serialize) ? '' : serialize($serialize));
    }

    // 自动转换字符集 支持数组转换
    public static function autoCharset($string, $from = 'gbk', $to = 'utf-8')
    {
        $from = strtoupper($from) == 'UTF8' ? 'utf-8' : $from;
        $to = strtoupper($to) == 'UTF8' ? 'utf-8' : $to;
        if (strtoupper($from) === strtoupper($to) || empty($string) || (is_scalar($string) && !is_string($string)))
        {
            //如果编码相同或者非字符串标量则不转换
            return $string;
        }
        if (is_string($string))
        {
            if (function_exists('mb_convert_encoding'))
            {
                return mb_convert_encoding($string, $to, $from);
            } elseif (function_exists('iconv'))
            {
                return iconv($from, $to, $string);
            } else
            {
                return $string;
            }
        } elseif (is_array($string))
        {
            foreach ($string as $key => $val)
            {
                $_key = self::autoCharset($key, $from, $to);
                $string[$_key] = self::autoCharset($val, $from, $to);
                if ($key != $_key)
                    unset($string[$key]);
            }
            return $string;
        } else
        {
            return $string;
        }
    }

    public static function isUtf8($string)
    {
        $encoding = "UTF-8";
        for ($i = 0; $i < strlen($string); $i++)
        {
            if (ord($string{$i}) < 128)
                continue;

            if ((ord($string{$i}) & 224) == 224)
            {
                //第一个字节判断通过    
                $char = $string{++$i};
                if ((ord($char) & 128) == 128)
                {
                    //第二个字节判断通过    
                    $char = $string{++$i};
                    if ((ord($char) & 128) == 128)
                    {
                        $encoding = "UTF-8";
                        break;
                    }
                }
            }

            if ((ord($string{$i}) & 192) == 192)
            {
                //第一个字节判断通过    
                $char = $string{++$i};
                if ((ord($char) & 128) == 128)
                {
                    // 第二个字节判断通过    
                    $encoding = "GB2312";
                    break;
                }
            }
        }

        return $encoding != 'UTF-8'?FALSE:TRUE;
    }

    /*
      标题样式恢复
     */

    public static function titleStyleRestore($str, $scope = 'c')
    {
//        echo $serialize;exit;


        if (!empty($str))
        {
            $unserialize = unserialize($str);

            if ($unserialize['b'] == 1 && $scope == 'b')
            {
                return 1;
            }
            if ($unserialize['u'] == 1 && $scope == 'u')
            {
                return 1;
            }
            if ($unserialize['c'] && $scope == 'c')
            {
                return $unserialize['c'];
            }
        }
        return;
    }

    /**
     * 列出文件夹列表
     *
     * @param $dirname
     * @return unknown
     */
    public static function getDir($dirname)
    {
        $files = array();
        if (is_dir($dirname))
        {
            $fileHander = opendir($dirname);
            while (( $file = readdir($fileHander) ) !== false)
            {
                $filepath = $dirname . '/' . $file;
                if (strcmp($file, '.') == 0 || strcmp($file, '..') == 0 || is_file($filepath))
                {
                    continue;
                }
                $files[] = self::autoCharset($file, 'GBK', 'UTF8');
            }
            closedir($fileHander);
        } else
        {
            $files = false;
        }
        return $files;
    }

    /**
     * 列出文件列表
     *
     * @param $dirname
     * @return unknown
     */
    public static function getFile($dirname)
    {
        $files = array();
        if (is_dir($dirname))
        {
            $fileHander = opendir($dirname);
            while (( $file = readdir($fileHander) ) !== false)
            {
                $filepath = $dirname . '/' . $file;

                if (strcmp($file, '.') == 0 || strcmp($file, '..') == 0 || is_dir($filepath))
                {
                    continue;
                }
                $files[] = self::autoCharset($file, 'GBK', 'UTF8');
                ;
            }
            closedir($fileHander);
        } else
        {
            $files = false;
        }
        return $files;
    }

    /**
     * [格式化图片列表数据]
     *
     * @return [type] [description]
     */
    public static function imageListSerialize($data)
    {
        $var = null;
        foreach ((array) $data['file'] as $key => $row)
        {
            if ($row)
            {
                $var[$key]['fileId'] = $data['fileId'][$key];
                $var[$key]['file'] = $row;
            }
        }
        return array('data' => $var, 'dataSerialize' => empty($var) ? '' : serialize($var));
    }

    /**
     * 反引用一个引用字符串
     * @param  $string
     * @return string
     */
    static function stripslashes($string)
    {
        if (is_array($string))
        {
            foreach ($string as $key => $val)
            {
                $string[$key] = self::stripslashes($val);
            }
        } else
        {
            $string = stripslashes($string);
        }
        return $string;
    }

    /**
     * 引用字符串
     * @param  $string
     * @param  $force
     * @return string
     */
    static function addslashes($string, $force = 1)
    {
        if (is_array($string))
        {
            foreach ($string as $key => $val)
            {
                $string[$key] = self::addslashes($val, $force);
            }
        } else
        {
            $string = addslashes($string);
        }
        return $string;
    }

    /**
     * 格式化内容
     */
    static function formatHtml($content, $options = '')
    {
        $purifier = new CHtmlPurifier();
        if ($options != false)
            $purifier->options = $options;
        return $purifier->purify($content);
    }

    /**
     * 检测函数是否存在
     * @param <type> $funName
     * @return <type>
     */
    public static function isfun($funName)
    {
        return (false !== function_exists($funName)) ? 'YES' : 'NO';
    }

    /**
     * 计算文件大小
     * @param int $bytes
     * @return int
     */
    public static function bytes_to_string($bytes)
    {
        if (!preg_match("/^[0-9]+$/", $bytes))
            return 0;
        $sizes = array('B', 'KB', 'MB', 'GB', 'TB', 'PB');
        $extension = $sizes[0];
        for ($i = 1; ( ( $i < count($sizes) ) && ( $bytes >= 1024 )); $i++)
        {
            $bytes /= 1024;
            $extension = $sizes[$i];
        }

        return round($bytes, 2) . ' ' . $extension;
    }

    /**
     *  linux 系统信息
     * @return <type>
     */
    public static function sys_linux()
    {
        // CPU
        if (false === ($str = @file("/proc/cpuinfo")))
            return false;
        $str = implode("", $str);
        @preg_match_all("/model\s+name\s{0,}\:+\s{0,}([\w\s\)\(.@\.]+)[\r\n]+/", $str, $model);
        //@preg_match_all("/cpu\s+MHz\s{0,}\:+\s{0,}([\d\.]+)[\r\n]+/", $str, $mhz);
        @preg_match_all("/cache\s+size\s{0,}\:+\s{0,}([\d\.]+\s{0,}[A-Z]+[\r\n]+)/", $str, $cache);
        if (false !== is_array($model[1]))
        {
            $res['cpu']['num'] = sizeof($model[1]);
            for ($i = 0; $i < $res['cpu']['num']; $i++)
            {
                $res['cpu']['detail'][] = "类型：" . $model[1][$i] . " 缓存：" . $cache[1][$i];
            }
            if (!empty($res['cpu']['detail']) && false !== is_array($res['cpu']['detail']))
                $res['cpu']['detail'] = implode("<br />", $res['cpu']['detail']);
        }


        // UPTIME
        if (false === ($str = @file("/proc/uptime")))
            return false;
        $str = explode(" ", implode("", $str));
        $str = trim($str[0]);
        $min = $str / 60;
        $hours = $min / 60;
        $days = floor($hours / 24);
        $hours = floor($hours - ($days * 24));
        $min = floor($min - ($days * 60 * 24) - ($hours * 60));
        if ($days !== 0)
            $res['uptime'] = $days . "天";
        if ($hours !== 0)
            $res['uptime'] .= $hours . "小时";
        $res['uptime'] .= $min . "分钟";

        // MEMORY
        if (false === ($str = @file("/proc/meminfo")))
            return false;
        $str = implode("", $str);
        preg_match_all("/MemTotal\s{0,}\:+\s{0,}([\d\.]+).+?MemFree\s{0,}\:+\s{0,}([\d\.]+).+?SwapTotal\s{0,}\:+\s{0,}([\d\.]+).+?SwapFree\s{0,}\:+\s{0,}([\d\.]+)/s", $str, $buf);

        $res['memTotal'] = round($buf[1][0] / 1024, 2);
        $res['memFree'] = round($buf[2][0] / 1024, 2);
        $res['memUsed'] = ($res['memTotal'] - $res['memFree']);
        $res['memPercent'] = (floatval($res['memTotal']) != 0) ? round($res['memUsed'] / $res['memTotal'] * 100, 2) : 0;

        $res['swapTotal'] = round($buf[3][0] / 1024, 2);
        $res['swapFree'] = round($buf[4][0] / 1024, 2);
        $res['swapUsed'] = ($res['swapTotal'] - $res['swapFree']);
        $res['swapPercent'] = (floatval($res['swapTotal']) != 0) ? round($res['swapUsed'] / $res['swapTotal'] * 100, 2) : 0;

        // LOAD AVG
        if (false === ($str = @file("/proc/loadavg")))
            return false;
        $str = explode(" ", implode("", $str));
        $str = array_chunk($str, 3);
        $res['loadAvg'] = implode(" ", $str[0]);

        return $res;
    }

    // freebsd 系统信息
    public static function sys_freebsd()
    {
        //CPU
        if (false === ($res['cpu']['num'] = get_key("hw.ncpu")))
            return false;
        $res['cpu']['detail'] = get_key("hw.model");

        //LOAD AVG
        if (false === ($res['loadAvg'] = get_key("vm.loadavg")))
            return false;
        $res['loadAvg'] = str_replace("{", "", $res['loadAvg']);
        $res['loadAvg'] = str_replace("}", "", $res['loadAvg']);

        //UPTIME
        if (false === ($buf = get_key("kern.boottime")))
            return false;
        $buf = explode(' ', $buf);
        $sys_ticks = time() - intval($buf[3]);
        $min = $sys_ticks / 60;
        $hours = $min / 60;
        $days = floor($hours / 24);
        $hours = floor($hours - ($days * 24));
        $min = floor($min - ($days * 60 * 24) - ($hours * 60));
        if ($days !== 0)
            $res['uptime'] = $days . "天";
        if ($hours !== 0)
            $res['uptime'] .= $hours . "小时";
        $res['uptime'] .= $min . "分钟";

        //MEMORY
        if (false === ($buf = get_key("hw.physmem")))
            return false;
        $res['memTotal'] = round($buf / 1024 / 1024, 2);
        $buf = explode("\n", do_command("vmstat", ""));
        $buf = explode(" ", trim($buf[2]));

        $res['memFree'] = round($buf[5] / 1024, 2);
        $res['memUsed'] = ($res['memTotal'] - $res['memFree']);
        $res['memPercent'] = (floatval($res['memTotal']) != 0) ? round($res['memUsed'] / $res['memTotal'] * 100, 2) : 0;

        $buf = explode("\n", do_command("swapinfo", "-k"));
        $buf = $buf[1];
        preg_match_all("/([0-9]+)\s+([0-9]+)\s+([0-9]+)/", $buf, $bufArr);
        $res['swapTotal'] = round($bufArr[1][0] / 1024, 2);
        $res['swapUsed'] = round($bufArr[2][0] / 1024, 2);
        $res['swapFree'] = round($bufArr[3][0] / 1024, 2);
        $res['swapPercent'] = (floatval($res['swapTotal']) != 0) ? round($res['swapUsed'] / $res['swapTotal'] * 100, 2) : 0;


        return $res;
    }

    static function fgc($path, $time = 3)
    {
        //设置一个超时时间，单位为秒  
        return file_get_contents($path, 0, stream_context_create(array('http' => array('timeout' => $time))));
    }

    static function ogc($path)
    {
        ob_start();
        readfile($path);
        $file = ob_get_contents();
        ob_end_clean();
        return $file;
    }

    static function fcurl($url, $timeout = 600)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
//        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        if (FALSE !== strpos($url, 'https'))
        {
//                echo 'https : '.$url;ob_flush();  flush();
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        }
        $re = curl_exec($ch);
        curl_close($ch);
        return $re;
    }

    /**

     * 下载远程图片

     * @param string $url 图片的绝对url

     * @param string $filepath 文件的完整路径（包括目录，不包括后缀名,例如/www/images/test） ，此函数会自动根据图片url和http头信息确定图片的后缀名

     * @return mixed 下载成功返回一个描述图片信息的数组，下载失败则返回false

     */
    static function downLoadImage($url, $filepath)
    {
//        ppr($url);        ppr($filepath);
        //服务器返回的头信息
        $responseHeaders = array();

        //原始图片名
        $originalfilename = '';

        //图片的后缀名
        $ext = '';
        $ch = curl_init($url);

        //设置curl_exec返回的值包含Http头
        curl_setopt($ch, CURLOPT_HEADER, 1);

        //设置curl_exec返回的值包含Http内容
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        //设置抓取跳转（http 301，302）后的页面
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

        curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1);

        //设置最多的HTTP重定向的数量
        curl_setopt($ch, CURLOPT_MAXREDIRS, 1);

        //服务器返回的数据（包括http头信息和内容）
        $html = curl_exec($ch);

        //获取此次抓取的相关信息
        $httpinfo = curl_getinfo($ch);

        curl_close($ch);

        if ($html !== false)
        {
            //分离response的header和body，由于服务器可能使用了302跳转，所以此处需要将字符串分离为 2+跳转次数 个子串
            $httpArr = explode("\r\n\r\n", $html, 2 + $httpinfo['redirect_count']);

            //倒数第二段是服务器最后一次response的http头
            $header = $httpArr[count($httpArr) - 2];

            //倒数第一段是服务器最后一次response的内容
            $body = $httpArr[count($httpArr) - 1];

            $header.="\r\n";

            //获取最后一次response的header信息
            preg_match_all('/([a-z0-9-_]+):\s*([^\r\n]+)\r\n/i', $header, $matches);

            if (!empty($matches) && count($matches) == 3 && !empty($matches[1]) && !empty($matches[1]))
            {
                for ($i = 0; $i < count($matches[1]); $i++)
                {
                    if (array_key_exists($i, $matches[2]))
                    {
                        $responseHeaders[$matches[1][$i]] = $matches[2][$i];
                    }
                }
            }

            //获取图片后缀名

            if (0 < preg_match('{(?:[^\/\\\\]+)\.(jpg|jpeg|gif|png|bmp)$}i', $url, $matches))
            {
                $originalfilename = $matches[0];
                $ext = $matches[1];
            } else
            {
                if (array_key_exists('Content-Type', $responseHeaders))
                {
                    if (0 < preg_match('{image/(\w+)}i', $responseHeaders['Content-Type'], $extmatches))
                    {
                        $ext = $extmatches[1];
                    }
                }
            }

            //保存文件

            if (!empty($ext))
            {
                $filepath .= ".$ext";

//echo $filepath;die;
                //如果目录不存在，则先要创建目录
                //CFiles::createDirectory(dirname($filepath));

                $local_file = fopen($filepath, 'w');

                if (false !== $local_file)
                {
                    if (false !== fwrite($local_file, $body))
                    {
                        fclose($local_file);
                        $sizeinfo = getimagesize($filepath);
                        return array('filepath' => realpath($filepath), 'width' => $sizeinfo[0], 'height' => $sizeinfo[1], 'orginalfilename' => $originalfilename, 'filename' => pathinfo($filepath, PATHINFO_BASENAME));
                    }
                }
            }
        }
        return false;
    }



    /**
     * 把一个文件夹里的文件全部转码 只能转一次 否则全部变乱码
     * @param string $filename
     */
    static function iconvFile($filename, $input_encoding = 'UTF-8', $output_encoding = 'GBK')
    {
        if (file_exists($filename))
        {
            if (is_dir($filename))
            {
                foreach (glob("$filename/*") as $key => $value)
                {
                    self::iconvFile($value);
                }
            } else
            {
                $contents_after = iconv($input_encoding, $output_encoding.'//TRANSLIT//IGNORE', file_get_contents($filename));
                file_put_contents($filename, $contents_after);
            }
        } else
        {
            echo '参数错误';
            return false;
        }
    }
    
    static function ppr($param, $stop = 0)
    {
        echo '<hr>';
        echo "<meta http-equiv=\"content-type\" content=\"text/html;charset=utf-8\">";
        echo '<pre>';
        print_r($param);
        echo '</pre><hr>';
        if ($stop)
        {

            exit();
        }
    }


//iconv_file('./test');

}
?>
