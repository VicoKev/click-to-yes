import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./App.css";

function App() {
  const [noCount, setNoCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [noButtonOffset, setNoButtonOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (showSuccess) {
      confetti({
        particleCount: 150,
        spread: 180,
        origin: { y: 0.6 },
      });
    }
  }, [showSuccess]);

  const handleNoClick = () => {
    const nextNoCount = noCount + 1;
    setNoCount(nextNoCount);

    if (nextNoCount >= 3) {
      const randomX = Math.random() * 100 - 50;
      const randomY = Math.random() * 100 - 50;
      setNoButtonOffset({ x: randomX, y: randomY });
    }
  };

  const handleYesClick = () => {
    setShowSuccess(true);
  };

  const getYesButtonStyle = () => {
    const scaleFactor = Math.min(1 + noCount * 0.3, 3);
    const widthFactor = Math.min(1 + noCount * 0.2, 2);
    const heightFactor = Math.min(1 + noCount * 0.15, 1.5);

    return {
      transform: `scale(${scaleFactor})`,
      width: `${widthFactor * 100}%`,
      height: `${heightFactor * 100}%`,
    };
  };

  const getNoButtonStyle = () => {
    const scaleFactor = Math.max(1 - noCount * 0.1, 0.5);
    let transform = `scale(${scaleFactor})`;
    if (noCount >= 3) {
      transform += ` translate(${noButtonOffset.x}px, ${noButtonOffset.y}px)`;
    }

    return {
      transform,
    };
  };

  const getColorForYesButton = () => {
    const colors = [
      "#10B981",
      "#3B82F6",
      "#8B5CF6",
      "#EC4899",
    ];

    const colorIndex = Math.min(Math.floor(noCount / 2), colors.length - 1);
    return colors[colorIndex];
  };

  const getNoMessage = () => {
    const messages = [
      "Non",
      "Es-tu sûr(e)?",
      "Vraiment?",
      "Pense-y encore...",
      "Sérieusement?",
      "Ne sois pas cruel(le)!",
    ];
    return noCount < messages.length
      ? messages[noCount]
      : "OK, j'arrête de demander...";
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-linear-to-br from-pink-100 to-purple-100 flex flex-col items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-6xl mb-4">💖</div>
          <h1 className="text-3xl font-bold text-pink-600 mb-4">Youpi !</h1>
          <p className="text-lg text-gray-700 mb-6">
            Je savais que tu dirais oui ! Tu es ma/mon Valentin(e) maintenant !
            ❤️
          </p>
          <div className="text-5xl animate-bounce">🎉</div>
          <div className="mt-6 flex justify-center space-x-2">
            <span className="text-2xl">💕</span>
            <span className="text-2xl">💗</span>
            <span className="text-2xl">💓</span>
            <span className="text-2xl">💞</span>
            <span className="text-2xl">💖</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-5xl mb-6">❤️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Veux-tu être mon/ma Valentin(e)? 💘
        </h1>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
          <button
            onClick={handleYesClick}
            className={`text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
              noCount > 0 ? "animate-pulse" : ""
            } ${noCount >= 3 ? "shake-animation" : ""}`}
            style={{
              ...getYesButtonStyle(),
              backgroundColor: getColorForYesButton(),
            }}
          >
            OUI
          </button>

          {noCount < 6 && (
            <button
              onClick={handleNoClick}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out"
              style={getNoButtonStyle()}
            >
              {getNoMessage()}
            </button>
          )}
        </div>

        {/* Messages d'encouragement progressifs */}
        {noCount >= 2 && noCount < 4 && (
          <div className="mt-6 text-sm text-blue-600 font-medium">
            Je vois que tu hésites... mais regarde comme le bouton "Oui" est
            beau !
          </div>
        )}

        {noCount >= 4 && noCount < 6 && (
          <div className="mt-6 text-sm text-purple-600 font-medium">
            Tu commences à me plaire... mais je sens que tu vas dire oui
            bientôt! 😉
          </div>
        )}

        {noCount >= 6 && (
          <div className="mt-8 text-sm text-gray-500 italic">
            Le bouton "Non" est fatigué de tant de refus... 😅
          </div>
        )}
      </div>

      {/* Animation décorative */}
      <div className="absolute top-10 left-10 text-2xl animate-pulse">💕</div>
      <div className="absolute bottom-10 right-10 text-2xl animate-pulse">
        💗
      </div>
      <div className="absolute top-1/3 right-20 text-2xl animate-bounce">
        💘
      </div>
      <div className="absolute bottom-1/3 left-20 text-2xl animate-bounce">
        💝
      </div>
    </div>
  );
}

export default App;
