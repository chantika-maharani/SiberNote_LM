import React, { useState } from "react";
// Jika ikon ditaruh di file terpisah, pastikan untuk meng-import-nya di sini
// import { CloseIcon, ArrowLeftIcon, ArrowRightIcon } from './Icons';



export default function FlashcardPlayer({ flashcardSet, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!flashcardSet || !flashcardSet.cards || flashcardSet.cards.length === 0) {
    return null;
  }

  const cards = flashcardSet.cards;
  const currentCard = cards[currentIndex];
  const totalCards = cards.length;

  const handleFlip = () => setIsFlipped(!isFlipped);
  function Closeikon(){
    return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#1A1C1D"/>
        <path d="M22 10L16 16M16 16L10 22M16 16L10 10M16 16L22 22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="#CECECE"/>
    </svg>
    );
    }

    function Arrowleft(){
        return(
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="21" cy="21" r="21" fill="#CECECE"/>
              <path d="M33.25 21L8.75 21M21 8.75L8.75 21L21 33.25" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke="#1A1C1D"/>
            </svg>


        );
    }

    function Arrowright(){
        return(
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="21" cy="21" r="21" fill="#CECECE"/>
              <path d="M8.75 21H33.25M21 33.25L33.25 21L21 8.75" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke="#1A1C1D"/>
            </svg>

        );
    }



  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false); 
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false); 
    }
  };

  const pageText = currentCard.pageStart === currentCard.pageEnd
    ? currentCard.pageStart
    : `${currentCard.pageStart}-${currentCard.pageEnd}`;

  return (
    <div className="flashcard-player-overlay">
      <div className="flashcard-player-modal">
        
        {/* Header */}
        <div className="player-modal-header">
          <h3>Buat Flashcard</h3>
          <button className="close-player-btn" onClick={onClose} aria-label="Tutup Jendela">
            <Closeikon />
          </button>
        </div>

        {/* Area Kartu */}
        <div className="flashcard-scene" onClick={handleFlip}>
          <div className={`flashcard-inner ${isFlipped ? "is-flipped" : ""}`}>
            
            {/* SISI DEPAN */}
            <div className="flashcard-face flashcard-front">
              <p className="flashcard-text">{currentCard.front}</p>
            </div>

            {/* SISI BELAKANG */}
            <div className="flashcard-face flashcard-back">
              <p className="flashcard-text">{currentCard.back}</p>
              <div className="flashcard-source">
                Sumber: {currentCard.documentTitle}, hlm. {pageText}
              </div>
            </div>

          </div>
        </div>

        {/* Footer Navigasi */}
        <div className="player-controls">
          <button 
            className="nav-btn" 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            aria-label="Kartu sebelumnya"
          >
            <Arrowleft />
          </button>
          
          <span className="card-counter">
            {currentIndex + 1}/{totalCards}
          </span>

          <button 
            className="nav-btn" 
            onClick={handleNext} 
            disabled={currentIndex === totalCards - 1}
            aria-label="Kartu selanjutnya"
          >
            <Arrowright />
          </button>
        </div>

      </div>
    </div>
  );
}