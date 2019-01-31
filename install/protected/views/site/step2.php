<?php $this->renderPartial('header'); ?>
            <div id="step">
                    <div id="step1">
                        第一步
                    </div>
                    <div class="box3">
                    <h2>请检查以下文件是否有写权限</h2>
                    <table>

                        <?php if (!empty($w_check)): foreach ($w_check as $key => $value):?>
                                <tr>
                                    <th><?php echo $value; ?></th>
                                </tr>
                       <?php endforeach; endif;?>

                    </table>
                    </div>
					<div class="box3">
                    <h2>请满足运行Yii Web应用的要求</h2>
                    <div>&nbsp;&nbsp;检查结果:
                        <?php 
                        if($view_file['result']>0): ?>
                        恭喜！您的服务器配置完全符合本程序的要求。
                        <?php elseif($view_file['result']<0): ?>
                        您的服务器配置符合本程序的最低要求。如果您需要使用特定的功能，请关注如下警告。
                        <?php else: ?>
                        您的服务器配置未能满足本程序的要求。
                        <?php endif; ?>
                    </div>
                        <table class="result">
                        <tr><th>项目名称</th><th width="100px">结果</th><th>备注</th></tr>
                        <?php foreach($view_file['requirements'] as $requirement): ?>
                        <tr>
                            <td>
                            <?php echo $requirement[0]; ?>
                            </td>
                            <td class="<?php echo $requirement[2] ? 'passed' : ($requirement[1] ? 'failed' : 'warning'); ?>">
                            <?php echo $requirement[2] ? '通过' : '<font color=red>未通过</font>'; ?>
                            </td>
                            <td>
                            <?php echo $requirement[4]; ?>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                        </table>
                    </div>
                    <div class="handle">
                        <form method="post" action='<?php echo $this->createUrl('site/install');?>'>
                            <input type="hidden" name="step" value="3">
                            <button type="button" onclick='history.go(-1)' class="button">上一步</button> 
                            <button type="submit" class="button" <?php echo $btn_disabled;?>>下一步</button>
                        </form>
                </div>
            </div>



<?php if(PHP_VERSION < '5.1.0'):

?>


<?php else:?>


<?php endif;?>

<?php $this->renderPartial('footer'); ?>