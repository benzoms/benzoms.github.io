document.addEventListener('DOMContentLoaded', () => {

    const countDownDate = new Date("Jul 10, 2024 10:15:00").getTime();
    const startDate = new Date("Jun 1, 2024, 16:30:00").getTime();
    
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distanceWhole = countDownDate - startDate;
    const distanceLeft = countDownDate - now;

    // Time calculations for minutes and percentage progressed
    const minutesLeft = Math.floor(distanceLeft / (1000 * 60));
    const minutesTotal = Math.floor(distanceWhole / (1000 * 60));
    const progress = Math.floor(((minutesTotal - minutesLeft) / minutesTotal) * 100);

    // Update the progress bar
    const progressBar = document.getElementById('progressbar');
    progressBar.setAttribute('aria-valuenow', progress);
    progressBar.style.width = progress + "%";
    progressBar.innerHTML = progress + "%";
});

document.addEventListener('DOMContentLoaded', () => {
    const egg = document.querySelector('.egg');
    const eggMsg = document.querySelector('.eggmsg');

    egg.addEventListener('click', () => {
        if (eggMsg.classList.contains('show')) {
            eggMsg.classList.remove('show');
        } else {
            eggMsg.classList.add('show');
        }
    });
});

// // countdown.js

// // Set the date we're counting down to
// const countDownDate = new Date("Jul 10, 2024 10:15:00").getTime();

// // Update the count down every 1 second
// const x = setInterval(() => {

//   // Get today's date and time
//   const now = new Date().getTime();
    
//   // Find the distance between now and the count down date
//   const distance = countDownDate - now;
    
//   // Time calculations for days, hours, minutes and seconds
//   const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
//   // Output the result in an element with id="demo"
//   document.getElementById("demo").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    
//   // If the count down is over, write some text 
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML = "EXPIRED";
//   }
// }, 1000);

// module.exports = x;
