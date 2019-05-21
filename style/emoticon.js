
function replaceText(theText){
var IconEmo=[{icon:":d",class:"img-0"},{icon:":-D",class:"img-20"},{icon:":(|",class:"img-40"},{icon:":-)",class:"img-60"},{icon:"^^",class:"img-80"},{icon:"^.^",class:"img-100"},{icon:"^-^",class:"img-120"},{icon:";)",class:"img-140"},{icon:":]",class:"img-160"},{icon:":*",class:"img-180"},{icon:":B",class:"img-200"},{icon:":~|",class:"img-220"},{icon:":~D",class:"img-240"},{icon:":&gt;",class:"img-260"},{icon:":-&gt;",class:"img-280"},{icon:":=&gt;",class:"img-300"},{icon:"=)",class:"img-320"},{icon:":)",class:"img-340"},{icon:"-.-",class:"img-360"},{icon:"-_-",class:"img-380"},{icon:"/no",class:"img-400"},{icon:"-_*",class:"img-420"},{icon:":-(",class:"img-440"},{icon:":=(",class:"img-460"},{icon:"/-o",class:"img-480"},{icon:"/tired",class:"img-500"},{icon:"/sl",class:"img-520"},{icon:":z",class:"img-540"},{icon:":-p",class:"img-560"},{icon:":~p",class:"img-580"},{icon:":=p",class:"img-600"},{icon:":_p",class:"img-620"},{icon:":^z",class:"img-640"},{icon:"~~",class:"img-660"},{icon:";-|",class:"img-680"},{icon:":x",class:"img-700"},{icon:":w",class:"img-720"},{icon:":sad",class:"img-740"},{icon:"=((",class:"img-760"},{icon:":hum",class:"img-780"},{icon:":^((",class:"img-800"},{icon:":huhu",class:"img-820"},{icon:":haiz",class:"img-840"},{icon:"/sad",class:"img-860"},{icon:"/^(",class:"img-880"},{icon:":-Q",class:"img-900"},{icon:":=Q",class:"img-920"},{icon:":Q",class:"img-940"},{icon:"o_o",class:"img-960"},{icon:"@.@",class:"img-980"},{icon:":angry",class:"img-1000"},{icon:"/angry",class:"img-1020"},{icon:"|-D",class:"img-1040"},{icon:":-O",class:"img-1060"},{icon:":T",class:"img-1080"},{icon:":-T",class:"img-1100"},{icon:":ok",class:"img-1120"},{icon:"(Y)",class:"img-1140"},{icon:"(D)",class:"img-1160"},{icon:":v",class:"img-1180"},{icon:"/clap",class:"img-1200"},{icon:"/hand",class:"img-1220"},{icon:"&lt;3",class:"img-1240"},{icon:"/VN",class:"img-1260"},{icon:"&lt;-3",class:"img-1280"},{icon:"&lt;=3",class:"img-1300"},{icon:"/cup",class:"img-1320"},{icon:"/plane",class:"img-1360"},{icon:"/100",class:"img-1340"},{icon:"/done",class:"img-1380"},{icon:"/gun",class:"img-1400"},{icon:"/sun",class:"img-1420"}];
    for (var i = 0; i < IconEmo.length; i++){
    theText = theText.replace(IconEmo[i].icon.toUpperCase(),"<span class='fb-emoji " + IconEmo[i].class + "'></span>");
    theText = theText.replace(IconEmo[i].icon.toLowerCase(),"<span class='fb-emoji " + IconEmo[i].class + "'></span>");
    }
    return theText;
}
          function formatUrl(o) {
            if (o) {
              o = o.replace(/((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi, function(url) {
                var full_url = url;
                if (!full_url.match('^https?:\/\/')) {
                  full_url = '//' + full_url;
                }
                return '<a href="' + full_url + '">' + url + '</a>';
              });
            }
            return o;
          }
