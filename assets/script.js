// 🔥 Firebase 설정 (Firebase 콘솔에서 복사한 정보 입력)
const firebaseConfig = {
    apiKey: "AIzaSyDlr9ZdKykypIPt4l5uK1h4PPgw_6yrds4",
    authDomain: "sparklingteam-7cd01.firebaseapp.com",
    projectId: "sparklingteam-7cd01",
    storageBucket: "sparklingteam-7cd01.firebasestorage.app",
    messagingSenderId: "710268007308",
    appId: "1:710268007308:web:01cab459e67797856d9ca9"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let totalFunds = 0;
let remainingFunds = 0;
let investments = [0, 0, 0];
let userName = "";

// 🛠️ 투자 시작 (UI 업데이트 + 사용자 정보 저장)
function startInvestment() {
    userName = document.getElementById("userName").value;
    totalFunds = parseInt(document.getElementById("totalFunds").value);

    if (!userName.trim() || isNaN(totalFunds) || totalFunds <= 0) {
        alert("이름과 올바른 투자 금액을 입력하세요!");
        return;
    }

    remainingFunds = totalFunds;
    document.getElementById("remainingFunds").innerText = remainingFunds;

    // ✅ UI 업데이트 (스타트업 투자 섹션 표시)
    document.getElementById("userInfo").style.display = "none"; // 사용자 정보 입력 숨기기
    document.getElementById("funds").style.display = "block"; // 남은 투자 금액 표시
    document.getElementById("projects").style.display = "block"; // 🚀 투자 가능한 창업 아이디어 표시!
    document.getElementById("finalizeBtn").style.display = "block"; // 최종 결과 버튼 표시
}
✅ 이제 투자 시작 버튼을 누르면 "투자 가능한 창업 아이디어"가 정상적으로 표시될 것입니다! 🚀

✅ index.html 수정 확인
📌 스타트업 정보를 올바르게 표시하는지 확인 필요
📜 (index.html)

html
복사
편집
<!-- 투자 가능한 창업 아이디어 -->
<h2>투자 가능한 창업 아이디어</h2>
<div id="projects" style="display:none;"> <!-- 🚀 기본적으로 숨김 상태 -->
    <div class="project">
        <h3>1. 카피바라 대표님의 아이디어</h3>
        <p>⚡ ELECTRIC CAT (친환경 전기생산 놀이터)</p>
        <input type="number" id="invest0" placeholder="투자금 입력">
        <button onclick="invest(0)">투자하기</button>
        <span class="investment">투자금: <span id="invested0">0</span> 원</span>
    </div>
    <div class="project">
        <h3>2. 주주 대표님의 아이디어</h3>
        <p>💎 TWINKLE (동시 통역기)</p>
        <input type="number" id="invest1" placeholder="투자금 입력">
        <button onclick="invest(1)">투자하기</button>
        <span class="investment">투자금: <span id="invested1">0</span> 원</span>
    </div>
    <div class="project">
        <h3>3. 에드거 대표님의 아이디어</h3>
        <p>🕊️ 평화를 잇다 (층간 소음 해결사)</p>
        <input type="number" id="invest2" placeholder="투자금 입력">
        <button onclick="invest(2)">투자하기</button>
        <span class="investment">투자금: <span id="invested2">0</span> 원</span>
    </div>
</div>
