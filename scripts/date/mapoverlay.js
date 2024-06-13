const deployed = true;
let pathroot = '';
if(!deployed){
    pathroot = 'file:///Users/benzhang/Mine/Tech/Projects/backgrounds/';
}else {
    pathroot = 'https://'
}
console.log(pathroot+"benzoms.github.io/pages/date/library.html")
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