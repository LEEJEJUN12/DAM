document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('slider');
  const sliderContainer = document.querySelector('.slider-container');
  const maxOffset = sliderContainer.offsetWidth - slider.offsetWidth;

  let isDragging = false;
  let startX = 0;

  slider.addEventListener('mousedown', function(event) {
      isDragging = true;
      startX = event.clientX - slider.offsetLeft;
      slider.style.transition = 'none';
  });

  document.addEventListener('mousemove', function(event) {
      if (isDragging) {
          let offsetX = event.clientX - startX;
          if (offsetX < 0) {
              offsetX = 0;
          } else if (offsetX > maxOffset) {
              offsetX = maxOffset;
              unlock();
          }
          slider.style.left = offsetX + 'px';
      }
  });

  document.addEventListener('mouseup', function() {
      if (isDragging) {
          isDragging = false;
          if (parseInt(slider.style.left) < maxOffset) {
              slider.style.transition = 'left 0.3s';
              slider.style.left = '0';
          }
      }
  });

  function unlock() {
      window.location.href = "main.html"; // 잠금 해제 후 이동할 페이지
  }

  function updateClock() {
      const clockElement = document.querySelector('.clock');
      const now = new Date();

      let hours = now.getHours();
      const minutes = now.getMinutes();

      // 12시간 형식으로 변환
      hours = hours % 12;
      hours = hours ? hours : 12; // 0을 12로 변환

      // 두 자리 형식으로 표시
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

      clockElement.textContent = timeString;
  }

  // 초기 업데이트
  updateClock();

  // 시계 업데이트 주기 설정 (1초마다)
  setInterval(updateClock, 1000);
});
