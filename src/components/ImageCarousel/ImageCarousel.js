import React, { useState } from "react";

import "./ImageCarousel.css";
import image1 from "../../images/image1.jpg";
import image2 from "../../images/image2.png";
import image3 from "../../images/image3.jpeg";
import image4 from "../../images/image4.jpg";
import image5 from "../../images/image5.jpeg";

const ImageCarousel = () => {
	const images = [
		{ image: image1, caption: "Caption for image 1" },
		{ image: image2, caption: "Caption for image 2" },
		{ image: image3, caption: "Caption for image 3" },
		{ image: image4, caption: "Caption for image 4" },
		{ image: image5, caption: "Caption for image 5" },
	];
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const getIndex = (offset) =>
		(currentImageIndex + offset + images.length) % images.length;

	const handleImageClick = (direction) => {
		setCurrentImageIndex(getIndex(direction));
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = (e) => {
		if (e.target === e.currentTarget) {
			setIsModalOpen(false);
		}
	};

	const renderImages = () => {
		const positions = [-2, -1, 0, 1, 2];
		const classes = [
			"image-carousel-prev image-carousel-prev-next",
			"image-carousel-prev-next",
			"image-carousel-current",
			"image-carousel-prev-next",
			"image-carousel-next image-carousel-prev-next",
		];

		return positions.map((offset, index) => (
			<div
				key={offset}
				className={`image ${classes[index]}`}
				style={{
					backgroundImage: `url(${images[getIndex(offset)].image})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
				onClick={() =>
					offset === 0
						? openModal()
						: handleImageClick(offset > 0 ? 1 : -1)
				}
			></div>
		));
	};

	return (
		<>
			<div className="image-carousel">{renderImages()}</div>

			{isModalOpen && (
				<div className="modal-overlay modal-open" onClick={closeModal}>
					<div
						className="modal-content"
						onClick={(e) => e.stopPropagation()}
					>
						<div
							className="prev-caret"
							onClick={() => handleImageClick(-1)}
						></div>
						<div
							className="next-caret"
							onClick={() => handleImageClick(1)}
						></div>
						<div
							className="modal-image"
							style={{
								backgroundImage: `url(${images[currentImageIndex].image})`,
								backgroundSize: "contain",
								backgroundPosition: "center",
								backgroundRepeat: "no-repeat",
								width: "100%",
								height: "100%",
							}}
						>
							<div
								className="modal-close-button"
								onClick={(e) => {
									e.stopPropagation();
									setIsModalOpen(false);
								}}
							></div>
						</div>
						<div className="caption-container">
							<p className="caption">
								{images[currentImageIndex].caption}
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ImageCarousel;
