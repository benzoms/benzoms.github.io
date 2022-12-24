

var menuShown = true;
var todoShown = true;
var upcomingShown = true;
var pomShown = true;
var checkShown = true;
var checkinputShown = true;
var studyBreakShown = true;
var clock_width = "60rem";

var todoborder = true;
var clockborder = true;
var upcomingborder = true;
var checkborder = true;
var checkinputborder = true;
var menuborder = true;

var curr_clock_style = 0;

var mysetminutes = "25",
    mysetseconds = "00";

function getRandInt(max) {
    out = Math.floor(Math.random() * max);
    if(out == 1){
        out = getRandInt(max);
    }
    return out;
}


function setPomodoro(){
    document.querySelector("#minutes").innerHTML = mysetminutes,
    document.querySelector("#seconds").innerHTML =  mysetseconds;
}
setPomodoro();

function setRandWallpaper() {
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    var curr = parseInt(rs.getPropertyValue('--curr_wall_num'));
    var maxw = parseInt(rs.getPropertyValue('--max_gif_num'));
    newwp = getRandInt(maxw);
    while (newwp==curr) {
        newwp = getRandInt(maxw)
    }
    
    r.style.setProperty('--curr_wall_num', newwp);
    document.getElementById('name').innerHTML = newwp;
    var nexturl = "url(\'Gifs/" + newwp + ".gif\')";
    document.body.style.backgroundImage = nexturl;
}

function nextWallpaper() {
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    var curr = parseInt(rs.getPropertyValue('--curr_wall_num'));
    var maxw = parseInt(rs.getPropertyValue('--max_gif_num'));
    if (curr < maxw) {
        curr += 1;
    } else {
        curr = 1
    }
    r.style.setProperty('--curr_wall_num', curr);
    document.getElementById('name').innerHTML = curr;
    var nexturl = "url(\'Gifs/" + curr + ".gif\')";
    document.body.style.backgroundImage = nexturl;
}

function prevWallpaper() {
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    var curr = parseInt(rs.getPropertyValue('--curr_wall_num'));
    var maxw = parseInt(rs.getPropertyValue('--max_gif_num'));
    if (curr > 1) {
        curr -= 1;
    } else {
        curr = maxw;
    }
    r.style.setProperty('--curr_wall_num', curr);
    document.getElementById('name').innerHTML = curr;
    var nexturl = "url(\'Gifs/" + curr + ".gif\')";
    document.body.style.backgroundImage = nexturl;
}

function setWallpaper() {
    var wp_input = document.getElementById("wp_input").value;
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    var curr = parseInt(rs.getPropertyValue('--curr_wall_num'));
    var maxw = parseInt(rs.getPropertyValue('--max_gif_num'));
    
    curr = wp_input;

    r.style.setProperty('--curr_wall_num', curr);
    document.getElementById('name').innerHTML = curr;
    var nexturl = "url(\'Gifs/" + curr + ".gif\')";
    document.body.style.backgroundImage = nexturl;
}



function showTime() {
    clock_style = curr_clock_style;
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var month = date.getMonth(); // 0 - 59
    var myday = date.getUTCDate();
    var session = "AM";
    var month_list = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var month_list_short = [
        "Jan", "February", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var month_word_short = month_list_short[month];
    var month_word_long = month_list[month];
    // if (h == 0) {
    //     h = 12;
    // }

    if (h >= 12) {
        // h = h - 12;
        session = "PM";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    //var dis_month = month_word;
    var dis_day = myday;
    var dis_time = h + ":" + m + ":" + s + " " + session;
    switch (clock_style){
        case 0:
            var time = month_word_long + " " + dis_day + "</br>" + dis_time;
            if (clock_width != "40rem") {
                clock_width = "40rem"
                elements = document.getElementsByClassName("clock")

                elements[0].style.width = clock_width;
            }
            //alert(time);
            break;
            //alert("asd");
        case 1:
            var time = month_word_long + " " + dis_day + "  " + dis_time;
            if (clock_width != "60rem") {
                clock_width = "60rem"
                document.getElementsByClassName("clock")[0].style.width = (clock_width);
            }
            break;
        case 2:
            var time = month_word_short + "   " + h + ":" + m + ":" + s + " " + session;
            break;
        // default:
        //     var time = month_word_long + " " + dis_day + "\n" + dis_time;
        //     alert("s");
    }
    
    //document.getElementById("MyClockDisplay").innerText = time;
    //document.getElementById("MyClockDisplay").textContent = time;
    document.getElementById("MyClockDisplay").innerHTML = time;
    setTimeout(showTime, 1000);

}

showTime();
function set_clock_style(sty){
    curr_clock_style = sty;
}

dragElement(document.getElementById("mydiv"));
dragElement(document.getElementById("mydiv2"));
// dragElement(document.getElementById("mydiv3"));
dragElement(document.getElementById("mydiv4"));
dragElement(document.getElementById("mydiv5"));
dragElement(document.getElementById("mydiv6"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function toggleUpcomingBorder() {
    if (upcomingborder) {
        document.getElementById("upcomingsettings").style.border = "0";
        upcomingborder = false;
    } else {
        document.getElementById("upcomingsettings").style.border = "dashed";
        upcomingborder = true;
    }
}

function toggleCheckBorder() {
    if (checkborder) {
        document.getElementById("mydiv6").style.border = "0";
        checkborder = false;
    } else {
        document.getElementById("mydiv6").style.border = "dashed";
        checkborder = true;
    }
}

function toggleMenuBorder() {
    if (menuborder) {
        document.getElementById("menu").style.border = "0";
        menuborder = false;
    } else {
        document.getElementById("menu").style.border = "dashed";
        menuborder = true;
    }
}

function toggleCheckInputBorder() {
    if (checkborder) {
        document.getElementById("mydiv4header").style.border = "0";
        checkborder = false;
    } else {
        document.getElementById("mydiv4header").style.border = "dashed";
        checkborder = true;
    }
}


function toggleTodoBorder() {
    if (todoborder) {
        document.getElementById("todosettings").style.border = "0";
        todoborder = false;
    } else {
        document.getElementById("todosettings").style.border = "dashed";
        todoborder = true;
    }
}


function toggleClockBorder() {
    if (clockborder) {
        document.getElementById("MyClockDisplay").style.border = "0";
        clockborder = false;
    } else {
        document.getElementById("MyClockDisplay").style.border = "dashed";
        clockborder = true;
    }
}

function incrementUpcomingOpac() {
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    var currOpac = parseFloat(rs.getPropertyValue('--upcomingborderopacity'));
    var newOpac = currOpac + 0.1;
    newOpac = newOpac.toFixed(1);
    r.style.setProperty('--upcomingborderopacity', newOpac);
    document.getElementById("upcomingsettings").style.backgroundColor = rgba(0, 0, 0, newOpac);
}

function decrementUpcomingOpac() {
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    var currOpac = parseFloat(rs.getPropertyValue('--upcomingborderopacity'));
    var newOpac = currOpac - 0.1;
    newOpac = newOpac.toFixed(1);
    r.style.setProperty('--upcomingborderopacity', newOpac);
    document.getElementById("upcomingsettings").style.backgroundColor = rgba(0, 0, 0, newOpac);
}

function incrementClockOpac() {
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    var currOpac = parseFloat(rs.getPropertyValue('--clockborderopacity'));
    var newOpac = currOpac + 0.1;
    newOpac = newOpac.toFixed(1);
    r.style.setProperty('--clockborderopacity', newOpac);
    document.getElementById("MyClockDisplay").style.backgroundColor = (0, 0, 0, newOpac);
}

function decrementClockOpac() {
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    var currOpac = parseFloat(rs.getPropertyValue('--clockborderopacity'));
    var newOpac = currOpac - 0.1;
    newOpac = newOpac.toFixed(1);
    r.style.setProperty('--clockborderopacity', newOpac);
    document.getElementById("MyClockDisplay").style.backgroundColor = (0, 0, 0, newOpac);
}

function incrementTodoOpac() {
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    var currOpac = parseFloat(rs.getPropertyValue('--todoborderopacity'));

    var newOpac = currOpac + 0.1;

    newOpac = newOpac.toFixed(1);

    r.style.setProperty('--todoborderopacity', newOpac);
    document.getElementById("todosettings").style.backgroundColor = rgba(0, 0, 0, newOpac);

}

function decrementTodoOpac() {
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    var currOpac = parseFloat(rs.getPropertyValue('--todoborderopacity'));

    var newOpac = currOpac - 0.1;

    newOpac = newOpac.toFixed(1);

    r.style.setProperty('--todoborderopacity', newOpac);
    document.getElementById("todosettings").style.backgroundColor = rgba(0, 0, 0, newOpac);

}

function incrementCheckInputOpac() {
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    var currOpac = parseFloat(rs.getPropertyValue('--upcomingborderopacity'));

    var newOpac = currOpac + 0.1;

    newOpac = newOpac.toFixed(1);

    r.style.setProperty('--upcomingborderopacity', newOpac);
    document.getElementById("mydiv4header").style.backgroundColor = rgba(0, 0, 0, newOpac);

}

function decrementCheckInputOpac() {
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    var currOpac = parseFloat(rs.getPropertyValue('--upcomingborderopacity'));

    var newOpac = currOpac - 0.1;

    newOpac = newOpac.toFixed(1);

    r.style.setProperty('--upcomingborderopacity', newOpac);
    document.getElementById("mydiv4header").style.backgroundColor = rgba(0, 0, 0, newOpac);

}

function incrementMenuOpac() {
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    var currOpac = parseFloat(rs.getPropertyValue('--menubgopacity'));

    var newOpac = currOpac + 0.1;

    newOpac = newOpac.toFixed(1);

    r.style.setProperty('--menubgopacity', newOpac);
    document.getElementById("menu").style.backgroundColor = (0, 0, 0, newOpac);

}

function decrementMenuOpac() {
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    var currOpac = parseFloat(rs.getPropertyValue('--menubgopacity'));

    var newOpac = currOpac - 0.1;

    newOpac = newOpac.toFixed(1);

    r.style.setProperty('--menubgopacity', newOpac);
    document.getElementById("menu").style.backgroundColor = (0, 0, 0, newOpac);

}


function toggleMenu() {
    if (menuShown) {
        document.getElementById("mydiv3").style.zIndex = "-1";
        document.getElementById("mydiv3").style.opacity = "0";
        menuShown = false;
    } else {
        document.getElementById("mydiv3").style.zIndex = "9";
        document.getElementById("mydiv3").style.opacity = "1.0";
        menuShown = true;
    }

}


function toggleCheckInput() {
    if (checkinputShown) {
        document.getElementById("mydiv4").style.zIndex = "-1";
        document.getElementById("mydiv4").style.opacity = "0";
        checkinputShown = false;
    } else {
        document.getElementById("mydiv4").style.zIndex = "9";
        document.getElementById("mydiv4").style.opacity = "1.0";
        checkinputShown = true;
    }

}

// function toggleTodo() {

//     if (todoShown) {
//         document.getElementById("mydiv2").style.zIndex = "-1";
//         document.getElementById("mydiv2").style.opacity = "0";
//         todoShown = false;
//     } else {
//         document.getElementById("mydiv2").style.zIndex = "9";
//         document.getElementById("mydiv2").style.opacity = "1.0";
//         todoShown = true;
//     }
// }


function toggleItem(item_status, item_name, item_display_name, abbr) {
    if (item_status) {
        document.getElementById(item_name).style.zIndex = "-1";
        document.getElementById(item_name).style.opacity = "0";
        //document.getElementById(item_display_name).innerHTML = abbr+":0";
        return false;
    } else {
        document.getElementById(item_name).style.zIndex = "9";
        document.getElementById(item_name).style.opacity = "1.0";
        //document.getElementById(item_display_name).innerHTML = abbr+":1";
        return true;
    }
}

function toggleUpcoming() {
    upcomingShown = toggleItem(upcomingShown, "mydiv4", "showupcoming", "U");
}
function togglePomodoro() {
    pomShown = toggleItem(pomShown, "mydiv5", "showpom", "P");
}
function toggleTodo() {
    todoShown = toggleItem(todoShown, "mydiv2", "showtodo", "T");
}

function toggleCheck() {
    checkShown = toggleItem(checkShown, "mydiv6", "showcheck", "C");
}

function toggleStudyBreakBtn() {
    if (studyBreakShown) {
        document.getElementById("pomo_studybreak_btn").style.zIndex = "-1";
        document.getElementById("pomo_studybreak_btn").style.opacity = "0";
        studyBreakShown = false;
    } else {
        document.getElementById("pomo_studybreak_btn").style.zIndex = "11";
        document.getElementById("pomo_studybreak_btn").style.opacity = "1.0";
        studyBreakShown = true;
    }
}

function studyBreak() {
    toggleStudyBreakBtn();
}


// const elToggle  = document.querySelector("#toggle");
// const elContent = document.querySelector("#content");

// elToggle.addEventListener("click", function() {
//   elContent.classList.toggle("is-hidden");
// });

const progressBar = document.querySelector(".outerRing"),
    minElem = document.querySelector("#minutes"),
    secElem = document.querySelector("#seconds"),
    startStop = document.querySelector("#stsp"),
    setting = document.querySelector("#setting");

let minutes = document.querySelector("#minutes").innerHTML,
    seconds = document.querySelector("#seconds").innerHTML,
    progress = null,
    progressStart = 0,
    progressEnd = parseInt(minutes) * 60 + parseInt(seconds),
    speed = 1000,
    degTravel = 360 / progressEnd,
    toggleSettings = false,
    secRem = 0,
    minRem = 0;

function progressTrack() {
    progressStart++;

    secRem = Math.floor((progressEnd - progressStart) % 60);
    minRem = Math.floor((progressEnd - progressStart) / 60);

    secElem.innerHTML = secRem.toString().length == 2 ? secRem : `0${secRem}`;
    minElem.innerHTML = minRem.toString().length == 2 ? minRem : `0${minRem}`;

    progressBar.style.background = `conic-gradient(
          rgba(157,0,0,0.5) ${progressStart * degTravel}deg,
          rgba(0,0,0,0.2) ${progressStart * degTravel}deg
          )`;
    if (progressStart == progressEnd) {
        progressBar.style.background = `conic-gradient(
                rgba(0,170,81,0.5) 360deg,
                rgba(0,170,81,0.5) 360deg
          )`;
        clearInterval(progress);
        startStop.innerHTML = "START";
        progress = null;
        progressStart = 0;
        var audio = new Audio('sounds/interact.mp3');
        audio.play();
        toggleStudyBreakBtn();
    }
}

function startStopProgress() {
    if (!progress) {
        progress = setInterval(progressTrack, speed);
    } else {
        clearInterval(progress);
        progress = null;
        progressStart = 0;
        progressBar.style.background = `conic-gradient(
                #17171a 360deg,
                #17171a 360deg
          )`;
    }
}

function resetValues() {
    if (progress) {
        clearInterval(progress);
    }
    minutes = document.querySelector("#minutes").innerHTML;
    seconds = document.querySelector("#seconds").innerHTML;
    toggleSettings = false;
    minElem.contentEditable = false;
    minElem.style.borderBottom = `none`;
    secElem.contentEditable = false;
    secElem.style.borderBottom = `none`;
    progress = null;
    progressStart = 0;
    progressEnd = parseInt(minutes) * 60 + parseInt(seconds);
    degTravel = 360 / progressEnd;
    progressBar.style.background = `conic-gradient(
                #17171a 360deg,
                #17171a 360deg
          )`;

}

// MY FUNCTION TO PAUSE
function pauseValues() {
    minutes = document.querySelector("#minutes").innerHTML;
    seconds = document.querySelector("#seconds").innerHTML;
    toggleSettings = false;
    minElem.contentEditable = false;
    minElem.style.borderBottom = `none`;
    secElem.contentEditable = false;
    secElem.style.borderBottom = `none`;
    progress = null;
    progressStart = 0;
    progressEnd = parseInt(minutes) * 60 + parseInt(seconds);
    degTravel = 360 / progressEnd;
    progressBar.style.background = `conic-gradient(
                #17171a 360deg,
                #17171a 360deg
          )`;
}

startStop.onclick = function () {
    if (startStop.innerHTML === "START") {
        if (!(parseInt(minutes) === 0 && parseInt(seconds) === 0)) {
            startStop.innerHTML = "RESET";
            startStopProgress();
        } else {
            alert("Enter the Time Value in your Timer!");
        }
    } else {
        startStop.innerHTML = "START";
        startStopProgress();
    }
};

setting.onclick = function () {
    if (!toggleSettings) {
        toggleSettings = true;
        minElem.contentEditable = true;
        minElem.style.borderBottom = `1px dashed #ffffff50`;
        secElem.contentEditable = true;
        secElem.style.borderBottom = `1px dashed #ffffff50`;
    } else {
        resetValues();
    }
};

minElem.onblur = function () {
    resetValues();
};

secElem.onblur = function () {
    resetValues();
};


var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    var audio = new Audio('sounds/checkitem.mp3');		
    audio.volume = 0.025;		
    audio.play();
  }
}, false);
function playclearitem() {
    var audio = new Audio('sounds/clearitem.mp3');	
    audio.volume = 0.1;	
    audio.play();
}
// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  var audio = new Audio('sounds/newitem.mp3');	
  audio.volume = 1;	
  audio.play();

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        playclearitem();
        var div = this.parentElement;
        div.style.display = "none";
    }
  }
}

function search(ele) {
    if(event.key === 'Enter') {
        // alert(ele.value);
        newElement();        
    }
}

function setwp(ele) {
    if(event.key === 'Enter') {
        // alert(ele.value);
        setWallpaper();        
    }
}





toggleStudyBreakBtn();
toggleMenu();
//toggleUpcoming();
toggleTodoBorder();
toggleCheckInput();
toggleTodo();
toggleCheck();
togglePomodoro();
toggleClockBorder();
setRandWallpaper();


// JavaScript for the color picker
const toggleBtn = document.getElementById('toggle-btn');
const colorInput = document.getElementById('color-input');
const textElement = document.getElementById('text');

function togglePicker() {
  // Show or hide the color picker
  const colorPicker = document.getElementById('color-picker');
  if (colorPicker.style.display === 'none') {
    colorPicker.style.display = 'block';
  } else {
    colorPicker.style.display = 'none';
  }
}

colorInput.addEventListener('input', () => {
  // Update the text color when the color picker value changes
  textElement.style.color = colorInput.value;
});


function readTextFile() {
    let input = document.querySelector('input')
 
let textarea = document.querySelector('textarea')
 
// This event listener has been implemented to identify a
// Change in the input section of the html code
// It will be triggered when a file is chosen.
input.addEventListener('change', () => {
    let files = input.files;
 
    if (files.length == 0) return;
 
    /* If any further modifications have to be made on the
       Extracted text. The text can be accessed using the
       file variable. But since this is const, it is a read
       only variable, hence immutable. To make any changes,
       changing const to var, here and In the reader.onload
       function would be advisible */
    const file = files[0];
 
    let reader = new FileReader();
 
    reader.onload = (e) => {
        const file = e.target.result;
 
        // This is a regular expression to identify carriage
        // Returns and line breaks
        const lines = file.split(/\r\n|\n/);
        alert(lines)
        textarea.value = lines.join('\n');
 
    };
 
    reader.onerror = (e) => alert(e.target.error.name);
 
    reader.readAsText(file);
});
}