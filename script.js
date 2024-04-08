'use strict';

// Chọn các phần tử
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
//Bắt đầu các điều kiện
let score, currentScore, activePlayer, playing;

const init = function () {
  score0EL.textContent = 0;
  score1EL.textContent = 0;

  score = [0, 0]; //Chứa điểm của player 1 và 2
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active'); // Xác định lại người chơi bắt đầu
  player1.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  //Hiển thị số điểm về lại 0 của người chơi trước
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Chuyển đổi người chơi dựa vào điều kiện hiện tại
  activePlayer = activePlayer === 0 ? 1 : 0;
  //Đặt lại điểm số của người chơi về ban đầu
  currentScore = 0;
  //Bật-tắt hiệu ứng nền
  player0.classList.toggle('player--active'); // Nếu có element đó thì xóa, không có thì thêm vào
  player1.classList.toggle('player--active');
  // --> Hiệu ứng nền sẽ xuất hiện một trong hai cùng lúc
};
//Triển khai các chức năng
// Roll
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.Tạo xúc xắc ngẫu nhiên
    const randomDice = Math.trunc(Math.random() * 6) + 1;
    // 2.Hiển thị dice
    // Dựa vào những con số ngẫu nhiên mà hiển thị ra hình ảnh xúc xắc tương ứng
    dice.classList.remove('hidden');
    dice.src = `dice-${randomDice}.png`; // Lấy ra xúc xắc bằng cách kết hợp string và biến ngẫu nhiên để phần tử img có thuộc tính src lấy được nguồn qua tên gọi
    // 3.Kiểm tra xúc xắc rolled 1: if true, switch next player
    if (randomDice != 1) {
      //Thêm số xúc xắc vào điểm hiện tại (current)
      currentScore += randomDice;
      //Chọn điểm linh hoạt dựa trên người chơi nào đang được kích hoạt
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //current0.textContent = currentScore;
    } else {
      // Chuyển đổi người chơi
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1.Thêm số điểm hiện tại vào tổng số điểm của người chơi đang đc kích hoạt
    score[activePlayer] += currentScore;
    //score[1] = score[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // 2.Kiểm tra nếu điểm người chơi >=100 thì player 1 thắng
    if (score[activePlayer] >= 100) {
      // Trò chơi hoàn thành
      dice.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.querySelector();
    } else {
      //Chuyển đến người kế tiếp
      switchPlayer();
    }
  }
});

//Làm mới trò chơi
btnNew.addEventListener('click', init);
