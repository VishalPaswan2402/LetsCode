const widthPer=document.querySelectorAll('.widPer');
widthPer.forEach(wid=>{
    wid.style.width=`${wid.innerHTML}`;
});

// show percntage...
let solvedCircles=document.querySelectorAll('.solvedCircle');
solvedCircles.forEach(circle=>{
    const perData = circle.querySelector('.perData');
    let originalTxt=circle.innerText;
    circle.addEventListener('mouseover',()=>{
        let txtPrt=circle.ELEMENT_NODE;
        const[num,den]=originalTxt.split('/').map(Number);
        let perc=((num/den)*100).toFixed(2);
        perData.innerText=perc+"%";
    })
    circle.addEventListener('mouseout', () => {
        perData.innerText = originalTxt;
    });
});
// show percntage...

// for show hide profile option...
let changeDpBtn=document.querySelector('#cameraChange');
let chandeDiv=document.querySelector('#profileChange');
let closeDp=document.querySelector('.closeProfBtn');
let overlay=document.querySelector('#overlay');
changeDpBtn.addEventListener('click',()=>{
    overlay.style.display='block';
    chandeDiv.style.display='block';
});
closeDp.addEventListener('click',()=>{
    overlay.style.display='none';
    chandeDiv.style.display='none';
});
// for show hide profile option...

// profile Links...
const boysProfile=[
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvPdoevsjMP8uVAZqsTfEPkiWJViA4EnfTRg&s',
    'https://img.freepik.com/premium-vector/cute-boy-smiling-cartoon-kawaii-boy-illustration-boy-avatar-happy-kid_1001605-3447.jpg',
    'https://prompti.ai/wp-content/uploads/2023/07/pcboi2.png',
    'https://play-lh.googleusercontent.com/oDJlPxyGhm6DtV72DyB09AA2d-UlSoRuySHDxUpq2GF4diwD0w6bTRYKImEVC1CVuw',
    'https://img.freepik.com/premium-vector/young-boy-sitting-alone-wooden-pier-enjoying-peace-hand-drawn-mascot-cartoon-character_730620-356796.jpg'
];
const girlProfile=[
    'https://photoswalay.com/wp-content/uploads/2024/05/cartoon-girl-dp-3.jpg',
    'https://img.freepik.com/premium-photo/cute-cartoon-girl-character_734126-785.jpg',
    'https://i.pinimg.com/736x/35/87/62/358762d635b193d1e74e98b2eded1726.jpg',
    'https://finetechhub.com/wp-content/uploads/2024/07/Natural-garden-image-cartoon-images-girl-1024x1024.jpg.webp',
    'https://finetechhub.com/wp-content/uploads/2024/07/Phoolon-ki-fulvari-aur-book-cute-girl-photo-cartoon-1024x1024.jpg.webp'
];
// profile Links...

// to change profile...
let allDps=document.querySelectorAll('.dp');
let profReflect=document.querySelector('.dpCircle');
let profNumber=document.querySelector('#profileNo');
allDps.forEach(dps =>{
    dps.addEventListener('click',()=>{
        let dpId=dps.id;
        let dpType=dpId.charAt(0);
        let dpNoTxt=dpId.charAt(1);
        let dpNo=parseInt(dpId.charAt(1));
        let dpLinks=dpNo-1;
        if(dpType==='b'){
            let refLink=boysProfile[dpLinks];
            profNumber.value='b'+dpNoTxt;
            profReflect.style.backgroundImage = `url('${refLink}')`;
        }
        else{
            let refLink=girlProfile[dpLinks];
            profNumber.value='g'+dpNoTxt;
            profReflect.style.backgroundImage = `url('${refLink}')`;
        }
    })
});
// to change profile...