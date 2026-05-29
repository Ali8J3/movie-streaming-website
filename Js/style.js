const overlay = document.getElementById("overlay");
const userIcon = document.getElementById("userIcon");
const closeBtn = document.querySelector(".close");
const backBtn = document.querySelector(".back");
  
userIcon.onclick = () => 
    {
        overlay.style.display = "flex";
    };

closeBtn.onclick = backBtn.onclick = () => 
    { 
        overlay.style.display = "none";
    };

overlay.onclick = (e) => 
    {
        if (e.target === overlay) overlay.style.display = "none";
    };

    // ______________________________________________________________
const sendCodeBtn = document.getElementById("sendCodeBtn");
const stepPhone = document.getElementById("stepPhone");
const stepOtp = document.getElementById("stepOtp");
const backToPhone = document.getElementById("backToPhone");
    
sendCodeBtn.onclick = () =>     
    {
        stepPhone.style.display = "none";
        stepOtp.style.display = "block";
    };

backToPhone.onclick = () => 
    {
        stepOtp.style.display = "none";
        stepPhone.style.display = "block";  
    };