import React, { useState, useEffect, useRef } from "react";

import "./ImageSlider.scss";
import "../ImageCarousel/ImageCarousel.scss";
import { imageCarouselData } from "../ImageCarousel/imageCarouselData";
import expandIcon from "../../assets/expand.svg";

const ImageSlider = () => {
	const images = imageCarouselData;
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const sliderRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const [lastScrollY, setLastScrollY] = useState(0);

	const getIndex = (offset) =>
		(currentImageIndex + offset + images.length) % images.length;

	const openModal = (index) => {
		setCurrentImageIndex(index);
		setIsModalOpen(true);
	};

	const closeModal = (e) => {
		if (e.target === e.currentTarget) {
			setIsModalOpen(false);
		}
	};

	const renderImages = () => {
		const extendedImages = [...images, ...images, ...images];
		return extendedImages.map((image, index) => (
			<div
				key={index}
				className="image"
				style={{
					backgroundImage: `url(${image.image})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					height: "300px",
					width: "300px",
				}}
				onClick={() => openModal(index % images.length)}
			>
				<img
					src={expandIcon}
					alt="Expand Icon"
					className="expand-image"
				/>
			</div>
		));
	};

	const startDrag = (e) => {
		setIsDragging(true);
		setStartX(e.pageX - sliderRef.current.offsetLeft);
		setScrollLeft(sliderRef.current.scrollLeft);
	};

	const stopDrag = () => {
		setIsDragging(false);
	};

	const onDrag = (e) => {
		if (!isDragging) return;
		e.preventDefault();
		const x = e.pageX - sliderRef.current.offsetLeft;
		const walk = (x - startX) * 2; // scroll-fast
		sliderRef.current.scrollLeft = scrollLeft - walk;
	};

	const handleScroll = () => {
		const slider = sliderRef.current;
		const maxScrollLeft = slider.scrollWidth / 3;
		if (slider.scrollLeft >= maxScrollLeft * 2) {
			slider.scrollLeft -= maxScrollLeft;
		} else if (slider.scrollLeft <= maxScrollLeft) {
			slider.scrollLeft += maxScrollLeft;
		}
	};

	const handlePageScroll = () => {
		const slider = sliderRef.current;
		const scrollAmount = (window.scrollY - lastScrollY) * 1;
		slider.scrollLeft += scrollAmount;
		setLastScrollY(window.scrollY);
	};

	useEffect(() => {
		const slider = sliderRef.current;
		slider.addEventListener("mousedown", startDrag);
		slider.addEventListener("mouseleave", stopDrag);
		slider.addEventListener("mouseup", stopDrag);
		slider.addEventListener("mousemove", onDrag);
		slider.addEventListener("scroll", handleScroll);
		window.addEventListener("scroll", handlePageScroll);

		return () => {
			slider.removeEventListener("mousedown", startDrag);
			slider.removeEventListener("mouseleave", stopDrag);
			slider.removeEventListener("mouseup", stopDrag);
			slider.removeEventListener("mousemove", onDrag);
			slider.removeEventListener("scroll", handleScroll);
			window.removeEventListener("scroll", handlePageScroll);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDragging, startX, scrollLeft, lastScrollY]);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (isModalOpen) {
				e.stopImmediatePropagation();
				if (e.key === "ArrowLeft") {
					setCurrentImageIndex((prevIndex) =>
						getIndex(prevIndex - 1)
					);
				} else if (e.key === "ArrowRight") {
					setCurrentImageIndex((prevIndex) =>
						getIndex(prevIndex + 1)
					);
				}
			} else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
				e.preventDefault();
			}
		};

		window.addEventListener("keydown", handleKeyDown, true);

		return () => {
			window.removeEventListener("keydown", handleKeyDown, true);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isModalOpen]);

	useEffect(() => {
		const slider = sliderRef.current;
		slider.scrollLeft = slider.scrollWidth / 3 - 5;
	}, []);

	return (
		<>
			<div className="image-slider" ref={sliderRef}>
				{renderImages()}
			</div>

			{isModalOpen && (
				<div className="modal-overlay modal-open" onClick={closeModal}>
					<div
						className="modal-content"
						onClick={(e) => e.stopPropagation()}
					>
						<div
							className="prev-caret"
							onClick={(e) => {
								e.stopPropagation();
								setCurrentImageIndex(getIndex(-1));
							}}
						></div>
						<div
							className="next-caret"
							onClick={(e) => {
								e.stopPropagation();
								setCurrentImageIndex(getIndex(1));
							}}
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

export default ImageSlider;
