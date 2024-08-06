function updateClock() {
  const clockElement = document.querySelector('.clock');
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();

  // 12시간 형식으로 변환
  hours = hours % 12;
  hours = hours ? hours : 12; // 0을 12로 변환

  // 두 자리 형식으로 분 표시
  const minutesString = minutes.toString().padStart(2, '0');

  // 시간 부분은 그대로 두 자리 형식으로 변경하지 않음
  const timeString = `${hours}:${minutesString}`;

  clockElement.textContent = timeString;
}

// 초기 업데이트
updateClock();

// 시계 업데이트 주기 설정 (1초마다)
setInterval(updateClock, 1000);

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('slider');
  const sliderContainer = document.querySelector('.slider-container');
  const maxOffset = sliderContainer.offsetWidth - slider.offsetWidth;
  const iphoneFrame = document.querySelector('.iphoneframe');
  const iphoneInFrame = document.querySelector('.iphoneinframe');
  const clock = document.querySelector('.clock');
  const blackBar = document.querySelector('.black-bar');

  let isDragging = false;
  let startX = 0;

  // 마우스 이벤트
  slider.addEventListener('mousedown', startDragging);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDragging);

  // 터치 이벤트
  slider.addEventListener('touchstart', startDragging);
  document.addEventListener('touchmove', drag);
  document.addEventListener('touchend', stopDragging);

  function startDragging(event) {
    isDragging = true;
    startX = (event.clientX || event.touches[0].clientX) - slider.offsetLeft;
    slider.style.transition = 'none';
  }

  function drag(event) {
    if (!isDragging) return;
    event.preventDefault();
    let clientX = event.clientX || event.touches[0].clientX;
    let offsetX = clientX - startX;
    
    if (offsetX < 0) {
      offsetX = 0;
    } else if (offsetX > maxOffset) {
      offsetX = maxOffset;
      unlock();
    }
    slider.style.left = offsetX + 'px';
  }

  function stopDragging() {
    if (isDragging) {
      isDragging = false;
      if (parseInt(slider.style.left) < maxOffset) {
        slider.style.transition = 'left 0.3s';
        slider.style.left = '0';
      }
    }
  }
  
  function unlock() {
    iphoneFrame.classList.add('transition');
    setTimeout(() => {
      window.location.href = "main.html"; // 잠금 해제 후 이동할 페이지
    }, 1000); // 애니메이션 시간과 맞춤
  }
});