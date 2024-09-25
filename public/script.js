const login1=document.getElementById('Login1Part');
const login2=document.getElementById('loginPart');
const haveAccount=document.getElementById('haveAc');
const newAccount=document.getElementById('newAc');

login2.style.display='none';

haveAccount.addEventListener('click',()=>{
    login1.style.display='block';
    login2.style.display='none';
});
newAccount.addEventListener('click',()=>{
    login1.style.display='none';
    login2.style.display='block';
})