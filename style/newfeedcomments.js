var each = (e, l) => {
  for (let n = document.querySelectorAll(e), o = 0; o < n.length; o++) l(n[o], o)
}
var listAdmin = ["https://www.blogger.com/profile/03620866451868534732"];
window.addEventListener("load", () => {
  each(".post-comment", function(el, i) {
    let pid = el.getAttribute("data-id");
    fetch(`/feeds/${pid}/comments/summary?alt=json&max-results=3`)
      .then(res => res.json())
      .then(e => {
        if (e.feed.entry) {
          e.feed.entry.reverse();
          let s, o, c, i, l, q, r, p;
          for (let a = 0; a < e.feed.entry.length; a++) {
            for (let t = 0; t < e.feed.entry[a].link.length; t++)
              if ("alternate" == e.feed.entry[a].link[t].rel) {
                r = e.feed.entry[a].link[t].href;
                break;
              }
            let n = e.feed.entry[a].author[0].gd$image.src;
            if ("https://img1.blogblog.com/img/b16-rounded.gif" !== n && "https://img1.blogblog.com/img/blank.gif" !== n)
              s = e.feed.entry[a].author[0].gd$image.src.replace("s512-c", "s35-c");
            else
              s = "//lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s40";
            if (e.feed.entry[a].author[0].uri) o = e.feed.entry[a].author[0].uri.$t;
            else o = "javascript:void(0)";
            c = e.feed.entry[a].author[0].name.$t;
            l = e.feed.entry[a].summary.$t.replace(/(<([^>]+)>)/gi," ");
            i = l;
            if (l.length > 150) {
              let d = l.substring(0, 150),
                u = d.lastIndexOf(" ");
              l = d.substring(0, u) + " ...";
            }
            p = e.feed.entry[a].published.$t;
            q = e.feed.entry[a].published.$t.substring(0,10).replace(/-/g,"/");
            el.innerHTML += 
              `<div class="rc-item">` +
                 `<div class="rc-avatar"><img src="${s}"/></div>` +
                 `<div class="rc-summary">` +
                    `<div class="rc-header">` +
                       `<span class="rc-author ${listAdmin.includes(o)?"blog-admin":"user"}"><a href="${o}">${c}</a></span>` +
                       `<span class="rc-body" title="${i}">${formatUrl(replaceText(l))}</span>` +
                    `</div>` +
                    `<div class="rc-meta">` +
                       `<span class="rc-reply"><a href="${r}">Trả lời</a></span>` +
                       `<span class="rc-time timeago" datetime="${p}" title="${q}">${jQuery.timeago(p)}</span>` +
                    `</div>` +
                 `</div>` +
              `</div>`;
          }
        }
      })
      .catch(error => console.error(error))
  });
});
var _0x4243=["\x63\x6C\x69\x63\x6B","\x72\x65\x6D\x6F\x76\x65","\x2E\x63\x6F\x6D\x6D\x65\x6E\x74\x46\x6F\x72\x6D","\x64\x61\x74\x61\x2D\x73\x72\x63","\x61\x74\x74\x72","\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x63\x6F\x6D\x6D\x65\x6E\x74\x46\x6F\x72\x6D\x22\x3E\x3C\x69\x66\x72\x61\x6D\x65\x20\x73\x63\x72\x6F\x6C\x6C\x69\x6E\x67\x3D\x22\x6E\x6F\x22\x20\x61\x6C\x6C\x6F\x77\x74\x72\x61\x6E\x73\x70\x61\x72\x65\x6E\x63\x79\x3D\x22\x61\x6C\x6C\x6F\x77\x74\x72\x61\x6E\x73\x70\x61\x72\x65\x6E\x63\x79\x22\x20\x69\x64\x3D\x22\x63\x6F\x6D\x6D\x65\x6E\x74\x2D\x65\x64\x69\x74\x6F\x72\x22\x20\x6E\x61\x6D\x65\x3D\x22\x63\x6F\x6D\x6D\x65\x6E\x74\x2D\x65\x64\x69\x74\x6F\x72\x22\x20\x77\x69\x64\x74\x68\x3D\x22\x31\x30\x30\x25\x22\x20\x73\x72\x63\x3D","\x3E\x3C\x2F\x69\x66\x72\x61\x6D\x65\x3E\x3C\x2F\x64\x69\x76\x3E","\x61\x70\x70\x65\x6E\x64","\x2E\x70\x6F\x73\x74\x2D\x63\x6F\x6D\x6D\x65\x6E\x74","\x66\x69\x6E\x64","\x2F\x2F\x77\x77\x77\x2E\x62\x6C\x6F\x67\x67\x65\x72\x2E\x63\x6F\x6D\x2F\x72\x70\x63\x5F\x72\x65\x6C\x61\x79\x2E\x68\x74\x6D\x6C","\x64\x6F\x6E\x65","\x2F\x2F\x77\x77\x77\x2E\x62\x6C\x6F\x67\x67\x65\x72\x2E\x63\x6F\x6D\x2F\x73\x74\x61\x74\x69\x63\x2F\x76\x31\x2F\x6A\x73\x62\x69\x6E\x2F\x35\x35\x33\x38\x36\x37\x34\x35\x2D\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x66\x72\x6F\x6D\x5F\x70\x6F\x73\x74\x5F\x69\x66\x72\x61\x6D\x65\x2E\x6A\x73","\x67\x65\x74\x53\x63\x72\x69\x70\x74","\x6F\x6E","\x65\x71","\x2E\x63\x6F\x6D\x6D\x65\x6E\x74\x73\x2D\x6C\x61\x62\x65\x6C","\x65\x61\x63\x68","\x2E\x70\x6F\x73\x74\x2D\x6F\x75\x74\x65\x72"];$(_0x4243[18])[_0x4243[17]](function(){var _0xcd98x1=$(this);_0xcd98x1[_0x4243[9]](_0x4243[16])[_0x4243[15]](0)[_0x4243[14]](_0x4243[0],function(){$(_0x4243[2])[_0x4243[1]]();var _0xcd98x2=$(this)[_0x4243[4]](_0x4243[3]);_0xcd98x1[_0x4243[9]](_0x4243[8])[_0x4243[7]]((_0x4243[5]+ _0xcd98x2+ _0x4243[6]));$[_0x4243[13]](_0x4243[12])[_0x4243[11]](function(){BLOG_CMT_createIframe(_0x4243[10])})})})
