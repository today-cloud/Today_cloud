function setThumbnail(event) {
    var reader = new FileReader();

    reader.onload = function(event) {
        var img = document.createElement("img");
        // var img = document.getElementById('imageid');
        // var width = image_container.clientWidth;
        // var height = image_container.clientHeight;
        img.setAttribute("src", event.target.result);
        document.querySelector("div#image_container").appendChild(img);
        // document.querySelector('div#image_container').style.height = img.clientHeight + '150px';
        // document.querySelector('div#image_container').style.width = img.clientHeight + '150px';
    };

    reader.readAsDataURL(event.target.files[0]);
}
