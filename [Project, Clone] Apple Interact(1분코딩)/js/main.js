'use strict';
// timeline 배열

// ()안에서 스크립트: 전역변수 방지, ();로 바로 실행
(() => {
    let yOffset = 0;        //가변변수: window.pageYOffset
    const sceneInfo = [     //불변변수: 스크롤 섹션 정보(객체들의 배열)
        {
            // #scr0
            type: "sticky",
            heightMultiple: 5,   //기기 브라우저 높이 5배로 scrollHeight 셋팅(모니터, 핸드폰 등등 높이 다다름)
            scrollHeight: 0,
            objs: {              //obj 요소에 HTML 가져옴(객체형태)
                container: document.querySelector('#scr0'),
            }
        },
        {
            // #scr1
            type: "normal",
            heightMultiple: 5,   
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scr1'),
            }
        },
        {
            // #scr2
            type: "sticky",
            heightMultiple: 5,   
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scr2'),
            }
        },
        {
            // #scr3
            type: "sticky",
            heightMultiple: 5,   
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scr3'),
            }
        },
    ];

    function setLayout() {
        // 각 스크롤 섹션의 높이 셋팅
        for (let i=0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightMultiple * window.innerHeight;   //innerHeight: 브라우저 높이
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;    //각 섹션 높이를 ${scrollHeight}px 만큼
        }

    function scrollLoop() {
        console.log(YOffset);
    }

    window.addEventListener('resize', setLayout);   //창 조정시, 스크롤 섹션 높이 재계산
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    })
    }
    setLayout();
})();
