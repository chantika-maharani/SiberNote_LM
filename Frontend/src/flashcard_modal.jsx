import React, { useState, useEffect, useRef } from "react";

function FlashcardSpinner() {
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" className="anti-mainstream-spinner" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M27 16.875C30.7279 16.875 33.75 13.8529 33.75 10.125C33.75 6.39708 30.7279 3.375 27 3.375C23.2721 3.375 20.25 6.39708 20.25 10.125C20.25 13.8529 23.2721 16.875 27 16.875Z" fill="#CECECE"/>
      <path d="M10.125 32.0625C12.9209 32.0625 15.1875 29.7959 15.1875 27C15.1875 24.2041 12.9209 21.9375 10.125 21.9375C7.32906 21.9375 5.0625 24.2041 5.0625 27C5.0625 29.7959 7.32906 32.0625 10.125 32.0625Z" fill="#CECECE"/>
      <path d="M38.8125 16.0312C39.2785 16.0312 39.6562 15.6535 39.6562 15.1875C39.6562 14.7215 39.2785 14.3438 38.8125 14.3438C38.3465 14.3438 37.9688 14.7215 37.9688 15.1875C37.9688 15.6535 38.3465 16.0312 38.8125 16.0312Z" fill="#CECECE"/>
      <path d="M18.9948 11.3478C16.896 9.22783 13.4894 9.22783 11.3905 11.3478C9.2917 13.4677 9.2917 16.906 11.3905 19.0259C13.4894 21.1458 16.896 21.1458 18.9948 19.0259C21.0937 16.906 21.0937 13.4677 18.9948 11.3478Z" fill="#CECECE"/>
      <path d="M43.875 28.6875C44.807 28.6875 45.5625 27.932 45.5625 27C45.5625 26.068 44.807 25.3125 43.875 25.3125C42.943 25.3125 42.1875 26.068 42.1875 27C42.1875 27.932 42.943 28.6875 43.875 28.6875Z" fill="#CECECE"/>
      <path d="M38.918 41.4492C40.3159 41.4492 41.4492 40.3159 41.4492 38.918C41.4492 37.52 40.3159 36.3867 38.918 36.3867C37.52 36.3867 36.3867 37.52 36.3867 38.918C36.3867 40.3159 37.52 41.4492 38.918 41.4492Z" fill="#CECECE"/>
      <path d="M27 47.25C28.864 47.25 30.375 45.739 30.375 43.875C30.375 42.011 28.864 40.5 27 40.5C25.136 40.5 23.625 42.011 23.625 43.875C23.625 45.739 25.136 47.25 27 47.25Z" fill="#CECECE"/>
      <path d="M15.1875 43.0312C17.5175 43.0312 19.4062 41.1425 19.4062 38.8125C19.4062 36.4825 17.5175 34.5938 15.1875 34.5938C12.8575 34.5938 10.9688 36.4825 10.9688 38.8125C10.9688 41.1425 12.8575 43.0312 15.1875 43.0312Z" fill="#CECECE"/>
    </svg>
  );
}

const FLASHCARD_OPTIONS = [3, 5, 7, 10];

function FileIcon({ type = "" }) {
  const fileType = String(type).toLowerCase();

  switch (fileType) {
    case "pdf":
      return (
        <svg
          className="file-icon"
          viewBox="0 0 100 100"
          width="30"
          height="30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Frame Sudut Kiri Bawah & Kanan Atas */}
          <path
            d="M10 30V90H70"
            stroke="#E53935"
            strokeWidth="4"
            strokeLinecap="square"
          />
          <path
            d="M30 10H90V70"
            stroke="#E53935"
            strokeWidth="4"
            strokeLinecap="square"
          />
          {/* Teks PDF */}
          <text
            x="50"
            y="57"
            textAnchor="middle"
            fill="#E53935"
            fontSize="22"
            fontWeight="600"
            fontFamily="sans-serif"
          >
            PDF
          </text>
        </svg>
      );

    case "docx":
      return (
        <svg
          className="file-icon"
          viewBox="0 0 100 100"
          width="30"
          height="30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Dokumen dengan Lipatan Kanan Atas */}
          <path
            d="M15 10H68L85 27V90H15V10Z"
            stroke="#2B579A"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Teks DOCX */}
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fill="#2B579A"
            fontSize="19"
            fontWeight="600"
            fontFamily="sans-serif"
          >
            DOCX
          </text>
        </svg>
      );

    case "pptx":
      return (
        <svg
          className="file-icon"
          viewBox="0 0 100 100"
          width="30"
          height="30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Layar Presentasi / Stand */}
          <rect
            x="12"
            y="12"
            width="76"
            height="56"
            stroke="#E06B43"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M50 68V80M28 88H72"
            stroke="#E06B43"
            strokeWidth="4"
            strokeLinecap="square"
          />
          {/* Teks PPTX */}
          <text
            x="50"
            y="49"
            textAnchor="middle"
            fill="#E06B43"
            fontSize="19"
            fontWeight="600"
            fontFamily="sans-serif"
          >
            PPTX
          </text>
        </svg>
      );

    case "txt":
      return (
        <svg
          className="file-icon"
          viewBox="0 0 100 100"
          width="30"
          height="30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Bingkai Kotak Hitam & Garis Atas-Bawah */}
          <rect
            x="12"
            y="12"
            width="76"
            height="76"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <line
            x1="20"
            y1="26"
            x2="80"
            y2="26"
            stroke="currentColor"
            strokeWidth="3"
          />
          <line
            x1="20"
            y1="74"
            x2="80"
            y2="74"
            stroke="currentColor"
            strokeWidth="3"
          />
          {/* Teks TXT */}
          <text
            x="50"
            y="57"
            textAnchor="middle"
            fill="currentColor"
            fontSize="21"
            fontWeight="600"
            fontFamily="sans-serif"
          >
            TXT
          </text>
        </svg>
      );

    default:
      return (
        <svg
          className="file-icon"
          viewBox="0 0 100 100"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          aria-hidden="true"
        >
          <rect x="15" y="10" width="70" height="80" rx="4" />
        </svg>
      );
  }
}

export default function CreateFlashcardModal({ isOpen, onClose, documents, onCreate, isLoading }) {
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

  function Tutup(){
    return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#1A1C1D"/>
        <path d="M22 10L16 16M16 16L10 22M16 16L10 10M16 16L22 22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="#CECECE"/>
    </svg>
    );
    }

    function SegitigaBawah() {
  return (
    <svg width="17" height="14" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 17L0 0L20 0L10 17Z" fill="#CECECE"/>
    </svg>
  );
}

  return (
    <div className="flashcard-modal-overlay">
      <div className="flashcard-modal">
        <div className="flashcard-modal-header">
          <h3>Buat Flashcard</h3>
          <button className="close-btn" onClick={onClose} aria-label="Tutup">
            <Tutup />
          </button>
        </div>

        {isLoading ? (
          <div className="flashcard-loading-state">
            <FlashcardSpinner />
            <span>Loading...</span>
          </div>
        ) : (
          <>
        <div className="flashcard-modal-body">
          <div className="flashcard-controls">
            <div className="dropdown-section" ref={dropdownRef}>
              <label>Jumlah Flashcard</label>
              <div 
                className={`custom-select ${isDropdownOpen ? "is-open" : ""}`} 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{numCards}</span>
                <SegitigaBawah />
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
              <div className="source-list-flash">
                {documents.map((doc) => {
                  const isChecked = selectedDocs.includes(doc._id || doc.id);
                  const rawName = doc.title || doc.name || "";
                    const displayName = rawName.length > 25 
                      ? rawName.substring(0, 25) + "..." 
                      : rawName;
                  return (
                    <label key={doc._id || doc.id} className="source-item">
                      <div className="source-item-left">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <FileIcon type={doc.fileType || doc.type} />
                        </div>
                        <span className="source-title" title={rawName}>
                          {displayName}
                        </span>
                      </div>
                      <div className="custom-checkbox-container">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleDoc(doc._id || doc.id)}
                            className="native-hidden-checkbox"
                          />
                          <span className="styled-checkbox"></span>
                      </div>
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
        </>
        )}
      </div>
    </div>
  );
}