import React, { useState } from "react";
import usFlag from "../assets/usFlag.png";
import brFlag from "../assets/brFlag.png";
import { useLanguage } from "../hooks/useLanguage";

const LanguageSelector: React.FC = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: usFlag },
    { code: "pt", name: "Português", flag: brFlag },
  ];

  const handleSelectLanguage = (code: string) => {
    changeLanguage(code as "en" | "pt");
    setIsOpen(false);
  };

  return (
    <div className="relative">

      <div
        className="w-[160px] bg-white border border-gray-300 text-gray-700 rounded-lg py-2 pl-10 pr-4 shadow-sm cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundImage: `url(${languages.find((l) => l.code === language)?.flag})`,
          backgroundSize: "20px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "8px center",
          paddingLeft: "35px",
          borderRadius: "8px",
        }}
      >
        {languages.find((l) => l.code === language)?.name}
      </div>


      {isOpen && (
        <div className="absolute w-[160px] bg-white border border-gray-300 mt-6 rounded-lg shadow-lg z-10">
          {languages.map(({ code, name, flag }) => (
            <div
              key={code}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectLanguage(code)}
              style={{
                backgroundImage: `url(${flag})`,
                backgroundSize: "18px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "8px center",
                paddingLeft: "60px",
                borderRadius: "8px",
              }}
            >
                <div className="text-gray-700"
                style={{ paddingLeft: "10px", borderRadius: "8px", paddingRight: "2px" }}
                >
              {name}
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
