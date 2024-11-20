// 사용자별 데이터
var inventory = {};
var userGold = {}; // 보유 골드 객체 이름 통일
var lastFishingTime = {}; // 사용자의 마지막 낚시 시간 저장
var fishingSkills = {}; // 사용자별 낚시 실력

// 숫자를 1,000 단위로 ','를 추가하는 함수
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 낚시하기 함수
function goFishing(sender) {
  const currentTime = Date.now();
  if (lastFishingTime[sender] && (currentTime - lastFishingTime[sender]) < 300000) {
    const remainingTime = Math.ceil((300000 - (currentTime - lastFishingTime[sender])) / 1000);
    return `⏳ ${remainingTime}초 후에 다시 낚시할 수 있습니다.`;
  }

  // 물고기 랜덤 선택 (예시로 간단한 로직 사용)
  const fish = "타코문어"; // 물고기 이름 예시
  if (!inventory[sender]) inventory[sender] = {};
  inventory[sender][fish] = (inventory[sender][fish] || 0) + 1;
  lastFishingTime[sender] = currentTime;
  return `🎣 ${sender}님이 ${fish}(을)를 낚았습니다!`;
}

// 데이터 저장
function save() {
  const saveData = {
    inventory: inventory,
    userGold: userGold,
    lastFishingTime: lastFishingTime,
    fishingSkills: fishingSkills
  };
  localStorage.setItem("gameData", JSON.stringify(saveData)); // 로컬스토리지에 저장
}

// 데이터 로드
function load() {
  const loadData = JSON.parse(localStorage.getItem("gameData") || "{}");
  inventory = loadData.inventory || {};
  userGold = loadData.userGold || {};
  lastFishingTime = loadData.lastFishingTime || {};
  fishingSkills = loadData.fishingSkills || {};
}
