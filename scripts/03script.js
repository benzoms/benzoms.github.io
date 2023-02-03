var mydiv0_isdrag, mydiv1_isdrag, mydiv2_isdrag, mydiv3_isdrag, mydiv4_isdrag = false;

var curr_clock_style = 0;

var clock_width = "60rem";

// // Create an array to store the audio files
// const audioFiles = [];

// // Pre-load the audio files
// audioFiles.push(new Audio('../sounds/checkitem.mp3'));
// audioFiles.push(new Audio('../sounds/newitem.mp3'));
// audioFiles.push(new Audio('../sounds/clearitem.mp3'));
// // Play the first sound effect

// audioFiles[1].volume = 1;	
// audioFiles[2].volume = 0.3;		
var shelf1Out = false;
var shelf2Out = false;
document.getElementById('shelf1').onclick = function() {
    if (shelf1Out) {
        this.style.left = parseFloat(getComputedStyle(this).left) - 900 +'px';
        shelf1Out = !shelf1Out;
    }else {
        
        this.style.left = parseFloat(getComputedStyle(this).left) + 900 +'px';
        shelf1Out = !shelf1Out;
    }
    
  };

  document.getElementById('shelf2').onclick = function() {
    if (shelf2Out) {
        this.style.left = parseFloat(getComputedStyle(this).left) - 900 +'px';
        shelf2Out = !shelf2Out;
    }else {       
        this.style.left = parseFloat(getComputedStyle(this).left) + 900 +'px';
        shelf2Out = !shelf2Out;
    }
  };

// function slideShelf(){
//     console.log('hey')
//     document.getElementById("shelf1").classList.toggle('slideOut');
// }
// $(function(){
// 	$('.shelf').click(function(e){
//     $('shelf1').toggleClass('slideOut');
//     //$('.op').toggleClass('po');
// 	});
// });



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
    if (h >= 12) {
        session = "PM";
    }
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
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
            break;
        case 1:
            var time = month_word_long + " " + dis_day + " " + "   " + dis_time;
            if (clock_width != "60rem") {
                clock_width = "60rem"
                document.getElementsByClassName("clock")[0].style.width = (clock_width);
            }
            break;
        case 2:
            var time = month_word_short + "   " + h + ":" + m + ":" + s + " " + session;
            break;
    }
    document.getElementById("MyClockDisplay").innerHTML = time;
    setTimeout(showTime, 1000);

}

showTime();
function set_clock_style(sty){
    curr_clock_style = sty;
}






function toggleAllDrag() {
    toggleDrag(0);
    toggleDrag(1);
    toggleDrag(2);
    toggleDrag(3);
    toggleDrag(4);
}

function toggleDrag(el_id) {
    var num = el_id.toString();
    if(num == "0") {
        num = "";
    }
    console.log("mydiv" + num);
    elmnt = document.getElementById("mydiv" + num);
    
    varname = elmnt.id + "_isdrag";
    window[varname] = !window[varname];
    if(window[varname]) {
        console.log(elmnt.id + " is draggable.");
    }else {
        console.log(elmnt.id + " is no longer draggable.");
    }
    dragElement(elmnt);
}



//given an element and suffix, return the string containing the name of the desired variable
function dragElemHelper(elmnt, suffix) {
    elem_id = elmnt.id + suffix;
    console.log(elem_id);
    console.log(window[elem_id]);
}

function getIsDragStatusFromElmnt(elmnt) {
    elem_id = elmnt.id + "_isdrag";
    console.log(elem_id);
    console.log(window[elem_id]);
    if (window[elem_id] != null) {
        return window[elem_id];
    }
}

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
        if (getIsDragStatusFromElmnt(elmnt)) {
            console.log("can move")
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }
        
    }

    function elementDrag(e) {
        if (getIsDragStatusFromElmnt(elmnt)) {
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
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}



function playCheckItemSound() {
    var audio = new Audio('../sounds/checkitem.mp3')
    audio.volume = 0.025;	
    audio.play();
}
function playClearItemSound() {
    var audio1 = new Audio('../sounds/clearitem.mp3')
    audio1.volume = 0.3;	
    audio1.play();
}
function playNewItemSound() {
    var audio2 = new Audio('../sounds/newitem.mp3')
    audio.volume2 = 1;	
    audio2.play();
}


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
    playClearItemSound();
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    // var audio = new Audio('sounds/checkitem.mp3');		
    	
    // audio.play();
    playCheckItemSound();
    // audioFiles[0].play();
  }
}, false);
// function playclearitem() {
//     var audio = new Audio('sounds/clearitem.mp3');	
    
//     audio.play();
// }
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

//   var audio = new Audio('sounds/newitem.mp3');	
//   audio.play();

  playNewItemSound();
//   audioFiles[1].play();

//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//         // playclearitem();
        
        
//         var div = this.parentElement;
//         div.style.display = "none";
//     }
//   }
}