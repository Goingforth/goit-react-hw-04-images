import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from 'components/services/images-api';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import LoaderStyle from 'components/Loader/Loader.styled';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalhits] = useState(0);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    const renderGallery = async () => {
      setLoading(true);

      try {
        const { hits, totalHits } = await fetchImages(searchQuery, page);
        setTotalhits(totalHits);

        if (totalHits === 0) {
          toast.warn('There are no images for this search!');
        }
        if (totalHits <= 12) {
          toast.warn('No more images...');
        }

        const newImages = hits.map(
          ({ id, tags, largeImageURL, webformatURL }) => ({
            id,
            tags,
            largeImageURL,
            webformatURL,
          })
        );
        setImages(prevImages => [...prevImages, ...newImages]);
      } catch (error) {
        setError(error);
        toast.error('An error occurred. Please try again...');
      } finally {
        setLoading(false);
      }
    };
    renderGallery();
  }, [searchQuery, page]);

  const onSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const allImages = images.length === totalHits;

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={images} />
      {loading && (
        <LoaderStyle>
          <Loader />
        </LoaderStyle>
      )}
      {images.length !== 0 && !loading && !allImages && (
        <Button onClick={onLoadMore} />
      )}

      <ToastContainer autoClose={3000} theme={'colored'} />
    </>
  );
};

export default App;
