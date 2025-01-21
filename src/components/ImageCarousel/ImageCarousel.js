import React, { useState } from "react";

import "./ImageCarousel.scss";
import { imageCarouselData } from "./imageCarouselData";
import expandIcon from "../../assets/expand.svg";

const ImageCarousel = () => {
	const images = imageCarouselData;
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

	const isMobile = window.matchMedia("(max-width: 600px)").matches;

	const renderImages = () => {
		const positions = isMobile
			? [-1, 0, 1]
			: [-4, -3, -2, -1, 0, 1, 2, 3, 4];

		return positions.map((offset) => {
			const { size, opacity } = calculateStyles(offset);
			return (
				<div
					key={offset}
					className={`image`}
					style={{
						backgroundImage: `url(${
							images[getIndex(offset)].image
						})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						height: size,
						width: size,
						opacity: opacity,
					}}
					onClick={() =>
						offset === 0
							? openModal()
							: handleImageClick(offset > 0 ? 1 : -1)
					}
				>
					{offset === 0 && (
						<img
							src={expandIcon}
							alt="Hammer Icon"
							className="expand-image"
						/>
					)}
				</div>
			);
		});
	};

	const calculateStyles = (offset) => {
		const baseSize = 300;
		const sizeReduction = 55;
		const baseOpacity = 1;
		const opacityReduction = isMobile ? 0.5 : 0.15;

		const calculatedSize = Math.max(
			baseSize - Math.abs(offset) * sizeReduction
		);
		const calculatedOpacity = Math.max(
			baseOpacity - Math.abs(offset) * opacityReduction
		);

		return {
			size: `${calculatedSize}px`,
			opacity: calculatedOpacity,
		};
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
						></div>
						<div
							className="modal-close-button"
							onClick={(e) => {
								e.stopPropagation();
								setIsModalOpen(false);
							}}
						></div>
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
