(function(){
  function scrollTo(to, duration) {
    var de = document.documentElement;
    var db = document.body;
    to = Math.min(Math.max(0,to-30), de.scrollHeight - de.offsetHeight);
    var start = de.scrollTop || db.scrollTop;
    var steps = Math.round(duration/10);
    if (start == to) return;
    var diff = to - start;
    var count = 0;
    var scrollInterval = setInterval(function(){
        var pos;
        if (count<steps) {
            count++;
            pos = start + diff * (0.5 - 0.5 * Math.cos(count/steps*Math.PI));
            de.scrollTop = pos;
            db.scrollTop = pos;
        } else {
          clearInterval(scrollInterval);
        }
    },10);
  }

  function link(href){
    return function(){
      if (href==="#") {
        scrollTo(0, 250);
      } else {
        var dest = document.getElementById(href.substr(1));
        scrollTo(dest.offsetTop, 250);
      }
      return false;
    };
  }

  var links = document.querySelectorAll('a'), href;
  for (var i=0, l=links.length; i<l; i++) {
    href = links[i].href.split('/').splice(-1)[0];
    if (href.substr(0,1)==='#') {
      links[i].onclick = link(href);
    }
  }
}());
