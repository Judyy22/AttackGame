//캔버스 셋팅
let canvas;
let ctx; //이미지 그리는 것을 도와줌
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d"); //2d의 세계를 가져올것이다.
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, bulletImage, enemyImage, gameOverImage, planeImage;
let planeX = canvas.width / 2 - 32; //비행기 x좌표
let planeY = canvas.height - 64; //비행기 y좌표

let bulletList = []; //총알들을 저장하는 리스트
function Bullet() {
    this.x = 0;
    this.y = 0;
    this.init = function () {
        this.x = planeX + 20;
        this.y = planeY;

        bulletList.push(this);
    };
    this.update = function () {
        this.y -= 7;
    };
}

function loadImage() {
    backgroundImage = new Image();
    backgroundImage.src = "images/background.gif";

    planeImage = new Image();
    planeImage.src = "images/plane.png";

    bulletImage = new Image();
    bulletImage.src = "images/bullet.png";

    enemyImage = new Image();
    enemyImage.src = "images/enemy.png";

    gameOverImage = new Image();
    gameOverImage.src = "images/gameOver.jpg";
} //이미지 로드

let keysDown = {};
function setupKeyBoardListener() {
    document.addEventListener("keydown", function (event) {
        keysDown[event.keyCode] = true;
    });
    document.addEventListener("keyup", function (event) {
        delete keysDown[event.keyCode];

        if (event.keyCode == 32) {
            createBullet(); //총알 생성
        }
    });
} //키보드 설정

function createBullet() {
    console.log("총알생성");
    let b = new Bullet(); //총알 하나 생성
    b.init();
    console.log("새로운 총알 리스트", bulletList);
}

function update() {
    if (39 in keysDown) {
        //비행기가 오른쪽으로 간다 -> x좌표값이 증가한다.
        planeX += 5; //비행기 속도
    } else if (37 in keysDown) {
        //비행기가 왼쪽으로 간다 -> x좌표값이 감소한다.
        planeX -= 5; //비행기 속도
    }
    //비행기가 좌표값이 무한대로 업데이트가 되는게 아닌 경기장 안에서만 있게 하려면?
    if (planeX <= 0) {
        planeX = 0;
    } else if (planeX >= canvas.width - 64) {
        planeX = canvas.width - 64;
    }

    //총알의 y좌표 업데이트 하는 함수 호출
    console.log("bulletList (1)", bulletList);
    for (let i = 0; bulletList.length; i++) {
        bulletList[i].update();
        console.log("bulletList (2)", bulletList[i]);
    }
}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(planeImage, planeX, planeY);

    for (let i = 0; i < bulletList.length; i++) {
        ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }
}

function main() {
    update(); //좌펴값을 업데이트 하고
    render(); //그려주고
    requestAnimationFrame(main);
}
loadImage();
setupKeyBoardListener();
main();

//총알 만들기
//1. 스페이스바를 누르면 총알 발사
//2. 총알이 발사 = 총알의 y값이 --, 총알의 x값은?? 스페이스를 누른 순간의 우주선의 x좌표
//3. 발사된 총알들은 총알배열에 저장을 한다.
//4. 총알들은 x,y좌표값이 있어야한다.
//5. 총알 배열을 가지고 render 그려준다.
