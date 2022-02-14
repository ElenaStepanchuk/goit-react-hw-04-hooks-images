import css from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";
const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  onPhotoClick,
}) => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        largeimageurl={largeImageURL}
        className={css.imageGalleryItemImage}
        onClick={() => onPhotoClick(largeImageURL)}
      />
    </li>
  );
};
export default ImageGalleryItem;
ImageGalleryItem.protoTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onPhotoClick: PropTypes.func,
};
