import React, {useEffect, useState} from 'react';
import { CiSettings } from 'react-icons/ci';
import Modal from '../../../modal';
import { GameOptions } from '../../Game';
import BoardSection from "./settingSections/BoardSection";
import RuleSection from "./settingSections/RuleSection";
import RandomizerSection from "./settingSections/RandomizerSection";

interface GameSettingsProps {
  gameOption: GameOptions;
  updateGameOptions: React.Dispatch<React.SetStateAction<GameOptions>>;
}

const GameSettings = ({gameOption, updateGameOptions}: GameSettingsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modGameOptions, setModGameOptions] = useState(gameOption);

  useEffect(() => {
    if(!isModalOpen) return;

    setModGameOptions(gameOption);
  }, [isModalOpen, gameOption]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  const handleUpdateGameSettings = () => {
    updateGameOptions(modGameOptions);
    handleModalClose();
  }

  const handleFormChange = (newModGameOptions: Partial<GameOptions>) => {
    setModGameOptions({...modGameOptions, ...newModGameOptions});
  }

  return (
    <>
      <button onClick={handleOpenModal}>
        <CiSettings/>
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={'Game Settings'}
        innerClasses={['setting-modal']}
      >
        <BoardSection
          originalOptions={gameOption}
          modOptions={modGameOptions}
          handleChange={handleFormChange}
        />

        <RuleSection
          originalOptions={gameOption}
          modOptions={modGameOptions}
          handleChange={handleFormChange}
        />

        <RandomizerSection
          originalOptions={gameOption}
          modOptions={modGameOptions}
          handleChange={handleFormChange}
        />

        <button className='submit' onClick={handleUpdateGameSettings}>
          Save
        </button>
      </Modal>
    </>
  )
}

export default GameSettings;