import { GalleryLi, GalleryImg } from './ImageGalleryItem.styled';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { LargeImage } from 'components/LargeImage/LargeImage';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ id, largeImageURL, webformatURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  const showModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <GalleryLi key={id}>
        {showModal && (
          <Modal onModalShow={showModalToggle}>
            <LargeImage imgUrl={largeImageURL} />
          </Modal>
        )}
        <GalleryImg
          onClick={showModalToggle}
          src={webformatURL}
          alt={tags}
          width="290"
        />
      </GalleryLi>
    </>
  );
};

// export class ImageGalleryItem extends Component {
//   state = {
//     showModal: false,
//   };

//   showModalToggle = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   render() {
//     return (
//       <>
//         <GalleryLi>
//           {this.state.showModal && (
//             <Modal onModalShow={this.showModalToggle}>
//               <LargeImage imgUrl={this.props.largeImageURL} />
//             </Modal>
//           )}
//           <GalleryImg
//             onClick={this.showModalToggle}
//             src={this.props.webformatURL}
//             alt={this.props.tags}
//             width="290"
//           />
//         </GalleryLi>
//       </>
//     );
//   }
// }

ImageGalleryItem.propTypes = {
  picture: PropTypes.shape({
    // id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
