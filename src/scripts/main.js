/* const keyboard = document.getElementById('keyboard'); */

// Задаем набор клавиш, учавствующих в игре
const keys = [...'~1234567890-=QWERTYUIOP[]\\ASDFGHJKL;\'ZXCVBNM,./'];
keys.push('TAB', 'CAPSLOCK', 'LSHIFT', 'LCONTROL', 'LALT', 'RSHIFT', 'RCONTROL', 'RALT', 'ENTER', 'BACKSPACE', 'ESCAPE', 'SPACE');

const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const getRandomKey = () => keys[getRandomValue(0, keys.length - 1)];

const checkLocation = (key) => ['Standard', 'Left', 'Right'][key.location];
const getLocation = (location) => {
  if (location === 'Left') return 'L';
  if (location === 'Right') return 'R';

  return '';
};

const setTarget = () => {
  const key = getRandomKey();
  const target = document.getElementById(key);
  target.classList.add('keyboard__button--target');

  return target;
};

// Отключаем стандарное поведение служебных клавиш
window.oncontextmenu = () => false;
document.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') event.preventDefault();
  if (event.key === 'CapsLock') event.preventDefault();
  if (event.key === 'Alt') event.preventDefault();
});

let target = setTarget();
document.addEventListener('keyup', (event) => {
  let keyCode = event.key.toUpperCase();
  if (keyCode === ' ') keyCode = 'SPACE';
  if (keyCode === '`' || keyCode === 'Ё') keyCode = '~';

  const location = getLocation(checkLocation(event));
  const pressed = document.getElementById(`${location + keyCode}`);

  if (pressed === target) {
    target.classList.remove('keyboard__button--target');
    target = setTarget();
  }

  pressed.classList.add('keyboard__button--pressed');
  pressed.addEventListener('animationend', () => {
    pressed.classList.remove('keyboard__button--pressed');
  });
});
