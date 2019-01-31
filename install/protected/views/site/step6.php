<?php $this->renderPartial('header'); ?>

<div id="step">
            <div id="step4">
                第四步
            </div>
            <div class="box3">
                <div id="error">
                    <div class="box4">
                        <img src="images/icon_04.gif" alt="成功" /><br />
                        <strong class="black">成功安装114啦网址导航，点击 <font color="Red">下一步：自动删除安装目录</font>，并进入管理后台。
                    </div>
                </div>
            </div>
            <div class="handle">
                <form method="post" action='?r=site/install'>
                <input type="hidden" name="step" value="7">
                <button type="button" class="button" onclick='history.go(-1)'>上一步</button> 
                <button type="submit" class="button">下一步</button>
                </form>
            </div>
        </div>

<?php $this->renderPartial('footer'); ?>