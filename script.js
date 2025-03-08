let funds = 100000;
let investments = [0, 0, 0, 0, 0];

function invest(index) {
    let amount = prompt("투자할 금액을 입력하세요 (남은 투자금: " + funds + "원)");

    if (amount === null || amount.trim() === "") return;

    amount = parseInt(amount);

    if (isNaN(amount) || amount <= 0) {
        alert("올바른 금액을 입력하세요.");
        return;
    }

    if (amount > funds) {
        alert("남은 투자금이 부족합니다!");
        return;
    }

    funds -= amount;
    investments[index] += amount;

    document.getElementById("remainingFunds").innerText = funds;
    document.getElementById(`invested${index}`).innerText = investments[index];
}

function finalizeInvestment() {
    let maxInvestment = Math.max(...investments);
    let winnerIndex = investments.indexOf(maxInvestment);
    let winnerNames = ["카피바라", "주주", "에드거", "쿼카핑", "YJ"];

    if (maxInvestment === 0) {
        document.getElementById("winner").innerText = "아직 투자가 이루어지지 않았습니다!";
    } else {
        document.getElementById("winner").innerText =
            `🏆 가장 많은 투자를 받은 아이디어는 '${winnerNames[winnerIndex]}' 대표님의 창업 아이디어입니다!`;
    }
}
