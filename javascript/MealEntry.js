/**
 * Created by lin on 2018/9/26.
 */
var stuNumber=document.getElementById("stuNumber");
var pass=document.getElementById("pass");
var signGo=document.getElementById("signGo");
var stumyregx=/20\d{10}/;

//js实现html的placeholder属性效果
stuNumber.onfocus=function(){
    var stuNumberValue=stuNumber.value;
    var stuError=document.getElementById("stuError");
   if (stuNumberValue=="学号"){
       stuNumber.style.color="black";
       stuNumber.value="";
   }
    if (stuNumberValue.length<12){
        stuError.innerHTML = "";
        signGo.style.backgroundColor="gray";
    }
}
stuNumber.onblur= function () {
    var stuNumberValue=stuNumber.value;
    if (stuNumberValue.length<=0){
        stuNumber.style.color="#999999";
        stuNumber.value="学号";
        //signGo.style.backgroundColor="gray";
        stuError.innerHTML = "";
    }
    if(!(stumyregx.test(stuNumberValue))) {
        var stuError = document.getElementById("stuError");
        stuError.innerHTML = "学号填写错误";
    }
    else {
        signGo.style.backgroundColor="green";
    }
    if (stuNumberValue.length<12){
        signGo.style.backgroundColor="gray";
    }
    judeNumber(stuNumber.value);
}

//密码
pass.onfocus=function(){
    var passValue=pass.value;
    var GoError= document.getElementById("GoError");
    if (passValue=="密码（初始密码为身份证后六位）"){
        pass.type="password";
        pass.style.color="black";
       pass.value="";
        signGo.style.backgroundColor="green";
    }
    //if (!(passmyregx.test(passValue))){
    //    GoError.innerHTML = "";
    //}
}
pass.onblur= function () {
    var passValue=pass.value;
    var GoError= document.getElementById("GoError");
    if (pass.value.length<=0){
        pass.type="text";
        pass.style.color="#999999";
        pass.value="密码（初始密码为身份证后六位）";
        signGo.style.backgroundColor="gray";
        GoError.innerHTML = "";
    }
}
signGo.onclick=function(){
    judeSure(stuNumber.value,pass.value);
}

//判断学号是否有误
function judeNumber(number){
    //grade = grade.substring(0,grade.length-1);
    $.ajax({
        url:'inspect',   //路径
        type:'POST',               //方法
        cache:false,               //是否缓存
        dataType:'json',           //返回值类型
        data:{                     //传给后端的数据
            'no':number
        },
        success:function(getNumber){      //成功时
            if(getNumber.status=="success"){
            }
            else {
                document.getElementById("stuError").innerHTML=getNumber.message;
            }
        },
        error:function(){                //失败
            // alert(message);
            if(getNumber.status=="success"){

            }
            else {
                document.getElementById("stuError").innerHTML=getNumber.message;
            }
        }
    })
}

//验证学号和密码
function judeSure(number,password){
    $.ajax({
        url:'validate',   //路径
        type:'POST',               //方法
        cache:false,               //是否缓存
        dataType:'json',           //返回值类型
        data:{                     //传给后端的数据
            'no':number ,
            'inputPassword':password
        },
        success:function(getNum){      //成功时
            if(getNum.status=="success"){
            }
            else {
                document.getElementById("GoError").innerHTML=getNum.message;
            }
        },
        error:function(){                //失败
            // alert(message);
            if(getNum.status=="success"){
            }
            else {
                document.getElementById("GoError").innerHTML=getNum.message;
            }
        }
    })
}

//学号伪数据
var getNumber=
{
    "status": "success",
    "message":"学号不存在，请重新输入",
}
 //学号，密码
var getNum=
{
    "status": "success",
    "message":"密码错误，请重新输入",
}


