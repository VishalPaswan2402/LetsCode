(() => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
})()


// to focus next input in otp verify
function moveNext(current, nextFieldId) {
  if (current.value.length === 1) {
      document.getElementById(nextFieldId).focus();
  }
};


// Flash Time Out...
setTimeout(function(){
  document.getElementById('flashId').style.display = 'none';
}, 3000);