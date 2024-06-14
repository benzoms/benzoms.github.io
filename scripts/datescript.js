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

    const decminutesLeft = (distanceLeft / (1000 * 60));
    const decminutesTotal = (distanceWhole / (1000 * 60));
    const decprogress = (((decminutesTotal - decminutesLeft) / decminutesTotal) * 100);

    // Update the progress bar
    const progressBar = document.getElementById('progressbar');
    progressBar.setAttribute('aria-valuenow', progress);
    progressBar.style.width = progress + "%";
    // progressBar.innerHTML = progress + "%";
    progressBar.innerHTML = decprogress.toString().substring(0, 6) + "%";
});

document.addEventListener('DOMContentLoaded', () => {
    const egg1 = document.getElementById('egg1');
    const eggMsg1 = document.getElementById('eggmsg1');

    egg1.addEventListener('click', () => {
        if (eggMsg1.classList.contains('show')) {
            eggMsg1.classList.remove('show');
        } else {
            eggMsg1.classList.add('show');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const egg2 = document.getElementById('egg2hb');
    const eggMsg2 = document.getElementById('eggmsg2');

    egg2.addEventListener('click', () => {
        if (eggMsg2.classList.contains('show')) {
            eggMsg2.classList.remove('show');
        } else {
            eggMsg2.classList.add('show');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const egg3 = document.getElementById('egg3hb');
    const eggMsg3 = document.getElementById('eggmsg3');

    egg3.addEventListener('click', () => {
        if (eggMsg3.classList.contains('show')) {
            eggMsg3.classList.remove('show');
        } else {
            eggMsg3.classList.add('show');
        }
    });
});
// function toggleMap(){
//     const div = document.querySelector('#mapicondiv');
//     const map = document.querySelector('#map');
//     div.addEventListener('click', () => {
//         if (map.classList.contains('show')) {
//             map.classList.remove('show');
            
//         } else {
//             map.classList.add('show');
//         }
//     });
// }
const deployed = true;
let pathroot = '';
if(!deployed){
    pathroot = 'file:///Users/benzhang/Mine/Tech/Projects/backgrounds/';
}else {
    pathroot = 'https://';
}
console.log(pathroot+"benzoms.github.io/pages/date/library.html");

document.addEventListener('DOMContentLoaded', () => {
    const div = document.querySelector('#mapicondiv');
    const map = document.querySelector('#map');
    div.addEventListener('click', () => {
        if (map.classList.contains('show')) {
            map.classList.remove('show');
        } else {
            map.classList.add('show');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const library = document.querySelector('#library');
    
    library.addEventListener('click', () => {
        window.location.replace(pathroot+"benzoms.github.io/pages/date/library.html");
        // if (map.classList.contains('show')) {
        //     map.classList.remove('show');
        // } else {
        //     map.classList.add('show');
        // }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const egggarden = document.querySelector('#egggarden');
    
    egggarden.addEventListener('click', () => {
        window.location.replace(pathroot+"benzoms.github.io/pages/date.html");
        // if (map.classList.contains('show')) {
        //     map.classList.remove('show');
        // } else {
        //     map.classList.add('show');
        // }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const photoforest = document.querySelector('#photoforest');
    
    photoforest.addEventListener('click', () => {
       
        window.location.replace(pathroot+"benzoms.github.io/pages/date/photoforest.html");
        // if (map.classList.contains('show')) {
        //     map.classList.remove('show');
        // } else {
        //     map.classList.add('show');
        // }
    });
});

// document.addEventListener('DOMContentLoaded', () => {
//     const div = document.querySelector('#mapicondiv');
//     const icon = document.querySelector('#mapicon');
//     const close = document.querySelector('#closemapbtn');

//     div.addEventListener('click', () => {
//         if (close.classList.contains('show')) {
//             close.classList.remove('show');
//             icon.classList.remove('hide')
            
//         } else {
//             close.classList.add('show');
//             icon.classList.add('hide');
//         }
//     });
// });

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
