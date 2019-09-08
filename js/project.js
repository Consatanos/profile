// Custom select init
var $select = document.querySelectorAll('select');
for (var i = 0, len = $select.length; i < len; i++) {
  new SlimSelect({
    select: $select[i],
    showSearch: false,
  })
};



