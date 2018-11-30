$(document).ready(function () {
    //账户输入框
    var name = $("input[name='name']");
    //支持中文、英文、数字、“_”的组合，2-20个字符"
    var nameReg = /^([\u4e00-\u9fa5]|\w){2,20}$/;
    // 用户名验证开关
    var nameState = "no";//默认no
    name.keyup(function () {
        if (name.val().length == 0) {
            name.next().text("用户名不能为空");
        } else {
            if (nameReg.test(name.val())) {
                $.post("http://localhost:3000/api/userCheck", { name: name.val() }, userSucc)
                name.next().text("可用");
            } else {
                name.next().text("用户名不符");
            }
        }
    })
    function userSucc(res) {
        console.log(res);
        if (res.code == -1 && res.message == "该账户存在") {//数据库存在该用户名
            name.next().text("用户名已存在");
        }
        else if (res.code == 0) {
            nameState = "ok";
            name.next().text("可用");
        }
    }

    //密码输入框
    var pwd = $("input[name='pwd']");
    //支持字母、数字及以上的组合，5-20个字符
    var pwdReg = /^[0-9a-zA-Z]{5,20}$/;
    //判断用户名存在开关，true代表存在
    var nameExist = true;
    // 密码状态,
    var pwdState = "no";//默认no
    pwd.click(function () {
        if (name.val().length == 0) {//输入密码前先检查用户名是否为空
            alert("请先设置用户名！")
            nameExist = false;
        } else {
            nameExist = true;
        }
    })
    pwd.keyup(function () {
        if (nameExist) {
            console.log(pwd.val());
            if (pwd.val().length == 0) {
                pwd.next().text("密码不能为空");
            } else {
                if (pwdReg.test(pwd.val())) {
                    pwd.next().text("密码ok");
                    pwdState = "ok";
                } else {
                    pwd.next().text("密码不符合");
                }
            }
        }
    })

    //昵称输入框
    var nickname = $("input[name='nickname']");
    //支持中文、英文、数字、“_”的组合，2-20个字符"
    var nicknameReg = /^([\u4e00-\u9fa5]|\w){2,20}$/;
    // 昵称验证开关
    var nicknameState = "no";//默认no
    //昵称存在开关，true代表存在
    var nicknameExist = true;
    nickname.click(function () {
        if (name.val() == "" || pwd.val() == "") {//输入密码前先检查用户名和密码是否为空
            alert("请先设置用户名或者密码！")
            nicknameExist = false;
        } else {
            nicknameExist = true;
        }
    })

    nickname.keyup(function () {
        if (nickname.val().length == 0) {
            nickname.next().text("昵称不能为空");
        } else {
            if (nicknameReg.test(nickname.val())) {
                nickname.next().text("可用");
                nicknameState = "ok";
            } else {
                nickname.next().text("昵称不符");
            }
        }
    })

    //年龄输入框
    var age = $("input[name='age']");
    //年龄在18-65岁"
    var ageReg = /^(18|19|([2-9]\d)|(1[0-2]\d))$/;
    // 年龄验证开关
    var ageState = "no";//默认no
    //年龄存在开关，true代表存在
    var ageExist = true;
    age.click(function () {
        if (name.val() == "" || pwd.val() == "" || nickname.val() == "") {//输入密码前先检查用户名和密码是否为空
            alert("请先设置用户名、密码或者昵称！")
            ageExist = false;
        } else {
            ageExist = true;
        }
    })
    age.keyup(function () {
        if (age.val().length == 0) {
            age.next().text("年龄不能为空");
            ageExist = false;
        } else {
            if (ageReg.test(age.val())) {
                age.next().text("可用");
                ageState = "ok";
            } else {
                age.next().text("年龄不符");
            }
        }
    })
    // 注册请求
    var sex = $("input[name='sex']");
    var isAdmin = $("input[name='isAdmin']");
    $("#btn").click(function (e) {
        if (nameState == "no" || pwdState == "no" || nicknameState == "no" || ageState == "no" || name.val() == "" || pwd.val() == "" || nickname.val() == "" || age.val() == "") {
            alert("请填写注册信息并检查填写的信息是否正确！")
            e.preventDefault();
        } else if (nameState == "ok" || pwdState == "ok" || nicknameState == "ok" || ageState == "ok") {
            $.post("http://localhost:3000/api/register.html", {
                name: name.val(), pwd: pwd.val(), nickname: nickname.val(),
                age: age.val(), sex: sex.prop("checked"), isAdmin: isAdmin.prop("checked")
            })
            location.href = "./login.html";
        }
    })


})