import SettingSection from "../SettingSection";
import React from "react";
import {GameOptions, GameRules} from "../../../Game";
import GameRuleChanger from "../GameRuleChanger";

interface RuleSectionProps {
  originalOptions: GameOptions;
  modOptions: GameOptions;
  handleChange: (newModGameOptions: Partial<GameOptions>) => void;
}

const RuleSection = ({modOptions, handleChange}: RuleSectionProps) => {
  const updateGameRules = (newRules: GameRules) => {
    handleChange({...modOptions, gameRules: newRules});
  }

  return (
    <SettingSection title="Rules">
      <GameRuleChanger
        current={modOptions.gameRules}
        onChange={updateGameRules}
      />
    </SettingSection>
  );
}

export default RuleSection;