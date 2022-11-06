
let canvas,
 ctx,
timer = 0,
animation;
const villains = [];
window.onload = () => {
    canvas =  document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;

    new Character(heroInfo).draw();
    moveEvent.add();
    setImage("./images/reset-button.png", canvas.width-40, 15, 40, 40);
    addResetButtonEvent();
    frameAnimation();
}

const frameAnimation = () => {
    animation = requestAnimationFrame(frameAnimation);
    timer++;

    ctx.font = "48px serif";
    ctx.clearRect(canvas.width-150, 0, 100, 100);
    ctx.strokeText(getTime(), canvas.width-150, 50, 100);
    if(timer % 90 == 0) {
        const villainInfo = {
            x: (canvas.width - 10),
            y: Math.floor((Math.random() * 1000))+1,
            width: 100,
            height: 100,
            color: "black"
        }
        if(villainInfo.y <= 100) villainInfo.y += 200;
        else if(villainInfo.y >= canvas.height - 100) villainInfo.y -= 500;
        villains.push(new Character(villainInfo));
    }
    villains.forEach((villain, index) => {
        const {x, y, width, height} = villain;
        setTimeout( () => ctx.clearRect(x, y, width, height), 300)
        if(villain.x < 0) {
            villains.splice(index, 1);
            ctx.clearRect(x, y, width, height);
            return;
        }
        villain.x -= 3;
        villain.drawVillain();
        checkCrush(villain);
    })
    if(heroInfo.y >= canvas.height) {
        alert(`clear\n${getTime()}`)
        return;
    }
}

const checkCrush = (villain) => {
    if(
        (villain.x-40 <= heroInfo.x && heroInfo.x <= villain.x + 40)
        &&
        (villain.y-40 <= heroInfo.y && heroInfo.y <= villain.y + 40)
    ) {
        stopAnimation();
        alert(`으악\n${getTime()}초 버텼습니다.`);
    }
}

const getTime = () => {
    let time = Math.floor(timer/3600);
    let minute = Math.floor(timer/60);
    if(minute >= 60) minute -= 60*time;
    if(time < 10) time = `0${time}`;
    if(minute < 10) minute = `0${minute}`;
    return `${time}:${minute}`;
}

const stopAnimation = () => {
    cancelAnimationFrame(animation);
    moveEvent.remove();
}

const setImage = (src, x, y, width, height) => {
    const image = new Image();
    image.src = src;
    image.onload = () => ctx.drawImage(image, x, y, width, height);
}

const dog = {
    image1 : (x, y, width, height) => setImage("./images/dog/dog1.jpeg", x, y, width, height),
    image2 : (x, y, width, height) => setImage("./images/dog/dog2.jpeg", x, y, width, height)
}

const moveEvent = {
    add : () => document.addEventListener('keydown', moveEvent.listener)
  , remove : () => document.removeEventListener('keydown', moveEvent.listener)
  , listener : (e) => {
        const {x, y, width, height} = heroInfo;
        ctx.clearRect(x, y, width, height);
        switch (e.code) {
            case 'ArrowUp' : heroInfo.y -= 7; break;
            case 'ArrowDown' : heroInfo.y += 7; break;
            case 'ArrowLeft' : heroInfo.x -= 7; break;
            case 'ArrowRight' : heroInfo.x += 7; break;
        }
        new Character(heroInfo).draw();
    }

}
const addResetButtonEvent = () => {
    canvas.addEventListener('click', (e) => {
        const clickX = e.clientX, clickY = e.clientY;
        if(
            (canvas.width-50 <= clickX && clickX <= canvas.width+50)
            &&
            (0 <= clickY && clickY <= 50)
        )
            location.reload();
    })
}


const heroInfo = {
    x: 5,
    y: 5,
    width: 50,
    height: 50,
    color: "red"
}

class Character {
    constructor({x, y, width, height, color}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.imageFlag = false;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    drawVillain() {
        this.imageFlag = !this.imageFlag;
        // dog[this.imageFlag ? "image1" : "image2"](this.x, this.y, this.width, this.height);
        dog["image1"](this.x, this.y, this.width, this.height);
    }
}
