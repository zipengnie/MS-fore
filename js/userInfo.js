$(document).ready(function () {
    //用户管理页面渲染
    $.get("http://localhost:3000/api/userInfo.html", show)
    function show(res) {
        // 数据页面
        var str = "";
        for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].isAdmin == "是") {
                str += `<tr>
                <td>${i + 1}</td>
                <td>${res.data[i].userName}</td>
                <td>${res.data[i].nickname}</td>
                <td>${res.data[i].age}</td>
                <td>${res.data[i].sex}</td>
                <td>${res.data[i].isAdmin}</td>
                <td class="delete"></td>
                </tr>`
            } else {
                str += `<tr>
                <td>${i + 1}</td>
                <td>${res.data[i].userName}</td>
                <td>${res.data[i].nickname}</td>
                <td>${res.data[i].age}</td>
                <td>${res.data[i].sex}</td>
                <td>${res.data[i].isAdmin}</td>
                <td class="delete">删除</td>
                </tr>`
            }
        }
        $("#tbody").html(str);
    }
    //用户管理页面分页功能
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

    //用户管理页面搜索功能
    var serbtn = $("#serbtn");
    serbtn.click(function () {
        $.get("http://localhost:3000/api/userInfo/search", { searchVal: serbtn.prev().find("input").val() }, function (res) {
            console.log(res)
            if (res.code == -1) {
                alert(res.message);
            } else if (res.code == 0 && res.message == "查询0条数据") {
                alert(res.message);
            } else if (serbtn.prev().find("input").val() == "") {
                alert("请输入查询条件");
            } else {
                alert(res.message);
                $("#searchTab").css({"display":"block","background":"#fff"});
              
                var str = "";
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].isAdmin == "是") {
                        str += `<tr>
                        <td>${i + 1}</td>
                        <td>${res.data[i].userName}</td>
                        <td>${res.data[i].nickname}</td>
                        <td>${res.data[i].age}</td>
                        <td>${res.data[i].sex}</td>
                        <td>${res.data[i].isAdmin}</td>
                        </tr>`
                    } 
                }
                $("#searchTbody").html(str).css("display","block");
            }
        })
    })

    // 删除非管理员用户功能
    $("#tbody").on("click", ".delete", function () {
        if ($(this).html() == "删除") {
            var name = $(this).parent().find("td:eq(1)").html();
            $.get("http://localhost:3000/api/userInfo/delete", { "name": name }, function (res) {
                console.log(res);
            })
            $(this).parent().remove();
            $.get("http://localhost:3000/api/userInfo.html", show);
            $.get("http://localhost:3000/api/userInfo.html", showli)

        }
    })
})  