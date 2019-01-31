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
        $model = new Admin('login');

        if (XUtils::method() == 'POST')
        {
            $model->attributes = $_POST['Admin'];

            if ($model->validate())
//            if (TRUE) //非验证码即可登陆
            {

                $data = $model->find('username=:username', array('username' => $model->username));
                if ($data === null)
                {
                    $model->addError('username', '用户不存在');
                    parent::_backendLogger(array('catalog' => 'login', 'intro' => '登录失败，用户不存在:' . CHtml::encode($model->username), 'user_id' => 0));
                } elseif (!$model->validatePassword($data->password))
                {
                    $model->addError('password', '密码不正确');
                    parent::_backendLogger(array('catalog' => 'login', 'intro' => '登录失败，密码不正确:' . CHtml::encode($model->username) . '，使用密码：' . CHtml::encode($model->password), 'user_id' => 0));
                } elseif ($data->group_id == 2)
                {
                    $model->addError('username', '用户已经锁定，请联系管理');
                } else
                {
                    $this->_sessionSet('_backendGroupId', $data->group_id);
                    if (isset($data->group_id) && $data->group_id == 1)
                    {
                        $this->_sessionSet('_backendPermission', 'backendstrator');
                    }

                    $data->last_login_ip = XUtils::getClientIP();
                    $data->last_login_time = time();
                    $data->login_count = $data->login_count + 1;
              
                    $data->save();
                    
                    parent::_sessionSet('uid', $data->id);
                    parent::_sessionSet('uname', $data->username);
 
                    parent::_backendLogger(array('catalog' => 'login', 'intro' => '用户登录成功:' . $data->username));
                    $this->redirect(array('default/index'));

                    XUtils::message('success', '登录成功', $this->createUrl('default/index'), 2);
                }
            }
        }
        $this->render('login', array('model' => $model));
    }
}

?>