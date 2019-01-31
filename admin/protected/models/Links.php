<?php

/**
 * This is the model class for table "{{links}}".
 *
 * The followings are the available columns in table '{{links}}':
 * @property string $id
 * @property integer $catalog_id
 * @property string $title
 * @property string $title_color
 * @property string $link
 * @property string $image_link
 * @property string $opt_a
 * @property string $opt_b
 * @property string $opt_c
 * @property string $mix
 * @property string $sort_order
 * @property integer $user_id
 * @property string $status_is
 * @property integer $begin_time
 * @property integer $end_time
 * @property integer $create_time
 *
 * The followings are the available model relations:
 * @property Catalog $catalog
 * @property Admin $user
 */
class Links extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return '{{links}}';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('title, link, create_time', 'required'),
			array('catalog_id, user_id, begin_time, end_time, create_time', 'numerical', 'integerOnly'=>true),
			array('title, opt_a, opt_b, opt_c', 'length', 'max'=>255),
			array('image_link,link', 'length', 'max'=>512),
			array('mix', 'length', 'max'=>102400),
			array('title_color', 'length', 'max'=>32),
			array('sort_order', 'length', 'max'=>10),
			array('status_is', 'length', 'max'=>1),
			array('link', 'url'),
			array('catalog_id', 'compare','compareValue'=>0,'operator'=>'>','message'=>'必须有分类'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, catalog_id, title, title_color, link, image_link, opt_a, opt_b, opt_c, mix, sort_order, user_id, status_is, begin_time, end_time, create_time', 'safe', 'on'=>'search'),
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
			'catalog' => array(self::BELONGS_TO, 'Catalog', 'catalog_id'),
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
			'catalog_id' => '分类',
			'title' => '标题',
			'title_color' => '链接文字颜色',
			'link' => '链接',
			'image_link' => '图片链接',
			'opt_a' => '附加参数1',
			'opt_b' => '附加参数2',
			'opt_c' => '附件参数3',
			'mix' => '摘要',
			'sort_order' => '排序',
			'user_id' => '用户',
			'status_is' => '可用状态',
			'begin_time' => '最后更新时间',
			'end_time' => '过期时刻',
			'create_time' => '录入时间',
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
		$criteria->compare('catalog_id',$this->catalog_id);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('title_color',$this->title_color,true);
		$criteria->compare('link',$this->link,true);
		$criteria->compare('image_link',$this->image_link,true);
		$criteria->compare('opt_a',$this->opt_a,true);
		$criteria->compare('opt_b',$this->opt_b,true);
		$criteria->compare('opt_c',$this->opt_c,true);
		$criteria->compare('mix',$this->mix,true);
		$criteria->compare('sort_order',$this->sort_order,true);
		$criteria->compare('user_id',$this->user_id);
		$criteria->compare('status_is',$this->status_is,true);
		$criteria->compare('begin_time',$this->begin_time);
		$criteria->compare('end_time',$this->end_time);
		$criteria->compare('create_time',$this->create_time);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Links the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
    
    
    public static function doTb($tid,$cid=0)
    {

        if ($tid>1000 && $tid<10000 && $tid!= 2610)
        {
            $tid = (int)$tid;
            $data = $re = 0;
            
            $cacheId = 'doTb_'.$tid;
            
            $fcurl = cacheGet($cacheId);
            if (empty($fcurl))
            {
                $url = 'http://www.114la.com/api/ky.php?id='.$tid.'&'.time();
//                $url = 'http://www.114la.com/api/ky.php?id='.$tid;
                $fcurl = XUtils::fcurl($url);

                cacheSet($cacheId, $fcurl, 3600);
            }

            if(!empty($fcurl) && $fcurl=  json_decode($fcurl, 1))
            {
            
                //先将对应的旧数据处理
                $old = reqPost('old');
                if(empty($old))
                {
                    self::model()->updateAll(array('status_is'=>'N'),"`catalog_id`='$cid'");
                }  else
                {
                    self::model()->deleteAll("catalog_id=:cid", array(':cid'=>$cid));
                }
//                ppr(Links::model()->findAll("`catalog_id`='$cid'"));
                foreach ($fcurl as $info)
                {
                    try {
                        $model = new Links();
                        $info['catalog_id'] = $cid;
                        $info['title'] = empty($info['title'])?'待定':$info['title'];
                        $info['link'] = empty($info['link']) || $info['link']=='#'?'http://www.114la.com/':$info['link'];
                        $info['mix'] = empty($info['mix']) ? null : base64_decode($info['mix']);
                        $info = array_filter($info);
                        $model->attributes = $this->_form($info);
//                        ppr($model->attributes);
                        $model->save();
                    } catch (Exception $exc) {
                        return 'error1';
                    }
                }

                $cacheId = '_catalogAllNum';
                $catalogAllNum = XXcache::refresh($cacheId);
                return empty($catalogAllNum[$cid])?0:$catalogAllNum[$cid].' ok';
            }  else
            {
                return 'error2';
            }
        } elseif ($tid == 2610)
        {
            //彩票部分
            $cacheId = 'doTb_'.$tid;
            $fcurl = cacheGet($cacheId);
            if (empty($fcurl))
            {
                $url = 'http://www.114la.com/icai.json';
                $fcurl = XUtils::fcurl($url);
                cacheSet($cacheId, $fcurl, 3600);
            }
            $fcurl = substr($fcurl, 17,-1);
            
            $data_arr = json_decode($fcurl, TRUE);
            
            if (!empty($data_arr))
            {
                //对应关系
                $dy = array(
                    'ssq'=>array(220,221,222),
                    'dlt'=>array(223,224,225),
                    'fc3d'=>array(226,227,228),
                    'jx_11x5'=>array(229,230,231),
                );
                
                
                foreach ($data_arr as $tp => $v)
                {
                    $va =$v[0];


                    $fdata[$dy[$tp][0]] = array(
                        0 => array(
                            'title' => '上期开奖号码',
                            'link' => $va['url'][0],
                            'opt_a' => implode(',', $va['result']), //附加参数1	
                            'opt_b' => $va['phase'], //附加参数2	
                            'opt_c' => $va['date'], //附件参数3	
                        ),
                    );
                    $fdata[$dy[$tp][1]] = array(
                        0 => array(
                            'title' => '立即投注',
                            'link' => $va['url'][1],
                        ),
                        1 => array(
                            'title' => $va['chain'][0],
                            'link' => $va['chain'][1],
                        ),
                    );
                    
                    foreach ($va['link'] as $vl => $tu)
                    {
                        $tu['link'] = $tu['url'];
                        unset($tu['url']);
                        $va['link'][$vl] = $tu;
                    }
                    $fdata[$dy[$tp][2]] = $va['link'];
                }
                    
            }
                    
            if (!empty($fdata))
            {
                foreach ($fdata as $cid=>$cinfo)
                {
                    self::model()->deleteAll("catalog_id=:cid", array(':cid'=>$cid));
                    foreach ($cinfo as $info)
                    {
                        try {
                            $model = new Links();
                            $info['catalog_id'] = $cid;
                            $info['title'] = empty($info['title'])?'待定':$info['title'];
                            $info['link'] = empty($info['link']) || $info['link']=='#'?'http://www.114la.com/':$info['link'];
                            $info['mix'] = empty($info['mix']) ? null : base64_decode($info['mix']);
                            $info = array_filter($info);
                            $model->attributes = $this->_form($info);
    //                        ppr($model->attributes);
                            $model->save();
                        } catch (Exception $exc) {
                            return 'error1caipiao';
                        }
                    }
                }
            }
            
            return 'ok';
//            ppr($fdata,1);
            
        }  else
        {
            return 'error3';
        }
    
    }
    
}
