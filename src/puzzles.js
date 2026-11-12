// <이상한 빼빼로데이> - 퍼즐 인터랙션 모듈 (문제 1, 2, 3)

// ========================================================
// 💡 문제별 상단 안내 문구 설정 (여기서 자유롭게 문구를 수정하실 수 있습니다!)
// ========================================================
window.PUZZLE_CONFIG = {
  puzzle1: {
    title: "자물쇠를 풀어라.",
    image: "assets/puzzle/puzzle1_box.png"
  },
  puzzle2: {
    title: "쪽지가 가리키는 장소는 어디인가?",
    image: "assets/puzzle/puzzle2_subway.png"
  },
  puzzle3: {
    title: "'이곳'은 어디인가?",
    image: "assets/puzzle/puzzle3_letter.png"
  }
};

window.GamePuzzles = (function () {
  // 다이얼별 고유 알파벳 범위 (각각 10글자씩)
  const DIAL_RANGES = [
    ['L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'], // 1번째: L ~ U (정답 T)
    ['G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'], // 2번째: G ~ P (정답 O)
    ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'], // 3번째: B ~ K (정답 D)
    ['X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G'], // 4번째: X ~ G (정답 A)
    ['R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A']  // 5번째: R ~ A (정답 Y)
  ];

  // 문제 1 다이얼 현재 상태 (초기값: L - H - F - B - U)
  let dialLetters = ['L', 'H', 'F', 'B', 'U'];

  function initDialPuzzle() {
    dialLetters = ['L', 'H', 'F', 'B', 'U']; // 사용자 지정 시작 알파벳
    renderDials();
  }

  function rotateDial(index, direction) {
    const range = DIAL_RANGES[index] || ['A'];
    const curIdx = range.indexOf(dialLetters[index]);
    let nextIdx;
    if (direction === 'up') {
      nextIdx = (curIdx - 1 + range.length) % range.length;
    } else {
      nextIdx = (curIdx + 1) % range.length;
    }
    dialLetters[index] = range[nextIdx];

    // UI 업데이트
    const dialEl = document.querySelector(`.dial-item[data-index="${index}"] .dial-char`);
    if (dialEl) {
      dialEl.textContent = dialLetters[index];
      dialEl.classList.remove('spin');
      void dialEl.offsetWidth; // reflow
      dialEl.classList.add('spin');
    }
  }

  function renderDials() {
    const container = document.getElementById('dial-lock-container');
    if (!container) return;

    container.innerHTML = `
      <div class="dial-lock-wrapper">
        <div class="dial-lock-rollers">
          ${dialLetters.map((char, i) => `
            <div class="dial-item" data-index="${i}">
              <button class="dial-arrow-btn up-btn" onclick="GamePuzzles.onDialArrow(${i}, 'up')">▲</button>
              <div class="dial-window">
                <span class="dial-char">${char}</span>
              </div>
              <button class="dial-arrow-btn down-btn" onclick="GamePuzzles.onDialArrow(${i}, 'down')">▼</button>
            </div>
          `).join('')}
        </div>
        <button class="puzzle-submit-btn" onclick="GamePuzzles.submitPuzzle1()">UNLOCK</button>
        <div id="puzzle1-message" class="puzzle-feedback"></div>
      </div>
    `;
  }

  function submitPuzzle1() {
    const answer = dialLetters.join('');
    const feedback = document.getElementById('puzzle1-message');
    const lockWrapper = document.querySelector('.dial-lock-wrapper');

    if (answer === 'TODAY') {
      feedback.textContent = 'SOLVED';
      feedback.className = 'puzzle-feedback success';
      lockWrapper.classList.add('success-unlock');

      setTimeout(() => {
        window.GameEngine.onPuzzleSolved(1);
      }, 1000);
    } else {
      feedback.textContent = '자물쇠가 굳게 닫혀 있습니다. (힌트: 날짜 수열)';
      feedback.className = 'puzzle-feedback error';
      lockWrapper.classList.remove('shake');
      void lockWrapper.offsetWidth;
      lockWrapper.classList.add('shake');
    }
  }

  function submitPuzzle2() {
    const input = document.getElementById('puzzle2-input');
    const feedback = document.getElementById('puzzle2-message');
    const box = document.querySelector('.text-puzzle-box');

    if (!input) return;
    const cleanVal = input.value.replace(/\s+/g, '').trim();

    if (cleanVal === '가락시장' || cleanVal === '가락시장역') {
      feedback.textContent = 'SOLVED';
      feedback.className = 'puzzle-feedback success';
      box.classList.add('success-unlock');

      setTimeout(() => {
        window.GameEngine.onPuzzleSolved(2);
      }, 1000);
    } else {
      feedback.textContent = '답이 아닌 것 같습니다. 노선 쪽지를 다시 살펴보세요.';
      feedback.className = 'puzzle-feedback error';
      box.classList.remove('shake');
      void box.offsetWidth;
      box.classList.add('shake');
    }
  }

  function submitPuzzle3() {
    const input = document.getElementById('puzzle3-input');
    const feedback = document.getElementById('puzzle3-message');
    const box = document.querySelector('.text-puzzle-box');

    if (!input) return;
    const cleanVal = input.value.replace(/\s+/g, '').trim();

    if (cleanVal === '가원중학교') {
      feedback.textContent = 'SOLVED';
      feedback.className = 'puzzle-feedback success';
      box.classList.add('success-unlock');

      setTimeout(() => {
        window.GameEngine.onPuzzleSolved(3);
      }, 1000);
    } else {
      feedback.textContent = '여기가 아닌 것 같습니다. (힌트: 한글 다섯 글자)';
      feedback.className = 'puzzle-feedback error';
      box.classList.remove('shake');
      void box.offsetWidth;
      box.classList.add('shake');
    }
  }

  return {
    initDialPuzzle,
    onDialArrow: (index, dir) => rotateDial(index, dir),
    submitPuzzle1,
    submitPuzzle2,
    submitPuzzle3
  };
})();

