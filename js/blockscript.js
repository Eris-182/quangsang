function reset() {
    document.getElementById('reactionTotal').innerHTML = 0;
    document.getElementById('uidResult').innerHTML = '';
    document.getElementById('blockScripts').innerHTML = '';
}

function getToken() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var url =
        'https://b-graph.facebook.com/auth/login?access_token=350685531728|62f8ce9f74b12f84c123cc23437a4a32&method=POST&email=' +
        email + '&password=' + password
    var newwindow = window.open(url, 'Access Token', 'height=200,width=350');
    if (window.focus) {
        newwindow.focus()
    }
    return false;
}

function clearInput() {
    document.getElementById('killToken').value = '';
}

function killToken() {
    var killToken = document.getElementById('killToken').value;
    var xhttp = new XMLHttpRequest();
    var url = 'https://api.facebook.com/restserver.php?method=auth.expireSession&access_token=' + killToken;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert('Success');
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function get() {
    reset();
    var accessToken = document.getElementById('accessToken').value;
    var userID = document.getElementById('userID').value;
    var postID = document.getElementById('postID').value;
    if (accessToken.includes('EAAA')) {
        var j2h = new XMLHttpRequest();
        var url = 'https://graph.facebook.com/v2.6/' + userID + '_' + postID + '/reactions?fields=type&limit=10000&access_token=' +
            accessToken;
        j2h.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var obj = JSON.parse(this.responseText);
                uidRender(obj);
            }
        };
        j2h.open("GET", url, true);
        j2h.send();
    } else {
        alert('Token Error!!!')
    }
}

function filter() {
    let source = document.getElementById('originalHtml').value;
    var regex = /([0-9]){5,}\d+/gmi;
    var array = source.match(regex);
    var result = array.join(' ');
    document.getElementById('resultHtml').innerHTML = result;
    document.getElementById('totalUID').innerHTML = ' - Total: ' + array.length;
    document.getElementById('unblockScript').innerHTML =
        "javascript: ! function () {" +
        "let uidArr = '" + result + "';" +
        "let items = uidArr.split(' ');" +
        "let fb_dtsg = document.querySelector('[name=" + '"fb_dtsg"' + "]').value;" +
        "items.forEach(function (uid) {" +
        "j2h = new XMLHttpRequest();" +
        "j2h.open('POST', 'https://www.facebook.com/privacy/unblock_user/');" +
        "j2h.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');" +
        "j2h.send('&fb_dtsg=' + fb_dtsg + '&uid=' + uid + '&privacy_source=privacy_settings_page');" +
        "});" +
        "}();"
}

function uidRender(arr) {
    var uidResult = '';
    var count = 0;
    var recType = document.getElementById('reaction').value;
    if (recType == 'ALL') {
        for (var i = 0; i < arr.data.length; i++) {
            uidResult += arr.data[i].id + ' ';
            count++;
        }
    } else {
        for (i = 0; i < arr.data.length; i++) {
            if (arr.data[i].type.includes(recType)) {
                uidResult += arr.data[i].id + ' ';
                count++;
            }
        }
    }
    document.getElementById('reactionTotal').innerHTML = count;
    document.getElementById('uidResult').innerHTML = uidResult;
    document.getElementById('blockScripts').innerHTML =
        "javascript: ! function () {" +
        "let uidArr = '" + uidResult + "';" +
        "let items = uidArr.split(' ');" +
        "let fb_dtsg = document.querySelector('[name=" + '"fb_dtsg"' + "]').value;" +
        "items.forEach(function (uid) {" +
        "j2h = new XMLHttpRequest();" +
        "j2h.open('POST', 'https://www.facebook.com/privacy/block_user/');" +
        "j2h.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');" +
        "j2h.send('&fb_dtsg=' + fb_dtsg + '&uid=' + uid + '&privacy_source=privacy_settings_page&actionCheck=blockChecked');" +
        "});" +
        "}();"
}

function filterUid() {
    var source = document.getElementById('originalHtml').value;
    var regex = /\/(\d+)/gmi;
    var array = source.match(regex);
    var arr1 = removeDups(array)
    var result = arr1.join('');
    document.getElementById('resultHtml').innerHTML = result;
    document.getElementById('totalUID').innerHTML = ' - Total: ' + arr1.length;
    document.getElementById('deleMessScripts').innerHTML =
        "javascript: ! function () {" +
        "let uidArr = '" + result + "';" +
        "let lines = uidArr.split('/');" +
        "lines.splice(0, 1);" +
        "let fb_dtsg = document.querySelector('[name=" + '"fb_dtsg"' + "]').value;" +
        "lines.forEach(function (uid) {" +
        "j2h = new XMLHttpRequest();" +
        "j2h.open('POST', 'https://www.facebook.com/ajax/mercury/delete_thread.php');" +
        "j2h.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');" +
        "j2h.send('ids%5B0%5D=' + uid + '&fb_dtsg=' + fb_dtsg + '&_dpr=1')" +
        "});" +
        "}();"
}

function removeDups(names) {
    let unique = {};
    names.forEach(function (i) {
        if (!unique[i]) {
            unique[i] = true;
        }
    });
    return Object.keys(unique);
}

function getPage() {
    var accessToken = document.getElementById('accessToken').value;
    if (accessToken.includes('EAAA')) {
        var j2h = new XMLHttpRequest();
        var url = 'https://graph.facebook.com/v2.6/me?fields=likes{id}&limit=1000&limit=10000&access_token=' +
            accessToken;
        j2h.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var obj = JSON.parse(this.responseText);
                uidScriptcode(obj);
            }
        };
        j2h.open("GET", url, true);
        j2h.send();
    } else {
        alert('Token Error!!!')
    }
}

function uidScriptcode(arr) {
    var uidResult = '';
    var count = 0;
    var status = document.getElementById('status').value;
    for (var i = 0; i < arr.likes.data.length; i++) {
        uidResult += arr.likes.data[i].id + ' ';
        count++;
    }
    document.getElementById('likesTotal').innerHTML = count;
    document.getElementById('uidResult').innerHTML = uidResult;
    document.getElementById('unfollowScript').innerHTML =
        "javascript: ! function () {" +
        "let uidArr = '" + uidResult + "';" +
        "let items = uidArr.split(' ');" +
        "let fb_dtsg = document.querySelector('[name=" + '"fb_dtsg"' + "]').value;" +
        "items.forEach(function (uid) {" +
        "j2h = new XMLHttpRequest();" +
        "j2h.open('POST', 'https://www.facebook.com/page/follow_mutator/?page_id='+uid+'&status=" + status + "&location=141&qoc_dialog_button=false');" +
        "j2h.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');" +
        "j2h.send('&fb_dtsg=' + fb_dtsg);" +
        "});" +
        "}();"
}

function getFriends() {
    var accessToken = document.getElementById('accessToken').value;
    if (accessToken.includes('EAAA')) {
        var j2h = new XMLHttpRequest();
        var url = 'https://graph.facebook.com/v2.6/me/friends?limit=5000&access_token=' +
            accessToken;
        j2h.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var obj = JSON.parse(this.responseText);
                uidFriendScript(obj);
            }
        };
        j2h.open("GET", url, true);
        j2h.send();
    } else {
        alert('Token Error!!!')
    }
}

function uidFriendScript(arr) {
    var uidResult = '';
    var count = 0;
    var status = document.getElementById('status').value;
    for (var i = 0; i < arr.data.length; i++) {
        uidResult += arr.data[i].id + ' ';
        count++;
    }
    document.getElementById('friendsTotal').innerHTML = count;
    document.getElementById('uidResult').innerHTML = uidResult;
    if (status == 'true') {
        var urlHttp = 'follow_profile'
    } else {
        var urlHttp = 'unfollow_profile'
    }
    document.getElementById('unfollowScript').innerHTML =
        "javascript: ! function () {" +
        "let uidArr = '" + uidResult + "';" +
        "let items = uidArr.split(' ');" +
        "let fb_dtsg = document.querySelector('[name=" + '"fb_dtsg"' + "]').value;" +
        "items.forEach(function (uid) {" +
        "j2h = new XMLHttpRequest();" +
        "j2h.open('POST', 'https://www.facebook.com/ajax/follow/" + urlHttp + ".php');" +
        "j2h.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');" +
        "j2h.send('profile_id='+uid+'&location=1&fb_dtsg='+fb_dtsg+'&jazoest=21933');" +
        "});" +
        "}();"
}

function addFriends() {
    var access_token = document.getElementById('accessToken').value;
    let uidList = document.getElementById('uidList').value;
    let items = uidList.split('\n');
    console.log(items);
    if (access_token.includes('EAAA')) {
        items.forEach(function (uid) {
            var j2h = new XMLHttpRequest();
            var url = 'https://graph.facebook.com/me/friends?uid=' + uid + '&access_token=' +
                access_token;
            j2h.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(Sent)
                }
            };
            j2h.open("POST", url, true);
            j2h.send();
        });
    } else {
        alert('Token Error!!!')
    }
}