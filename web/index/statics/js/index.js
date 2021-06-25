var link = 'http://' + document.domain + ':3001';

function timeformat(time) {
  time = new Date(time * 1000);
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var date = time.getDate();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  return year + "-" + month + "-" + date + "   " + (hour >= 10 ? hour : '0' + hour) + ":" + (minute >= 10 ? minute : '0' + minute) + ":" + (second >= 10 ? second : '0' + second);
}

function qurl(key) {
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  }
  return null;
}

function ajax() {
  var ajaxData = {
    url: arguments[0].url || "",
    data: arguments[0].data || null,
    contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
    beforeSend: arguments[0].beforeSend || function () {},
    success: arguments[0].success || function () {},
    error: arguments[0].error || function () {}
  }
  ajaxData.beforeSend()
  var xhr = createxmlHttpRequest();
  xhr.responseType = 'JSON';
  xhr.open('POST', ajaxData.url, true);
  xhr.setRequestHeader("Content-Type", ajaxData.contentType);
  xhr.setRequestHeader("hyw-from", 'hyw');
  // if (arguments[0].token) {
  //   xhr.setRequestHeader("token", arguments[0].token);
  // }

  xhr.send(convertData(ajaxData.data));
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        ajaxData.success(JSON.parse(xhr.response))
      } else {
        ajaxData.error()
      }
    }
  }
}
function createxmlHttpRequest() {  
  if (window.ActiveXObject) {  
    return new ActiveXObject("Microsoft.XMLHTTP");  
  } else if (window.XMLHttpRequest) {  
    return new XMLHttpRequest();  
  }  
} 
  
function convertData(data){ 
  if( typeof data === 'object' ){ 
    var convertResult = "" ;  
    for(var c in data){  
      convertResult+= c + "=" + data[c] + "&";  
    }  
    convertResult=convertResult.substring(0,convertResult.length-1) 
    return convertResult; 
  }else{ 
    return data; 
  } 
}
function fetch(obj) {
  ajax({
    type: obj.method,
    url: link + obj.url,
    dataType: "json",
    data: obj.data,
    beforeSend: function () {},
    success: function (res) {
      return obj.callback(res)
    },
    error: function () {
      console.log("error")
    }
  })
}

function getcache(key) {
  return localStorage.getItem(key) ? localStorage.getItem(key) : false;
}

function setcache(key, value) {
  return localStorage.setItem(key, value);
}

function removecache(key) {
  localStorage.removeItem(key);
}

window.onload=function() {
  $('#footer').load('../../common/footer.html')
  $('#header').load('../../common/header.html', function () {
    $(function() {
      $("#search").click(function() {
        window.location = '/search.html?keys=' + $("#search-value")[0].value
      })
    })
  })
  $('#floatTools').load('../../common/floatTools.html',function(){
    $(function () {
      $("#aFloatTools_Show").click(function () {
        $('#divFloatToolsView').animate({
          width: 'show',
          opacity: 'show'
        }, 100, function () {
          $('#divFloatToolsView').show();
        });
        $('#aFloatTools_Show').hide();
        $('#aFloatTools_Hide').show();
      });
      $("#aFloatTools_Hide").click(function () {
        $('#divFloatToolsView').animate({
          width: 'hide',
          opacity: 'hide'
        }, 100, function () {
          $('#divFloatToolsView').hide();
        });
        $('#aFloatTools_Show').show();
        $('#aFloatTools_Hide').hide();
      });
    });
  })
}