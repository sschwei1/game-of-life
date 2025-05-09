import SettingSection from "../SettingSection";
import React from "react";
import {GameOptions} from "../../../Game";
import Input from "../../Input";

interface RandomizerSectionProps {
  originalOptions: GameOptions;
  modOptions: GameOptions;
  handleChange: (newModGameOptions: Partial<GameOptions>) => void;
}

const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
}

const RandomizerSection = ({originalOptions, modOptions, handleChange}: RandomizerSectionProps) => {
  const updateRandomizer = (newVal: string) => {
    const newNumber = clamp(Number(newVal), 0, 100);

    if(isNaN(newNumber)) {
      return;
    }

    handleChange({randomizerDensity: newNumber/100});
  }

  return (
    <SettingSection title="Randomizer">
      <Input
        label="Density (in %)"
        value={String(modOptions.randomizerDensity * 100)}
        onChange={updateRandomizer}
        isDirty={originalOptions.randomizerDensity !== modOptions.randomizerDensity}
      />
    </SettingSection>
  )
}

export default RandomizerSection;