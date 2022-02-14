import css from "./ImageGallery.module.css";
import ImageGalleryItem from "./ImageGalleryItem";
import PropTypes from "prop-types";
const ImageGallery = ({ photos, onPhotoClick }) => {
  return (
    <ul className={css.imageGallery}>
      {photos.map((photo) => {
        return (
          <ImageGalleryItem
            key={photo.id}
            webformatURL={photo.webformatURL}
            largeImageURL={photo.largeImageURL}
            onPhotoClick={onPhotoClick}
          />
        );
      })}
    </ul>
  );
};
export default ImageGallery;
ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
