// <이상한 빼빼로데이> 비주얼 노벨 게임 엔진 (GameEngine)

window.GameEngine = (function() {
  // 엔진 상태
  const state = {
    currentStage: 1,
    stepIndex: 0,
    steps: [],
    isTyping: false,
    typingTimer: null,
    currentFullText: '',
    unlockedStage: 1,
    currentBg: '',
    currentChar: null,
    isPuzzleActive: false,
    isCinematicPlaying: false,
    cinematicTimer: null,
    dialogueHistory: []
  };

  // 모든 효과음 완전 음소거 (사용자 요청 반영)
  function playBeep() {}
  function playClick() {}
  function playUnlockSound() {}

  // 16:9 반응형 스케일러
  function handleResize() {
    const viewport = document.getElementById('game-viewport');
    if (!viewport) return;

    const baseWidth = 1920;
    const baseHeight = 1080;
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

    const scale = Math.min(winWidth / baseWidth, winHeight / baseHeight);
    viewport.style.transform = `scale(${scale})`;
    viewport.style.left = `${(winWidth - baseWidth * scale) / 2}px`;
    viewport.style.top = `${(winHeight - baseHeight * scale) / 2}px`;
  }

  // 로컬 세이브/로드
  function loadProgress() {
    const saved = localStorage.getItem('ppeppero_unlocked_stage');
    if (saved) {
      state.unlockedStage = Math.max(1, parseInt(saved, 10));
    }
  }

  function saveProgress(stage) {
    if (stage > state.unlockedStage) {
      state.unlockedStage = stage;
      localStorage.setItem('ppeppero_unlocked_stage', stage.toString());
    }
  }

  // 화면 전환 (Title / Stage Select / Game / Puzzle / Ending)
  function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) target.classList.add('active');
    handleResize();
  }

  // 게임 시작 (특정 스테이지)
  function startStage(stageNum) {
    state.currentStage = stageNum;
    state.stepIndex = 0;
    state.isPuzzleActive = false;
    state.currentChar = null;
    state.dialogueHistory = [];
    state.steps = window.GAME_SCENARIO[`stage${stageNum}`] || [];
    state.currentBg = '';
    
    clearTimeout(endingTimer1);
    clearTimeout(endingTimer2);

    // UI 및 모든 오버레이/CG 즉시 완전 초기화
    hidePopup();
    hidePuzzleUI();
    hideCG(true);
    hideCinematicText();

    const endingOverlay = document.getElementById('ending-overlay');
    if (endingOverlay) {
      endingOverlay.classList.remove('active', 'show-text', 'show-btn');
    }
    document.getElementById('dialogue-box').style.display = 'block';
    
    const tagBox = document.getElementById('speaker-tag-box');
    if (tagBox) tagBox.classList.add('hidden');

    const charEl = document.getElementById('char-sprite');
    if (charEl) {
      charEl.classList.remove('active');
      charEl.src = '';
    }

    const fadeOverlay = document.getElementById('bg-fade-overlay');
    if (fadeOverlay) fadeOverlay.style.opacity = '0';

    const bgLayer = document.getElementById('bg-layer');
    if (bgLayer) bgLayer.style.backgroundImage = '';

    showScreen('screen-game');
    executeCurrentStep();
  }

  // 시나리오 스텝 실행기
  function executeCurrentStep() {
    if (state.stepIndex >= state.steps.length) return;

    const step = state.steps[state.stepIndex];

    switch(step.type) {
      case 'bg':
        setBg(step.src, () => {
          state.stepIndex++;
          executeCurrentStep();
        });
        break;

      case 'popup':
        showPopup(step.src);
        state.stepIndex++;
        executeCurrentStep();
        break;

      case 'popup_hide':
        hidePopup();
        state.stepIndex++;
        executeCurrentStep();
        break;

      case 'cg':
        hideDialogueLayer();
        showCG(step.src, false);
        state.stepIndex++;
        executeCurrentStep();
        break;

      case 'cg_slow':
        hideCinematicText();
        hideDialogueLayer();
        showCG(step.src, true);
        break;

      case 'cinematic_text':
        hideDialogueLayer();
        state.dialogueHistory.push(state.stepIndex);
        showCinematicText(step.text);
        break;

      case 'cinematic_clear':
        hideCinematicText();
        hideDialogueLayer();
        break;

      case 'dialogue':
        renderDialogue(step);
        break;

      case 'puzzle':
        triggerPuzzle(step.puzzleId);
        break;

      case 'ending':
        triggerEnding();
        break;

      default:
        state.stepIndex++;
        executeCurrentStep();
    }
  }

  // 1. 배경 전환 페이드인/아웃
  function setBg(src, callback) {
    const bgLayer = document.getElementById('bg-layer');
    const fadeOverlay = document.getElementById('bg-fade-overlay');

    if (state.currentBg === src) {
      if (callback) callback();
      return;
    }

    state.currentBg = src;

    // 최초 로드 시 바로 세팅
    if (!bgLayer.style.backgroundImage) {
      bgLayer.style.backgroundImage = `url('${src}')`;
      if (callback) callback();
      return;
    }

    // 배경 전환 시 부드러운 페이드아웃 -> 이미지 변경 -> 페이드인
    if (fadeOverlay) {
      fadeOverlay.style.opacity = '1';
      setTimeout(() => {
        bgLayer.style.backgroundImage = `url('${src}')`;
        setTimeout(() => {
          fadeOverlay.style.opacity = '0';
          if (callback) callback();
        }, 120);
      }, 350);
    } else {
      bgLayer.style.backgroundImage = `url('${src}')`;
      if (callback) callback();
    }
  }

  function showPopup(src) {
    const popupLayer = document.getElementById('popup-layer');
    const popupImg = document.getElementById('popup-img');
    popupImg.src = src;
    popupLayer.classList.add('active');
    playClick();
  }

  function hidePopup() {
    const popupLayer = document.getElementById('popup-layer');
    popupLayer.classList.remove('active');
  }

  let activeCGSlot = 1;
  function showCG(src, isSlow = false) {
    const cgLayer = document.getElementById('cg-layer');
    const slot1 = document.getElementById('cg-img-1');
    const slot2 = document.getElementById('cg-img-2');
    if (!cgLayer || !slot1 || !slot2) return;

    cgLayer.classList.add('active');

    const duration = isSlow ? '1.4s' : '0.5s';
    slot1.style.transition = `opacity ${duration} ease-in-out`;
    slot2.style.transition = `opacity ${duration} ease-in-out`;
    slot1.style.opacity = '';
    slot2.style.opacity = '';

    if (activeCGSlot === 1) {
      slot2.style.backgroundImage = `url('${src}')`;
      slot2.classList.add('active');
      slot1.classList.remove('active');
      activeCGSlot = 2;
    } else {
      slot1.style.backgroundImage = `url('${src}')`;
      slot1.classList.add('active');
      slot2.classList.remove('active');
      activeCGSlot = 1;
    }
  }

  function hideCG(instant = false) {
    const cgLayer = document.getElementById('cg-layer');
    const slot1 = document.getElementById('cg-img-1');
    const slot2 = document.getElementById('cg-img-2');
    if (!cgLayer) return;

    cgLayer.classList.remove('active');
    [slot1, slot2].forEach(slot => {
      if (!slot) return;
      slot.classList.remove('active');
      slot.style.opacity = '';
      if (instant) {
        slot.style.transition = 'none';
        slot.style.backgroundImage = 'none';
        void slot.offsetHeight;
        slot.style.transition = '';
      } else {
        setTimeout(() => {
          if (!slot.classList.contains('active')) {
            slot.style.backgroundImage = 'none';
          }
        }, 600);
      }
    });
    activeCGSlot = 1;
  }

  // 대화창, 이름표, 캐릭터 스탠딩을 일괄 퇴장/숨김 처리
  function hideDialogueLayer() {
    const box = document.getElementById('dialogue-box');
    const tagBox = document.getElementById('speaker-tag-box');
    const dialogueLayer = document.getElementById('dialogue-layer');
    if (box) box.style.display = 'none';
    if (tagBox) tagBox.classList.add('hidden');
    if (dialogueLayer) dialogueLayer.style.display = 'none';
    updateCharacter(null); // 성해빈 등 캐릭터 스탠딩 완전히 퇴장
  }

  // 대화창 및 대화 레이어 다시 활성화
  function showDialogueLayer() {
    const dialogueLayer = document.getElementById('dialogue-layer');
    const box = document.getElementById('dialogue-box');
    if (dialogueLayer) dialogueLayer.style.display = 'flex';
    if (box) box.style.display = 'block';
  }

  // 영화 엔딩 스타일 중앙 네온 대사 연출 ("어?", "오빠다!")
  function showCinematicText(text) {
    hideDialogueLayer();

    const layer = document.getElementById('cinematic-quote-layer');
    const textEl = document.getElementById('cinematic-quote-text');
    if (!layer || !textEl) return;

    textEl.textContent = text;
    layer.classList.remove('visible');
    void layer.offsetWidth; // 애니메이션 재시작을 위한 강제 리플로우
    layer.classList.add('visible');
  }

  function hideCinematicText() {
    const layer = document.getElementById('cinematic-quote-layer');
    if (layer) layer.classList.remove('visible');
  }

  // 2. 캐릭터 스탠딩 빠른 페이드인/아웃 업데이트
  let charTimer = null;
  function updateCharacter(charSrc) {
    const charEl = document.getElementById('char-sprite');
    if (!charEl) return;

    clearTimeout(charTimer);

    if (state.currentChar === charSrc) return;
    state.currentChar = charSrc;

    if (!charSrc) {
      // 캐릭터 퇴장: 빠른 페이드아웃 (0.18s)
      charEl.classList.remove('active');
      charTimer = setTimeout(() => {
        charEl.src = '';
      }, 180);
    } else {
      if (charEl.classList.contains('active')) {
        // 이미 다른 캐릭터가 떠 있으면 빠르게 사라진 뒤 새 캐릭터 등장
        charEl.classList.remove('active');
        charTimer = setTimeout(() => {
          charEl.src = charSrc;
          charEl.classList.add('active');
        }, 180);
      } else {
        // 새로 등장할 때 빠른 페이드인
        charEl.src = charSrc;
        // 다음 프레임에서 active 추가하여 확실한 페이드인 연출
        requestAnimationFrame(() => {
          charEl.classList.add('active');
        });
      }
    }
  }

  // HTML 태그를 인식하여 글자 단위로 안전하게 렌더링하는 헬퍼 함수
  function parseHtmlTokens(html) {
    const tokens = [];
    const regex = /(<[^>]+>)|([^<]+)/g;
    let match;
    let totalTextChars = 0;

    while ((match = regex.exec(html)) !== null) {
      if (match[1]) {
        const tag = match[1];
        const isClosing = tag.startsWith('</');
        const tagNameMatch = tag.match(/<\/?([a-zA-Z0-9]+)/);
        const tagName = tagNameMatch ? tagNameMatch[1] : '';
        tokens.push({
          type: isClosing ? 'close' : 'open',
          tag: tag,
          tagName: tagName
        });
      } else if (match[2]) {
        tokens.push({
          type: 'text',
          text: match[2]
        });
        totalTextChars += match[2].length;
      }
    }
    return { tokens, totalTextChars };
  }

  function buildPartialHtml(tokens, charLimit) {
    let result = '';
    let currentCount = 0;
    const openTags = [];

    for (const t of tokens) {
      if (t.type === 'open') {
        result += t.tag;
        openTags.push(t.tagName);
      } else if (t.type === 'close') {
        result += t.tag;
        openTags.pop();
      } else if (t.type === 'text') {
        const remaining = charLimit - currentCount;
        if (remaining >= t.text.length) {
          result += t.text;
          currentCount += t.text.length;
        } else if (remaining > 0) {
          result += t.text.substring(0, remaining);
          currentCount += remaining;
          break;
        } else {
          break;
        }
      }
    }

    for (let i = openTags.length - 1; i >= 0; i--) {
      result += `</${openTags[i]}>`;
    }

    return result;
  }

  // 3. 대사 타이핑 렌더링 & 상단 분리된 캐릭터 이름표 연동
  function renderDialogue(step) {
    showDialogueLayer();
    const box = document.getElementById('dialogue-box');
    const tagBox = document.getElementById('speaker-tag-box');
    const nameEl = document.getElementById('speaker-name');
    const textEl = document.getElementById('dialogue-text');
    const nextIndicator = document.getElementById('next-indicator');
    const prevBtn = document.getElementById('prev-dialogue-btn');

    // 대사 히스토리 스택 관리
    const lastHistoryIdx = state.dialogueHistory[state.dialogueHistory.length - 1];
    if (lastHistoryIdx !== state.stepIndex) {
      state.dialogueHistory.push(state.stepIndex);
    }

    // 이전 대사 버튼 활성화 여부
    if (prevBtn) {
      prevBtn.disabled = (state.dialogueHistory.length <= 1);
    }

    nextIndicator.classList.remove('visible');
    box.style.display = 'block';

    // 화자 및 캐릭터 이름표 분리 세팅
    if (step.speaker === '독백') {
      if (tagBox) tagBox.classList.add('hidden');
      box.classList.add('monologue');
      updateCharacter(null);
    } else {
      if (nameEl) nameEl.textContent = step.speaker;
      if (tagBox) tagBox.classList.remove('hidden');
      box.classList.remove('monologue');
      updateCharacter(step.char || null);
    }

    state.currentFullText = step.text;
    state.isTyping = true;
    textEl.innerHTML = '';
    
    // HTML 태그 인식형 타이핑 파싱
    const { tokens, totalTextChars } = parseHtmlTokens(step.text);
    let charIdx = 0;
    clearInterval(state.typingTimer);
    
    state.typingTimer = setInterval(() => {
      if (charIdx < totalTextChars) {
        charIdx++;
        textEl.innerHTML = buildPartialHtml(tokens, charIdx);
      } else {
        finishTyping();
      }
    }, 28);
  }

  function finishTyping() {
    clearInterval(state.typingTimer);
    state.isTyping = false;
    const textEl = document.getElementById('dialogue-text');
    const nextIndicator = document.getElementById('next-indicator');
    textEl.innerHTML = state.currentFullText;
    nextIndicator.classList.add('visible');
  }

  // 이전 대사로 되돌아가기
  function goToPreviousDialogue() {
    if (state.dialogueHistory.length <= 1) return;

    // 현재 대사 인덱스 pop
    state.dialogueHistory.pop();
    // 바로 직전 대사 인덱스
    const targetIdx = state.dialogueHistory[state.dialogueHistory.length - 1];
    state.stepIndex = targetIdx;

    // targetIdx 시점까지의 배경, 팝업, CG, 시네마틱 텍스트 상태 역추적 복원
    let targetBg = null;
    let targetPopup = null;
    let isPopupVisible = false;
    let targetCG = null;
    let isCGVisible = false;
    let targetCinematicText = null;

    for (let i = 0; i <= targetIdx; i++) {
      const s = state.steps[i];
      if (!s) continue;
      if (s.type === 'bg') targetBg = s.src;
      if (s.type === 'popup') { targetPopup = s.src; isPopupVisible = true; }
      if (s.type === 'popup_hide') { isPopupVisible = false; }
      if (s.type === 'cg' || s.type === 'cg_slow') { targetCG = s.src; isCGVisible = true; }
      if (s.type === 'cinematic_text') { targetCinematicText = s.text; }
      if (s.type === 'cinematic_clear') { targetCinematicText = null; }
    }

    if (targetBg) setBg(targetBg);

    if (isPopupVisible && targetPopup) {
      showPopup(targetPopup);
    } else {
      hidePopup();
    }

    if (isCGVisible && targetCG) {
      showCG(targetCG, true);
    } else {
      hideCG(true);
    }

    if (targetCinematicText) {
      showCinematicText(targetCinematicText);
    } else {
      hideCinematicText();
    }

    // 복원할 스텝의 타입에 맞춰 대화창 처리
    const currentTargetStep = state.steps[targetIdx];
    if (currentTargetStep && currentTargetStep.type === 'dialogue') {
      showDialogueLayer();
      renderDialogue(currentTargetStep);
    } else {
      hideDialogueLayer();
    }
  }

  // 화면 클릭 / 인터랙션 이벤트
  function handleDialogueAdvance() {
    if (state.isPuzzleActive) return;

    if (state.isTyping) {
      finishTyping();
    } else {
      state.stepIndex++;
      executeCurrentStep();
    }
  }

  // 퍼즐 실행 (기존 배경 위에 모달 팝업으로 뜸)
  function triggerPuzzle(puzzleId) {
    state.isPuzzleActive = true;
    document.getElementById('dialogue-box').style.display = 'none';
    hidePopup();

    const puzzleContainer = document.getElementById('puzzle-screen-container');
    const puzzleTitle = document.getElementById('puzzle-title-text');
    const puzzleImg = document.getElementById('puzzle-bg-img');
    const puzzleUI = document.getElementById('puzzle-interactive-ui');
    
    const config = (window.PUZZLE_CONFIG && window.PUZZLE_CONFIG['puzzle' + puzzleId]) || {
      title: `[ 문제 ${puzzleId} ]`,
      image: `assets/puzzle/puzzle${puzzleId}_box.png`
    };

    if (puzzleTitle) puzzleTitle.textContent = config.title;
    if (puzzleImg) puzzleImg.src = config.image;

    puzzleContainer.classList.add('active');

    if (puzzleId === 1) {
      puzzleUI.innerHTML = `<div id="dial-lock-container"></div>`;
      window.GamePuzzles.initDialPuzzle();
    } else if (puzzleId === 2) {
      puzzleUI.innerHTML = `
        <div class="text-puzzle-box">
          <input type="text" id="puzzle2-input" placeholder="정답을 입력하세요" autocomplete="off" />
          <button class="puzzle-submit-btn" onclick="GamePuzzles.submitPuzzle2()">확인</button>
          <div id="puzzle2-message" class="puzzle-feedback"></div>
        </div>
      `;
      setTimeout(() => document.getElementById('puzzle2-input').focus(), 100);
    } else if (puzzleId === 3) {
      puzzleUI.innerHTML = `
        <div class="text-puzzle-box">
          <input type="text" id="puzzle3-input" maxlength="10" placeholder="다섯 글자 입력" autocomplete="off" />
          <button class="puzzle-submit-btn" onclick="GamePuzzles.submitPuzzle3()">확인</button>
          <div id="puzzle3-message" class="puzzle-feedback"></div>
        </div>
      `;
      setTimeout(() => document.getElementById('puzzle3-input').focus(), 100);
    }
  }

  function hidePuzzleUI() {
    const puzzleContainer = document.getElementById('puzzle-screen-container');
    puzzleContainer.classList.remove('active');
    state.isPuzzleActive = false;
  }

  // 문제 팝업 닫고 직전 대사 상태로 돌아가기
  function closePuzzleToDialogue() {
    hidePuzzleUI();
    // 퍼즐 직전의 가장 최근 dialogue 스텝으로 인덱스 이동
    if (state.stepIndex > 0) {
      state.stepIndex--;
      while (state.stepIndex > 0 && state.steps[state.stepIndex].type !== 'dialogue') {
        state.stepIndex--;
      }
    }
    document.getElementById('dialogue-box').style.display = 'block';
    executeCurrentStep();
  }

  // 퍼즐 정답 맞췄을 때 호출
  function onPuzzleSolved(puzzleId) {
    playUnlockSound();
    hidePuzzleUI();

    const nextStage = puzzleId + 1;
    saveProgress(nextStage);

    // 다음 스테이지로 자연스럽게 이동
    startStage(nextStage);
  }

  let endingTimer1 = null;
  let endingTimer2 = null;

  // 엔딩 연출: 여학생 일러스트를 끄지 않고 유지한 채 오버레이 및 THE END 페이드인
  function triggerEnding() {
    hideCinematicText();
    hideDialogueLayer();
    // 여학생 일러스트(CG)를 끄지 않고 그대로 화면에 유지

    const endingOverlay = document.getElementById('ending-overlay');
    if (!endingOverlay) return;

    clearTimeout(endingTimer1);
    clearTimeout(endingTimer2);

    endingOverlay.classList.remove('show-text', 'show-btn');
    endingOverlay.classList.add('active'); // 은은한 다크 틴트 서서히 페이드인 (1.5s)

    // 0.6초 후 THE END 글자 페이드인 시작 (2.0s 동안 부드럽게 뜸)
    endingTimer1 = setTimeout(() => {
      endingOverlay.classList.add('show-text');
    }, 600);

    // THE END 글자가 완전히 뜬 후(2.6초 후) "타이틀로" 버튼 페이드인
    endingTimer2 = setTimeout(() => {
      endingOverlay.classList.add('show-btn');
    }, 2600);
  }

  // 타이틀 화면으로 안전하게 복귀 (인게임 상태 및 CG 즉시 완전 정리)
  function returnToTitle() {
    clearTimeout(endingTimer1);
    clearTimeout(endingTimer2);
    hideCinematicText();
    hideDialogueLayer();
    hideCG(true);
    hidePopup();
    hidePuzzleUI();
    state.currentBg = '';
    
    const endingOverlay = document.getElementById('ending-overlay');
    if (endingOverlay) {
      endingOverlay.classList.remove('active', 'show-text', 'show-btn');
    }
    
    const bgLayer = document.getElementById('bg-layer');
    if (bgLayer) bgLayer.style.backgroundImage = '';

    showScreen('screen-title');
  }

  // 스테이지 선택 화면 업데이트
  function openStageSelect() {
    loadProgress();
    const listEl = document.getElementById('stage-cards-grid');
    if (!listEl) return;

    const stages = [
      { num: 1, title: 'STAGE 1', bg: 'assets/bg/street_rain.png' },
      { num: 2, title: 'STAGE 2', bg: 'assets/bg/restaurant.png' },
      { num: 3, title: 'STAGE 3', bg: 'assets/bg/subway_inside.png' },
      { num: 4, title: 'STAGE 4', bg: 'assets/bg/school.png' }
    ];

    listEl.innerHTML = stages.map(st => {
      const isUnlocked = st.num <= state.unlockedStage;
      return `
        <div class="stage-card ${isUnlocked ? 'unlocked' : 'locked'}" onclick="${isUnlocked ? `GameEngine.startStage(${st.num})` : ''}">
          <div class="stage-card-thumb ${isUnlocked ? '' : 'locked-gray'}" ${isUnlocked ? `style="background-image: url('${st.bg}')"` : ''}>
            ${!isUnlocked ? '<div class="lock-overlay"><span class="lock-icon">🔒</span><span class="lock-text">LOCKED</span></div>' : ''}
          </div>
          <div class="stage-card-info">
            <h4>${st.title}</h4>
          </div>
        </div>
      `;
    }).join('');

    showScreen('screen-stage-select');
  }

  // 초기화 바인딩
  function init() {
    loadProgress();
    window.addEventListener('resize', handleResize);
    handleResize();

    // 키보드 이벤트 (스페이스, 엔터로 대사 넘기기 / 좌측 화살표로 이전 대사)
    window.addEventListener('keydown', (e) => {
      const gameScreen = document.getElementById('screen-game');
      if (gameScreen && gameScreen.classList.contains('active')) {
        // input 요소에 포커스가 있을 때는 입력 방해 금지
        if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
        
        if (e.code === 'Space' || e.code === 'Enter') {
          handleDialogueAdvance();
        } else if (e.code === 'ArrowLeft') {
          goToPreviousDialogue();
        }
      }
    });

    // 텍스트 인풋 엔터키 제출 지원
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (document.getElementById('puzzle2-input') === document.activeElement) {
          window.GamePuzzles.submitPuzzle2();
        } else if (document.getElementById('puzzle3-input') === document.activeElement) {
          window.GamePuzzles.submitPuzzle3();
        }
      }
    });
  }

  // 프로필 이미지 경로 매핑
  const PROFILE_MAP = {
    '성해빈': 'assets/profile/profile_haebin.png',
    '감자탕집 직원': 'assets/profile/profile_staff.png',
    '호두할머니': 'assets/profile/profile_grandma.png',
    '여학생': 'assets/profile/profile_girl.png'
  };

  // 이미지 파일이 아직 없을 때를 위한 플레이스홀더 아바타 SVG
  const FALLBACK_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><circle cx='40' cy='40' r='40' fill='%23282f42'/><circle cx='40' cy='32' r='16' fill='%236f7c94'/><path d='M16,72 Q40,48 64,72' fill='%236f7c94'/></svg>";

  // 대사보기 채팅방 모달 열기
  function openDialogueLog() {
    const container = document.getElementById('log-messages-container');
    const modal = document.getElementById('dialogue-log-modal');
    if (!container || !modal) return;

    // 현재 스테이지에서 지금까지 지나온 모든 대사 필터링
    const pastDialogues = [];
    for (let i = 0; i <= state.stepIndex && i < state.steps.length; i++) {
      const s = state.steps[i];
      if (s && (s.type === 'dialogue' || s.type === 'cinematic_text' || s.type === 'cinematic')) {
        pastDialogues.push(s);
      }
    }

    if (pastDialogues.length === 0) {
      container.innerHTML = '<div class="chat-row monologue"><div class="chat-monologue-text">아직 기록된 대사가 없습니다.</div></div>';
    } else {
      container.innerHTML = pastDialogues.map(d => {
        const textFormatted = d.text.replace(/\n/g, '<br>');
        const profileSrc = PROFILE_MAP[d.speaker] || FALLBACK_AVATAR;

        if (d.speaker === '독백') {
          // 독백: 왼쪽 정렬 (말풍선 없이 텍스트만)
          return `
            <div class="chat-row monologue">
              <div class="chat-monologue-text">${textFormatted}</div>
            </div>
          `;
        } else if (d.speaker === '성해빈') {
          // 성해빈: 오른쪽 정렬 말풍선 + 우측 프로필 사진
          return `
            <div class="chat-row haebin">
              <div class="chat-content-wrap">
                <div class="chat-bubble">${textFormatted}</div>
              </div>
              <img class="chat-profile-img" src="${profileSrc}" onerror="this.src='${FALLBACK_AVATAR}'" alt="성해빈" />
            </div>
          `;
        } else {
          // 다른 등장인물: 좌측 프로필 사진 + 화자 이름 + 말풍선
          return `
            <div class="chat-row other">
              <img class="chat-profile-img" src="${profileSrc}" onerror="this.src='${FALLBACK_AVATAR}'" alt="${d.speaker}" />
              <div class="chat-content-wrap">
                <span class="chat-speaker">${d.speaker}</span>
                <div class="chat-bubble">${textFormatted}</div>
              </div>
            </div>
          `;
        }
      }).join('');
    }

    modal.classList.add('active');

    // 최신 대사가 보이도록 맨 아래로 스크롤 이동
    setTimeout(() => {
      container.scrollTop = container.scrollHeight;
    }, 50);
  }

  // 대사보기 모달 닫기
  function closeDialogueLog() {
    const modal = document.getElementById('dialogue-log-modal');
    if (modal) modal.classList.remove('active');
  }

  return {
    init,
    startStage,
    openStageSelect,
    showScreen,
    handleDialogueAdvance,
    goToPreviousDialogue,
    returnToTitle,
    openDialogueLog,
    closeDialogueLog,
    closePuzzleToDialogue,
    onPuzzleSolved
  };
})();

window.addEventListener('DOMContentLoaded', () => {
  window.GameEngine.init();
});

