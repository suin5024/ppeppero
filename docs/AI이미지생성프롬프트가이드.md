# <이상한 빼빼로데이> – AI 이미지 생성 프롬프트 가이드 (인디게임 저채도 스타일)

본 문서는 **공포/미스터리 인디게임 특유의 물 빠진 듯한 낮은 채도(Pale Desaturated)와 선명하고 깔끔한 2D 디지털 만화 화풍**으로 통일하여 이미지를 생성하기 위한 가이드입니다.  
**주은감자탕 실제 외관 사진과 직접 작성하신 문제 이미지 3종을 AI에 직접 첨부(업로드)하여 변환하는 방식으로 완벽하게 세팅되어 있습니다.**

---

## 📎 구글 플로우(ImageFX) 이미지 업로드 사용 안내

> **주은감자탕(5번) 및 퍼즐 3종(18~20번) 생성 시:**
> 1. 구글 플로우 화면의 **[이미지 업로드] 버튼**을 누르고, 실제 주은감자탕 사진이나 직접 만드신 문제 이미지를 올립니다.
> 2. 첨부된 상태에서 가이드의 해당 영문 프롬프트를 입력창에 넣고 실행합니다.
> 3. AI가 업로드된 이미지의 형태/텍스트를 인식하여 통일된 2D 인디게임 화풍의 완성본 4장을 생성해 줍니다!
> *(모든 22개 에셋 작업을 구글 플로우 한곳에서 100% 완료하실 수 있습니다)*

---

## 📐 규격 및 배경 기준표

| 분류 | 대상 에셋 | 게임 내 최종 규격 | AI 생성 요청 비율 (DALL-E 3 / Imagen 3) |
|---|---|:---:|:---:|
| **배경 & CG & 퍼즐** | 타이틀, 배경 7종, 엔딩 CG 2종, 퍼즐 3종 | `1920 × 1080 px` | **`Aspect ratio 16:9 widescreen` (`1792 × 1024 px`)** |
| **반신 캐릭터** | 성해빈, 직원, 할머니 (인물당 기본 모습 1장씩, 총 3장) | `약 700 × 1100 px` (크롭 후) | **`Aspect ratio 9:16 vertical portrait` (`1024 × 1792 px`)** |
| **소품 팝업** | 상자, 감자탕, 쪽지, 편지봉투, 서 있는 여학생 | `약 600~800 px` (크롭 후) | **`Aspect ratio 1:1 square` (`1024 × 1024 px`)** |

- **배경 처리**: 캐릭터와 소품은 누끼를 가장 깔끔하게 따기 위해 **단색 순수 흰색 배경(Solid Pure White Background)**으로 생성됩니다. (그림판 [배경 제거]로 1초 만에 투명화 가능)

---

## 1. 챗지피티 / 제미나이 / 코파일럿 시작 프롬프트 (세션 고정용)

새 채팅방을 여신 뒤, **아래 내용을 첫 메시지로 전송**하세요.

```text
안녕! 나는 남자친구를 위한 '빼빼로데이 기념 웹 비주얼 노벨 인디게임'을 만들고 있어.
이 채팅방에서는 게임에 들어갈 모든 배경, 캐릭터, 소품, 이벤트 일러스트(CG), 퍼즐 이미지를 순서대로 생성할 거야.

아래의 [인디게임 화풍 및 규격 규칙]을 모든 이미지에 일관되게 고정 적용해줘.

[화풍 및 비주얼 가이드라인]
1. 아트 스타일: 미스터리/내러티브 2D 인디게임 스타일 (Stylized 2D indie visual novel art).
2. 선화 및 질감: 연필이나 캔버스 질감 금지. 깔끔하고 또렷한 디지털 선화(Clean crisp 2D digital line art)와 담백한 플랫/셀 채색(smooth flat cel shading).
3. 색감 및 명도:
   - 색감: 공포/미스터리 인디게임 특유의 물 빠진 듯한 낮은 채도 (Pale, desaturated, washed-out color palette). 쨍한 원색 금지.
   - 명도: 지나치게 어둡거나 침침하지 않고, 사물과 인물이 선명하고 맑게 보이는 깨끗한 밝기 (Clear, bright neutral lighting, not overly dark).
4. 규격 및 프레이밍 (반드시 엄수):
   - 배경 / 전체화면 CG / 퍼즐: 반드시 16:9 가로형 와이드 비율 (Aspect ratio 16:9 widescreen, 1792x1024 resolution).
   - 캐릭터 이미지: 누끼 작업을 위해 반드시 '단색 순수 흰색 배경(isolated on a clean solid pure white background)'으로 생성. 단순 가슴 위 바스트업이 아니라 머리부터 배, 골반, 허벅지/하체 일부까지 나오는 세로형 반신 스탠딩 구도 (Aspect ratio 9:16 vertical portrait, half-body down to mid-thighs).
   - 소품 이미지: 반드시 '단색 순수 흰색 배경'. 사물이 잘리지 않고 중앙에 꽉 찬 1:1 정사각형 구도 (Aspect ratio 1:1 square, 1024x1024 resolution).
5. 배경 간판: 배경 속 필요한 간판('잠실역', '주은 감자탕' 등)은 자연스러운 한국어 폰트 간판으로 묘사 (가락시장역 내부 및 가원중학교는 글씨나 학교명 없이 묘사).
6. 이미지 첨부 참조:
   - 내가 주은감자탕 사진이나 직접 작성한 문제 이미지를 첨부하면, 그 이미지의 외형과 텍스트 내용을 정확하게 반영하여 일관된 2D 인디게임 화풍으로 완성해줘.
7. 캐릭터 외형:
   - 주인공 [성해빈]: 고등학생(17~18세), 깔끔한 댄디컷 흑발에 **검은색 뿔테 안경 착용(black horn-rimmed glasses)**, 덤덤하고 날카로운 인상의 소년. 옷차림: **나루토 캐릭터 그래픽이 그려진 셔츠 위에 검정 패딩(black puffer jacket over a Naruto graphic t-shirt), 벨트 없는 편안한 바지(casual pants with NO belt)**.
   - 엔딩 여학생 [여자친구]: 앳되고 맑은 인상, **검정 뿔테 안경 착용(black horn-rimmed glasses), 앞머리 없이 이마를 드러낸 히메컷 헤어스타일(Hime cut hairstyle with exposed forehead, no bangs)**. 옷차림: **후드티 위에 흰색 패딩(white puffer jacket over a hoodie)**.
   - 감자탕집 직원: 인상 좋은 중년 식당 이모님, 단정한 앞치마.
   - 호두할머니: 안경을 쓴 비범하고 기묘한 분위기의 70대 할머니.

이 규칙들을 이해했으면 "네, 저채도의 깔끔한 2D 인디게임 스타일과 첨부 이미지 반영 준비가 되었습니다. 첫 번째 이미지를 요청해 주세요!"라고 답해줘.
```

---

## 2. 이미지별 프롬프트 목록

---

### ■ 타이틀 화면 (16:9 와이드)

#### 1. 타이틀 배경 (`ui/title_bg.png`)
- **게임 내 최종 규격**: `1920 × 1080 px`
- **AI 생성 요청 규격**: `Aspect ratio 16:9 widescreen (1792x1024 resolution)`
```text
Title background illustration for a stylized 2D indie visual novel game. Aspect ratio 16:9 widescreen (1792x1024 resolution). Clean crisp digital anime line art with smooth flat shading. A calm, quiet late-autumn rainy afternoon scene. Clear view through a large glass window with delicate rain streaks, looking out onto a clean, desaturated Korean street. On the clean wooden table by the window, a large fancy heart-shaped Pepero gift box (featuring a soft pastel-pink lid with delicate chocolate-stick patterns along the rim, a rich chocolate-brown base, and a wide cream-colored satin ribbon tied into an elegant bow at the center) sits beside a simple folded umbrella. Pale, desaturated, low saturation washed-out color palette, but bright and clear lighting. Nostalgic, clean indie game aesthetic. No text, no letters.
```

---

### ■ 배경 이미지 7종 (모두 16:9 와이드)

#### 2. 비 오는 길거리 (`bg/street_rain.jpg`)
- **게임 내 최종 규격**: `1920 × 1080 px`
- **AI 생성 요청 규격**: `Aspect ratio 16:9 widescreen (1792x1024 resolution)`
```text
Visual novel background illustration. Aspect ratio 16:9 widescreen (1792x1024 resolution). Clean 2D indie game art style, crisp digital outlines, flat coloring. A quiet Korean urban residential street on a drizzly Saturday in November. Wet clean asphalt reflecting the pale overcast sky, clear puddles on the sidewalk, neat telephone poles and quiet apartment buildings in the background. Pale, desaturated, low saturation color palette, bright neutral overcast daylight, clear visibility. No people.
```

#### 3. 빼빼로데이 편의점 유리창 (`bg/convenience.jpg`)
- **게임 내 최종 규격**: `1920 × 1080 px`
- **AI 생성 요청 규격**: `Aspect ratio 16:9 widescreen (1792x1024 resolution)`
```text
Visual novel background illustration. Aspect ratio 16:9 widescreen (1792x1024 resolution). Clean 2D indie game art style. Front exterior view of a Korean convenience store on a drizzly evening. Through the clean glass window, promotional displays and posters with Korean text '빼빼로데이' and heart graphics are visible inside. Bright, clear cool-white fluorescent light illuminating the damp sidewalk outside. Desaturated, washed-out color tones with clean contrast, sharp outlines. No people.
```

#### 4. 동네 정자 (`bg/pavilion.jpg`)
- **게임 내 최종 규격**: `1920 × 1080 px`
- **AI 생성 요청 규격**: `Aspect ratio 16:9 widescreen (1792x1024 resolution)`
```text
Visual novel background illustration. Aspect ratio 16:9 widescreen (1792x1024 resolution). Clean 2D indie adventure game art style, sharp digital line art, smooth cel shading. A neat traditional Korean wooden gazebo (Jeongja) in a clean neighborhood park under light rain. Wet wooden deck and tiled roof eaves with steady rain falling, surrounded by pale autumn trees. Peaceful, quiet refuge. Pale, desaturated earthy tones, clear soft ambient light.
```

#### 5. 주은 감자탕 매장 입구/외관 (`bg/restaurant.jpg`)
- **게임 내 최종 규격**: `1920 × 1080 px`
- **AI 생성 요청 규격**: `Aspect ratio 16:9 widescreen (1792x1024 resolution)`
> 💡 **사용법**: 실제 '주은감자탕' 매장 입구/외관 사진을 먼저 첨부(업로드)한 뒤, 아래 프롬프트를 함께 전송하세요.
```text
[Please refer to the attached real-life photo of the actual restaurant entrance/storefront.]
Visual novel background illustration. Aspect ratio 16:9 widescreen (1792x1024 resolution). Clean 2D indie game art style, crisp digital anime outlines, smooth flat shading. Transform the attached real-world photo into a stylized 2D anime background of the restaurant entrance. Accurately replicate the distinct architectural facade, glass sliding doors, awning, and the iconic signboard reading '주은감자탕' from the attached reference photo. Wet pavement in front from a light November drizzle. Pale, desaturated color palette matching the game's aesthetic, but with bright and clear daylight visibility. No people.
```

#### 6. 잠실역 출구 (`bg/station_exit.jpg`)
- **게임 내 최종 규격**: `1920 × 1080 px`
- **AI 생성 요청 규격**: `Aspect ratio 16:9 widescreen (1792x1024 resolution)`
```text
Visual novel background illustration. Aspect ratio 16:9 widescreen (1792x1024 resolution). Clean 2D indie game art style, sharp digital linework. Modern Seoul subway station entrance with a prominent clean sign showing Korean text '잠실역' (Jamsil Station). The rain has just stopped, leaving clean damp pavement reflecting the pale sky. Modern glass entrance canopy, distant urban buildings under high overcast clouds. Desaturated cool tones, crisp bright daylight.
```

#### 7. 지하철 역사 내부 (`bg/subway_inside.jpg`)
- **게임 내 최종 규격**: `1920 × 1080 px`
- **AI 생성 요청 규격**: `Aspect ratio 16:9 widescreen (1792x1024 resolution)`
```text
Visual novel background illustration. Aspect ratio 16:9 widescreen (1792x1024 resolution). Clean 2D indie game background, sharp digital outlines. Inside a bright, spacious Seoul subway station concourse with generic directional arrows and signs, but NO specific station names or readable text. Clean turnstile gates, ticket machines, polished floor tiles reflecting cool overhead LED lights, spacious pillars and neat concourse layout. Subdued, desaturated industrial tones, bright and clear visibility. No readable station names, no people.
```

#### 8. 가원중학교 교문 (`bg/school.jpg`)
- **게임 내 최종 규격**: `1920 × 1080 px`
- **AI 생성 요청 규격**: `Aspect ratio 16:9 widescreen (1792x1024 resolution)`
```text
Visual novel background illustration. Aspect ratio 16:9 widescreen (1792x1024 resolution). Clean 2D indie game art style. The front gate and entrance of a typical Korean middle school, with NO readable text or specific school name on the gate pillars (clean generic school gate). A quiet Saturday afternoon with a light drizzle. Clean red brick school building in the background, neat main entrance doors with a small porch canopy, wet athletic ground. Pale, desaturated color palette, bright clear lighting, calm and nostalgic mystery mood.
```

---

### ■ 대화창 캐릭터 일러스트 (단색 흰색 배경, 인물당 단일 기본 모습 1장씩)

- **게임 내 최종 규격**: 배경 제거 및 여백 크롭 후 `약 700 × 1100 px`
- **AI 생성 요청 규격**: `Aspect ratio 9:16 vertical portrait (1024x1792 resolution)`
- **프레이밍**: 머리부터 가슴, 배, 골반, 허벅지(하체 일부)까지 시원하게 보이는 3/4 반신 스탠딩 구도
- **배경**: 누끼 작업을 위해 **단색 순수 흰색 배경(isolated on a clean solid pure white background)** 필수

#### 9. 성해빈 - 기본 모습 (`char/haebin_default.png`)
```text
Visual novel character sprite half-body standing portrait. Aspect ratio 9:16 vertical portrait (1024x1792 resolution). Clean 2D indie visual novel art style, crisp digital anime outlines, smooth flat cel shading. A 17-18 year old Korean high school boy named Haebin. Neat dandy black hair, wearing stylish black horn-rimmed glasses, calm, sharp, slightly deadpan eyes behind the spectacles. Clothing: an unzipped black puffer jacket (padded down jacket) worn over a casual t-shirt with a clear Naruto anime ninja graphic printed on the chest, paired with dark casual pants with NO belt (clean beltless waistband). Neutral, nonchalant expression. Half-body 3/4 view showing the head down to the waist, hips, and mid-thighs. Pale, desaturated color palette, bright neutral lighting. MUST BE ISOLATED on a clean solid pure white background (easy for background removal, no shadows on background).
```

#### 10. 감자탕집 직원 (`char/staff_default.png`)
```text
Visual novel character sprite half-body standing portrait. Aspect ratio 9:16 vertical portrait (1024x1792 resolution). Clean 2D indie game style, sharp digital linework. A kind, genial middle-aged Korean restaurant auntie (40s-50s) wearing a clean brown apron over clothes. Warm, humorous, friendly crinkled-eye smile, holding out a memo paper. Half-body 3/4 view showing the head down to the waist, hips, and mid-thighs. Pale desaturated earthy colors, bright clear lighting. MUST BE ISOLATED on a clean solid pure white background (easy for background removal, no shadows on background).
```

#### 11. 호두할머니 (`char/grandma_default.png`)
```text
Visual novel character sprite half-body standing portrait. Aspect ratio 9:16 vertical portrait (1024x1792 resolution). Clean 2D indie game style, sharp digital lines. An eccentric, dignified 70-year-old Korean grandmother with grey permed hair and round retro spectacles, wearing a neat knit vest and long skirt. Mysterious, sharp, knowing smile, holding a clean walnut. Half-body 3/4 view showing the head down to the waist, hips, and mid-thighs. Pale desaturated vintage colors, bright clear lighting. MUST BE ISOLATED on a clean solid pure white background (easy for background removal, no shadows on background).
```

---

### ■ 소품 팝업 이미지 (단색 흰색 배경, 1:1 정사각형)

- **게임 내 최종 규격**: 배경 제거 및 여백 크롭 후 `약 600~800 px`
- **AI 생성 요청 규격**: `Aspect ratio 1:1 square (1024x1024 resolution)`
- **배경**: **단색 순수 흰색 배경(isolated on a clean solid pure white background)** 필수

#### 12. 큰 하트 모양 빼빼로 상자 (`popup/heart_box.png`)
```text
Visual novel prop item illustration. Aspect ratio 1:1 square (1024x1024 resolution). Clean 2D indie game art style, crisp digital outlines, smooth flat shading. A large fancy heart-shaped Pepero gift box featuring a soft pastel-pink lid with delicate chocolate-stick patterns along the rim, a rich chocolate-brown base, and a wide cream-colored satin ribbon tied into an elegant bow at the center. Closed lid. Clear, sharp view centered and filling most of the frame neatly. Pale desaturated pastel-pink and warm chocolate-brown tones, bright clear lighting. MUST BE ISOLATED on a clean solid pure white background (easy for background removal, no shadows on background).
```

#### 13. 뚜껑 열린 상자 + 자물쇠 나무상자 (`popup/heart_box_opened.png`)
> 💡 **사용법**: **18번(문제 1: 포스트잇 붙은 자물쇠 나무상자)** 이미지를 먼저 생성한 뒤, 그 결과물 이미지를 챗지피티에 파일로 첨부(업로드)하고 아래 프롬프트를 전송하세요.
```text
[Please refer to the attached reference image showing the antique wooden lockbox.]
Visual novel prop item illustration. Aspect ratio 1:1 square (1024x1024 resolution). Clean 2D indie game art style, sharp digital lines, smooth flat shading. The large fancy heart-shaped Pepero gift box (soft pastel-pink lid with delicate chocolate-stick patterns along the rim, rich chocolate-brown base, cream satin ribbon) now has its lid opened and resting right beside it. Placed inside the heart box, instead of snacks, is the EXACT SAME antique wooden lockbox with the dial lock seen in the attached reference image (faithfully replicate its exact dark wood finish, brass corner brackets, metal hinges, the brass dial lock, and the bright yellow square post-it note stuck to it from the attached reference). Centered and filling the frame neatly. Pale desaturated tones, bright clear lighting. MUST BE ISOLATED on a clean solid pure white background (easy for background removal, no shadows on background).
```

#### 14. 보글보글 감자탕 소(小)자 (`popup/gamjatang.png`)
```text
Visual novel food item illustration. Aspect ratio 1:1 square (1024x1024 resolution). Clean 2D indie game art style, crisp digital linework. A steaming hot Korean Gamjatang (pork backbone soup) in a traditional black clay pot (ttukbaegi). Tender meat bones, perilla leaves, savory seed powder on top, gentle steam rising. Centered and filling the frame neatly. Pale desaturated warm tones, bright clean lighting. MUST BE ISOLATED on a clean solid pure white background (easy for background removal, no shadows on background).
```

#### 15. 접힌 쪽지 (`popup/note_folded.png`)
```text
Visual novel prop illustration. Aspect ratio 1:1 square (1024x1024 resolution). Clean 2D indie game style, sharp lines. A small, neatly folded memo paper from a restaurant. Clean, simple, slightly creased. Centered and filling the frame neatly. Pale desaturated off-white tones, bright lighting. MUST BE ISOLATED on a clean solid pure white background (easy for background removal, no shadows on background).
```

#### 16. 편지봉투 (`popup/envelope.png`)
```text
Visual novel prop illustration. Aspect ratio 1:1 square (1024x1024 resolution). Clean 2D indie game style, sharp lines. A clean vintage craft paper letter envelope sealed with a cute sticker. Centered and filling the frame neatly. Pale desaturated brown tones, bright clear lighting. MUST BE ISOLATED on a clean solid pure white background (easy for background removal, no shadows on background).
```

#### 17. 비 피하고 서 있는 여학생 (`popup/girl_standing.png`)
```text
Visual novel standing character sprite. Aspect ratio 9:16 vertical portrait (1024x1792 resolution). Clean 2D indie game art style, sharp digital lines, smooth flat coloring. 3/4 knee-up view filling most of the vertical frame. A teenage girl wearing black horn-rimmed glasses. She has a distinctive Hime cut hairstyle with straight cheek/chin-length side locks and dark hair parted to expose a clean forehead with no bangs. Clothing: a warm puffy white puffer jacket over a hoodie, casual dark pants. Standing sheltered beneath a school entrance roof while light rain falls outside, holding her bag, looking forward with a quiet, patient expression. Pale desaturated colors, bright clear daylight. MUST BE ISOLATED on a clean solid pure white background (easy for background removal, no shadows on background).
```

---

### ■ 퍼즐 이미지 3종 (직접 작성한 문제 이미지 첨부용, 16:9 와이드)

- **게임 내 최종 규격**: `1920 × 1080 px`
- **AI 생성 요청 규격**: `Aspect ratio 16:9 widescreen (1792x1024 resolution)`
> 💡 **사용법**: 수인님이 직접 만드신 문제 이미지를 먼저 첨부(업로드)한 뒤, 아래 프롬프트를 함께 전송하세요.

#### 18. 문제 1: 포스트잇 붙은 자물쇠 나무상자 (`puzzle/puzzle1_box.png`)
```text
[Please refer to the attached reference image showing the clue text.]
Visual novel puzzle clue illustration. Aspect ratio 16:9 widescreen (1792x1024 resolution). Clean 2D indie game art style, sharp digital outlines, smooth flat shading. Replicate the concept from the attached image into an authentic in-game clue. A neat vintage wooden chest box with an antique brass 5-letter dial combination lock in the center. Firmly attached to the wooden surface right above the lock is a classic bright yellow square post-it sticky note (clearly yellow memo paper) showing the exact handwritten Korean puzzle text from the reference ("13-11-09 다음 수열이 의미하는 것은?"). Pale desaturated palette with the yellow note standing out cleanly, bright clear lighting.
```

#### 19. 문제 2: 지하철 노선 쪽지 (`puzzle/puzzle2_subway.png`)
```text
[Please refer to the attached reference image containing the subway lines and message.]
Visual novel puzzle clue illustration. Aspect ratio 16:9 widescreen (1792x1024 resolution). Clean 2D indie game art style, crisp digital linework. An unfolded paper memo lying on a clean wooden table. Faithfully reproduce the diagram and handwritten message from the attached image: a pale orange horizontal line crossing a pale pink vertical line with a Korean Taegeuk symbol at the intersection, accompanied by the Korean handwritten clue note. Desaturated pale colors, bright clean lighting.
```

#### 20. 문제 3: w3w 펼쳐진 편지지 (`puzzle/puzzle3_letter.png`)
```text
[Please refer to the attached reference image containing the letter text.]
Visual novel puzzle clue illustration. Aspect ratio 16:9 widescreen (1792x1024 resolution). Clean 2D indie game art style, sharp digital lines. An unfolded letter on clean stationery paper. Clearly replicate the Korean handwriting from the attached image, with the words for '자전거', '페달', and '노력' emphasized in distinct ink colors, ending with 'w3w'. Pale desaturated aesthetic, bright clear lighting.
```

---

### ■ 엔딩 전체화면 CG 2종 (16:9 와이드)

- **게임 내 최종 규격**: `1920 × 1080 px`
- **AI 생성 요청 규격**: `Aspect ratio 16:9 widescreen (1792x1024 resolution)`

#### 21. 여학생 얼굴 클로즈업 (`cg/girl_face.png`)
```text
Visual novel climax event CG. Aspect ratio 16:9 widescreen (1792x1024 resolution). Clean 2D indie game art style, crisp digital anime outlines, smooth flat coloring. A close-up emotional shot of the teenage girl's face. She wears black horn-rimmed glasses, and has a distinctive stylish Hime cut hairstyle with exposed forehead and no bangs (no front fringe). Wearing a white puffer jacket with a cozy hoodie collar. Gentle breeze catching stray strands of hair, large expressive dark eyes behind her glasses looking forward into the rain with mild longing. Pale desaturated cool tones, bright and clear cinematic lighting.
```

#### 22. 밝아지는 여학생 얼굴 - "어? 오빠다!" (`cg/girl_smile.png`)
```text
Visual novel climax event CG. Aspect ratio 16:9 widescreen (1792x1024 resolution). Clean 2D indie game climax illustration. The same teenage girl (wearing black horn-rimmed glasses, Hime cut hairstyle with exposed forehead and no bangs, white puffer jacket over a hoodie) suddenly recognizing her boyfriend. Her face lights up with a radiant, blooming, heartfelt smile. Eyes sparkling behind her glasses with joyful relief and happiness ("Oh? It's Oppa!"). Gentle warm light focusing on her happy expression while the background remains a soft, pale desaturated rainy scene. Clean crisp lines, bright clear emotional climax.
```
