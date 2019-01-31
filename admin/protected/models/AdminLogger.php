<?php

/**
 * This is the model class for table "{{admin_logger}}".
 *
 * The followings are the available columns in table '{{admin_logger}}':
 * @property string $id
 * @property integer $user_id
 * @property string $catalog
 * @property string $url
 * @property string $intro
 * @property string $ip
 * @property string $create_time
 *
 * The followings are the available model relations:
 * @property Admin $user
 */
class AdminLogger extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return '{{admin_logger}}';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('user_id', 'numerical', 'integerOnly'=>true),
			array('catalog', 'length', 'max'=>6),
			array('url', 'length', 'max'=>255),
			array('ip', 'length', 'max'=>15),
			array('create_time', 'length', 'max'=>10),
			array('intro', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, user_id, catalog, url, intro, ip, create_time', 'safe', 'on'=>'search'),
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
			'user' => array(self::BELONGS_TO, 'Admin', 'user_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'user_id' => '用户id',
			'catalog' => '类型',
			'url' => 'url',
			'intro' => '操作',
			'ip' => '操作ip',
			'create_time' => '操作时间',
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

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id,true);
		$criteria->compare('user_id',$this->user_id);
		$criteria->compare('catalog',$this->catalog,true);
		$criteria->compare('url',$this->url,true);
		$criteria->compare('intro',$this->intro,true);
		$criteria->compare('ip',$this->ip,true);
		$criteria->compare('create_time',$this->create_time,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return AdminLogger the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
