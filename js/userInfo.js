$(document).ready(function () {

   $.post("http://localhost:3000/api/userInfo.html",show)
    function show(res){
        alert(res);
        // console.log(res);
        // var str = "";
        // for(var i = 0; i < res.data.docs.length;i++){
        //     console.log(res.data.docs[i]);
        // }
    }

})