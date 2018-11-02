/**
 * Created by lin on 2018/9/30.
 */

//邮箱
var getTest=document.getElementById("getTest");
var email=document.getElementById("email");
var emailmyregx=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
email.onfocus=function(){
    var emailValue=email.value;
    if(emailValue=="请输入你的邮箱"){
        email.style.color="black";
        email.value="";
    }
    if(!(emailmyregx.test(email.value))){
        var emailError=document.getElementById("emailError");
        emailError.innerHTML="";
    }
}
email.onblur=function(){
    var emailValue=email.value;
    var emailError=document.getElementById("emailError");
    //alert(emailmyregx.test(email.value));
    if(emailValue.length<=0){
        email.style.color="#999999";
        email.value="请输入你的邮箱";
        emailError.innerHTML="";
    }
    else if(!(emailmyregx.test(email.value))){
        emailError.innerHTML="邮箱格式错误，请重新输入";
        getTest.style.backgroundImage = "url(../bingImg/button_dis.png)";
        getTest.style.color = "#999999";
    }
     else if(emailmyregx.test(email.value)){
        getTest.style.backgroundImage = "url(../bingImg/button_pre.png)";
        getTest.style.color = "#ffffff";
        getTest.onclick= function () {
            settime(this);
            var data=new Date();
            var hour=data.getHours();
            var minute=data.getMinutes();
            var time=hour+"-"+minute;
            judeTest(email,time);
        }
        //后台判断邮箱是否存在
        judeemail(email.value);
        //当邮箱输入正确，发送按钮被激活
        var t;
        var countdown=10;
        function settime(a) {
            //alert(countdown);
            if (countdown == 0) {
                //alert("faf");
                a.removeAttribute("disabled");
                a.value = "重新获取";
                countdown = 10;
                clear();
            }
            else {
                a.setAttribute("disabled", true);
                a.value = "重新发送(" + countdown + ")s";
                countdown--;
            }
            t=setTimeout(function () {
                settime(a)
            }, 1000)
        }
    }
}
//清除定时器
function clear(){
    clearTimeout(t);
}

//新密码
var Newpassword=document.getElementById("Newpassword");
var Newpasswordmyregx=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/;
Newpassword.onfocus=function(){
    var NewpasswordValue=Newpassword.value;
    if(NewpasswordValue=="请输入新密码"){
        Newpassword.style.color="black";
        Newpassword.type="password";
        Newpassword.value="";
    }
    if(!(Newpasswordmyregx.test(NewpasswordValue))){
        NewpasswordError.innerHTML="";
    }
}
Newpassword.onblur=function(){
    var NewpasswordValue=Newpassword.value;
    var NewpasswordError=document.getElementById("NewpasswordError");
    if (NewpasswordValue.length<=0){
        Newpassword.type="text";
        Newpassword.style.color="#999999";
        Newpassword.value="请输入新密码";
        NewpasswordError.innerHTML="";
    }
    else if(!(Newpasswordmyregx.test(NewpasswordValue))){
        NewpasswordError.innerHTML="密码只能是6~16位并包含数字、字母、字符，./";
    }
}

//邮箱的验证码
var emailTest=document.getElementById("emailTest");
var emailTestmyregx=/\d{6}/;
emailTest.onfocus=function(){
    var emailTestValue=emailTest.value;
    if(emailTestValue=="请输入邮箱的验证码"){
        emailTest.style.color="black";
        emailTest.value="";
    }
    if(!(emailTestmyregx.test(emailTestValue))){
        var emailTestError=document.getElementById("emailTestError");
        emailTestError.innerHTML="";
    }
}
emailTest.onblur=function(){
    var emailTestValue=emailTest.value;
    var emailTestError=document.getElementById("emailTestError");
    if(emailTestValue.length<=0){
        emailTest.style.color="#999999";
        emailTest.value="请输入邮箱的验证码";
        emailTestError.innerHTML="";
    }
    else if(!(emailTestmyregx.test(emailTestValue))){
        emailTestError.innerHTML="邮箱验证码错误，请重新输入";
    }
}

//确认密码一致性
var RaginNewpassword=document.getElementById("RaginNewpassword");
RaginNewpassword.onfocus=function(){
    var RaginNewpasswordValue=RaginNewpassword.value;
    var NewpasswordValue=document.getElementById("Newpassword").value;
    if(RaginNewpasswordValue=="请再次确认密码"){
        RaginNewpassword.style.color="black";
        RaginNewpassword.type="password";
        RaginNewpassword.value="";
    }
    if(RaginNewpasswordValue!=NewpasswordValue){
        var RaginNewpasswordError=document.getElementById("RaginNewpasswordError");
        RaginNewpasswordError.innerHTML="";
    }
}
RaginNewpassword.onblur=function(){
    var RaginNewpasswordValue=RaginNewpassword.value;
    var emailTestError=document.getElementById("emailTestError");
    var NewpasswordValue=document.getElementById("Newpassword").value;
    if(RaginNewpasswordValue.length<=0){
        RaginNewpassword.style.color="#999999";
        RaginNewpassword.value="请再次确认密码";
        RaginNewpassword.type="text";
        RaginNewpasswordError.innerHTML="";
    }
    else if(RaginNewpasswordValue!=NewpasswordValue){
        RaginNewpasswordError.innerHTML="两次密码不一致，请重新确认";
    }
    //后台接收密码
    else{
        judeNewpass();
    }
}
//点击确认按钮
var sure=document.getElementById("sure");
sure.onclick=function(){
    sure.style.backgroundImage="url(../bingImg/button_pre_1.png)";
}
//后台判断邮箱是否存在
function judeemail(email){
    //grade = grade.substring(0,grade.length-1);
    $.ajax({
        url:'email',   //路径
        type:'POST',               //方法
        cache:false,               //是否缓存
        dataType:'json',           //返回值类型
        data:{                     //传给后端的数据
            'email':email
        },
        success:function(getemail){      //成功时
            if(getemail.status=="success"){
            }
            else {
                document.getElementById("emailError").innerHTML=getemail.message;
            }
        },
        error:function(){                //失败
            // alert(message);
            if(getemail.status=="success"){

            }
            else {
                document.getElementById("emailError").innerHTML=getemail.message;
            }
        }
    })
}
//后台发送验证码,后台获取时间
function judeTest(email,time) {
    //grade = grade.substring(0,grade.length-1);
    $.ajax({
        url: 'sendEmail/getTime',   //路径
        type: 'POST',               //方法
        cache: false,               //是否缓存
        dataType: 'json',           //返回值类型
        data: {                     //传给后端的数据
            'email': email,
            'time': time
        },
        success: function (getEmailTime) {      //成功时
            if (getEmailTime.status == "success") {
            }
            else {
                document.getElementById("emailTestError").innerHTML=getEmailTime.message;
            }
        },
        error: function () {                //失败
            // alert(message);
            if (getEmailTime.status == "success") {
            }
        }
    })
}
//检验验证码，接收新密码
function judeNewpass(email,time,inputCode,newPassword) {
    //grade = grade.substring(0,grade.length-1);
    $.ajax({
        url: 'resetPassword/code_effectiveTime',   //路径
        type: 'POST',               //方法
        cache: false,               //是否缓存
        dataType: 'json',           //返回值类型
        data: {                     //传给后端的数据
            'email': email,
            'time': time,
            'inputCode': inputCode,
            'newPassword': newPassword

        },
        //判断邮箱验证码是否有效
        success: function (getTestUseless) {      //成功时
            if (getTestUseless.status == "invalid") {
            }
            else {
                document.getElementById("getTestUseless").innerHTML = getemail.message;
            }
        },
        error: function () {                //失败
            // alert(message);
            if (getTestUseless.status == "invalid") {
            }
            else {
                document.getElementById("getTestUseless").innerHTML = getemail.message;
            }
        },
        //判断输入的邮箱验证码是否正确
        success: function (getTestError) {      //成功时
            if (getTestError.status == "error") {
            }
            else {
                document.getElementById("getTestError").innerHTML = getemail.message;
            }
        },
        error: function () {                //失败
            // alert(message);
            if (getTestError.status == "error") {
            }
            else {
                document.getElementById("getTestError").innerHTML = getemail.message;
            }
        }
    })
}
//邮箱是否存在伪数据
var getemail=
{
    "status": "success",
    "message":"邮箱不存在，请重新输入",
}
//伪数据邮箱时间
var getEmailTime=
{
    "status": "success",
    "message":"发送失败",
}
//校验码失效
var getTestUseless={
    "status":"invalid",
    "message":"校验码错误，请重新获取"
 }
//验证码错误
var getTestError={
    "status":"error",
    "message":"验证码错误"
}
