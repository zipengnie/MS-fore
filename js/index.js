$(document).ready(function () {
    // 主页显示登录用户名
    var loginName = $("#loginName");
    var nickname = localStorage.getItem("nickname")
    if (nickname == "管理员") {
        loginName.html("欢迎您-" + nickname + "-(管理员)");
    } else {
        $("#userInfo").parent().css("display", "none");
        loginName.html("欢迎您-" + nickname);
    }

    // 管理系统logo
    var logo = $(".logo");
    logo.click(function () {
        // 将localstorage的数据清除
        localStorage.clear();
        // 跳转到登录页
        location.href = "./login.html";
    })
    
    // 退出按钮
    var logout = $("#logout");
    logout.click(function () {
        // 将localstorage的数据清除
        localStorage.clear();
        // 跳转到登录页
        location.href = "./login.html";

    })

    //用户管理界面
    var userInfo = $("#userInfo");
    userInfo.click(function () {
        $("#welcome").hide();
        $("iframe").show().attr("src", "userInfo.html");
    })

    //手机管理界面
    var phone = $("#phone");
    phone.click(function () {
        $("#welcome").hide();
        $("iframe").show().attr("src", "phone.html");
    })

    //品牌管理界面
    var brand = $("#brand");
    brand.click(function () {
        $("#welcome").hide();
        $("iframe").show().attr("src", "brand.html");
    })




})