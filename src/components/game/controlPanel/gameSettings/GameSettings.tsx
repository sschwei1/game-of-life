import React, {useState} from 'react';
import { CiSettings } from 'react-icons/ci';
import Modal from '../../../modal';
import SettingSection from "./SettingSection";

const GameSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
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
        <SettingSection title='Rules'>
          
        </SettingSection>
      </Modal>
    </>
  )
}

export default GameSettings;