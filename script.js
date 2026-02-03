const DAILY_LIMIT = 100;
const LEVEL_COST = 1000;
const REFERRAL_REWARD = 200;
const SUBSCRIBE_REWARD = 100;
const MIN_WITHDRAW = 1000;
const WITHDRAW_FEE = 0.03;

let coins = Number(localStorage.getItem('coins')) || 0;
let clicksToday = Number(localStorage.getItem('clicksToday')) || 0;
let level = Number(localStorage.getItem('level')) || 1;

const elephantSkins = {
  1: '🐘 Бомж', 2:'🐘 Пыльный', 3:'🐘 Серый', 4:'🐘 Мрачный', 5:'🐘 Бронзовый',
  6:'🐘 Лазурный', 7:'🐘 Лунный', 8:'🐘 Сапфировый', 9:'🐘 Морской', 10:'🐘 Серебряный',
  11:'🐘 Стальной', 12:'🐘 Холодный', 13:'🐘 Синий', 14:'🐘 Глубокий', 15:'🐘 Ночной',
  16:'🐘 Ледяной', 17:'🐘 Мистический', 18:'🐘 Тёмный', 19:'🐘 Галактический', 20:'🐘 Золотой',
  21:'🐘 Солнечный', 22:'🐘 Янтарный', 23:'🐘 Медный', 24:'🐘 Алый', 25:'🐘 Пламенный',
  26:'🐘 Рубиновый', 27:'🐘 Вишнёвый', 28:'🐘 Коралловый', 29:'🐘 Фиолетовый', 30:'🐘 Сапфировый',
  31:'🐘 Лазурный', 32:'🐘 Бирюзовый', 33:'🐘 Ледяной', 34:'🐘 Хрустальный', 35:'🐘 Лунный',
  36:'🐘 Солнечный', 37:'🐘 Топазовый', 38:'🐘 Аквамарин', 39:'🐘 Изумрудный светлый', 40:'🐘 Рубиновый тёмный',
  41:'🐘 Фиолетовый драгоценный', 42:'🐘 Сапфировый драгоценный', 43:'🐘 Звёздный', 44:'🐘 Космический', 45:'🐘 Лазурный драгоценный',
  46:'🐘 Сапфир сияющий', 47:'🐘 Изумруд', 48:'🐘 Драгоценный изумруд', 49:'🐘 Тёмный изумруд', 50:'🐘 Изумрудный король'
};

const coinsDisplay = document.getElementById('coins-display');
const levelDisplay = document.getElementById('level-display');
const elephantSkin = document.getElementById('elephant-skin');
const progressBar = document.getElementById('progress-bar');
const dailyLimit = document.getElementById('daily-limit');
const clickButton = document.getElementById('click-button');
const withdrawAmount = document.getElementById('withdraw-amount');

function saveState(){
  localStorage.setItem('coins', coins);
  localStorage.setItem('clicksToday', clicksToday);
  localStorage.setItem('level', level);
}

function getSkin(lvl){
  let current = elephantSkins[1];
  Object.keys(elephantSkins).forEach(k => { if(lvl >= Number(k)) current = elephantSkins[k]; });
  return current;
}

function animateElephant(){
  elephantSkin.classList.add('animate');
  setTimeout(()=>{elephantSkin.classList.remove('animate');}, 500);
}

function updateLevel(){
  let newLevel = Math.min(50, Math.floor(coins / LEVEL_COST) + 1);
  if(newLevel !== level){
    level = newLevel;
    animateElephant();
    alert('Новый уровень! Скин: ' + getSkin(level));
  }
}

function updateUI(){
  coinsDisplay.textContent = coins + ' слоняр';
  levelDisplay.textContent = 'Уровень: ' + level;
  elephantSkin.textContent = getSkin(level);
  progressBar.style.width = ((coins % LEVEL_COST)/LEVEL_COST)*100 + '%';
  dailyLimit.textContent = 'Лимит сегодня: ' + clicksToday + '/' + DAILY_LIMIT;
  saveState();
}

clickButton.addEventListener('click', ()=>{
  if(clicksToday >= DAILY_LIMIT){ alert('Дневной лимит достигнут'); return; }
  coins += 10;
  clicksToday += 1;
  updateLevel();
  updateUI();
});

document.getElementById('referral-btn').addEventListener('click', ()=>{
  coins += REFERRAL_REWARD;
  updateLevel();
  updateUI();
});

document.getElementById('subscribe-btn').addEventListener('click', ()=>{
  coins += SUBSCRIBE_REWARD;
  updateLevel();
  updateUI();
});

function withdraw(type){
  let amount = Number(withdrawAmount.value);
  if(amount < MIN_WITHDRAW){ alert('Минимальный вывод 1000 слоняр'); return; }
  if(amount > coins){ alert('Недостаточно слоняр'); return; }
  let fee = amount * WITHDRAW_FEE;
  let finalAmount = amount - fee;
  coins -= amount;
  updateUI();
  alert('Заявка создана: ' + type + '\nК выплате: ' + finalAmount + ' слоняр');
}

updateUI();
