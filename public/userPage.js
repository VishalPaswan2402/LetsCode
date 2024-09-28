const widthPer=document.querySelectorAll('.widPer');
widthPer.forEach(wid=>{
    wid.style.width=`${wid.innerHTML}`;
})

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
})
