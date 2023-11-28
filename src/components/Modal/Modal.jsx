import { BackDrop } from 'components/Backdrop/Backdrop';
import { useEffect } from 'react';
const Modal = ({ closeModal, src }) => {
  useEffect(() => {
    const onEscape = ev => {
      if (ev.code !== 'Escape') {
        return;
      }
      closeModal('');
    };

    window.addEventListener('keydown', onEscape);

    return () => {
      window.removeEventListener('keydown', onEscape);
    };
    // 🔽Так захотів eslint😁
  }, [closeModal]);

  const handleClick = ev => {
    if (ev.target === ev.currentTarget) {
      closeModal('');
    }
  };

  return (
    <BackDrop onClick={handleClick}>
      <img src={src} alt="modalImg" />
    </BackDrop>
  );
};

export default Modal;
