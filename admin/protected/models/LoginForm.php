<?php

/**
 * LoginForm class.
 * LoginForm is the data structure for keeping
 * user login form data. It is used by the 'login' action of 'SiteController'.
 */
class LoginForm extends CFormModel
{

    public $username;
    public $password;
    public $group_id;
    public $captcha;
    public $rememberMe;
    private $_identity;

    /**
     * Declares the validation rules.
     * The rules state that username and password are required,
     * and password needs to be authenticated.
     */
    public function rules()
    {
        return array(
            array('username, password', 'required', 'on' => 'create'),
            array('username, password, captcha', 'required', 'on' => 'login'),
            array('username', 'unique', 'on' => 'create'),
            array('captcha', 'captcha', 'allowEmpty' => !extension_loaded('gd'), 'on' => 'login'),
            array('username, password', 'required'),
            array('username', 'length', 'max' => 50),
            array('password', 'length', 'max' => 32),
            array('username, password', 'safe', 'on' => 'search'),
            array('rememberMe', 'boolean'),
        );
    }

    /**
     * Declares attribute labels.
     */
    public function attributeLabels()
    {
        return array(
            'username' => '用户',
            'password' => '密码',
            'captcha' => '验证码',
            'rememberMe' => '记住登录',
        );
    }

    /**
     * Logs in the user using the given username and password in the model.
     * @return boolean whether login is successful
     */
    public function login()
    {
        if ($this->_identity === null)
        {
            $this->_identity = new UserIdentity($this->username, $this->password);
            $this->_identity->authenticate();
        }
        if ($this->_identity->errorCode === UserIdentity::ERROR_NONE)
        {
            $this->group_id = $this->_identity->group_id;
            $duration = empty($this->rememberMe) ? 3600 : 0; // 1小时
            @Yii::app()->user->login($this->_identity,$duration);
            return true;
        } else
        {
            return false;
        }
   
    }
}
