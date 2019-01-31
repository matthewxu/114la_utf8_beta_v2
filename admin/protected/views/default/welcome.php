<?php $this->renderPartial('/_common/header'); ?>
<body id="main_page">

<script type="text/javascript">
	var nav = document.getElementById("nav");
	var pnav = window.parent.document.getElementById("nav")
	pnav.innerHTML = nav.innerHTML;
</script>
<div class="wrap">
    <div class="container">
        <div id="main">
            <div class="con">
		  <div class="table">
                    <h2 class="th">114啦网址导航建站系统</h2>       
                    <table><tr><td>
                        <p>
                            欢迎使用雨林木风114啦网址导航建站系统，当前版本号：V<?php echo SYS_VERSION?>，最后更新时间：<?php echo SYS_UPTIME?>。
                            <a href='<?php echo QZ_URL?>' target='_blank' style="float:right;">参加114啦网址导航建站系统开源讨论圈子&gt;&gt;</a>
                        </p>
                        <div class="table" id="version_notice" style="display:none;background-color:#fff">            
                            <p class="tips"></p>
                        </div>
                    </td></tr></table>
                </div>

                <?php if(!empty($data['tips'])):?>
                <div class="table">
                    <h2 class="th">安全提示</h2>       
                    <div class="tips">
                        <?php if (!empty($data['tips']['backend'])):?>
                        <p>从安全性考虑，建议您修改默认管理后台目录 admin 为自定义目录名;</p>
                        <?php endif;?>
                        <?php if (!empty($data['tips']['install'])):?>
                        <p>安装目录 install 仍存在，建议您删除此目录,或者修改目录名;</p>
                        <?php endif;?>
						<?php if (!function_exists('curl_init')):?>
                        <p>PHP的curl_init扩展未开启,同步功能无效;</p>
                        <?php endif;?>
                        <p></p>
                    </div>
                </div>
              <?php endif;?>
                
                <div class="table">
                    <h2 class="th">服务器基本信息 <span class="head"><?php echo $_SERVER['SERVER_NAME']?><?php echo $data['serverip']?> &nbsp;<?php echo $data['systime']?></span></h2>                
                    <table>
                        <tr>
                        <td colspan="2"> System : <?php echo $data['sysinfo']?></td>
                        <td colspan="2">Web server : <span class="b"><?php echo $_SERVER['SERVER_SOFTWARE']?></span></td>
                        <td colspan="2">PHP Version : <?php echo $data['phpversion']?></td>
                        </tr>
                        <tr>
                        <td colspan="2">Mysql  Version : <?php echo $data['dbversion']?></td>
                        <td colspan="2"> display_errors : <?php echo $data['dispalyerror']?></td>
                        <td colspan="2">Server API : <?php echo $data['serverapi']?></td>
                        </tr>
                        <tr>
                        <td colspan="2">PHP Safe: <?php echo $data['phpsafe']?> </td>
                        <td colspan="2">Session Support : <?php echo $data['sessionsp']?></td>
                        <td colspan="2">Cookie Support : <?php echo $data['cookiesp']?></td>
                        </tr>
                        <tr>
                        <td colspan="2">Zend Optimizer Support : <?php echo $data['zendoptsp']?></td>
                        <td colspan="2">eAccelerator Support : <?php echo $data['eaccsp']?></td>
                        <td colspan="2">Xcache Support : <?php echo $data['xcachesp']?></td>
                        </tr>
                        <tr>
                        <td colspan="2">register_globals : <?php echo $data['registerglobal']?></td>
                        <td colspan="2">magic_quotes_gpc : <?php echo $data['mqqsp']?></td>
                        <td colspan="2">magic_quotes_runtime : <?php echo $data['mprsp']?></td>
                        </tr>
                        <tr>
                        <td colspan="2">upload_max_filesize : <?php echo $data['maxupsize']?></td>
                        <td colspan="2">post_max_size : <?php echo $data['maxpostsize']?></td>
                        <td colspan="2">max_execution_time : <?php echo $data['maxexectime']?></td>
                        </tr>
                        <tr>
                        <td width="12%">allow_url_fopen : <?php echo $data['allowurlopen']?></td>
                        <td width="13%">Curl Support : <?php echo $data['curlsp']?></td>
                        <td width="12%">Iconv Support : <?php echo $data['iconvsp']?></td>
                        <td width="13%">Zlib Support : <?php echo $data['zlibsp']?></td>
                        <td width="12%">GD Support : <?php echo $data['gdsp']?></td>
                        <td width="13%">DBA Support : <?php echo $data['dbasp']?></td>
                        </tr>
                    </table>
                </div>                
                <div class="table">
                    <h2 class="th">统计信息</h2>                
                    <table>
                    <tr>
                    <td> 当前数据量 : <?php echo $data['sitesum']?>条</td>
                    <td>数据库大小 : <?php echo $data['datasize']?></td>
                    </tr>
                    </table>
                </div>
            </div><!--/ con-->
        </div>    
    </div><!--/ container-->
</div><!--/ wrap-->

<?php $this->renderPartial('/_common/footer'); ?>