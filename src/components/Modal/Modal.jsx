import { BackDrop } from 'components/Backdrop/Backdrop';
import { Component } from 'react';
class Modal extends Component {
  onEscape = ev => {
    if (ev.code !== 'Escape') {
      return;
    }
    this.props.closeModal('');
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onEscape);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscape);
  }
  handleClick = ev => {
    if (ev.target === ev.currentTarget) {
      this.props.closeModal('');
    }
  };
  render() {
    const { srs } = this.props;
    return (
      <BackDrop onClick={this.handleClick}>
        <img src={srs} alt="modalImg" />
      </BackDrop>
    );
  }
}
export default Modal;
