import { useState, useEffect } from 'react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './Container/Container.styled';
import { goSearch } from '../services/apiServices';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { EmptyGal } from './ImageGallery/ImageGallery.styled';
import { AppCustomStyle } from './App.styled';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchQuery === '') return;
    setLoading(true);
    setError('');
    goSearch(searchQuery, page)
      .then(({ pictures, totalHits }) => {
        if (pictures.length === 0) {
          return toast.error('there are no pictures with your`s query');
        }
        setPictures(prevPictures => [...prevPictures, ...pictures]);
        setTotalHits(totalHits);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));

    if (error) {
      toast.error({ error });
    }
  }, [error, page, searchQuery]);

  const onSearchFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPictures([]);
    setPage(1);
  };

  const onLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <AppCustomStyle>
      <Searchbar onSubmit={onSearchFormSubmit} />
      <Container>
        {totalHits === 0 && <EmptyGal>there are no images found</EmptyGal>}
        <ImageGallery pictures={pictures} />

        {totalHits !== pictures.length && !loading && (
          <Button onLoadMoreClick={onLoadMoreClick} />
        )}
        {loading && <Loader />}
      </Container>
      <ToastContainer autoClose={3000} theme="dark" />
    </AppCustomStyle>
  );
};
// export class App extends Component {
//   state = {
//     searchQuery: '',
//     pictures: [],
//     totalHits: 0,
//     page: 1,
//     loading: false,
//     error: '',
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { searchQuery, page, error } = this.state;
//     if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
//       this.setState({ loading: true, error: '' });

//       await goSearch(searchQuery, page)
//         .then(({ pictures, totalHits }) => {
//           if (pictures.length === 0) {
//             return toast.error('нема даних');
//           }
//           this.setState(prevState => {
//             return {
//               pictures: [...prevState.pictures, ...pictures],
//               totalHits,
//             };
//           });
//         })
//         .catch(error =>
//           this.setState({
//             error: 'ooopsie, app crashed, we`re solving this issue write now',
//           })
//         )
//         .finally(() => this.setState({ loading: false }));
//     }

//     if (error !== prevState.error && error) {
//       toast.error({ error });
//     }
//   }

//   onSearchFormSubmit = searchQuery => {
//     this.setState({ searchQuery: searchQuery, page: 1, pictures: [] });
//   };
//   onLoadMoreClick = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { pictures, loading, totalHits } = this.state;
//     return (
//       <AppCustomStyle>
//         <Searchbar onSubmit={this.onSearchFormSubmit} />
//         <Container>
//           {totalHits === 0 && <EmptyGal>there are no images found</EmptyGal>}
//           <ImageGallery pictures={pictures} />

//           {totalHits !== pictures.length && !loading && (
//             <Button onLoadMoreClick={this.onLoadMoreClick} />
//           )}
//           {loading && <Loader />}
//         </Container>
//         <ToastContainer autoClose={3000} theme="dark" />
//       </AppCustomStyle>
//     );
//   }
// }
