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
  const timeString = `◀ ${hours}:${minutesString}`;

  clockElement.textContent = timeString;
}

// 초기 업데이트
updateClock();

// 시계 업데이트 주기 설정 (1초마다)
setInterval(updateClock, 1000);

document.addEventListener('DOMContentLoaded', function() {
  const iphoneFrame = document.querySelector('.iphoneframe');
  const iphoneInFrame = document.querySelector('.iphoneinframe');
  const clock = document.querySelector('.clock');
  const blackBar = document.querySelector('.black-bar');
  const icons = document.querySelectorAll('.icon');
  const iconGrid = document.getElementById('iconGrid');

  // 페이지 로드 시 애니메이션 효과를 주기 위해 클래스 추가
  setTimeout(() => {
    iphoneFrame.classList.add('animate');
    iphoneFrame.classList.add('transition');
    iphoneInFrame.classList.add('transition');
    clock.classList.add('transition');
    blackBar.classList.add('transition');
  }, 100); // 페이지 로드 후 약간의 딜레이를 주어 애니메이션 시작

  // 블랙 바 클릭 시 home.html로 이동
  blackBar.addEventListener('click', function() {
    iphoneFrame.classList.add('slide-down');
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 1000); // 애니메이션 시간과 맞춤
  });

  // 아이콘 클릭 시 페이드 아웃 효과 적용 및 페이지 전환
  icons.forEach(icon => {
    icon.addEventListener('click', function(event) {
      event.preventDefault();
      const targetUrl = this.parentElement.getAttribute('data-target');
      
      // 디버깅 로그 추가
      console.log('Icon clicked:', this);
      console.log('Applying fade-out effect to iconGrid');

      // 페이드 아웃 효과 추가
      iconGrid.classList.add('fade-out');

      // 페이드 아웃 효과가 완료된 후 페이지 전환
      setTimeout(() => {
        console.log('Redirecting to target URL:', targetUrl);
        window.location.href = targetUrl;
      }, 500); // 500ms 동안 페이드 아웃
    });
  });
});
function showHeart(button) {
  const heart = document.createElement('span');
  heart.classList.add('heart');
  heart.innerHTML = '❤️';

  const rect = button.getBoundingClientRect();
  heart.style.left = `${rect.left + rect.width / 2}px`;
  heart.style.top = `${rect.top}px`;

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1000);
}