// 🔥 Firebase 설정 (Firebase 콘솔에서 복사한 정보 입력)
const firebaseConfig = {
    apiKey: "AIzaSyDlr9ZdKykypIPt4l5uK1h4PPgw_6yrds4",
    authDomain: "sparklingteam-7cd01.firebaseapp.com",
    projectId: "sparklingteam-7cd01",
    storageBucket: "sparklingteam-7cd01.appspot.com",
    messagingSenderId: "710268007308",
    appId: "1:710268007308:web:01cab459e67797856d9ca9"
};


// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let totalFunds = 0;
let remainingFunds = 0;
let investments = [0, 0, 0, 0, 0];
let userName = "";

// 🛠️ 투자 시작 (사용자 정보 입력 및 UI 업데이트)
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

// 🛠️ 투자 실행 (Firestore 저장 및 UI 업데이트)
function invest(index) {
    let investAmount = parseInt(document.getElementById(`invest${index}`).value);

    if (isNaN(investAmount) || investAmount <= 0) {
        alert("올바른 투자 금액을 입력하세요!");
        return;
    }

    if (investAmount > remainingFunds) {
        alert("남은 투자 금액을 초과할 수 없습니다!");
        return;
    }

    // 투자 반영
    investments[index] += investAmount;
    remainingFunds -= investAmount;

    // ✅ UI 업데이트 (남은 금액 & 투자한 금액 표시)
    document.getElementById("remainingFunds").innerText = remainingFunds;
    document.getElementById(`invested${index}`).innerText = investments[index];

    // Firestore에 투자 내역 저장 (현재 시간 포함)
    db.collection("investments").add({
        name: userName, // 투자자 이름
        amount: investAmount, // 투자 금액
        startup: ["ELECTRIC CAT", "TWINKLE", "평화를 잇다", "유기견 프로젝트", "세이빈"][index], // 투자한 스타트업 이름
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // 현재 시간 자동 추가
    });

    alert(userName + "님이 " + investAmount + "원을 투자하였습니다!");
}

// 🛠️ 최종 결과 발표
function finalizeInvestment() {
    let maxInvestment = Math.max(...investments);
    let winnerIndex = investments.indexOf(maxInvestment);
    let winnerNames = ["ELECTRIC CAT", "TWINKLE", "평화를 잇다", "유기견 프로젝트", "세이빈"];

    if (maxInvestment === 0) {
        document.getElementById("winner").innerText = "아직 투자가 이루어지지 않았습니다!";
    } else {
        document.getElementById("winner").innerText =
            `🏆 가장 많은 투자를 받은 아이디어는 '${winnerNames[winnerIndex]}'입니다!`;
    }
}
