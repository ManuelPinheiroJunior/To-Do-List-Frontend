import { useSelector } from "react-redux";
import translations from "../translations/translations.json";
import { RootState } from "../store/store";

export const useTranslation = () => {
  const language = useSelector((state: RootState) => state.language.language);
  return translations[language];
};