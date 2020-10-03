import itemsGallery from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  modalContainer: document.querySelector('.js-lightbox'),
  modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
  modalImage: document.querySelector('.lightbox__image'),
  modalOverlay: document.querySelector('.lightbox__overlay'),
};

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

const galleryMarkup = createGalleryMarkup(itemsGallery);
refs.galleryList.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(elements) {
  return elements
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join('');
}

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

refs.galleryList.addEventListener('click', onOpenModal);

function onOpenModal(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  refs.modalContainer.classList.add('is-open');

  // Подмена значения атрибута src элемента img.lightbox__image.
  refs.modalImage.src = evt.target.dataset.source;
  refs.modalImage.alt = evt.target.alt;

  window.addEventListener('keydown', onCloseModalByEscape);
}

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
refs.modalCloseBtn.addEventListener('click', onCloseModal);

function onCloseModal() {
  refs.modalContainer.classList.remove('is-open');

  // Очистка значения атрибута src элемента img.lightbox__image.
  refs.modalImage.src = '';
  refs.modalImage.alt = '';
  window.removeEventListener('keydown', onCloseModalByEscape);
}

// Закрытие модального окна по клику на div.lightbox__overlay.

refs.modalOverlay.addEventListener('click', onCloseModalByClickOverlay);

function onCloseModalByClickOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
}

// Закрытие модального окна по нажатию клавиши ESC.

function onCloseModalByEscape(evt) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = evt.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}
