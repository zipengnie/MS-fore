$(document).ready(function () {
    //账户输入框
    var name = $("input[name='name']");
    // 用户名验证开关
    var nameState = "no";//默认no
    name.blur(function () { $.post("http://localhost:3000/api/userCheck", { name: name.val() }, userSucc) })
    function userSucc(res) {
        if (res.code == -1 && res.message == "该账户存在") {//数据库存在该用户名
            nameState = "ok"
        } else if (res.code == 0) {
            alert('用户不存在!请重新输入');
        }
    }
    // 密码输入框
    var pwd = $("input[name='pwd']");
    $("#btn").click(function (e) {
        if (name.val() == "" || pwd.val() == "") {
            alert("请填写注册信息并检查填写的信息是否正确！")
            e.preventDefault();
        } else if (nameState == "ok") {
            $.post("http://localhost:3000/api/login.html", { name: name.val(), pwd: pwd.val() }, loginSucc);
        } else if (nameState == "no") {
            e.preventDefault();
        }
    })
    function loginSucc(res) {
        if (res.code == 0) {
            // 将昵称存到localstorage中
            localStorage.setItem("user", JSON.stringify({"nickname":res.data.nickname,"isAdmin":res.data.isAdmin}));
            //跳转到主页
            location.href = "./index.html";
        } else {
            alert("登录失败！");
        }
    }
})