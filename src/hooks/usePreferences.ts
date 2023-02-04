import { Preferences } from "@capacitor/preferences";
import { useEffect, useState } from "react";

type PreferenceData = [string | null, (value: string) => Promise<void>];

const usePreferences = (key: string): PreferenceData => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const loadSaved = async () => {
      const { value } = await Preferences.get({ key });
      setValue(value);
    };
    loadSaved();
  }, [key]);

  const save = async (value: string) => {
    await Preferences.set({ key, value });
    setValue(value);
  };

  return [value, save];
}

export default usePreferences;