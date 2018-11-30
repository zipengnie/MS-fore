$(document).ready(function () {
    //产品名称输入框
    var productName = $("input[name='productName']");
    //支持中文、英文、数字、“_”的组合，2-20个字符"
    var productNameReg = /^([\u4e00-\u9fa5]|\w){2,20}$/;
    //产品名称验证开关
    var productNameState = "no";//默认no
    productName.blur(function () {
        if (productName.val().length == 0) {
            productName.next().text("不能为空");
        } else {
            productName.next().text("");
            if (!productNameReg.test(name.val())) {
                productName.next().text("输入不合法");
            } else {
                productNameState = "ok";
            }
        }
    })

    //品牌输入框
    var brandName = $("input[name='brandName']");
    //支持中文、英文、数字、“_”的组合，2-20个字符"
    var brandNameReg = /^([\u4e00-\u9fa5]|\w){2,20}$/;
    //品牌验证开关
    var brandNameState = "no";//默认no
    brandName.blur(function () {
        if (brandName.val().length == 0) {
            brandName.next().text("不能为空");
        } else {
            brandName.next().text("");
            if (!brandNameReg.test(name.val())) {
                brandName.next().text("输入不合法");
            } else {
                brandNameState = "ok";
            }
        }
    })

    //官方指导价输入框
    var officialPrices = $("input[name='officialPrices']");
    //仅支持数字
    var officialPricesReg = /^\d{1,20}$/;
    //官方指导价验证开关
    var officialPricesState = "no";//默认no
    officialPrices.blur(function () {
        if (officialPrices.val().length == 0) {
            officialPrices.next().text("不能为空");
        } else {
            officialPrices.next().text("");
            if (!officialPricesReg.test(officialPrices.val())) {
                officialPrices.next().text("输入不合法");
            } else {
                officialPricesState = "ok";
            }
        }
    })


    //二手回收价输入框
    var resalePrice = $("input[name='resalePrice']");
    //仅支持数字
    var resalePriceReg = /^\d{1,20}$/;
    //二手回收价验证开关
    var resalePriceState = "no";//默认no
    resalePrice.blur(function () {
        if (resalePrice.val().length == 0) {
            resalePrice.next().text("不能为空");
        } else {
            resalePrice.next().text("");
            if (!resalePriceReg.test(resalePrice.val())) {
                resalePrice.next().text("输入不合法");
            } else {
                resalePriceState = "ok";
            }
        }
    })

    //确认提交
    var okBtn = $("#ok");
    okBtn.click(function (e) {
        if (productNameState == "no" || brandNameState == "no" || officialPricesState == "no" || resalePriceState == "no" || productName.val() == "" || brandName.val() == "" || officialPrices.val() == "" || resalePrice.val() == "") {
            alert("请填写新增信息并检查填写的信息是否正确！");
            e.preventDefault();
        } else if (productNameState == "ok" || brandNameState == "ok" || officialPricesState == "ok" || resalePriceState == "ok") {
            // $.post("http://localhost:3000//api/phone/add",{
            //     name: name.val(), pwd: pwd.val(), nickname: nickname.val(),
            //     age: age.val(), sex: sex.prop("checked") == true ? "男" : "女", isAdmin: isAdmin.prop("checked")
            // })
            alert(1);
        }
    })


})