$(function(){

  /**
   * 1. 进行表单校验配置
   *   校验要求：
   *      （1）用户名不能为空， 长度为 2-6 位
   *      （2）密码不能为空，长度为 6-12 位
   */
  $("#form").bootstrapValidator({
    
    //  指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',          //校验成功
      invalid: 'glyphicon glyphicon-remove',    //校验失败
      validating: 'glyphicon glyphicon-refresh' //校验中
    },
    
    //  配置校验字段 （需要先在 input 中配置name属性）
    fields: {
      username: {
        // 进行多个规则配置
        validators: {
          // 非空校验
          notEmpty:{
            // 校验提示
            message: "用户名不能为空"
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须在2-6之间"
          },

          // 配置回调函数的提示信息
          callback: {
            message: "用户名不存在"
          }
        }
      },

      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是6-12位"
          },

          // 配置回调函数的提示信息
          callback: {
            message: "密码错误"
          }
        }
      }
    }





  })


/**
 *  2. 表单校验需要在表单提交时，进行校验，  需要 submit 按钮
 *     可以注册一个表单校验成功事件， 表单校验成功之后， 默认会提交
 *     可以在成功事件中， 阻止默认的表单提交， 通过 ajax 提交，就不会跳转了
 *  
 * 思路： 1. 注册表单校验成功事件
 *       2. 在事件中， 阻止默认的表单提交， 通过 ajax 提交即可
 */
  $("#form").on("success.form.bv" , function( e  ){

    // 阻止默认的表单提交
    e.preventDefault();

    console.log("校验通过 ， 通过 ajax 提交");

    // 通过 ajax 提交
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $('#form').serialize(),
      // $('#form').serialize()   表单序列化，快速收集设置了 name 属性的表单元素值
      dataType: "json",
      success: function( info ){
        // console.log( info );
        if( info.success ){
          location.href = "index.html";
        }
        if( info.error === 1000){
          // alert("用户名不存在");
          // 调用插件提供的方法，将用户名 input 状态 更新成校验失败状态
          // updateStatus(field, status, validatorName)
          // 参数1： field 校验字段  username/password
          // 参数2： status 校验状态  NOT_VALIDATED：未校验的   VALIDATING：校验中的  INVALID ：校验失败的    VALID：校验成功的
          // 参数3： validatorName  校验规则 ，用来配置错误时的提示信息
          $("#form").data("bootstrapValidator").updateStatus("username" , "INVALID" , "callback");
        }
        if( info.error === 1001){
          // alert("密码错误");
          $("#form").data("bootstrapValidator").updateStatus("password" , "INVALID" , "callback");

        }
      }
    })
  })


  /**
   * 3. 重置功能
   * 
   */
  $('[type="reset"]').click(function(){
    // $('#form').data("bootstrapValidator").reserForm()
    // 传 boolean 值， 如果是 true 内容和状态都重置， 不传参 ， 只重置状态

    $("#form").data("bootstrapValidator").resetForm();   //只重置状态

  })
  













}) 