import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './Gallery.styled';
const ImageGallery = ({ images, openModal }) => {
  return (
    <Gallery>
      {images.map(image => {
        return (
          <ImageGalleryItem
            handleClick={openModal}
            image={image}
            key={image.id}
          />
        );
      })}
    </Gallery>
  );
};
export default ImageGallery;
