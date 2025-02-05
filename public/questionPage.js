document.addEventListener('DOMContentLoaded', function () {
    const markDoneButtons = document.querySelectorAll('.markDone');
    const blockPg = document.getElementById('blockPg');

    markDoneButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            let qid = btn.getAttribute('data-index');
            const formDiv = document.getElementById(`markAsDone-${qid}`);
            formDiv.style.display = 'block';
            blockPg.style.display = 'block';
            const subBtn = document.getElementById(`sub${qid}`);
            subBtn.addEventListener('click', () => {
                const forms = document.getElementById(`form${qid}`);
                forms.submit();
                formDiv.style.display = 'none';
                blockPg.style.display = 'none';
            })
            const cancleBtn = document.getElementById(`cancle${qid}`);
            console.log(cancleBtn);
            cancleBtn.addEventListener('click', () => {
                formDiv.style.display = 'none';
                blockPg.style.display = 'none';
            })
        })
    })
});
