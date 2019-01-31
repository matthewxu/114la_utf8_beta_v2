<?php

/**
 * 公共登录
 * 
 */
class PublicController extends Controller
{

    /**
     * 退出登录
     */
    public function actionLogout()
    {
        Yii::app()->user->logout();
        parent::_sessionRemove('_backendGroupId');
        parent::_sessionRemove('_backendGroupName');
        parent::_sessionRemove('_backendAcl');
        parent::_sessionRemove('_backendPermission');
        $this->redirect(array('public/login'));
    }

    public function actions()
    {
        return array(
        // captcha action renders the CAPTCHA image displayed on the contact page
            'captcha'=>array(
                'class'=>'CCaptchaAction',
    //                    'backColor'=>0xFFFFFF,  //背景颜色
                'minLength'=>4,  //最短为4位
                'maxLength'=>4,   //是长为4位
                'transparent'=>true,  //显示为透明
            ),
        );
    }

    public function actionLogin()
    {
        $login_model = new LoginForm('login');
        if (XUtils::method() == 'POST' && isset($_POST['LoginForm']))
        {
            sleep(1);
            $login_model->attributes = $_POST['LoginForm'];

            if ($login_model->validate() && $login_model->login())
            {
                $this->_sessionSet('_backendGroupId',$login_model->group_id);
                if ($login_model->group_id == 1)
                {
                    $this->_sessionSet('_backendPermission', 'backendstrator');
                }
                
                $data = Admin::model()->findByPk(Yii::app()->user->id);
                $data->last_login_ip = XUtils::getClientIP();
                $data->last_login_time = time();
                $data->login_count = $data->login_count + 1;
                $data->save();
                parent::_backendLogger(array('catalog' => 'login', 'intro' => '用户登录成功:' . $login_model->username));
                $this->redirect(array('default/index'));
                XUtils::message('success', '登录成功', $this->createUrl('default/index'), 2);

            }
            
        }
        $this->render('login', array('model' => $login_model));
    }
}

?>