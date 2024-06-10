// const TextLoader = () => {
//   return (
//     <div className="flex justify-center items-center  bg-gray-100">
//       <div className="relative flex space-x-1 text-xl font-bold text-gray-800">
//         {[...'ELEEDOMIMF'].map((char, index) => (
//           <span
//             key={index}
//             className="animate-bounce bg-gradient-to-r from-stone-900 to-red-600 bg-clip-text text-transparent rounded-full"
//             style={{ animationDelay: `${index * 0.1}s` }}
//           >
//             {char}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TextLoader;
import  { useEffect, useState } from 'react';
const TextLoader = () => {
  const text = 'ELEEDOM';
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } 
    
  }, [currentIndex, text.length]);

  return (
    <>
      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          .animate-bounce {
            display: inline-block;
            animation: bounce 1.5s infinite;
          }
        `}
      </style>
      <div className="flex justify-center  items-center bg-orange-100 h-screen">
        <div className="relative flex space-x-0.5 text-xl font-bold text-gray-800">
          {text.split('').map((char, index) => (
            <span
              key={index}
              className="animate-bounce bg-gradient-to-r from-stone-900 to-red-600 bg-clip-text text-transparent rounded-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default TextLoader;
