$(document).ready(function () {
    //手机管理页面渲染
    $.get("http://localhost:3000/api/phone.html", show)
    function show(res) {
        console.log(res.data.fileName);
        // 数据页面
        var str = "";
        for (var i = 0; i < res.data.length; i++) {
            str += `<tr>
             <td>${i + 1}</td>
             <td><img src="http://10.36.140.130:3000/public/images/${res.data[i].fileName}"></img></td>
             <td>${res.data[i].productName}</td>
             <td>${res.data[i].brandName}</td>
             <td>${"￥" + res.data[i].officialPrices}</td>
             <td>${"￥" + res.data[i].resalePrice}</td>
             <td class="delete"><a href="#">删除</a><a href="#">修改</a></td>
             </tr>`
        }
        $("#tbody").html(str);
    }

    //页面分页功能
    $.get("http://localhost:3000/api/userInfo.html", showli)
    function showli(res) {
        // 分页列表
        var strli = "";
        for (var i = 1; i <= res.totalPage; i++) {
            strli += `<li class="">${i}</li>`;
        }
        // 左按钮
        var strli_left = `<li class="disabled">«</li>`;
        // 右按钮
        var strli_right = `<li>»</li>`;
        $(".pagination").html(strli_left + strli + strli_right);
        $(".pagination li:eq(1)").css({ "background": "#337ab7", "color": "#fff" }).siblings().css({ "background": "", "color": "#000" })
        var page = res.page;
        //点击切换页面
        $(".pagination").delegate("li", "click", function () {
            if ($(this).index() == 0) {// 左按钮
                console.log($(this).index())
                if (page <= 1) {
                    $.get("http://localhost:3000/api/userInfo.html?page=1", show)
                } else {
                    page--;
                    $.get("http://localhost:3000/api/userInfo.html?page= " + page, show)
                }
                $(".pagination li:eq(" + page + ")").css({ "background": "#337ab7", "color": "#fff" }).siblings().css({ "background": "", "color": "#000" })
            } else if ($(this).index() == $(".pagination li").length - 1) {// 右按钮
                console.log($(this).index())
                if (page >= $(this).index() - 1) {
                    $.get("http://localhost:3000/api/userInfo.html?page= " + page, show)

                } else {
                    page++;
                    $.get("http://localhost:3000/api/userInfo.html?page= " + page, show)

                }
                $(".pagination li:eq(" + page + ")").css({ "background": "#337ab7", "color": "#fff" }).siblings().css({ "background": "", "color": "#000" })
            } else {
                console.log($(this).index())
                $.get("http://localhost:3000/api/userInfo.html?page= " + $(this).index(), show)
                page = $(this).index();
                $(this).css({ "background": "#337ab7", "color": "#fff" }).siblings().css({ "background": "", "color": "#000" })
            }
        })
    }

    //新增
    $("#add").click(function () {
        $(".addForm").show().siblings().hide();
    })
    // 取消
    $("#cancel").click(function () {
        $(".addForm").hide().siblings().show();
    })

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
            if (!productNameReg.test(productName.val())) {
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
            if (!brandNameReg.test(brandName.val())) {
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
            //     $.post("http://localhost:3000//api/phone/upload",function(res){
            //     alert(res);
            // })
            // console.log(res);
        }

    })
})