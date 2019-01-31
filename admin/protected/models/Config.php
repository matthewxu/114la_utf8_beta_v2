<?php

/**
 * This is the model class for table "{{config}}".
 *
 * The followings are the available columns in table '{{config}}':
 * @property string $scope
 * @property string $variable
 * @property string $value
 * @property string $description
 */
class Config extends CActiveRecord
{

    /**
     * @return string the associated database table name
     */
    public function tableName()
    {
        return '{{config}}';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('variable', 'required'),
            array('variable', 'length', 'max' => 50),
            array('description', 'length', 'max' => 255),
            array('value', 'safe'),
            // The following rule is used by search().
            // @todo Please remove those attributes that should not be searched.
            array('scope, variable, value, description', 'safe', 'on' => 'search'),
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
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels()
    {
        return array(
            'variable' => '变量',
            'value' => '值',
            'description' => '描述',
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

        $criteria->compare('variable', $this->variable, true);
        $criteria->compare('value', $this->value, true);
        $criteria->compare('description', $this->description, true);

        return new CActiveDataProvider($this, array(
            'criteria' => $criteria,
        ));
    }

    /**
     * Returns the static model of the specified AR class.
     * Please note that you should have this exact method in all your CActiveRecord descendants!
     * @param string $className active record class name.
     * @return Config the static model class
     */
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

    /**
     * 获取配置信息
     * @param  string $var   [description]
     * @param  string $scope [description]
     * @return [type]        [description]
     */
    public static function get($var = '')
    {
        $model = Config::model()->findAll();
        $config = null;
        foreach ($model as $key => $row)
        {
            if ($var && $var == $row['variable'])
            {
                return $row['value'];
            } else
            {
                $config[$row['variable']] = $row['value'];
            }
        }
        return $config;
    }

    /**
     * 更新配置信息
     * @param unknown_type $scope
     * @param unknown_type $variable
     * @param unknown_type $value
     */
    public static function updateVar($var, $value = "")
    {
        $variable = empty($var["variable"])?'':$var["variable"];
        $value = empty($var["value"])?'':$var["value"];
        $connection = Yii::app()->db->createCommand("REPLACE INTO {{config}} (`variable`, `value`) VALUES ('$variable', '$value') ")->execute();
    }

}
