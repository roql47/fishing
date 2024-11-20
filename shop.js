// 상점 아이템 목록 및 하위 아이템 설정
var shopItems = {
  "낡은낚시대": { price: 10000, requires: null, fishingSkill: 1 },
  "일반낚시대": { price: 60000, requires: "낡은낚시대", fishingSkill: 2 },
  "단단한낚시대": { price: 140000, requires: "일반낚시대", fishingSkill: 3 },
  "은낚시대": { price: 370000, requires: "단단한낚시대", fishingSkill: 4 },
  "금낚시대": { price: 820000, requires: "은낚시대", fishingSkill: 5 },
  "강철낚시대": { price: 2390000, requires: "금낚시대", fishingSkill: 6 },
  "사파이어낚시대": { price: 6100000, requires: "강철낚시대", fishingSkill: 7 },
  "루비낚시대": { price: 15000000, requires: "사파이어낚시대", fishingSkill: 8 },
  "다이아몬드낚시대": { price: 45000000, requires: "루비낚시대", fishingSkill: 9 },
  "레드다이아몬드낚시대": { price: 100000000, requires: "다이아몬드낚시대", fishingSkill: 10 },
  "벚꽃낚시대": { price: 300000000, requires: "레드다이아몬드낚시대", fishingSkill: 11 }
};

// 상점 리스트 보여주기 함수
function showShop() {
  var shopList = "상점 목록:\n";
  for (var item in shopItems) {
    var details = shopItems[item];
    shopList += `- ${item} : ${formatPrice(details.price)}골드\n`;
  }
  return shopList.trim();
}

// 아이템 구매 함수
function buyItem(sender, itemName) {
  // 사용자별 초기화
  if (!userGold[sender]) userGold[sender] = 0; // 초기 골드 설정
  if (!inventory[sender]) inventory[sender] = {}; // 초기 인벤토리 설정

  if (shopItems[itemName]) {
    var itemPrice = shopItems[itemName].price;

    // 하위 아이템이 필요할 경우 체크
    var requiredItem = shopItems[itemName].requires;
    if (requiredItem && !inventory[sender][requiredItem]) {
      return `${requiredItem}를 먼저 구매해야 ${itemName}를 구매할 수 있습니다.`;
    }

    // 이미 구매한 경우 체크
    if (inventory[sender][itemName] && inventory[sender][itemName] > 0) {
      return `${itemName}는 이미 구매하셨습니다.`;
    }

    // 골드가 충분한지 확인
    if (userGold[sender] >= itemPrice) {
      userGold[sender] -= itemPrice; // 골드 차감
      fishingSkills[sender] = shopItems[itemName].fishingSkill; // 낚시 실력 설정
      inventory[sender][itemName] = (inventory[sender][itemName] || 0) + 1; // 인벤토리에 아이템 추가
      save(); // 사용자 데이터 저장
      return `${itemName}를 구매하여 낚시 실력이 ${shopItems[itemName].fishingSkill}로 설정되었습니다. 현재 골드: ${formatPrice(userGold[sender])}골드`;
    } else {
      return `${sender}님의 골드가 부족합니다. 필요한 금액: ${formatPrice(itemPrice)}골드`;
    }
  } else {
    return "잘못된 아이템 이름입니다.";
  }
}
