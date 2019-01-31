<?php

/**
 * 系统分类
 * 
 */
class CatalogController extends XBackendBase
{

    /**
     * 首页
     */
    public function actionIndex()
    {
//        cacheFlush();
        parent::_acl();
        $fid = reqGet('fid',0);
        $rootCatalog = $dataList = null;
        //顶级分类
//        ppr($this->_catalogAll);
        foreach ($this->_catalogAll as $key => $value)
        {
            $value['parent_id']==0 && $rootCatalog[$value['id']] = $value['catalog_name']; 
        }

        $fid>0 && $dataList = XXcache::_doCatalog($fid, $this->_catalogAll); 
//        ppr($dataList);
        empty($dataList) && $dataList = $this->_catalogAll;
        
        //得到所包含的链接数量,这里得到所有分类链接数,缓存
        $catalogLinksNum = $this->_getCatalogLinksNum();
        
        foreach ($dataList as $key => $value)
        {
            if ($value['last'])
            {
                $dataList[$key]['num'] = empty($catalogLinksNum[$value['id']])?0:$catalogLinksNum[$value['id']];
            }
        }
        
        unset($catalogLinksNum);
        
        $this->render('index', array('dataList' => $dataList,'rootCatalog'=>$rootCatalog,'fid'=>$fid));
//        ppr($this->_catalog);        ppr($dataList);
    }

    protected function _getCatalogLinksNum($cid=null)
    {
        if (empty($cid))
        {
            return XXcache::get('_catalogAllNum');
        }  else
        {
            $cid = (int)$cid;
            return Links::model()->count("`catalog_id` = '$cid'");
        }
        
    }




    /**
     * 录入
     *
     */
    public function actionCreate()
    {
//        parent::_acl();
//        ppr($this->_catalogAll,1);
        parent::_acl();
        $model = new Catalog();
        
        //若有选择父分类的
        $parentId = reqGet('fid');
        
        if (!empty($parentId))
        {
            $model->attributes = array('parent_id' => (int)$parentId);
        }
        
        $catalogAll = reqPost('Catalog');
        if (!empty($catalogAll))
        {
            $catalogAll['create_time'] = $this->_thetime;
            //先判断是外链图片还是本地图片
            $imgtype = reqPost('imgtype',null);
            //ppr($_POST,1);
            if (!empty($imgtype))
            {
                if ($imgtype == 'local')
                {
                     $catalogAll['image_link'] = $this->_doLocalImage('image_link');   
                }

                if (empty($catalogAll['image_link']))
                {
                    $catalogAll['image_link'] = null;
                }
            }
            $model->attributes = $catalogAll;
//            ppr($catalogAll,1);
            unset($catalogAll);

            if ($model->save())
            {
                XXcache::refresh('_catalog');
                XXcache::refresh('_catalogAll');
                parent::_backendLogger(array('catalog' => 'create', 'intro' => '录入全局分类,父分类ID:' . $model->parent_id . '名称：' . $model->catalog_name));
                
                $fid = $this->_getParentCatalogId($model->parent_id);

                $this->redirect(array('index','fid'=>$fid));
            }
        }
        $this->render('create', array('model' => $model));
    }

    /**
     * 编辑
     *
     * @param  $id
     */
    public function actionUpdate($id)
    {
        parent::_acl();
        $model = parent::_dataLoad(new Catalog(), $id);
        $catalogAll = reqPost('Catalog');
        if (!empty($catalogAll))
        {
            $catalogAll['create_time'] = $this->_thetime;
            
            //先判断是外链图片还是本地图片
            $imgtype = reqPost('imgtype',null);
            //ppr($_POST,1);
            if (!empty($imgtype))
            {
                if ($imgtype == 'local')
                {
                     $catalogAll['image_link'] = $this->_doLocalImage('image_link');   
                }

                if (empty($catalogAll['image_link']))
                {
                    $catalogAll['image_link'] = null;
                }
            }
            
            $model->attributes = $catalogAll;
//        ppr($_POST);        ppr($_FILES);        ppr($catalogAll,1);
            unset($catalogAll);
            if ($model->save())
            {
                //检查父分类是否为N
                $fmodel = Catalog::model()->findByPk($model->attributes['parent_id'],"`status_is`='N'");
                
                if (empty($fmodel))
                {
                    if ($model->attributes['status_is'] == 'N')
                    {
                        //若该分类为N,则该分类所有子分类均为N
                        $this->subSetStatus($model->attributes['id']);
                    }
                }  else
                {
                    //若是,则该父分类下面所有均为N
                    $this->subSetStatus($fmodel->attributes['id']);
                }
                
                XXcache::refresh('_catalog');
                XXcache::refresh('_catalogAll');
                parent::_backendLogger(array('catalog' => 'update', 'intro' => '编辑全局分类,ID:' . $model->id . ',名称：' . $model->catalog_name));
                $fid = $this->_getParentCatalogId($model->parent_id);

                $this->redirect(array('index','fid'=>$fid));
            }
        }

        $this->render('update', array('model' => $model,'id'=>$id));
    }

    private function subSetStatus($fid,$set='N')
    {
        $data = Catalog::model()->findAll(
            array(
                'select' => 'id',
                'condition' => 'parent_id=:fid',
                'params' => array(':fid' => $fid)
            )
        );
        if (!empty($data))
        {
            foreach ($data as $value)
            {
                Catalog::model()->updateByPk($value->id,array('status_is'=>'N'));
                $this->subSetStatus($value->id);
            }
        }
        
//        ppr($data,1);
    }


    public function actionDelete()
    {
        parent::_acl();
        $catalogId = reqGet('catalogId',null);
//        ppr($_REQUEST,1);
        if (!empty($catalogId))
        {
            $catalogId = intval($catalogId);
            $model = Catalog::model()->findByPk($catalogId);
            $name = $model->catalog_name;
            $model->delete();
            XXcache::refresh('_catalog');
            XXcache::refresh('_catalogAll');
            
            $model = Links::model()->deleteAll('catalog_id=:cid',array(':cid'=>$catalogId)); 
            
            parent::_backendLogger(array('catalog' => 'delete', 'intro' => '删除分类 '.$name.'('.$catalogId.') 及该分类所有链接'));
            
            XUtils::message('success', '已删除分类 '.$name.' 及该分类所有链接');
        }

        $this->redirect(Yii::app()->request->urlReferrer);
    }
    
    
    /**
     * 检测上级分类是否合法
     *
     * @param  $item
     * @param  $parentId
     */
    protected function parentTrue($item = 0, $parentId = 0)
    {
        $subCategory = Catalog::get($item, $this->_catalog);
        if (empty($subCategory))
        {
            $getCategory[] = $item;
        } else
        {
            foreach ((array) $subCategory as $row)
            {
                $getCategory[] = $row['id'];
            }
            //将本身ID加入检测对象
            array_push($getCategory, $item);
        }
        if (in_array($parentId, $getCategory))
        {
            XUtils::message('error', '所选择的上级分类不能是当前分类或者当前分类的下级分类');
        }
    }


}
