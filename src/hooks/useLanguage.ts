import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setLanguage } from "../store/language/languageSlice";
import translations from "../translations/translations.json";


export const useLanguage = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);

  const changeLanguage = (lang: "en" | "pt") => {
    dispatch(setLanguage(lang));
  };

  const t = translations[language];

  return { language, changeLanguage, t };
};