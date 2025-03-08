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
