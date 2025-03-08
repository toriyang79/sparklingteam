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

// 투자 시작 (사용자 정보 입력)
function startInvestment() {
    userName = document.getElementById("userName").value;
    totalFunds = parseInt(document.getElementById("totalFunds").value);

    if (!userName.trim() || isNaN(totalFunds) || totalFunds <= 0) {
        alert("이름과 올바른 투자 금액을 입력하세요!");
        return;
    }

    remainingFunds = totalFunds;
    document.getElementById("remainingFunds").innerText = remainingFunds;

    // UI 업데이트
    document.getElementById("userInfo").style.display = "none";
    document.getElementById("funds").style.display = "block";
    document.getElementById("projects").style.display = "block";
    document.getElementById("finalizeBtn").style.display = "block";
}

// 투자 실행
function invest(index) {
    let investAmount = parseInt(document.getElementById(`invest${index}`).value);

    if (isNaN(investAmount) || investAmount <= 0 || investAmount > remainingFunds) {
        alert("올바른 투자 금액을 입력하세요!");
        return;
    }

    // Firestore에 투자 내역 저장 (현재 시간 포함)
    db.collection("investments").add({
        name: userName,
        amount: investAmount,
        startup: ["ELECTRIC CAT", "TWINKLE", "평화를 잇다"][index],
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    remainingFunds -= investAmount;
    document.getElementById("remainingFunds").innerText = remainingFunds;

    alert(userName + "님이 " + investAmount + "코인을 투자하였습니다!");
}
