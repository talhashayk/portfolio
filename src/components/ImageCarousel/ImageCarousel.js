import React, { useState, useEffect } from "react";

import "./ImageCarousel.scss";
import { imageCarouselData } from "./imageCarouselData";
import expandIcon from "../../assets/expand.svg";

const ImageCarousel = () => {
	const images = imageCarouselData;
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const getIndex = (offset) =>
		(currentImageIndex + offset + images.length) % images.length;

	const openModal = (index) => {
		if (index === currentImageIndex) {
			setIsModalOpen(true);
		}
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
					onClick={() => {
						if (offset === 0) {
							openModal(getIndex(offset));
						} else {
							setCurrentImageIndex(getIndex(offset));
						}
					}}
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

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (isModalOpen) {
				if (e.key === "ArrowLeft") {
					setCurrentImageIndex(getIndex(-1));
				} else if (e.key === "ArrowRight") {
					setCurrentImageIndex(getIndex(1));
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isModalOpen, currentImageIndex]);

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
							onClick={() => setCurrentImageIndex(getIndex(-1))}
						></div>
						<div
							className="next-caret"
							onClick={() => setCurrentImageIndex(getIndex(1))}
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
