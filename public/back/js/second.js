

$(function(){

  var currentPage = 1;   //当前页
  var pageSize = 5;      // 每页多少条


  // // 1. 一进入页面， 发送ajax请求， 获取数据，进行页面动态渲染
  render();

  function render(){
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data:{
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ){
        console.log(info);
        // 结合模板引擎渲染
        var htmlStr = template('secondTpl' , info);
        $('tbody').html( htmlStr );
  
        
      }
    })
  }



  

  





})