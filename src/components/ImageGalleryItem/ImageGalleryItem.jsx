import { ItemStyled, ImageStyled } from './Item.styled';
const ImageGalleryItem = ({ image, handleClick }) => {
  return (
    <ItemStyled>
      <ImageStyled
        onClick={() => {
          handleClick(image.largeImageURL);
        }}
        src={image.webformatURL}
        alt={image.tags}
      ></ImageStyled>
    </ItemStyled>
  );
};
export default ImageGalleryItem;
