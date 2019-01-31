<?php

/**
 * This is the model class for table "{{catalog}}".
 *
 * The followings are the available columns in table '{{catalog}}':
 * @property integer $id
 * @property string $parent_id
 * @property string $catalog_name
 * @property string $content
 * @property string $data_count
 * @property string $status_is
 * @property string $redirect_url
 * @property string $create_time
 *
 * The followings are the available model relations:
 * @property Links[] $links
 */
class Catalog extends CActiveRecord
{

    /**
     * @return string the associated database table name
     */
    public function tableName()
    {
        return '{{catalog}}';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('catalog_name', 'required'),
            array('parent_id, data_count, create_time', 'length', 'max' => 10),
            array('catalog_name', 'length', 'max' => 100),
            array('status_is', 'length', 'max' => 1),
            array('redirect_url,path,image_link', 'length', 'max' => 255),
            array('redirect_url', 'url'),
            array('content', 'safe'),
            array('tb_id', 'numerical'),
            array('opt_1,opt_2', 'length', 'max' => 64),
            // The following rule is used by search().
            // @todo Please remove those attributes that should not be searched.
            array('id, parent_id, catalog_name, content, data_count, status_is, redirect_url, path, seo_t,seo_k,seo_d,opt_1,opt_2,image_link,tb_id,create_time', 'safe', 'on' => 'search'),
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
            'links' => array(self::HAS_MANY, 'Links', 'catalog_id'),
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels()
    {
        return array(
            'id' => 'ID',
            'parent_id' => '上级分类',
            'catalog_name' => '名称',
            'content' => '详细介绍',
            'data_count' => '显示的数据量',
            'status_is' => '状态',
            'redirect_url' => '跳转地址,更多链接',
            'create_time' => '录入时间',
            'path' => '生成目录名称或外链地址',
            'seo_t' => 'SEO标题',
            'seo_k' => 'SEO关键字',
            'seo_d' => 'SEO描述',
            'tb_id' => '同步ID',
            'opt_1' => '属性1',
            'opt_2' => '属性2',
            'image_link' => '内页logo',
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

        $criteria->compare('id', $this->id);
        $criteria->compare('parent_id', $this->parent_id, true);
        $criteria->compare('catalog_name', $this->catalog_name, true);
        $criteria->compare('content', $this->content, true);
        $criteria->compare('data_count', $this->data_count, true);
        $criteria->compare('status_is', $this->status_is, true);
        $criteria->compare('redirect_url', $this->redirect_url, true);
        $criteria->compare('seo_t', $this->seo_t, true);
        $criteria->compare('seo_k', $this->seo_k, true);
        $criteria->compare('seo_d', $this->seo_d, true);
        $criteria->compare('tb_id', $this->tb_id, true);
        $criteria->compare('opt_1', $this->opt_1, true);
        $criteria->compare('opt_2', $this->opt_2, true);
        $criteria->compare('image_link', $this->image_link, true);
        $criteria->compare('create_time', $this->create_time, true);

        return new CActiveDataProvider($this, array(
            'criteria' => $criteria,
        ));
    }

    /**
     * Returns the static model of the specified AR class.
     * Please note that you should have this exact method in all your CActiveRecord descendants!
     * @param string $className active record class name.
     * @return Catalog the static model class
     */
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

}
