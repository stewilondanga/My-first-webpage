function DateHelper(date){
  if (date === undefined) {
    date = new Date();
  }

  // Require MomentJS: http://momentjs.com
  return {
    today: function() {
      return moment(date);
    },
    nextDay: function(){
      return moment(date).add(1,'day');
    },
    prevDay: function(){
      return moment(date).subtract(1,'day');
    },
    toString: function(){
      return moment(date).format('YYYY-MM-DD');
    }
  }
}

function save(dataIndex,datacontent) {
  localStorage[dataIndex] = JSON.stringify(datacontent);
}
function loadOrDefault(dataIndex) {
  if (localStorage[dataIndex] !== undefined) {
    return JSON.parse(localStorage[dataIndex]);
  } else {
    return "";
  }
}

// Load data or setup default data
var dataIndex;
var today = DateHelper(moment().format());
// todo: init
$(document).ready(function() {
  $(".date").text(today);
  dataIndex = $(".date").text().replace(/-/g,"");
  document.getElementById("content").value = loadOrDefault(dataIndex);
});
// handling date choosing UI
function changeData(){
  document.getElementById("content").value = "";
  $(".date").text(today);
  dataIndex = $(".date").text().replace(/-/g,"");
  document.getElementById("content").value = loadOrDefault(dataIndex);
}
$("#dayprev").click(function(){
  today = DateHelper(today.prevDay());
  changeData();
});
$("#daynext").click(function(){
  today = DateHelper(today.nextDay());
  changeData();
});
$("#daytoday").click(function(){
  today = DateHelper(moment().format());
  changeData();
});
// handling content changes
$("#content").blur(function(){
  if(document.getElementById("content").value != ""){
    dataIndex = $(".date").text().replace(/-/g,"");
    save(dataIndex,document.getElementById("content").value);
  }
});
