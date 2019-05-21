   $('a.drops').on('click', function() {
	 scroll = 0
		if(!$('.tb-menu').hasClass('sb-hover')){
        $('.recent-comments ul').empty()
        $('#numcomments').attr('value', '0')
        $('#allcomments').attr('value', '')
        $('.loading').removeClass('spinner').removeClass('load')
        $('.recent-comments').addClass('spinner')
        var numcomments = 20;
        $.ajax({
          type: 'GET',
          url: '/feeds/comments/summary',
          data: {
            'max-results': numcomments,
            'alt': 'json'
          },
          dataType: 'jsonp',
          jsonp: 'callback',
          jsonpCallback: 'getComments',
          success: function(e) {
            $('.recent-comments').removeClass('spinner')
            var totalcomments = e.feed.openSearch$totalResults.$t
            $('#allcomments').attr('value', totalcomments)
            scroll = 1
            $('.recent-comments').scroll(function() {
              var a = $('.recent-comments').scrollTop(),
                b = parseInt($('.comments').height() - $('.recent-comments').height())
                if (a >= b) {
                if (scroll == 1) {
                  scroll = 0
                  $('.loading').addClass('spinner').addClass('load')
                  var items = Number($('#numcomments').val())
                  items = items + numcomments
                  if (items <= totalcomments) {
                    setTimeout(function() {
                      $('#numcomments').val(items)
                      $.ajax({
                        type: 'GET',
                        url: '/feeds/comments/summary',
                        data: {
                          'max-results': numcomments,
                          'start-index': items + 1,
                          'alt': 'json'
                        },
                        dataType: 'jsonp',
                        jsonp: 'callback',
                        jsonpCallback: 'getComments',
                        success: function() {
                          scroll = 1
                          var lastcomments = items + numcomments;
                          if (lastcomments > totalcomments) {
                            $('.loading').removeClass('spinner').removeClass('load')
                          }
                        }
                      })
                    }, 500)
                  } else {
                    $('.loading').removeClass('spinner').removeClass('load')
                  }
                }
              }
            })
          }
        })
      } else {
        $('.recent-comments ul').empty()
        $('#numcomments').attr('value', '0')
        $('#allcomments').attr('value', '')
        $('.loading').removeClass('spinner').removeClass('load')
      }
    })
    function getComments(e) {
	var avatarSize = 40;
      if (e.feed.entry) {
        for (var t = 0; t < e.feed.entry.length; t++) {
          for (var r = 0; r < e.feed.entry[t].link.length; r++)
            if ("alternate" == e.feed.entry[t].link[r].rel) {
              var a = e.feed.entry[t].link[r].href;
              break
            }
          var n = e.feed.entry[t].published.$t,
            l = e.feed.entry[t].author[0].gd$image.src.replace(/\/s[0-9]+-?[A-Za-z]?\//i, "/s" + avatarSize * 2 + "-c/").replace("//img1.blogblog.com/img/b16-rounded.gif", "//lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s40"),
            //s = n.substring(8, 10) + " thag " + n.substring(5, 7) + ", " + n.substring(0, 4),
            i = e.feed.entry[t].author[0].uri.$t,
            c = (e.feed.entry[t].title.$t, e.feed.entry[t].author[0].name.$t),
			regex = /<br\s*[\/]?>/gi,
            o = e.feed.entry[t].summary.$t.substring(0, 150).replace(regex,' ');
          	if(c.length > 18){
			var name = c.substring(0,18)+"...";
            }else{
			var name = c;
            }
	    var listAdmin = ["https://www.blogger.com/profile/03620866451868534732"];
            var sbclass;
            if(listAdmin.includes(i)){sbclass = 'blog-admin';}else{sbclass = 'user';}
          $(".recent-comments ul").append('<li><div class="rc_avatar"><a rel="nofollow" href=' + a + '><img src=' + l + ' alt="' + c + '" /></a></div><div class="rc_block"><div class="rc_header"><span class="rc_user ' + sbclass + '"><a rel="nofollow" href=' + i + ' title="' + c + '" target="_blank">' + name + '</a></span><span class="rc_date"><a rel="nofollow" href=' + a + '>' + jQuery.timeago(n) + '</a></span></div><p class="rc_content">' + formatUrl(replaceText(o)) + "</p></div></li>")
        }
      }
    }
