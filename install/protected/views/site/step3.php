<?php
$this->renderPartial('header');
$dbhost = empty($opt['db_host']) ? 'localhost' : $opt['db_host'];
$dbname = empty($opt['db_name']) ? '114la_ky' : $opt['db_name'];
$dbuser = empty($opt['db_user']) ? 'root' : $opt['db_user'];
$dbpre = empty($opt['table_prefix']) ? 'ylmf_' : $opt['table_prefix'];
$manager = empty($opt['manager']) ? 'admin' : $opt['manager'];
?>


<div id="step">
    <div id="step2">
        第二步
    </div>
    <form method="post" action='?r=site/install'>
        <div id="database">
            <div class="box3">
                <h2>填写数据库信息</h2>


                <input type="hidden" name="step" value="4">
                <table>
                    <tr>
                        <th>网站编码：</th>
                        <td><input disabled type="text" name="charset" value='UTF8' /> </td>
                        <td><div class="m10 red">当前为UTF8版本</div></td>
                    </tr>
                    <tr>
                        <th width="106">数据库地址：</th>
                        <td width="180"><input type="text" class="int" name='dbhost' value='<?php echo $dbhost ?>' /></td>
                        <td>本地127.0.0.1 或 localhost </td>
                    </tr>
                    <tr>
                        <th>数据库名：</th>
                        <td><input type="text" class="int" name='dbname' value='<?php echo $dbname ?>'/></td>
                        <td>输入<strong >已存在的UTF8编码的</strong>数据库名称</td>
                    </tr>
                    <tr>
                        <th>数据库用户名：</th>
                        <td><input type="text" class="int" name='dbuser' value='<?php echo $dbuser ?>' /></td>
                        <td>输入MYSQL登录账号</td>
                    </tr>
                    <tr>
                        <th>数据库密码：</th>
                        <td><input type="password" class="int" name='dbpw'  /></td>
                        <td>输入MYSQL登录密码</td>
                    </tr>
                    <tr>
                        <th>表名前缀：</th>
                        <td><input type="text" class="int" name='dbpre' value='<?php echo $dbpre ?>' /></td>
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
                        <td width="180"><input type="text" class="int" name='manager' value='<?php echo $manager ?>' /></td>
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