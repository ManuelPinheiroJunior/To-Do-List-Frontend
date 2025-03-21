import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleLanguage } from "../store/language/languageSlice";
import translations from "../translations/translations.json";

export const useLanguage = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);
  

  const switchLanguage = () => {
    dispatch(toggleLanguage());
  };
  
   const t = translations[language];

  return { language, switchLanguage, t };

};