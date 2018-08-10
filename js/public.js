/**
 * @author      ZEUS Design - http://www.zeusdesign.com.tw
 * @copyright   Copyright (c) 2018 ZEUS Design
 */

function tt () { return new Date ().getTime (); }
 
$(function () {
  // 回到上面按鈕
  $('#top_btn').click (function () {
      $('html, body').animate ({ scrollTop: 0 }, 'slow');
  });

  // 右邊menu
  $('.m_list, #navbox .x,#cover').click(function() {
    $('#navbox').toggleClass('sn');
    $('#cover').toggleClass('show');
  });

  $('.title_pic').imgLiquid ({
    fill: false
  });

  $('._ic').imgLiquid ({
  });

  function scrollEnable() {
    var html = jQuery('html');
    var scrollPosition = html.data('scroll-position');
    html.css('overflow', html.data('previous-overflow'));
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
  }
  function scrollDisable() {
    var scrollPosition = [
      self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
      self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
    ];

    var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
    html.data('scroll-position', scrollPosition);
    html.data('previous-overflow', html.css('overflow'));
    html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
  }

  var read_box = {
    $e: $('#read_box'),
    $close: $('#read_box .close'),
    $pic: $('#read_box .pic'),
    $left: $('#read_box .left'),
    $right: $('#read_box .right'),
    $doubleLeft: $('#read_box .double-left'),
    $doubleRight: $('#read_box .double-right'),
    $bottomSpan: $('#read_box .bottom span'),
    now: -1,
    pics: [],
    inited: false,
    addTime: false,
    init: function () {
      if (this.inited)
        return this.inited;

      this.$close.click(function () { this.close(); }.bind(this));
      this.$left.click(function () { this.prep(); }.bind(this));
      this.$right.click(function () { this.next(); }.bind(this));
      this.$doubleLeft.click(function () { this.now = 0; this.pic(); }.bind(this));
      this.$doubleRight.click(function () { this.now = this.pics.length - 1; this.pic(); }.bind(this));

      this.inited = true;

      return this.inited;
    },
    close: function (pics) {
      scrollEnable();
      this.$e.removeClass ('s');
      this.$pic.empty().addClass ('h');
      this.$bottomSpan.attr('data-a', '0').attr('data-b', '0');
      this.pics = [];
      this.now = -1;
    },
    show: function (pics) {
      this.init();

      this.now = -1;
      this.pics = pics;
      this.$bottomSpan.attr('data-a', '0').attr('data-b', '0');
      this.$pic.empty().addClass ('h');
      this.$e.addClass ('s');

      this.next ();
      scrollDisable();
    },
    pic: function () {
      this.$bottomSpan.attr('data-a', this.now + 1).attr('data-b', this.pics.length);
      var $img = $('<img />').attr('src', this.pics[this.now] + (this.addTime ? '?t=' + tt () : ''));
      this.$pic.empty().addClass('h').append($img);

      $img.load (function () {
        var w = $img.get (0).width, h = $img.get (0).height;
        var mw = $(window).width() - 64 * 2 - 8 * 2, mh = $(window).height() - 55 - 8 * 2;

        if (w > mw) { h = mw / w * h; w = mw; }
        if (h > mh) { w = mh / h * w; h = mh; }

        this.$pic.css({
          // 'top': 'calc((100% - 55px - 4px * 2 - ' + h + 'px) / 2)',
          'left': 'calc((100% - ' + w + 'px) / 2)',
          'width': w + 'px',
          'height': h + 'px',
          'line-height': h + 'px',
        }).removeClass('h');

      }.bind(this));
    },
    prep: function () {
      this.now = --this.now < 0 ? this.pics.length - 1 : this.now;
      this.pic();
    },
    next: function () {
      this.now = ++this.now < this.pics.length ? this.now : 0;
      this.pic();
    }
  };

  var read_box2 = {
    $e: $('#read_box2'),
    $close: $('#read_box2 .close'),
    $content: $('#read_box2 .content'),
    $left: $('#read_box2 .left'),
    $right: $('#read_box2 .right'),
    $doubleLeft: $('#read_box2 .double-left'),
    $doubleRight: $('#read_box2 .double-right'),
    $bottomSpan: $('#read_box2 .bottom span'),
    now: -1,
    pics: [],
    inited: false,
    addTime: false,
    init: function () {
      if (this.inited)
        return this.inited;

      this.$close.click(function () { this.close(); }.bind(this));
      this.$left.click(function () { this.prep(); }.bind(this));
      this.$right.click(function () { this.next(); }.bind(this));
      this.$doubleLeft.click(function () { this.now = 0; this.pic(); }.bind(this));
      this.$doubleRight.click(function () { this.now = this.pics.length - 1; this.pic(); }.bind(this));

      this.inited = true;

      return this.inited;
    },
    close: function (pics) {
      scrollEnable();

      this.$e.removeClass ('s').removeClass ('v');
      this.$content.empty().addClass ('h');
      this.$bottomSpan.attr('data-a', '0').attr('data-b', '0');
      this.pics = [];
      this.now = -1;
    },
    show: function (pics, index) {
      this.init();

      this.now = index - 1;
      this.pics = pics;
      this.$bottomSpan.attr('data-a', '0').attr('data-b', '0');
      this.$content.empty().addClass ('h');
      this.$e.addClass ('s');

      this.next ();
      scrollDisable();
    },
    pic: function () {
      this.$bottomSpan.attr('data-a', this.now + 1).attr('data-b', this.pics.length);

      if (this.pics[this.now].video) {
        var $iframe = $('<iframe />').attr ('src', this.pics[this.now].video).attr ('frameborder', 0).attr ('allow', 'autoplay; encrypted-media');
        var $div = $('<div />').addClass('pic').append($iframe);
        this.$content.empty().addClass('h').append(this.pics[this.now].text).append($div);
        this.$content.removeClass('h').addClass('v');
      } else {
        var $img = $('<img />').attr('src', this.pics[this.now].src + (this.addTime ? '?t=' + tt () : ''));
        var $div = $('<div />').addClass('pic').append($img);
        this.$content.empty().addClass('h').append(this.pics[this.now].text).append($div);

        $img.load (function () {
          var w = $img.get (0).width, h = $img.get (0).height;
          var mw = $(window).width() - 64 * 2 - 8 * 2, mh = $(window).height() - 55 - 8 * 2;

          if (w > mw) { h = mw / w * h; w = mw; }
          if (h > mh) { w = mh / h * w; h = mh; }

          this.$content.css({
            'width': w + 'px',
            'left': 'calc((100% - ' + w + 'px) / 2)',
          }).removeClass('h').append($div.css({
            'height': h + 'px',
            'line-height': h + 'px',
          }));
        }.bind(this));
      }

    },
    prep: function () {
      this.now = --this.now < 0 ? this.pics.length - 1 : this.now;
      this.pic();
    },
    next: function () {
      this.now = ++this.now < this.pics.length ? this.now : 0;
      this.pic();
    }
  };

  var video_box = {
    $e: $('#video_box'),
    $title: $('#video_box .top span'),
    $video: $('#video_box .video'),
    $close: $('#video_box .close'),
    inited: false,

    init: function () {
      if (this.inited)
        return this.inited;
      this.$close.click(function () { this.close(); }.bind(this));
      this.inited = true;
      return this.inited;
    },
    show: function (title, src) {
      this.init();
      var $iframe = $('<iframe />').attr ('src', src).attr ('frameborder', 0).attr ('allow', 'autoplay; encrypted-media');
      this.$title.text(title);
      this.$video.append($iframe);
      this.$e.addClass('s');
      scrollDisable();
    },
    close: function () {
      scrollEnable();
      this.$e.removeClass('s');
      this.$video.empty();
      this.$title.empty();
    }
  };

  $('*[data-video_box_title][data-video_box_src]').click (function () {
    video_box.show($(this).data('video_box_title'), $(this).data('video_box_src'));
  });

  $('.banners, .banners3').each (function () {
    var $that = $(this);
    var $span = $that.find('.arrs span');
    var total = $that.find('.items > *').length;
    var type = $that.data('type');
    $that.find('.pic').imgLiquid();

    var $a = $(Array.apply(null, { length: Math.ceil(total / type) }).map (function () { return $('<a />'); })).map ($.fn.toArray).click(function () {
      $(this).addClass('a').siblings().removeClass('a');
      $that.attr('data-i', ($(this).index() * type + 1));
      $span.attr('data-text', $(this).index() * type + 1 + ' / ' + total);
    });

    
    $span.attr('data-text', '1 / ' + total);

    $that.find('.pages').empty ().append($('<span />').append($a));
    $that.find('.left').click (function () {
      if ($a.filter('.a').prev().length) $a.filter('.a').prev().click();
      else $a.last().click();
    });
    $that.find('.right').click (function () {
      if ($a.filter('.a').next().length) $a.filter('.a').next().click();
      else $a.first().click();
    });
    $that.find('.double-left').click (function () {
      $a.first().click();
    });
    $that.find('.double-right').click (function () {
      $a.last().click();
    });
    $a.first().addClass('a');
  });

  $('body').on ('click', '.read_box', function() {
    read_box.show ($(this).data('pics'));
  });
  $('body').on ('click', '.read_box2', function() {
    var datas = $(this).parent().find('.read_box2').map(function () { return {src: $(this).find('.pic img').attr('src'), video: $(this).find('.pic img').data('video_box_src'), text: $(this).find('.cover span').clone()}; }).toArray();
    read_box2.show(datas, $(this).index());
  });

  $('.open_mon').each (function () {
    var tmp = {};
    var $open_year = $(this).find('.open_year');
    var $open_year_span = $open_year.find('span');
    var year = parseInt($open_year_span.text(), 10);
    var no = $open_year.data('no');

    if (typeof tmp[year] === 'undefined')
      tmp[year] = $open_year.data('i') ? $open_year.data('i') : 0;

    

    var $open_m_boxs = $(this).find('.open_m_boxs');
    var $open_m_boxs_div = $open_m_boxs.find('>div').click(function () {
      $open_year.attr('data-i', $open_m_boxs_div.length - $(this).index());
      tmp = {};
      tmp[year] = $open_m_boxs_div.length - $(this).index();
    });

    if (no && typeof no[year] !== 'undefined') {
      no[year].forEach(function (t) {
        $open_m_boxs_div.eq($open_m_boxs_div.length - t).addClass ('open_no');
      });
    }

    $open_year.find('.right').click(function () {
      year += 1;
      if (typeof tmp[year] === 'undefined')
        tmp[year] = 0;

      $open_year_span.text(year);
      $open_year.attr('data-i', tmp[year]);


      $open_m_boxs_div.removeClass('open_no');
      if (no && typeof no[year] !== 'undefined') {
        no[year].forEach(function (t) {
          $open_m_boxs_div.eq($open_m_boxs_div.length - t).addClass ('open_no');
        });
      }
    });

    $open_year.find('.left').click(function () {
      year -= 1;
      if (typeof tmp[year] === 'undefined')
        tmp[year] = 0;

      $open_year_span.text(year);
      $open_year.attr('data-i', tmp[year]);

      $open_m_boxs_div.removeClass('open_no');
      if (no && typeof no[year] !== 'undefined') {
        no[year].forEach(function (t) {
          $open_m_boxs_div.eq($open_m_boxs_div.length - t).addClass ('open_no');
        });
      }
    });
  });

  $('.p_close').click (function () {
    $(this).parents('.pink_down_boxs').prev().removeClass('show');
  });
  $('.showblockbtn').click (function () {
    $(this).parents('.p3_boxs').toggleClass ('show');
  });

  $('.alert_ok').click (function () {
    $('#alert_ok').addClass ('s');
    scrollDisable();
  });

  $('#alert_ok .close').click(function () {
    $('#alert_ok').removeClass ('s');
    scrollEnable();
  });


  $('.alert_ok_b').click (function () {
    $('#alert_ok_b').addClass ('s_b');
    scrollDisable();
  });

  $('#alert_ok_b .close_b').click(function () {
    $('#alert_ok_b').removeClass ('s_b');
    scrollEnable();
  });
});