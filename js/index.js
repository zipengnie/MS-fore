$(document).ready(function () {
    // 主页logo
    var logo = $(".logo");
    logo.click(function () {
        // 将localstorage的数据清除
        localStorage.clear();
        // 跳转到登录页
        location.href = "./login.html";
    })

    // 主页显示登录用户名
    var loginName = $("#loginName");
    var isAdmin = JSON.parse(localStorage.getItem("user")).isAdmin;
    var nickname = JSON.parse(localStorage.getItem("user")).nickname;
    if (isAdmin == "是") {
        loginName.html("欢迎您-" + nickname + "-(管理员)");
    } else {
        $("#userInfo").parent().css("display", "none");
        loginName.html("欢迎您-" + nickname);
    }

    //主页退出按钮
    var logout = $("#logout");
    logout.click(function () {
        // 将localstorage的数据清除
        localStorage.clear();
        // 跳转到登录页
        location.href = "./login.html";
    })
    /***********主页菜单功能********************/
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




