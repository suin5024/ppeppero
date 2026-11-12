// <이상한 빼빼로데이> 시나리오 스크립트 데이터
// STAGE 1 ~ 4 및 퍼즐 1 ~ 3 연동 데이터

window.GAME_SCENARIO = {
  stage1: [
    { type: 'bg', src: 'assets/bg/street_rain.png' },
    { type: 'dialogue', speaker: '독백', text: '비가 오는 <span class="highlight">토요일</span>이었다.' },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '기분이 왜 이러지..' },
    { type: 'dialogue', speaker: '독백', text: '이상하게 갑갑한 기분이 들어 지갑과 우산 정도만 들고 밖으로 향했다.' },
    { type: 'dialogue', speaker: '독백', text: '비 때문인지 길거리는 한산했다.' },
    { type: 'dialogue', speaker: '독백', text: '길을 가는데, 편의점 유리창이 눈에 띄었다.' },
    
    { type: 'bg', src: 'assets/bg/convenience.png' },
    { type: 'dialogue', speaker: '독백', text: '<span class="highlight">빼빼로데이</span>가 <span class="highlight">이틀 후</span>여서 그런지, 유리창이 화려하게 꾸며져있었다.' },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '저런 건 상술에 불과해.' },
    { type: 'dialogue', speaker: '독백', text: '그런데 이상하게, 오늘은 하나쯤 사 먹어 보고 싶은 마음이 들었다.' },
    
    { type: 'popup', src: 'assets/popup/heart_box.png' },
    { type: 'dialogue', speaker: '독백', text: '나는 가장 화려하게 꾸며진 큰 하트 상자 모양의 빼빼로 세트를 샀다.' },
    { type: 'popup_hide' },
    
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '쓸데없는 걸 사버렸네..' },
    { type: 'dialogue', speaker: '독백', text: '나는 비를 피해 근처의 정자로 갔다.' },
    
    { type: 'bg', src: 'assets/bg/pavilion.png' },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '나도 정자 있는데. 개천재 우월한 유전자 정자.' },
    { type: 'dialogue', speaker: '독백', text: '역시 난 유머 감각까지 완벽하다.' },
    
    { type: 'popup', src: 'assets/popup/heart_box.png' },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '한 번 열어봐야지.' },
    
    { type: 'popup', src: 'assets/popup/heart_box_opened.png' },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '뭐야시발 아니, 이거 왜 빼빼로가 안 들어있어? 개미쳤네' },
    { type: 'dialogue', speaker: '독백', text: '빼빼로 상자 안에는 빼빼로 대신 자물쇠가 걸린 나무상자가 들어있었다.' },
    { type: 'popup_hide' },
    
    { type: 'dialogue', speaker: '독백', text: '나무상자에는 무언가 적힌 포스트잇이 붙어 있었다.' },
    
    // 퍼즐 1 트리거
    { type: 'puzzle', puzzleId: 1 }
  ],

  stage2: [
    { type: 'bg', src: 'assets/bg/pavilion.png' },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '이건 그냥 오늘 날짜잖아.' },
    { type: 'dialogue', speaker: '독백', text: "자물쇠를 'TODAY'에 맞게 돌렸더니 자물쇠가 찰칵하며 열렸다." },
    { type: 'dialogue', speaker: '독백', text: '상자 안에는 쪽지가 하나 들어 있었다.' },
    
    { type: 'popup', src: 'assets/popup/note_box.png' },
    { type: 'dialogue', speaker: '독백', text: "쪽지에는 짧은 문장이 적혀 있었다.\n[ 주은 감자탕으로 와. ]" },
    { type: 'popup_hide' },
    
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '아 여기 개맛있어 리얼' },
    { type: 'dialogue', speaker: '독백', text: '주은 감자탕은 감자탕 맛집이다.' },
    { type: 'dialogue', speaker: '독백', text: '대체 날 왜 그곳으로 부르는 거지?' },
    
    { type: 'bg', src: 'assets/bg/restaurant.png' },
    { type: 'dialogue', speaker: '독백', text: '감자탕집에 도착했다.' },
    { type: 'dialogue', speaker: '독백', text: '감자탕은 내가 제일 좋아하는 음식이라, 황홀한 음식 냄새를 참지 못하고 소(小)자 하나를 주문해버리고 말았다.' },
    
    { type: 'popup', src: 'assets/popup/gamjatang.png' },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '일단 먹고 생각하자.' },
    { type: 'dialogue', speaker: '독백', text: '쪽지에도 그 다음 지시는 전혀 없었으므로, 나는 일단 감자탕에 집중하기로 했다.' },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '역시 감자탕이랑 뼈해장국은 달라. 혼자라도 감자탕을 먹어야 돼.' },
    { type: 'popup_hide' },
    
    { type: 'dialogue', speaker: '감자탕집 직원', char: 'assets/char/staff_default.png', text: '저기 학생!' },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '네?' },
    { type: 'dialogue', speaker: '감자탕집 직원', char: 'assets/char/staff_default.png', text: '이거 받아. 아까 누가 혼자서 감자탕 시켜서 먹고 잔뜩 남기는 어린 남학생이 있으면 이걸 전해달라고 했어.' },
    
    { type: 'popup', src: 'assets/popup/note_folded.png' },
    { type: 'dialogue', speaker: '독백', text: '직원 이모님이 접힌 쪽지 하나를 건네주셨다. 쪽지를 펼쳐보았다.' },
    { type: 'popup_hide' },
    
    // 퍼즐 2 트리거
    { type: 'puzzle', puzzleId: 2 }
  ],

  stage3: [
    { type: 'bg', src: 'assets/bg/restaurant.png' },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '이건.. 3호선이랑 8호선 환승역인 가락시장 역을 말하는 거잖아.' },
    { type: 'dialogue', speaker: '독백', text: '자주 다니던 산책코스를 따라 잠실역으로 걸어갔다.' },
    
    { type: 'bg', src: 'assets/bg/station_exit.png' },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '아 맞다 우산.' },
    { type: 'dialogue', speaker: '독백', text: '잠실역에 도착해서야 우산을 감자탕집에 놓고 왔다는 것을 깨달았다.' },
    { type: 'dialogue', speaker: '독백', text: '감자탕을 먹는 동안 비가 그쳐서 잊어버리고 만 것이었다.' },
    { type: 'dialogue', speaker: '독백', text: '하지만 너무 멀리 와버렸다. 어쩔 수 없지.' },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '우산은... 소모품이니까.' },
    { type: 'dialogue', speaker: '독백', text: '잠실역에서 지하철을 타고 가락시장 역으로 이동했다.' },
    
    { type: 'bg', src: 'assets/bg/subway_inside.png' },
    { type: 'dialogue', speaker: '독백', text: '가락시장역에 도착해 개찰구를 빠져나오는데, 누군가 날 불러세웠다.' },
    { type: 'dialogue', speaker: '호두할머니', char: 'assets/char/grandma_default.png', text: '자네가 성해빈인가?' },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '네.. 그런데요..?' },
    { type: 'dialogue', speaker: '호두할머니', char: 'assets/char/grandma_default.png', text: '듣던대로 아주 똘똘하게 생겼구만. 중딩같은데, 중학생인가?' },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '고등학생인데요.' },
    { type: 'dialogue', speaker: '호두할머니', char: 'assets/char/grandma_default.png', text: '고등학생인데 왠지 중딩같군.' },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '...그래서 할머니는 누구시고 절 왜 부르신 거죠?' },
    { type: 'dialogue', speaker: '호두할머니', char: 'assets/char/grandma_default.png', text: '난 전 세계 호두 생산량의 ??%를 책임지는 사람이네. 그냥 호두할머니라고 불러주게나.' },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '아니 그러니까 호두할머니, 그래서 절 왜 부르셨냐니까요?' },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '전 초엘리트라서 바쁘단 말이에요.' },
    { type: 'dialogue', speaker: '호두할머니', char: 'assets/char/grandma_default.png', text: '개빡취네. 나도 바쁜 사람이야.' },
    { type: 'dialogue', speaker: '호두할머니', char: 'assets/char/grandma_default.png', text: '아무튼 이걸 받게. 그럼 난 이만 호두 까러 가보겠네. 아 참, 난 가끔 수박도 깬다네.' },
    
    { type: 'popup', src: 'assets/popup/envelope.png' },
    { type: 'dialogue', speaker: '독백', text: '호두할머니에게서 편지봉투를 건네받았다.' },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '오 저 수박 좋아해요. 다음에 깨주세요.' },
    { type: 'dialogue', speaker: '독백', text: '편지봉투를 열어 편지를 펼쳐보았다.' },
    { type: 'popup_hide' },
    
    // 퍼즐 3 트리거
    { type: 'puzzle', puzzleId: 3 }
  ],

  stage4: [
    { type: 'bg', src: 'assets/bg/subway_inside.png' },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: "'w3w'는 전 세계 위치를 세 단어 주소로 나타내는 거잖아? 색깔이 다른 '자전거, 페달, 노력'을 찾아보면..." },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '여기는... 가원중학교? 그냥 평범한 중학교인 것 같은데.' },
    
    { type: 'bg', src: 'assets/bg/school.png' },
    { type: 'dialogue', speaker: '독백', text: '가원중학교 앞에 거의 도착할 무렵, 그쳤던 비가 다시 부슬부슬 내리기 시작했다.' },
    { type: 'dialogue', speaker: '독백', text: '우산도 없어서 서둘러 교문 안으로 뛰어 들어갔다.' },
    { type: 'dialogue', speaker: '독백', text: '토요일인데다가 날씨도 좋지 않아서 그런지, 학교에는 아무도 없었다.' },
    { type: 'dialogue', speaker: '독백', text: '아니, 한 명 있었다.' },
    { type: 'dialogue', speaker: '독백', text: '이 중학교 학생인 것 같이 보이는 어린 여학생이 비를 피해 출입구에 서있었다.' },
    
    { type: 'popup', src: 'assets/popup/girl_standing.png' },
    { type: 'dialogue', speaker: '성해빈', char: 'assets/char/haebin_default.png', text: '어...' },
    { type: 'popup_hide' },
    
    // 엔딩 시네마틱 연출 시퀀스 (화면 클릭 단위 진행)
    // 1) 여학생 첫 일러스트 천천히 페이드인 (대화창 숨김, 클릭 대기)
    { type: 'cg_slow', src: 'assets/cg/girl_face.png' },
    
    // 2) 클릭 후 화면 중앙 네온 대사 "어?" (클릭 대기)
    { type: 'cinematic_text', speaker: '여학생', text: '어?' },
    
    // 3) 클릭 후 웃는 일러스트로 천천히 크로스페이드 (대사 닫힘, 클릭 대기)
    { type: 'cg_slow', src: 'assets/cg/girl_smile.png' },
    
    // 4) 클릭 후 화면 중앙 네온 대사 "오빠다!" (클릭 대기)
    { type: 'cinematic_text', speaker: '여학생', text: '오빠다!' },
    
    // 5) 클릭 후 대사 사라지고 일러스트만 남음 (클릭 대기)
    { type: 'cinematic_clear' },
    
    // 6) 클릭 후 여학생 일러스트 위에 THE END 천천히 페이드인 -> "타이틀로" 버튼
    { type: 'ending' }
  ]
};

