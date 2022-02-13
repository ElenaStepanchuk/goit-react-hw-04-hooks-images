import { useEffect, useState } from "react";
import css from "./App.module.css";
import { ToastContainer, toast } from "react-toastify";
import SearchBar from "./components/SearchBar";
import FetchPhotos from "./helpers/FetchPhotos";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
const App = () => {
  const [photos, setPhotos] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  useEffect(() => {
    if (!name) return;
    const Photos = () => {
      setLoading(true);
      FetchPhotos(name, page)
        .then((photos) => {
          if (photos.hits.length === 0) {
            toast(`фотографии или рисунка с именем ${name} не найдено!`, {
              position: "top-center",
            });
          }
          setPhotos((prevPhoto) => [...prevPhoto, ...photos.hits]);
          scroll();
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    };
    Photos();
  }, [page, name]);

  const handleFormSubmit = (name) => {
    setName(name);
    setPage(1);
    setPhotos([]);
    setError(error);
  };
  const handleChangePage = () => {
    setLoading(true);
    setPage((prevPage) => prevPage + 1);
  };
  const togleModal = () => {
    if (setShowModal((prevShowModal) => !prevShowModal)) {
      setLargeImageURL("");
    }
  };
  const handleClickPhoto = (largeImageURL) => {
    setLargeImageURL(largeImageURL);
    setShowModal(true);
  };
  const scroll = () => {
    window.scrollBy({
      top: 2000,
      behavior: "smooth",
    });
  };
  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleFormSubmit} />
      <div className={css.gallery}>
        {loading && <Loader />}
        <ImageGallery photos={photos} onPhotoClick={handleClickPhoto} />
      </div>
      {photos.length > 0 && (
        <Button page={page} onChange={handleChangePage} photos={photos} />
      )}
      {showModal && (
        <Modal onClose={togleModal}>
          <img src={largeImageURL} alt="Увеличено текущее фото" />
        </Modal>
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
};
export default App;
