let timer = 60;
let interval;

function startTimer() {
  timer = 60;
  document.getElementById("timer").innerText = timer;
  document.getElementById("resendBtn").disabled = true;
  document.getElementById("resendBtn").classList.remove("active");

  interval = setInterval(() => {
    timer--;
    document.getElementById("timer").innerText = timer;

    if (timer <= 0) {
      clearInterval(interval);
      document.getElementById("timerText").innerText = "می‌توانید دوباره کد را ارسال کنید";
      const resendBtn = document.getElementById("resendBtn");
      resendBtn.disabled = false;
      resendBtn.classList.add("active");
    }
  }, 1000);
}

sendCodeBtn.onclick = () => {
  stepPhone.style.display = "none";
  stepOtp.style.display = "block";
  startTimer();
};

document.getElementById("resendBtn").onclick = () => {
  document.getElementById("timerText").innerHTML =
    'ارسال مجدد کد تا <span id="timer">60</span> ثانیه';
  startTimer();
};