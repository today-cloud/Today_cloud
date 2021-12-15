let likebtn = document.querySelector('.heart-icon');
let input1 = document.querySelector(".like-number");
let redchange = document.querySelector(".redchange");

likebtn.addEventListener('click', ()=> {
    input1.value = parseInt(input1.value) + 1;
    redchange.style.fill = "#AE0638";
});