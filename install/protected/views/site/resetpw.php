<?php $this->renderPartial('header');?>
<div id="step">
    <div id="step2">
        第二步
    </div>
            
    <form method="post" action='?r=site/install&t=rpw'>
        <div id="database">
<?php 
if(is_file(APP_DB)): 
    include_once APP_DB; 
else: 
    $newadmin = reqGet('n'); 
    if (!empty($newadmin)):
        $newdb = str_replace('admin', $newadmin, APP_DB);
        if (is_file($newdb)):
            include_once $newdb; 
        endif;
    else:
        ?>
            <div class="box3">
                <h2>后台目录名非默认,填写修改后的目录名</h2>
                <table>
                    <tr>
                        <th>后台目录名：</th>
                        <td><input type="text" name="addir" id="addir" value='' /> </td>
                        <td>
                            <div class="m10 red"><button type="button" onclick="var n=document.getElementById('addir').value; location='?r=site/resetpw&n='+n">提交</button>  默认是 admin</div>
                        </td>
                    </tr>
                </table>
            </div>    
            <?php
    endif;
endif;
?>
            <div class="box3">
                <h2>填写数据库信息</h2>

                <input type="hidden" name="step" value="4">
                <?php if(!empty($newadmin)):?>
                <input type="hidden" name="admindir" value="<?php echo $newadmin?>">
                <?php endif;?>
                <table>
                    <tr>
                        <th>网站编码：</th>
                        <td><input readonly type="text" name="charset" value='UTF8' /> </td>
                        <td><div class="m10 red">当前为UTF8版本</div></td>
                    </tr>
                    <tr>
                        <th width="106">数据库地址：</th>
                        <td width="180"><input type="text" class="int" name='dbhost'  readonly value='<?php if(!empty($GLOBALS['database']['db_pass'])): echo $GLOBALS['database']['db_host'];endif;?>'/></td>
                        <td>本地127.0.0.1 或 localhost </td>
                    </tr>
                    <tr>
                        <th>数据库名：</th>
                        <td><input type="text" class="int" name='dbname' readonly value='<?php if(!empty($GLOBALS['database']['db_pass'])): echo $GLOBALS['database']['db_name'];endif;?>'/></td>
                        <td>输入<strong >已存在的UTF8编码的</strong>数据库名称</td>
                    </tr>
                    <tr>
                        <th>数据库用户名：</th>
                        <td><input type="text" class="int" name='dbuser' readonly value='<?php if(!empty($GLOBALS['database']['db_pass'])): echo $GLOBALS['database']['db_user'];endif;?>'/></td>
                        <td>输入MYSQL登录账号</td>
                    </tr>
                    <tr>
                        <th>数据库密码：</th>
                        <td><input type="text" class="int" name='dbpw' readonly value='<?php if(!empty($GLOBALS['database']['db_pass'])): echo $GLOBALS['database']['db_pass'];endif;?>'/></td>
                        <td>输入MYSQL登录密码</td>
                    </tr>
                    <tr>
                        <th>表名前缀：</th>
                        <td><input type="text" class="int" name='dbpre' readonly value='<?php if(!empty($GLOBALS['database']['db_pass'])): echo $GLOBALS['database']['table_prefix'];endif;?>'/></td>
                        <td>数据表默认前缀 ylmf_</td>
                    </tr>

                    <tr>
                        <td colspan='3'>


<?php if (!empty($error_password) && $error_password == 2): ?>
                                <strong class="red">数据库用户名为空或您所输入的2个密码不一致。</stong>
<?php endif; ?>

                        </td>
                    </tr>
                </table>

            </div><!--/ box3-->

            <div class="box3">
                <h2>填写管理员信息</h2>
                <div class="m10 red">请牢记管理员信息，凭该账号密码管理站点。</div>
                <table>
                    <tr>
                        <th width="106">用 户 名：</th>
                        <td width="180"><input type="text" class="int" name='manager' /></td>
                        <td>设置超级管理员用户名</td>
                    </tr>
                    <tr>
                        <th>密　　码：</th>
                        <td><input type="password" class="int" name='password'/></td>
                        <td>设置超级管理员密码,密码不可为空</td>
                    </tr>
                    <tr>
                        <th>重复密码：</th>
                        <td><input type="password" class="int" name='password_check'/></td>
                        <td>请重复一遍你的超级管理员密码</td>
                    </tr>
                    <tr>
                        <td colspan='3'>

<?php if (!empty($error_password) && $error_password == 1): ?>
                                <strong class="red">用户名密码为空或您所输入的2个密码不一致。</stong>
<?php endif; ?>

                        </td>
                    </tr>
                </table>
            </div><!--/ box3-->

        </div>

        <div class="handle">
            <input type="hidden" name="step" value="4">
            <button type="button" onclick='history.go(-1)' class="button">上一步</button> <button type="submit" class="button">下一步</button>
        </div>
    </form>
</div>


<?php if (PHP_VERSION < '5.1.0'):
?>


<?php else: ?>


<?php endif; ?>

<?php $this->renderPartial('footer'); ?>