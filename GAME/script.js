const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const xOffset = -1080
const yOffset = -500
//1024
canvas.height = document.body.getBoundingClientRect().height* 0.6 // 576
canvas.width = document.body.getBoundingClientRect().width * 0.85;
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

const boundaries = []
const offset = {
    x: document.body.getBoundingClientRect().width*-1, // 576
    y: document.body.getBoundingClientRect().height *-0.05
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})

const image = new Image()
image.src = './img/gameMap2.png'

const foregroundImage = new Image()
foregroundImage.src = './img/foregroundObjects2.png'

const playerDownImage = new Image()
playerDownImage.src = './img/livDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/livUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/livLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/livRight.png'


const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 8 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerDownImage,
    frames: {
        max: 8
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
    },

})
console.log(player)
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
})


const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const movables = [background, ...boundaries, foreground]

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}
const speed = 4 //default is 3
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach((boundary) => {
        boundary.draw()
    })

    player.draw()
    foreground.draw()

    let moving = true
    player.moving = false
    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + speed
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.y += speed
            })
    } else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + speed,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.x += speed
            })
    } else if (keys.s.pressed && lastKey === 's') {
        player.moving = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - speed
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.y -= speed
            })
    } else if (keys.d.pressed && lastKey === 'd') {
        player.moving = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - speed,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.x -= speed
            })
    }
}
animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break

        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break

        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('touchstart', handleTouchStart, false);
        button.addEventListener('touchend', handleTouchEnd, false);
    });

    function handleTouchStart(event) {
        console.log(event.target.id)
        event.preventDefault();
        const direction = event.target.id;
        updateKeyState(direction, true);
    }

    function handleTouchEnd(event) {
        event.preventDefault();
        const direction = event.target.id;
        updateKeyState(direction, false);
    }

    function updateKeyState(direction, isPressed) {
        switch (direction) {
            case 'up':
                keys.w.pressed = isPressed;
                if (isPressed) lastKey = 'w';
                break;
            case 'left':
                keys.a.pressed = isPressed;
                if (isPressed) lastKey = 'a';
                break;
            case 'down':
                keys.s.pressed = isPressed;
                if (isPressed) lastKey = 's';
                break;
            case 'right':
                keys.d.pressed = isPressed;
                if (isPressed) lastKey = 'd';
                break;
        }
    }
});