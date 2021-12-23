
$(document).ready (function (e) {
    var n_num = 0;
    // var end_num = 4;
    var tag_a = new Array();

    $("#qc_tag").keydown(function(e) {
    var n_value = $("#qc_tag").val();
    var name = "<div name=tag_a"+n_num+">"+"# "+n_value+"&nbsp"+"<i class='fas fa-times btnDelete'></i><input" +
      " type='hidden' value="+n_num+" name='tag[]'></div>";
        // var name = "<div name="+tag_a[n_num]+">"+"# "+n_value+"&nbsp"+"<i class='fas fa-times btnDelete'></i></div>"
        if ( tag_a.length < 3 ) {
            if ( e.keyCode == 13 ) {
                $('#content').append(name);
                n_num ++;
                tag_a.push('tag_'+n_num);
                $('#qc_tag').val("");
                console.log(tag_a);
                // tag_a로 값을 넣을 수 있도록 하기. (한가지로만 전달이 되는가 도 확인할 것.)
            }
        } else {
            $("#qc_tag").attr("disabled", true);
            alert ("3개까지만 작성합니다.");
        }

    });
    $("#content").on('click', '.btnDelete', function () {
        $(this).closest('div').remove();
        $(this).closest('input').remove();
        // n_num --;
        tag_a.pop();
        $("#qc_tag").attr("disabled", false);
        console.log(tag_a);
    });
});


$(document).ready(function(){
    var fileTarget = $('.filebox .upload-hidden');
    fileTarget.on('change', function(){
        if(window.FileReader){
             // 파일명 추출
            var filename = $(this)[0].files[0].name;
        } 

        else {
             // Old IE 파일명 추출
            var filename = $(this).val().split('/').pop().split('\\').pop();
        };

        $(this).siblings('.upload-name').val(filename);
    });

     //preview image 
    var imgTarget = $('.preview-image .upload-hidden');

    imgTarget.on('change', function(){
        var parent = $(this).parent();
        parent.children('.upload-display').remove();

        if(window.FileReader){
             //image 파일만
            if (!$(this)[0].files[0].type.match(/image\//)) return;
            
            var reader = new FileReader();
            reader.onload = function(e){
                var src = e.target.result;
                parent.prepend('<div class="upload-display"><div class="upload-thumb-wrap"><img src="'+src+'" class="upload-thumb"></div></div>');
            }
            reader.readAsDataURL($(this)[0].files[0]);
        } else {
            $(this)[0].select();
            $(this)[0].blur();
            var imgSrc = document.selection.createRange().text;
            parent.prepend('<div class="upload-display"><div class="upload-thumb-wrap"><img class="upload-thumb"></div></div>');

            var img = $(this).siblings('.upload-display').find('img');
            img[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src=\""+imgSrc+"\")";        
        }
    });
});
$('.board_check').click(function(e) {
    $.ajax({
    url: 'board_check',
    type: 'post',
    data: {"board_pk":$(this).attr("value")},
    success:function(data){
        console.log(data.comment);
        $("#board_Title").text(data.board[0].board_Title);
        $("#user_nick").text(data.board[0].user_Name);
        $("#board_content").text(data.board[0].board_Content);
        $("#board_like").val(data.board[0].board_like);
        console.log(data.board[0].tag);
        if(data.board[0].tag){
            var t = data.board[0].tag.split(',');
            for(var j=0;j<t.length;j++){
                $("#tag_list li:nth-child("+(j+1)+")").text(t[j]).removeClass("d-none");
                
                // var list = "<li>"+t[j]+"</li>";
                // $("#tag_list").append(list);
            }
        }
        for(var i=0;i<data.comment.length;i++){
            $("#comment_list").append(`
            <li class="comment">
                                <a class="pull-left" href="#">
                                    <div class="user-profile">
                                        <img src="img/logo.png" alt="">
                                    </div>
                                </a>
                                <div class="comment-body">
                                    <div class="comment-heading">
                                        <h4 class="user">${data.comment[i].user_Nick}</h4>
                                        <h5 class="post-time">5 minutes ago</h5>
                                        <div class="post-like">
                                            <button class="heart-icon">
                                                <svg width="60" height="30" viewBox="0 0 76 59" fill="none">
                                                    <!-- 회색하트 -->
                                                    <path opacity="0.8" fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M44.1 14.7742C51.2736 1.93619 75.95 6.41968 75.95 24.9662C75.95 37.3632 65.3317 48.6724 44.1 58.9134C22.8683 48.6724 12.25 37.3583 12.25 24.9662C12.25 6.41968 36.9264 1.93619 44.1 14.7742V14.7742Z"
                                                        fill="#1C1C1C" class="redchange" id="gray-h" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M35.3633 56.2185C57.3545 45.6149 68.6 33.6295 68.6 20.0663C68.6 1.37278 44.786 -6.12912 34.3 5.66028C23.814 -6.12912 0 1.37278 0 20.0663C0 33.6295 11.2455 45.6149 33.2367 56.2185L34.3 56.733L35.3633 56.2185V56.2185ZM36.4413 11.0699C42.8505 -0.405915 63.7 5.01348 63.7 20.0663C63.7 31.0913 54.0617 41.5577 34.3 51.2891C14.5383 41.5577 4.9 31.0913 4.9 20.0663C4.9 5.01348 25.7495 -0.405915 32.1636 11.0699C32.1636 11.0699 33.2318 12.5301 34.3 12.5301C35.3682 12.5301 36.4413 11.0699 36.4413 11.0699V11.0699Z"
                                                        fill="#1C1C1C" />
                                                </svg>
                                            </button>
                                            <input type="number" class="like-number" value="${data.comment[i].comment_like}">
                                        </div>
                                        </br>
                                        <div class="map_wrap">
                                            <div id="map"></div>
                                            <div class="hAddr">
                                                <h5 class="post-location"></h5>
                                            </div>
                                        </div>
                                    </div>
                                    <p>${data.comment[i].comment_Content}</p>
                                </div>
                            </li>
            `);
        }
        
        $("#exampleModal01").modal('show');
        $("#exampleModal01").on('hidden.bs.modal',function(){
            for(var j=0;j<3;j++){
                $("#tag_list").children('li').text();
                $("#tag_list").children('li').addClass('d-none');
            }
        });
        $("#exampleModal01").on('hidden.bs.modal',function(){
            for(var i=0;i<data.comment.length;i++){
                $("#comment_list").empty();
            }
        });
    },
    error:function(error){
    console.log(error);
    }
    });
});