'use strict';
// timeline 배열

// ()안에서 스크립트: 전역변수 방지, ();로 바로 실행
(() => {
    let yOffset = 0;            //가변변수: window.pageYOffset
    let prevScrollHeight = 0;   //가변변수: 현재까지 스크롤의 합
    let currentScene = 0;       //가변변수: 현재 보고있는 스크롤 섹션index
    let sceneChangePoint = false; //boolean변수: 스크롤 섹션 바뀔때 true(scrollRatio -값 오류 보완용)
    let acc = 0.1;              //가변변수: 부드럽게 동작 가속도
    let delayedYOffset = 0;     //가변변수: 부드럽게 동작 스크롤 길이계산
    let rafId;                  //가변변수: 부드럽게 동작 raf(loop) 저장
    let rafState;               //boolean변수: 부드럽게 동작 loop 반복을 false시 정지
    
    const sceneInfo = [         //불변변수: 스크롤 섹션 정보(객체들의 배열)
        {// #scr0
            type: "sticky",
            heightMultiple: 5,   //기기 브라우저 높이 5배로 scrollHeight 셋팅(모니터, 핸드폰 등등 높이 다다름)
            scrollHeight: 0,
            objs: {              //obj 요소로 DOM 가져옴(객체형태)
                container: document.querySelector('#scr0'),
                messageA: document.querySelector('#scr0 .main-message.a'),
                messageB: document.querySelector('#scr0 .main-message.b'),
                messageC: document.querySelector('#scr0 .main-message.c'),
                messageD: document.querySelector('#scr0 .main-message.d'),
                canvas: document.querySelector('#scr0 #video-canvas-0'),
                context: document.querySelector('#scr0 #video-canvas-0').getContext('2d'),
                videoImages: [],
            },
            values: {           //DOM의 애니메이션 제어값
                videoImageCount: 300,
                imageSequence: [0, 299],
                canvas_opacity: [1,0,{str:0.85, end:1}],
                messageA_opacity_in: [0,1,{str: 0.1, end: 0.18}],
                messageA_translateY_in: [20,0,{str: 0.1, end: 0.18}],
                messageA_opacity_out: [1,0,{str: 0.22, end: 0.3}],
                messageA_translateY_out: [0,-20,{str: 0.22, end: 0.3}],
                messageB_opacity_in: [0,1,{str: 0.3, end: 0.38}],
                messageB_translateY_in: [20,0,{str: 0.3, end: 0.38}],
                messageB_opacity_out: [1,0,{str: 0.42, end: 0.5}],
                messageB_translateY_out: [0,-20,{str: 0.42, end: 0.5}],
                messageC_opacity_in: [0,1,{str: 0.5, end: 0.58}],
                messageC_translateY_in: [20,0,{str: 0.5, end: 0.58}],
                messageC_opacity_out: [1,0,{str: 0.62, end: 0.7}],
                messageC_translateY_out: [0,-20,{str: 0.62, end: 0.7}],
                messageD_opacity_in: [0,1,{str: 0.7, end: 0.78}],
                messageD_translateY_in: [20,0,{str: 0.7, end: 0.78}],
                messageD_opacity_out: [1,0,{str: 0.82, end: 0.9}],
                messageD_translateY_out: [0,-20,{str: 0.82, end: 0.9}],   
                }
        },
        {// #scr1
            type: "normal",
            // heightMultiple: 5,   
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scr1'),
            }
        },
        {// #scr2
            type: "sticky",
            heightMultiple: 5,   
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scr2'),
                messageA: document.querySelector('#scr2 .main-message.a'),
                messageB: document.querySelector('#scr2 .desc-message.b'),
                messageC: document.querySelector('#scr2 .desc-message.c'),
                pinB: document.querySelector('#scr2 .b .pin'),
                pinC: document.querySelector('#scr2 .c .pin'),
                canvas: document.querySelector('#scr2 #video-canvas-2'),
                context: document.querySelector('#scr2 #video-canvas-2').getContext('2d'),
                videoImages: [],
            },
            values: {
                videoImageCount: 960,
                imageSequence: [0, 959],
                canvas_opacity_in: [0,1,{str:0.05, end:0.15}],
                canvas_opacity_out: [1,0,{str:0.88, end:1}],
                messageA_opacity_in: [0, 1, {str: 0.15, end: 0.2}],
                messageB_opacity_in: [0, 1, {str: 0.5, end: 0.55}],
                messageC_opacity_in: [0, 1, {str: 0.72, end: 0.77}],
                messageA_translateY_in: [20, 0, {str: 0.15, end: 0.2}],
                messageB_translateY_in: [30, 0, {str: 0.5, end: 0.55}],
                messageC_translateY_in: [30, 0, {str: 0.72, end: 0.77}],
                messageA_opacity_out: [1, 0, {str: 0.3, end: 0.35}],
                messageB_opacity_out: [1, 0, {str: 0.58, end: 0.63}],
                messageC_opacity_out: [1, 0, {str: 0.85, end: 0.9}],
                messageA_translateY_out: [0, -20, {str: 0.3, end: 0.35}],
                messageB_translateY_out: [0, -20, {str: 0.58, end: 0.63}],
                messageC_translateY_out: [0, -20, {str: 0.85, end: 0.9}],
                pinB_scaleY: [0.5, 1, {str: 0.5, end: 0.55}],
                pinC_scaleY: [0.5, 1, {str: 0.72, end: 0.77}],
            }
        },
        {// #scr3
            type: "sticky",
            heightMultiple: 5,   
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scr3'),
                canvas: document.querySelector('.image-blend-canvas'),
                context: document.querySelector('.image-blend-canvas').getContext('2d'),
                canvasCaption: document.querySelector('.canvas-caption'),
                imageSources: [
                    './images/blend-image-1.jpg',
                    './images/blend-image-2.jpg'
                ],
                images: [],
            },
            values: {
                rect1X: [0, 0, {str: 0, end: 0}],
                rect2X: [0, 0, {str: 0, end: 0}],
                rectStartY: 0,  //기준점(최초 1회)
                blendHeight : [0, 0, {str: 0, end: 0}],
                canvas_scale : [0, 0, {str: 0, end: 0}],
                canvasCaption_opacity: [0, 1, {str: 0, end: 0}],
                canvasCaption_translateY: [50, 0, {str: 0, end: 0}],
            },
        },
    ];

    // 함수정의: loc-nav 위치고정
    function checkNav() {
        const navStickyPoint = document.querySelector('.glo-nav').offsetHeight;
        if (yOffset > navStickyPoint) {
            document.body.classList.add('local-nav-sticky');
        } else {document.body.classList.remove('local-nav-sticky');}
    };
    

    // 함수정의: 이미지들을 배열에 넣는 함수
    function setCanvasImages() {
        let imgElem;
        for (let i=0 ; i < sceneInfo[0].values.videoImageCount ; i++) {
            imgElem = new Image();
            imgElem.src = `./video/001/IMG_${6726 + i}.JPG`;
            sceneInfo[0].objs.videoImages.push(imgElem);
        };
        let imgElem2;
        for (let i=0 ; i < sceneInfo[2].values.videoImageCount ; i++) {
            imgElem2 = new Image();
            imgElem2.src = `./video/002/IMG_${7027 + i}.JPG`;
            sceneInfo[2].objs.videoImages.push(imgElem2);
        };
        let imgElem3;
        for (let i=0 ; i < sceneInfo[3].objs.imageSources.length ; i++) {
            imgElem3 = new Image();
            imgElem3.src = sceneInfo[3].objs.imageSources[i];
            sceneInfo[3].objs.images.push(imgElem3);
        };
    }

    // 함수정의: 각 스크롤 섹션의 높이 셋팅
    function setLayout() {
        for (let i=0; i < sceneInfo.length; i++) {
            if (sceneInfo[i].type === 'sticky') {        //sticky만 스크롤 섹션 연장, normal은 break
            sceneInfo[i].scrollHeight = sceneInfo[i].heightMultiple * window.innerHeight;   //innerHeight: 브라우저 높이
            } else if (sceneInfo[i].type === 'normal') {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;    //각 섹션 높이를 ${scrollHeight}px 만큼
        
        //* load, resize 시 #scrn 동작 담당 *
        yOffset = pageYOffset;
        let totalScrollHeight = 0;                  //prevScrollHeight와 비슷한 변수
        for (let i = 0 ; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);
        
        // 화면/1080px 비율만큼 확대(scale)
        const heightRatio = window.innerHeight / 1080;
        // canvas를 css에서 top 50%, left 50% -> js에서 translate3d로 가운데 정렬
        sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
        sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    }}
    
    // 함수정의: values 계산 함수
    function calcValues(values, currentYOffset) {           //currentYOffset: 현재 스크롤 섹션에서 스크롤된 양(yOffset은 전체 스크롤)
        let rv;
        let scrollHeight = sceneInfo[currentScene].scrollHeight;
        let scrollRatio = currentYOffset / scrollHeight;       //비율: 현재 스크롤양 / 스크롤 섹션크기
        // str, end 요소 있을시, 해당구역 계산하는 if문
        if (values.length === 3) {
            const partScrollStr = values[2].str * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStr;
            let partScrollRatio = (currentYOffset - partScrollStr) / partScrollHeight;
            if (currentYOffset>=partScrollStr && currentYOffset<=partScrollEnd) {    
                rv = partScrollRatio * (values[1]-values[0]) + values[0];
            } else if (currentYOffset < partScrollStr) {rv=values[0];
            } else {rv=values[1];}

        } else {rv = scrollRatio * (values[1]-values[0]) + values[0];}
        return rv;
    }

    // 함수정의: 해당 스크롤 섹션 애니메이션만 동작하게 하는 함수
    function playAnimation() {        
        const objs = sceneInfo[currentScene].objs;          //objs, values를 현재 스크롤 섹션 해당하는 변수로 변경
        const values = sceneInfo[currentScene].values;               
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;       //비율: 현재 스크롤양 / 스크롤 섹션크기
        switch (currentScene) {
            case 0:  
                // let seq = Math.round(calcValues(values.imageSequence, currentYOffset));
                // objs.context.drawImage(objs.videoImages[seq], 0, 0);
                objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);
                if (scrollRatio <= 0.22) {
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_in, currentYOffset)}px`;
                } else {
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_out, currentYOffset)}px`;
                }

                if (scrollRatio <= 0.42) {
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translateY_in, currentYOffset)}px`;
                } else {
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translateY_out, currentYOffset)}px`;
                }

                if (scrollRatio <= 0.62) {
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translateY_in, currentYOffset)}px`;
                } else {
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translateY_out, currentYOffset)}px`;
                }

                if (scrollRatio <= 0.82) {
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translateY(${calcValues(values.messageD_translateY_in, currentYOffset)}px`;
                } else {
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translateY(${calcValues(values.messageD_translateY_out, currentYOffset)}px`;
                }
                break;
            case 1: break;
            case 2: 
                if (scrollRatio <= 0.5) {
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
                } else {
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
                }

                if (scrollRatio <= 0.32) {
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.67) {
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                } else {
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                }

                if (scrollRatio <= 0.82) {
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                    objs.pinC.style.trnsform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                } else {
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                }
                // #scr3의 캔버스 미리 그려주기(모바일 화면에서 늦게 나옴)
                if (scrollRatio > 0.9) {
                    const objs = sceneInfo[3].objs;     //const 변수는 {}안에서만 적용
                    const values = sceneInfo[3].values;
                    const wRatio = window.innerWidth / objs.canvas.width;
                    const hRatio = window.innerHeight / objs.canvas.height;
                    let canvasScaleRatio;
                    if (wRatio <= hRatio) {
                        canvasScaleRatio = hRatio;
                    } else { canvasScaleRatio = wRatio; }
                    objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                    objs.context.fillStyle = 'white';
                    objs.context.drawImage(objs.images[0], 0, 0);
                    const canvasWidth = document.body.offsetWidth / canvasScaleRatio;
                    const canvasHeight = window.innerHeight / canvasScaleRatio;
                    // ~ rect 애니메이션 시작-종료 설정부분 지움(불필요) ~
                    const whiteBoxWidth = canvasWidth * 0.15;
                    values.rect1X[0] = (objs.canvas.width - canvasWidth) / 2;
                    values.rect1X[1] = values.rect1X[0] - whiteBoxWidth;
                    values.rect2X[0] = values.rect1X[0] + canvasWidth - whiteBoxWidth;
                    values.rect2X[1] = values.rect2X[0] + whiteBoxWidth;
                    objs.context.fillRect(
                        parseInt(values.rect1X[0]),    //x
                        0,                                                      //y
                        parseInt(whiteBoxWidth),                                //width
                        objs.canvas.height);                                    //height
                    objs.context.fillRect(
                        parseInt(values.rect2X[0]), 
                        0, 
                        parseInt(whiteBoxWidth), 
                        objs.canvas.height);
                };
                break;
            case 3: 
                let step = 0;   
                const wRatio = window.innerWidth / objs.canvas.width;
                const hRatio = window.innerHeight / objs.canvas.height;
                let canvasScaleRatio;   // 가로/세로 중 큰 비율에 맞춰 canvas 채움
                if (wRatio <= hRatio) {
                    canvasScaleRatio = hRatio;
                } else { canvasScaleRatio = wRatio; }
                objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                objs.context.fillStyle = 'white';
                objs.context.drawImage(objs.images[0], 0, 0);
                // 현재화면에 반영된 canvas width, height
                const canvasWidth = document.body.offsetWidth / canvasScaleRatio;
                // * window.innerWidth는 스크롤바(15px) 포함크기 -> document.body.offsetWidth 로!
                const canvasHeight = window.innerHeight / canvasScaleRatio;
                if (!values.rectStartY) {                   //!: ===false(값 없을때 최초입력하여 기준)
                    // 1) values.rectStartY = objs.canvas.getBoundingClientRect().top; 
                    //  -> getBoundingClientRect: DOM 크기, 위치값 출력 (스크롤 속도에 따라 변동생김)
                    values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio)/2;  
                    // 2) offsetTop: 전체 페이지에서 위치(절대값), #scr3에 position: relative 주면 #scr3 기준!
                    values.rect1X[2].str = values.rect2X[2].str = (window.innerHeight / 2) / scrollHeight;
                    values.rect1X[2].end = values.rect2X[2].end = values.rectStartY / scrollHeight;
                };

                const whiteBoxWidth = parseInt(canvasWidth * 0.15);
                //좌측 박스 위치설정
                values.rect1X[0] = (objs.canvas.width - canvasWidth) / 2;
                values.rect1X[1] = values.rect1X[0] - whiteBoxWidth;
                //우측 박스 위치설정
                values.rect2X[0] = values.rect1X[0] + canvasWidth - whiteBoxWidth;
                values.rect2X[1] = values.rect2X[0] + whiteBoxWidth;
                //흰색박스 만들기 fillRect(), parseInt() 정수처리하면 성능up
                objs.context.fillRect(
                    parseInt(calcValues(values.rect1X, currentYOffset)),    //x
                    0,                                                      //y
                    whiteBoxWidth,                                //width
                    objs.canvas.height);                                    //height
                objs.context.fillRect(
                    parseInt(calcValues(values.rect2X, currentYOffset)), 
                    0, 
                    whiteBoxWidth, 
                    objs.canvas.height);

                if (scrollRatio < values.rect1X[2].end) {   //캔버스 스크롤 끝나기 전
                    step = 1;
                    objs.canvas.classList.remove('sticky-canvas');
                } else {                                    //캔버스 스크롤 끝나기 후
                    step = 2;
                    // 1번그림 sticky(본래사이즈-축소량 편차만큼 위로)
                    objs.canvas.classList.add('sticky-canvas');
                    objs.canvas.style.top = `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio)/2}px`;
                    // 2번그림 canvas 그리기
                    values.blendHeight[0] = 0;
                    values.blendHeight[1] = objs.canvas.height;
                    values.blendHeight[2].str = values.rect1X[2].end;
                    values.blendHeight[2].end = values.blendHeight[2].str + 0.2;
                    const blendHeight = calcValues(values.blendHeight, currentYOffset);
                    objs.context.drawImage(
                        objs.images[1],
                        0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,    //sx~sHeight
                        0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,    //dx~dHeight
                        );

                    if (scrollRatio > values.blendHeight[2].end) {
                        step = 3;
                        values.canvas_scale[0] = canvasScaleRatio;
                        values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);
                        values.canvas_scale[2].str = values.blendHeight[2].end
                        values.canvas_scale[2].end = values.canvas_scale[2].str + 0.2;
                        objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
                        objs.canvas.style.marginTop = 0;    
                    }

                    if (scrollRatio > values.canvas_scale[2].end && values.canvas_scale[2].end > 0) {
                        // position: fixed가 풀리면서 위로 이동(스크롤량만큼 편차생김) -> marginTop으로 보완
                        objs.canvas.classList.remove('sticky-canvas');
                        objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`
                        // canvas-caption 메세지 opacity, Y위치 조정
                        values.canvasCaption_opacity[2].str = values.canvas_scale[2].end;
                        values.canvasCaption_opacity[2].end = values.canvasCaption_opacity[2].str + 0.1;
                        values.canvasCaption_translateY[2].str = values.canvas_scale[2].end;
                        values.canvasCaption_translateY[2].end = values.canvasCaption_opacity[2].str + 0.1;
                        objs.canvasCaption.style.opacity = calcValues(values.canvasCaption_opacity, currentYOffset);
                        objs.canvasCaption.style.transform = `translate3d(0, ${calcValues(values.canvasCaption_translateY, currentYOffset)}%, 0)`;
                    }
                }
                break;
        }
    }

    // 함수정의: * scroll 시 #show-scene-n 동작 담당 *
    function scrollLoop() {
        prevScrollHeight = 0;                       //스크롤 시 중복되기 때문에 초기화
        let sceneChangePoint = false;
        for (let i=0 ; i<currentScene ; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if (yOffset < (prevScrollHeight + sceneInfo[currentScene].scrollHeight)) {
            document.body.classList.remove('scroll-cancel');
        }
        //스크롤 섹션 index 구하기
        if (yOffset > (prevScrollHeight + sceneInfo[currentScene].scrollHeight)) {
            sceneChangePoint = true;
            if (currentScene === sceneInfo.length - 1) {
                document.body.classList.add('scroll-cancel');
            } 
            if (currentScene < sceneInfo.length - 1) {      //스크롤 섹션 외에선 카운트 안함
                currentScene++;
            }
            document.body.setAttribute('id', `show-scene-${currentScene}`);      // body에 스크롤 섹션 index setAttribute
        }
        if (yOffset < prevScrollHeight) {
            if(currentScene===0) return;            //사파리 등에서 bounce 시 yOffset -값 됨.(방지)
            sceneChangePoint = true;
            currentScene--; 
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        if (sceneChangePoint) return;         //스크롤 섹션 바뀌는 순간 scrollLoop() 미실행(-값방지)
        
        playAnimation();
    }

    // 함수정의 : 스크롤시 videoAnimation 부드럽게 동작
    function loop() {
        delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;
        if (!sceneChangePoint) {        //새로운 스크롤 섹션 진입시 미실행
            const currentYOffset = delayedYOffset - prevScrollHeight;   //yOffset 아닌 가속도 적용된 delayedYOffset
            const objs = sceneInfo[currentScene].objs;          
            const values = sceneInfo[currentScene].values;               
            // #scr0,2 그림그리기
            if (currentScene === 0 || currentScene === 2) {
                let seq = Math.round(calcValues(values.imageSequence, currentYOffset));
                if (objs.videoImages[seq]) {    //다시 올라올때 seq 300이상 에러발생.
                    objs.context.drawImage(objs.videoImages[seq], 0, 0);
                }
            }
            rafId = requestAnimationFrame(loop);
            if (Math.abs(yOffset - delayedYOffset) < 1) {
                cancelAnimationFrame(rafId);
                rafState = false;
            }
        }
    }
    
    //창 load, resize시 setLayout 재실행해서 스크롤 높이계산 초기화
    window.addEventListener('load', () => {
        document.body.classList.remove('before-load');
        setLayout();             //DOMContentLoaded도 가능(DOM구조만, 이미지/영상 등 제외)
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
        let tempYOffset = yOffset;
        let tempScrollCount = 0;
        if (tempYOffset > 0) {
            let intervalId = setInterval(() => {
                window.scrollTo(0, tempYOffset);
                tempScrollCount++;
                tempYOffset += 2;
                if (tempScrollCount > 20) { 
                    clearInterval(intervalId);
                }
            }, 10);
        }

        //스크롤 시, 스크롤 섹션 지정하는 scrollLoop 실행
        window.addEventListener('scroll', () => {         
        yOffset = window.pageYOffset;
        scrollLoop();
        checkNav();
        if (!rafState) {
            rafId = requestAnimationFrame(loop);
            rafState = true;
        }

        //창 조정시, 스크롤 섹션 높이 재계산
        window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            // setLayout();    // 모바일 기기 외에서만 setLayout
            // sceneInfo[3].values.rectStartY = 0; //canvasAnimation 시작점 초기화
            window.location.reload();
        }
        });   
        window.addEventListener('orientationchange', () => {
            scrollTo(0,0);  //가로전환하면 x=0, y=0
            setTimeout(() => {
                // setLayout    //모바일 가로전환 시 setLayout
                window.location.reload();
            }, 500); 
        })});
    });
    //로딩 완료시, loading창 transition되면 지움
    document.querySelector('.loading').addEventListener('transitionend', (e) => {
        document.body.removeChild(e.currentTarget);     //최근 발생한 e(vent)를 지움
    })
    //<함수 실행군>
    setCanvasImages();
})();