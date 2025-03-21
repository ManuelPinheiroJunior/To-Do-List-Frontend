import React, { useState } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import usFlag from "../assets/usFlag.png";
import brFlag from "../assets/brFlag.png";
import { useLanguage } from "../hooks/useLanguage";

const LanguageToggle: React.FC = () => {
  const { language, changeLanguage } = useLanguage();

  const languages = [
    { code: "en", name: "English", flag: usFlag },
    { code: "pt", name: "Português", flag: brFlag },
  ];

  const handleToggleLanguage = () => {
    const newLanguage = language === "en" ? "pt" : "en";
    changeLanguage(newLanguage as "en" | "pt");
  };

  const currentLanguage = languages.find((l) => l.code === language);

  return (
    <div className="relative">
      <OverlayTrigger
        placement="auto"
        overlay={<Tooltip id="tooltip-language">{currentLanguage?.name}</Tooltip>}
      >
        <div
          className="flex items-center cursor-pointer"
          onClick={handleToggleLanguage}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundImage: `url(${currentLanguage?.flag})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </OverlayTrigger>
    </div>
  );
};

export default LanguageToggle;
