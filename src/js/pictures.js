'use strict'

//создаем массивы
var url = [];
var likes = [];
var comments = [];
var numberOfObjects = 25;


//функция для поиска случайного номера элемента из переданного массива
function getRandom(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return rand;
}

//функция для случайного числа лайков
function getRandomLikes() {
  var likesMin = 15;
  var likesMax = 200;
  return Math.floor(Math.random() * (likesMax - likesMin + 1)) + likesMin;
};

//cписок комментариев, оставленных другими пользователями
var userComments = [
   'Всё отлично!',
   'В целом всё неплохо. Но не всё.',
   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

//функция генерации комментария из одного или двух предложений
function generateComment(comments) {
  var NumberOfSentence = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
  var randomComment1 = comments[getRandom(comments)];
  var randomComment2 = comments[getRandom(comments)];

  if (NumberOfSentence == 1) {
    return randomComment1;
  } else if (randomComment1 !== randomComment2) {
      return randomComment1 + ' ' + randomComment2;
  } else {
      return randomComment1;
  };
}

//генерация 25 объектов с данными
for (var i = 1; i < numberOfObjects; i++) {
  url[i] = 'photos/{{' + i + '}}.jpg';
  likes[i] = getRandomLikes();
  comments[i] = generateComment(userComments);
}

//массив с сгенерированными объектами
var userData = [url, likes, comments];

//находим шаблон
var pictureTemplate = document.querySelector('#picture-template').content;
// находим блок, в который будем вставлять фрагмент
var pictures = document.querySelector('.pictures');

//функция генерации карточки фотографии
function generateCard(dataArray, i) {
  var userCard = pictureTemplate.cloneNode(true);
  userCard.querySelector('.picture').getElementsByTagName('img')[0].src = dataArray[0][i];
  userCard.querySelector('.picture-likes').textContent = dataArray[1][i];
    userCard.querySelector('.picture-comments').textContent = dataArray[2].length;
  return userCard;
}

// создаем фрагмент и наполняем его в цикле
var fragment = document.createDocumentFragment();
for (var i = 1; i < numberOfObjects; i++) {
  fragment.appendChild(generateCard(userData, i));

};

//добавляем фрагмент в разметку страницы
pictures.appendChild(fragment);

//Находим блок галери-оверлей
var galleryOverlay = document.querySelector('.gallery-overlay');
//показываем его
galleryOverlay.classList.remove('invisible');

galleryOverlay.querySelector('.gallery-overlay-image').src = pictures.querySelector('.picture').getElementsByTagName('img')[0].src
galleryOverlay.querySelector('.likes-count').textContent = pictures.querySelector('.picture-likes').textContent;
galleryOverlay.querySelector('.comments-count').textContent = pictures.querySelector('.picture-comments').textContent;
