import SettingSection from "../SettingSection";
import Input from "../../Input";
import React from "react";
import { GameOptions } from "../../../Game";

interface BoardSectionProps {
  originalOptions: GameOptions;
  modOptions: GameOptions;
  handleChange: (newModGameOptions: Partial<GameOptions>) => void;
}

const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
}

const BoardSection = ({originalOptions, modOptions, handleChange}: BoardSectionProps) => {
  const updateBoardWidth = (newVal: string) => {
    const newNum = clamp(Number(newVal), 1, 50);

    if(isNaN(newNum)) {
      return;
    }

    handleChange({width: newNum});
  }

  const updateBoardHeight = (newVal: string) => {
    const newNum = clamp(Number(newVal), 1, 50);

    if(isNaN(newNum)) {
      return;
    }

    handleChange({height: newNum});
  }

  const updateWallEnabled = (newVal: boolean) => {
    handleChange({wall: {...modOptions.wall, enabled: newVal}});
  }

  const updateCountWallAsAlive = (newVal: boolean) => {
    handleChange({wall: {...modOptions.wall, countAsAlive: newVal}});
  }

  return (
    <SettingSection title='Board'>
      <Input
        label="Board Width"
        value={String(modOptions.width)}
        onChange={updateBoardWidth}
        isDirty={originalOptions.width !== modOptions.width}
      />

      <Input
        label="Board Height"
        value={String(modOptions.height)}
        onChange={updateBoardHeight}
        isDirty={originalOptions.height !== modOptions.height}
      />

      <Input
        label="Wall enabled"
        value={modOptions.wall.enabled ? '1' : ''}
        onChange={updateWallEnabled}
        isDirty={originalOptions.wall.enabled !== modOptions.wall.enabled}
        inputType='checkbox'
      />

      <Input
        label="Count wall as alive"
        value={modOptions.wall.countAsAlive ? '1' : ''}
        onChange={updateCountWallAsAlive}
        isDirty={originalOptions.wall.countAsAlive !== modOptions.wall.countAsAlive}
        inputType='checkbox'
        disabled={!modOptions.wall.enabled}
      />
    </SettingSection>
  );
}

export default BoardSection;