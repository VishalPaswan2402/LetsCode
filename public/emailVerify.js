function moveNext(current, nextFieldId) {
    if (current.value.length === 1) {
        document.getElementById(nextFieldId).focus();
    }
}

function startCountdown(duration, display) {
    var timer = duration, minutes, seconds;
    var interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(interval);
            display.textContent = "Time's up!";
            // You can also disable the input fields or the submit button here if needed
            disableOTPInputs();
        }
    }, 1000);
}

function disableOTPInputs() {
    const inputs = document.querySelectorAll('.otp-input');
    inputs.forEach(input => input.disabled = true);
    const button = document.querySelector('button[type="submit"]');
    button.disabled = true;
}

window.onload = function () {
    var twoMinutes = 60 * 1.5, // 2 minutes in seconds
        display = document.getElementById('timer');
    startCountdown(twoMinutes, display);
};

