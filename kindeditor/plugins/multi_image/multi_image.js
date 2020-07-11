KindEditor.plugin('multi_image', function (K) {
  var self = this, name = 'multi_image';
  self.clickToolbar(name, function () {
    var html = ['<div id="multi-image-box">',
        '<div id="multi-image-div" >',
        '</div>',
        '</div>'].join(''),

      dialog = self.createDialog({
        name: name,
        width: 488,
        title: self.lang(name),
        body: html,
        yesBtn: {
          name: self.lang('yes'),
          click: function (e) {
            var img = '';
            var ok = true;
            $(".fileBoxUl").find("img").each(function (index, item) {
              var url = $(item).attr("src");
              if (url.indexOf("http") == -1) {
                alert("请点击'开始上传'或等待图片上传完成！");
                ok = false;
                return false;
              } else {
                // 拼接img todo
                img += '<img src="' + url + '"/>';
              }
            });
            if (ok) {
              self.insertHtml(img).hideDialog().focus();
            }
          }
        }
      });

      var getTokenUrl = self.ctx + self.uploadApi;
      $.get(getTokenUrl,{isPrivate:false,keepSrcFileName:false},function(res){
        $('#multi-image-div').diyUpload({
          url: res.action,
          getTokenUrl: getTokenUrl,
          success: function (data) {
            console.log("success");
          },
          error: function (err) {
            console.log(err);
          },
          //最大上传的文件数量, 总文件大小,单个文件大小(单位字节);
          fileNumLimit: 20,
          fileSizeLimit: 500000 * 1024,
          fileSingleSizeLimit: 50000 * 1024,
        });
      })

  });
});