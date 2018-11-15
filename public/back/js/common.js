// 进度条
// 开启进度条
// NProgress.start();

// // 关闭进度条
// NProgress.done();


// 需求： 在第一个ajax请求时， 开启进度条
      // 在全部ajax请求都回来时，关闭进度条

/**
 *  ajax全局事件
 *  .ajaxComplete()    当每个ajax完成时调用，（不管是成功还是失败，都调用）
 *  .ajaxSuccess()     当每个ajax成功响应时调用
 *  .ajaxError()       当每个ajax失败响应时调用
 *  .ajaxSend()        当每个ajax准备要发送前， 会调用ajaxSend
 *  
 *  .ajaxStart()       当第一个ajax请求发送时调用
 *  .ajaxStop()        当所有哦的ajax请求完成时调用

 */

 $(document).ajaxStart(function(){
  //  第一个ajax发送时调用，开启进度条
  NProgress.start();
 });


//  所有的ajax请求完成时， 关闭进度条
$(document).ajaxStop(function(){
  setTimeout(function(){
    // 关闭进度条
    NProgress.done();
  }, 500);
});


// // jQuery 入口函数， 等待 dom 结构加载完成之后， 就执行
// $(function(){

//   // 公共的功能
//   // 功能1：导航点击切换功能

// })