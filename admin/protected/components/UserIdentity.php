<?php

class UserIdentity extends CUserIdentity
{

    private $_id;
    public $group_id;

    public function authenticate()
    {
        $username = strtolower($this->username);
        $user = Admin::model()->find('LOWER(username)=? ', array($username));
        if ($user === null)
        {
            $this->errorCode = self:: ERROR_USERNAME_INVALID;
        } else if (!$user->validatePassword($this->password))
        {
            $this->errorCode = self:: ERROR_PASSWORD_INVALID;
        } else
        {
            $this->_id = $user->id;
            $this->username = $user->username;
            $this->group_id = $user->group_id;
            $this->errorCode = self:: ERROR_NONE;
        }

        return $this->errorCode == self:: ERROR_NONE;
    }

    public function getId()
    {
        return $this->_id;
    }

}

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class UserIdentity_ extends CUserIdentity
{

    /**
     * Authenticates a user.
     * The example implementation makes sure if the username and password
     * are both 'demo'.
     * In practical applications, this should be changed to authenticate
     * against some persistent user identity storage (e.g. database).
     * @return boolean whether authentication succeeds.
     */
    public function authenticate()
    {
        $model = new Admin('login');
        $model->attributes = $_POST['LoginForm'];
        if ($model->validate())
        {
            $data = $model->find('username=:username', array('username' => $model->username));

            if ($data === null)
            {
                $this->errorCode = self::ERROR_USERNAME_INVALID;
                $model->addError('username', '用户不存在');
                parent::_backendLogger(array('catalog' => 'login', 'intro' => '登录失败，用户不存在:' . $model->username, 'user_id' => 0));
            } elseif (!$this->validatePassword($data->password))
            {
                $this->errorCode = self::ERROR_PASSWORD_INVALID;
                $model->addError('password', '密码不正确');
                parent::_backendLogger(array('catalog' => 'login', 'intro' => '登录失败，密码不正确:' . $model->username . '，使用密码：' . $model->password, 'user_id' => 0));
            } elseif ($data->group_id == 2)
            {
                $this->errorCode = self::ERROR_UNKNOWN_IDENTITY;
                $model->addError('username', '用户已经锁定，请联系管理');
            } else
            {
                $this->errorCode = self::ERROR_NONE;
            }
        }

        return $this->errorCode;
    }

    /**
     * 检测用户密码
     *
     * @return boolean
     */
    public function validatePassword($password)
    {
        return $this->hashPassword($this->password) === $password;
    }

    /**
     * 密码进行加密
     * @return string password
     */
    public function hashPassword($password)
    {
        return md5($password);
    }

    /**
     * 数据保存前处理
     * @return boolean.
     */
    protected function beforeSave()
    {
        if ($this->isNewRecord)
        {
            isset($this->create_time) && $this->create_time = time();
        } else
        {
            isset($this->last_update_time) && $this->last_update_time = time();
        }
        return true;
    }

}