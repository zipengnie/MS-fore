$(document).ready(function () {
    //手机管理页面渲染
    $.get("http://localhost:3000/api/brand.html", show)
    function show(res) {
        // 数据页面
        var str = "";
        for (var i = 0; i < res.data.length; i++) {
            str += `<tr>
             <td>${i + 1}</td>
             <td><img src="http://localhost:3000/images/${res.data[i].fileName}" style="width:60px;"></img></td>
             <td>${res.data[i].brandName}</td>
             <td class="update">修改</td>
             <td style="display:none;">${res.data[i]["_id"]}</td>
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
        $("form").attr("action", "http://localhost:3000/api/brand/upload");
        $(".addForm").show().siblings().hide();
        $("h3").html("<span>新&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;增</span>");
    })
    // 取消
    $("#cancel").click(function () {
        $(".addForm").hide().siblings().show();
    })
    // 修改品牌数据功能
    $("#tbody").on("click", ".update", function () {
        var id = $(this).parent().find("td:last").html();
        // console.log(id);
        $.get("http://localhost:3000/api/brand/check", { "_id": id }, function (res) {

        console.log(res);
    })

        //     $("form").attr("action", "http://localhost:3000/api/brand/update");
        //     var brandName = $(this).parent().find("td:eq(2)").html();
        //     $(".addForm").show();
        //     $("h3").html("<span>修&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;改</span>");
        //     $("#brandName").val(brandName);


            // $.get("http://localhost:3000/api/phone/delete", { "id": id }, function (res) {
            //     console.log(res);
            // })


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


        //确认提交
        var okBtn = $("#ok");
        okBtn.click(function (e) {
            if (brandNameState == "no" || brandName.val() == "") {
                alert("请填写新增信息并检查填写的信息是否正确！");
                e.preventDefault();
             } // } else if (brandNameState == "ok") {
            //     //     $.post("http://localhost:3000//api/brand/upload",function(res){
            //     //     alert(res);
            //     // })
            //     // console.log(res);
                
            // }
            location.reload();
        })
    })