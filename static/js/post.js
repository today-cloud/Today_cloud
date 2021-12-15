
$(document).ready (function (e) {
    var n_num = 0;
    // var end_num = 4;
    var tag_a = new Array();

    $("#qc_tag").keydown(function(e) {
    var n_value = $("#qc_tag").val();
    // var name = "<div name=tag_a"+n_num+">"+"# "+n_value+"&nbsp"+"<i class='fas fa-times btnDelete'></i></div>"
    var name = "<div name="+tag_a[n_num]+">"+"# "+n_value+"&nbsp"+"<i class='fas fa-times btnDelete'></i></div>"
        if ( n_num != 3 ) {
            if ( e.keyCode == 13 ) {
                $('#content').append(name);
                tag_a.push('tag_'+n_num);
                n_num ++;
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
        n_num --;
        tag_a.pop();
        $("#qc_tag").attr("disabled", false);
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