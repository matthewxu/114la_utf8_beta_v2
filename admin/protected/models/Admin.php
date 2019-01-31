<?php

/**
 * This is the model class for table "{{admin}}".
 *
 * The followings are the available columns in table '{{admin}}':
 * @property integer $id
 * @property string $username
 * @property string $password
 * @property string $realname
 * @property integer $group_id
 * @property string $last_login_ip
 * @property integer $last_login_time
 * @property string $login_count
 * @property string $status_is
 * @property integer $create_time
 *
 * The followings are the available model relations:
 * @property AdminGroup $group
 * @property AdminLogger[] $adminLoggers
 * @property Links[] $links
 */
class Admin extends XBaseModel
{

    public $captcha;
    public $password2; 

    /**
     * @return string the associated database table name
     */
    public function tableName()
    {
        return '{{admin}}';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules()
    {
        return array(
            array('username, password,password2', 'required', 'on' => 'create'),
            array('username', 'required', 'on' => 'update'),
            array('username, password, captcha', 'required', 'on' => 'login'),
            array('username', 'unique', 'on' => 'create'),
            array('captcha', 'captcha', 'allowEmpty' => !extension_loaded('gd'), 'on' => 'login'),
            array('username,group_id', 'required'),
            array('group_id, last_login_time, create_time', 'numerical', 'integerOnly' => true),
            array('username', 'length', 'max' => 50),
            array('password', 'length', 'max' => 32),
            array('realname', 'length', 'max' => 100),


            array('login_count', 'length', 'max' => 10),
            array('status_is', 'length', 'max' => 1),

            array('password', 'compare', 'compareAttribute'=>'password2' ,'on'=>'create'),
            // The following rule is used by search().
            // @todo Please remove those attributes that should not be searched.
            array('id, username, password,password2, realname, group_id, last_login_ip, last_login_time, login_count, status_is, create_time', 'safe', 'on' => 'search'),
        );
    }

    /**
     * @return array relational rules.
     */
    public function relations()
    {
        // NOTE: you may need to adjust the relation name and the related
        // class name for the relations automatically generated below.
        return array(
            'adminGroup' => array(self::BELONGS_TO, 'AdminGroup', 'group_id'),
            'adminLoggers' => array(self::HAS_MANY, 'AdminLogger', 'user_id'),
            'links' => array(self::HAS_MANY, 'Links', 'user_id'),
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels()
    {
        return array(
            'id' => 'ID',
            'username' => '用户',
            'password' => '密码',
            'password2' => '确认密码',
            'realname' => '真实姓名',
            'group_id' => '用户组',
            'last_login_ip' => '最后登录ip',
            'last_login_time' => '最后登录时间',
            'login_count' => '登录次数',
            'status_is' => '用户状态',
            'create_time' => '录入时间',
            'captcha' => '验证码',
        );
    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     *
     * Typical usecase:
     * - Initialize the model fields with values from filter form.
     * - Execute this method to get CActiveDataProvider instance which will filter
     * models according to data in model fields.
     * - Pass data provider to CGridView, CListView or any similar widget.
     *
     * @return CActiveDataProvider the data provider that can return the models
     * based on the search/filter conditions.
     */
    public function search()
    {
        // @todo Please modify the following code to remove attributes that should not be searched.

        $criteria = new CDbCriteria;

        $criteria->compare('username', $this->username, true);
        $criteria->compare('realname', $this->realname, true);
        $criteria->compare('group_id', $this->group_id);
        $criteria->compare('last_login_ip', $this->last_login_ip, true);
        $criteria->compare('login_count', $this->login_count, true);
        $criteria->compare('status_is', $this->status_is, true);

        return new CActiveDataProvider($this, array(
            'criteria' => $criteria,
        ));
    }

    /**
     * Returns the static model of the specified AR class.
     * Please note that you should have this exact method in all your CActiveRecord descendants!
     * @param string $className active record class name.
     * @return Admin the static model class
     */
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

    /**
     * 
     * @param type $groupAclStr 当前组的acl
     * @param type $acl 待验证的acl
     */
    public static function checkGroupAcl($groupAclStr, $acl)
    {
        return strpos($groupAclStr, '|' . $acl . '|');
    }

}
