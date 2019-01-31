<?php

/**
 * 缓存工具
 */
class XXcache
{

    /**
     * 取缓存
     *
     * @param $id
     */
    public static function get($id)
    {
        $value = Yii::app()->cache->get($id);
        if ($value === false)
        {
            $value = self::refresh($id);
            return $value;
        } else
        {
//            ebr('cache');
            return $value;
        }
    }

    /**
     * 设置缓存
     */
    public static function set($id = '', $data = '', $expirse = 3600)
    {
        Yii::app()->cache->set($id, $data, $expirse);
    }

    /**
     * 基础
     *
     * @param $id
     * @param $fields
     * @param $expirse
     * @return |Ambigous <mixed, boolean>
     */
    public static function system($id, $expirse = 600, $fields = '', $params = array())
    {
        $value = Yii::app()->cache->get($id);
        //若过期或者无,则重新获取并存储
        if ($value === false)
        {
            return self::_refresh($id, $expirse, $fields, $params);
        } else
        {
            return $value;
        }
    }

    /**
     * 刷新缓存
     *
     * @param $id
     * @param $fields
     * @param $expirse
     * @return unknown
     */
    public static function refresh($id, $expirse = 600, $fields = '', $params = array())
    {
        return self::_refresh($id, $expirse, $fields, $params);
    }

    /**
     * 刷新缓存
     *
     * @param $id
     */
    public static function _refresh($id, $expirse, $fields, $params)
    {
        try {
            $data = null;
            switch ($id)
            {
                case '_link':
                    $data = (array) self::_base('Link', $fields, array('condition' => "status_is='Y'", 'order' => 'sort_order DESC,id DESC'));
                    self::set($id, $data, $expirse);
                    break;
                case '_adminGroup':
                    $data = (array) self::_base('AdminGroup', $fields,array('order' => 'id DESC'));
                    self::set($id, $data, $expirse);
                    break;
                case '_ad':
                    $data = (array) self::_base('Ad', $fields, array('condition' => "status_is='Y'", 'order' => 'sort_order DESC,id DESC'));
                    self::set($id, $data, $expirse);
                    break;
                case '_config':
                    $data = (array) self::_config($params);
                    self::set($id, $data, $expirse);
                    break;
                case '_catalog':
                    $data = (array) self::_base('Catalog', $fields, array('condition' => "status_is='Y'"));
                    $data = self::_doCatalog(0, $data);
                    $data = self::_keyCatalog($data);
                    self::set($id, $data, $expirse);
                    break;
                case '_catalogAll':
                    $data = (array) self::_base('Catalog', $fields);
                    $data = self::_doCatalog(0, $data);
                    $data = self::_keyCatalog($data);
                    self::set($id, $data, $expirse);
                    break;
                case '_catalogAllNum':
                    $data = self::_getCatalogAllNum();
                    self::set($id, $data, $expirse);
                    break;
                default:
                    throw new Exception('数据不在XXcache接受范围');
                    break;
            }

            return $data;
        } catch (Exception $error) {
            exit($error->getMessage());
        }
    }

    /**
     * 基础数据
     *
     * @param unknown_type $id
     * @param unknown_type $fields
     * @return unknown
     */
    protected static function _base($id = '', $fields = '', $condition = '')
    {
        $returnData = null;
        $mod = ucfirst($id);
        $model = new $mod();
        $dataGet = $model->findAll($condition);
        foreach ((array) $dataGet as $key => $row)
        {
            foreach ((array) self::_attributes($fields, $model) as $attr)
            {
                $returnData[$key][$attr] = $row->$attr;
            }
        }
        return $returnData;
    }

    /**
     * 属性附值
     *
     * @param $data
     * @param $model
     */
    protected static function _attr2val($data, $model, $fields = '')
    {
        $returnData = null;
        foreach ((array) $data as $key => $row)
        {
            foreach ((array) self::_attributes($fields, $model) as $attr)
            {
                $returnData[$key][$attr] = $row->$attr;
            }
        }
        return $returnData;
    }

    /**
     * 系统配置
     *
     * @param $id
     * @param $data
     * @param $expirse
     */
    protected static function _config($params = '')
    {
        $configModel = Config::model()->findAll();
        foreach ((array) $configModel as $row)
        {
            if(!empty($row['variable']))
            {
                $returnData[$row['variable']] = $row['value'];
            }
        }
        return $returnData;
    }

    /**
     * 取字段
     * @param $model
     */
    protected static function _attributes($fields, $model = '')
    {
        if (empty($fields) || trim($fields) == '*')
        {
            return $model->attributeNames();
        } else
        {
            $fields = str_replace('，', ',', $fields);
            return explode(',', $fields);
        }
    }

    /**
     * 根据cacheId取数据
     *
     */
    public static function loadData($cacheId, $time = 3600)
    {
        $config = self::get($cacheId);
        if (empty($config))
        {
            //无则刷新
            self::refresh($cacheId, $time);
            $config = self::get($cacheId);
            //刷新后无则报错
            if (empty($config))
            {
                XUtils::message('error', 'no cacheId : ' . $cacheId);
            }
        }
        return $config;
    }

    /**
     * 处理分类,判断层级
     */
    static function _doCatalog($parentid = 0, $array = array(), $level = 0, $add = 1, $repeat = '&nbsp;&nbsp;&nbsp;&nbsp;')
    {
        $str_repeat = '';
        if ($level)
        {
            for ($j = 0; $j <= $level; $j++)
            {
                $str_repeat .= str_repeat($repeat, $j);
            }
        }
        $newarray = array();
        $temparray = array();
        foreach ((array) $array as $v)
        {
            if ($v ['parent_id'] == $parentid)
            {
                $v['level'] = $level;
                $v['str_repeat'] = $str_repeat;
                //遍历$array
                $temparray = self::_doCatalog($v['id'], $array, ($level + $add));

                if ($temparray)
                {
                    //不是最后一个
                    $v['last'] = 0;
                } else
                {
                    //是最后一个
                    $v['last'] = 1;
                }

                $newarray [] = $v;

                if ($v['last'] == 0)
                {
                    $newarray = array_merge($newarray, $temparray);
                }
            }
        }

        return $newarray;
    }

    protected static function _keyCatalog($arr)
    {
        $re = null;
        foreach ($arr as $key => $value)
        {
            !empty($value['id']) && $re[$value['id']] = $value;
        }
        return $re;
    }
    
    protected static function _getCatalogAllNum()
    {
        $re = null;
        $data = Links::model()->findAllBySql("
            SELECT t.catalog_id,COUNT(*) mix 
            FROM {{links}} t
            WHERE t.status_is = 'Y' 
            AND (t.begin_time=0 OR begin_time<:thetime)
            AND (t.end_time=0 OR end_time>:thetime)
            GROUP BY t.catalog_id",
        array(':thetime'=> time())
        );

        if (!empty($data))
        {
            foreach ($data as $value)
            {
                $re[$value->catalog_id] = $value->mix;
            }
        }
        unset($data);
        return $re;
    }
    
}
