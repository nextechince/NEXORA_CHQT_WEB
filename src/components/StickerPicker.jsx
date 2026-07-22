import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Image, Smile } from 'lucide-react';

const STICKERS = [
  { id: 1, name: 'Happy', url: '/stickers/sticker1.png', emoji: '😊' },
  { id: 2, name: 'Sad', url: '/stickers/sticker2.png', emoji: '😢' },
  { id: 3, name: 'Love', url: '/stickers/sticker3.png', emoji: '❤️' },
  { id: 4, name: 'Angry', url: '/stickers/sticker4.png', emoji: '😡' },
  { id: 5, name: 'Cool', url: '/stickers/sticker5.png', emoji: '😎' },
  { id: 6, name: 'Laugh', url: '/stickers/sticker6.png', emoji: '😂' },
  { id: 7, name: 'Wow', url: '/stickers/sticker7.png', emoji: '😮' },
  { id: 8, name: 'Pray', url: '/stickers/sticker8.png', emoji: '🙏' },
  { id: 9, name: 'Clap', url: '/stickers/sticker9.png', emoji: '👏' },
  { id: 10, name: 'Fire', url: '/stickers/sticker10.png', emoji: '🔥' },
  { id: 11, name: 'Star', url: '/stickers/sticker11.png', emoji: '⭐' },
  { id: 12, name: 'Heart', url: '/stickers/sticker12.png', emoji: '💕' },
  { id: 13, name: 'Party', url: '/stickers/sticker13.png', emoji: '🎉' },
  { id: 14, name: 'Sleepy', url: '/stickers/sticker14.png', emoji: '😴' },
  { id: 15, name: 'Cute', url: '/stickers/sticker15.png', emoji: '🥰' },
  { id: 16, name: 'Thinking', url: '/stickers/sticker16.png', emoji: '🤔' },
];

const StickerPicker = ({ onSelect, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const stickersPerPage = 8;
  const totalPages = Math.ceil(STICKERS.length / stickersPerPage);

  const getCurrentStickers = () => {
    const start = currentPage * stickersPerPage;
    return STICKERS.slice(start, start + stickersPerPage);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border dark:border-gray-700 overflow-hidden w-80">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b dark:border-gray-700 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10">
        <span className="text-sm font-medium flex items-center gap-2">
          <img src="/icons/smile.png" className="w-5 h-5 object-contain" alt="sticker" />
          Stickers
        </span>
        <button onClick={onClose} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Sticker Grid */}
      <div className="sticker-grid">
        {getCurrentStickers().map((sticker) => (
          <div
            key={sticker.id}
            onClick={() => onSelect(sticker.url)}
            className="sticker-item bg-gray-50 dark:bg-gray-700/50 rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition group relative"
            title={sticker.name}
          >
            <img
              src={sticker.url}
              alt={sticker.name}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = `<span class="text-4xl">${sticker.emoji}</span>`;
              }}
            />
            <span className="absolute bottom-0 left-0 right-0 text-center text-[8px] text-gray-400 opacity-0 group-hover:opacity-100 transition">
              {sticker.name}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-2 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Smile className="w-3 h-3" />
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default StickerPicker;
