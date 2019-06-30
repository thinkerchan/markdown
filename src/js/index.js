require('../css/index.less');

var $ = require("./jquery-3.1.1.js");
var showdown = require("./showdown.js");
var Clipboard = require("./clipboard.min.js");
var CodeTheme = require("./theme/code-theme");
var PageTheme = require("./theme/page-theme");

require("./showdown-plugins/showdown-prettify-for-wechat.js");
require("./showdown-plugins/showdown-github-task-list.js");
require("./showdown-plugins/showdown-footnote.js");

// require("./google-code-prettify/run_prettify.js");

let triImg = '<img width="8" height="8" class="tri" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAABEtUlCtUhFtUVEtUnj12+UAAAABHRSTlMAwGAwYRir0QAAADBJREFUCNdjYGAwYIACIRhDRAHGcIIxXBRgDCcYAygEZThhMBTQFSugG6iAYincGQD1rwbxPiJe5wAAAABJRU5ErkJggg==">';

let triSvg = `<svg style="width: 10px;height: 10px;vertical-align: middle;margin-top: -5px;margin-left: -3px;" t="1561830622620" class="tri" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3007" width="10" height="10" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M322.392 90.125l421.803 421.898-421.803 421.852v-843.75z" p-id="3008" fill="#44B549"></path></svg>`;

var kv = location.href.split('?')[1];
kv = kv && kv.split('&') || [];
var params = {};
$.each(kv, function(index, item) {
  var m = (item || '').split('=');
  if (m && m[0] && m[1]) {
    params[m[0]]= m[1];
  }
});

// 方便跨域加载资源
// if (/\.barretlee\.com$/.test(location.hostname)) {
//   document.domain = 'barretlee.com';
// }


var converter =  new showdown.Converter({
  extensions: ['prettify', 'tasklist', 'footnote'],
  tables: true
});
/**
 * [OnlineMarkdown description]
 * @type {Object}
 */
var OnlineMarkdown = {
  currentState: 'edit',
  init: function() {
    var self = this;
    self.load().then(function() {
      self.start(function(){
        if (window.location.href.indexOf('dev')>-1) {
          $('.convert-button').click();
        }
      })
    }).fail(function(){
      self.start();
    });
  },
  start: function(cb) {
    this.bindEvt(cb);
    this.updateOutput();
    new CodeTheme();
    new PageTheme();
    new Clipboard('.btn');
  },
  load: function() {
    return $.ajax({
      type: 'GET',
      url: params.path || './demo.md',
      dateType: 'text',
      data: {
        _t: new Date() * 1
      },
      timeout: 2000
    }).then(function(data) {
      $('#input').val(data);
    });
  },
  bindEvt: function(cb) {
    var self = this;
    $('#input').on('input keydown paste', self.updateOutput);
    var $copy = $('.copy-button');
    var $convert = $('.convert-button');

    $convert.on('click', function() {
      var $this = $(this);
      if (self.currentState === 'preview') {
        self.currentState = 'edit';
        $this.text('预览');
        $copy.hide();
        $('#input').fadeIn();
        $('#output').hide();
      } else {
        self.currentState = 'preview';
        $this.text('编辑');
        $copy.show();
        $('#input').fadeOut();
        $('#output').show();
      }
    });
    if (params.preview) {
      $convert.trigger('click');
    }
    cb && cb()
  },

  updateOutput: function () {
    var val = converter.makeHtml($('#input').val());
    $('#output .wrapper').html(val);
    // PR.prettyPrint();
    $('#outputCtt li').each(function() {
      $(this).html('<span><span>' + $(this).html() + '</span></span>');
    });

    var t = setTimeout(function(){
      clearTimeout(t);
      t = null;
      var $h2s = $('#output h2')
      $h2s.map(function(index,item){
        var $item = $(item);
        if (index===0) {
          $item.prepend($('<i style="font-size:0px;">|</i>'+triSvg));
        }
        if ($item.find('svg').length>0) {
          return;
        }else{
          $item.prepend($(triSvg));
        }
      })

      var $uls = $('#output ._list_');
      $uls.map(function(index,item){
        $(item).wrap('<p></p>')
      })
    },100)
  }
};

OnlineMarkdown.init();
