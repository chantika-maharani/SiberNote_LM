import React, { useState, useEffect, useRef } from "react";

const FLASHCARD_OPTIONS = [3, 5, 7, 10];

export default function CreateFlashcardModal({ isOpen, onClose, documents, onCreate }) {
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [numCards, setNumCards] = useState(5);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Inisialisasi saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      // Centang semua dokumen secara default
      const allDocIds = documents.map((doc) => doc._id || doc.id);
      setSelectedDocs(allDocIds);
      setIsDropdownOpen(false);
    }
  }, [isOpen, documents]);

  // Validasi otomatis jumlahKartu vs dokumenTerpilih
  useEffect(() => {
    const minRequired = selectedDocs.length;
    // Pindahkan jumlahKartu ke opsi sah terkecil bila nilai sekarang lebih kecil dari jumlah dokumen
    if (numCards < minRequired) {
      const nextValidOption = FLASHCARD_OPTIONS.find((opt) => opt >= minRequired);
      setNumCards(nextValidOption || 10);
    }
  }, [selectedDocs.length, numCards]);

  // Menutup dropdown jika klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const toggleDoc = (docId) => {
    setSelectedDocs((prev) =>
      prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]
    );
  };

  const isTooMany = selectedDocs.length > 10;
  const isZero = selectedDocs.length === 0;
  const isSubmitDisabled = isZero || isTooMany;

  return (
    <div className="flashcard-modal-overlay">
      <div className="flashcard-modal">
        <div className="flashcard-modal-header">
          <h3>Buat Flashcard</h3>
          <button className="close-btn" onClick={onClose} aria-label="Tutup">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flashcard-modal-body">
          <div className="flashcard-controls">
            <div className="dropdown-section" ref={dropdownRef}>
              <label>Jumlah Flashcard</label>
              <div 
                className={`custom-select ${isDropdownOpen ? "is-open" : ""}`} 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{numCards}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
              
              {isDropdownOpen && (
                <div className="custom-options">
                  {FLASHCARD_OPTIONS.map((opt) => {
                    const isDisabled = opt < selectedDocs.length;
                    return (
                      <div
                        key={opt}
                        className={`custom-option ${isDisabled ? "disabled" : ""} ${numCards === opt ? "selected" : ""}`}
                        onClick={() => {
                          if (!isDisabled) {
                            setNumCards(opt);
                            setIsDropdownOpen(false);
                          }
                        }}
                      >
                        {opt}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="source-section">
              <label>pilih sumber</label>
              <div className="source-list">
                {documents.map((doc) => {
                  const isChecked = selectedDocs.includes(doc._id || doc.id);
                  return (
                    <label key={doc._id || doc.id} className="source-item">
                      <div className="source-item-left">
                        <span className="pdf-icon-small">PDF</span>
                        <span className="source-title">{doc.title || doc.name}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleDoc(doc._id || doc.id)}
                      />
                    </label>
                  );
                })}
              </div>
              {isTooMany && (
                <span className="error-text">Maksimal 10 dokumen</span>
              )}
            </div>
          </div>
        </div>

        <div className="flashcard-modal-footer">
          <button 
            className="btn-create-flashcard" 
            disabled={isSubmitDisabled}
            onClick={() => onCreate(selectedDocs, numCards)}
          >
            Buat
          </button>
        </div>
      </div>
    </div>
  );
}