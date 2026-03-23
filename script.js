function toggleOpis(button) {
  const opis = button.nextElementSibling;
  if (opis.style.display === "block") {
    opis.style.display = "none";
    button.textContent = "Pokaż opis";
  } else {
    opis.style.display = "block";
    button.textContent = "Ukryj opis";
  }
}

function initKaruzela(wrapperId, leftBtnId, rightBtnId) {
  const wrapper = document.getElementById(wrapperId);
  const przepisy = wrapper.querySelectorAll('.przepis');
  const btnLewo = document.getElementById(leftBtnId);
  const btnPrawo = document.getElementById(rightBtnId);
  let currentIndex = 0;

  function ustawAktywny(index) {
    przepisy.forEach((p, i) => {
      p.classList.toggle('active', i === index);
    });
  }

  function przesun(kierunek) {
  currentIndex += kierunek;
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex >= przepisy.length) currentIndex = przepisy.length - 1;

  ustawAktywny(currentIndex);

  // przewiń tylko jeśli rzeczywiście jest overflow
  const potrzebnePrzesuniecie = przepisy[0].offsetWidth + 20;
  if (wrapper.scrollWidth > wrapper.clientWidth) {
    wrapper.scrollTo({
      left: currentIndex * potrzebnePrzesuniecie,
      behavior: 'smooth'
    });
   }
  }

  btnLewo.addEventListener('click', () => przesun(-1));
  btnPrawo.addEventListener('click', () => przesun(1));
  ustawAktywny(currentIndex);

  // Obsługa klawiatury – działa tylko gdy myszka nad wrapperem
  wrapper.addEventListener('mouseenter', () => {
    window.addEventListener('keydown', klawiszHandler);
  });

  wrapper.addEventListener('mouseleave', () => {
    window.removeEventListener('keydown', klawiszHandler);
  });

  function klawiszHandler(e) {
    if (e.key === 'ArrowLeft') przesun(-1);
    if (e.key === 'ArrowRight') przesun(1);
  }
}

// Inicjalizacja po załadowaniu strony
window.addEventListener('load', () => {
  initKaruzela('karuzela-sniadania', 'lewo-sniadania', 'prawo-sniadania');
  initKaruzela('karuzela-smoothie', 'lewo-smoothie', 'prawo-smoothie');
  initKaruzela('karuzela-przekaski', 'lewo-przekaski', 'prawo-przekaski');
});