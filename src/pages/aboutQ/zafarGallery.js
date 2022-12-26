// Section : Image Gallery Section
// Style : Justified with round images

// import node module libraries
import { Image } from 'react-bootstrap';

// import media files
import GalleryImage1 from 'assets/images/about/zafar_qaamuus/zafar-qaamuus-img-1.png';
import GalleryImage2 from 'assets/images/about/zafar_qaamuus/zafar-qaamuus-img-8.jpg';
import GalleryImage3 from 'assets/images/about/zafar_qaamuus/zafar-qaamuus-img-3.png';
import GalleryImage4 from 'assets/images/about/zafar_qaamuus/zafar-qaamuus-img-4.png';
import GalleryImage5 from 'assets/images/about/zafar_qaamuus/zafar-qaamuus-img-5.png';
import GalleryImage6 from 'assets/images/about/zafar_qaamuus/zafar-qaamuus-img-6.png';

const ZafarGallery = () => {
	const GalleryImages = [
		{
			id: 1,
			image: GalleryImage1
		},
		{
			id: 2,
			image: GalleryImage2
		},
		{
			id: 3,
			image: GalleryImage3
		},
		{
			id: 4,
			image: GalleryImage4
		},
		{
			id: 5,
			image: GalleryImage5
		},
		{
			id: 6,
			image: GalleryImage6
		}
	];
	return (
		<div className="gallery mb-12">
			{GalleryImages.map((item, index) => {
				return (
					<figure
						className={`gallery__item gallery__item--${item.id} mb-0`}
						key={index}
					>
						<Image
							src={item.image}
							alt="Gallery image 1"
							className="gallery__img rounded-3"
						/>
					</figure>
				);
			})}
		</div>
	);
};

export default ZafarGallery;
