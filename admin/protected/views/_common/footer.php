<p style="text-align:center;padding:15px;color:#6B7355;font-family:Verdana;font-size:12px;">
    Powered by <a href="http://www.ylmf.com" target="_blank"> <b>雨林木风</b></a> &copy; 2005-<script type="text/javascript">document.write(new Date().getFullYear());</script> <a href="http://www.114la.com" target="_blank"> <b>114la.com</b></A><a href="http://www.ylmf.com" target="_blank"></a>
</p>
<script type="text/javascript" src="<?php echo STATIC_BACKEND_URL ?>js/popwin.js"></script>
<div style="display:none">
    <script type="text/javascript">
        
        jQuery(function(){
            
            $("a.overlay").on('click',function(){
                var u = $(this).attr('href');
                var n = $(this).text();
                popWin.showWin("800","570",n,u);
                return false;
            });
            
            $("a.re").click(function(){
                var info = $(this).attr('rel');
                if(!info)
                {
                    info = '是否确认执行?';
                }
                if(confirm(info)){
                    $(this).fadeOut(500);
                }else{
                    return false;
                }
             }); 
             
        });

        function checkAll(form, name) {
            for (var i = 0; i < form.elements.length; i++) {
                var e = form.elements[i];
                if (e.name.match(name)) {
                    e.checked = form.elements['chkall'].checked;
                }
            }
        }

    </script>
</div>
</body>
</html>
