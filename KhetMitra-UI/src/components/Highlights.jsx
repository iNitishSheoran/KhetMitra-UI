import React from 'react';
import one from '../assets/1.png';
import two from '../assets/2.png';
import three from '../assets/3.png';
import four from '../assets/4.png';
import five from '../assets/5.png';

const data = [
  {
  icon: one,
  title: '🌱 pH एवं मृदा स्वास्थ्य',
  subtitle: 'pH, तापमान व नमी जाँच।',
},
{
  icon: two,
  title: '🧪 मृदा पोषक तत्व (NPK)',
  subtitle: 'AI आधारित NPK संतुलन।',
},
{
  icon: three,
  title: '🐄 चराई संबंधी समस्याएँ',
  subtitle: 'चराई व फसल क्षति ट्रैक।',
},
{
  icon: four,
  title: '🌤️ स्मार्ट सेंसर',
  subtitle: 'आर्द्रता, UV व चालकता।',
},
{
  icon: five,
  title: '🌧️ मौसम चेतावनी',
  subtitle: 'बारिश व तूफ़ान अलर्ट।',
},
];

function Highlights() {
  
  return (
    <section className=" w-full py-14 px-4 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center text-center px-4 ${
              index !== data.length - 1 ? 'md:border-r md:pr-6' : ''
            }`}
          >
            <div className="w-32 h-32 mb-3 flex items-center justify-center">
              <img
                src={item.icon}
                alt={item.title}
                className={"object-contain"}
              />
            </div>
            <h3 className="text-md font-bold text-[#14213D]">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Highlights;