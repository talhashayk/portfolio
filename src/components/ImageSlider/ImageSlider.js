import React, { useState, useEffect, useRef } from "react";

import "./ImageSlider.scss";
import { imageSliderData } from "../ImageSlider/ImageSliderData";
import expandIcon from "../../assets/expand.svg";

const ImageSlider = () => {
	const images = imageSliderData;
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const slider1Ref = useRef(null);
	const slider2Ref = useRef(null);
	const [lastScrollY, setLastScrollY] = useState(0);
	const syncingRef = useRef(false); // flag to prevent recursive syncing
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 600);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

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
					backgroundImage: `url(${image.thumbnail})`,
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

	useEffect(() => {
		const slider1 = slider1Ref.current;
		if (!slider1) return;
		const imageWidth = slider1.scrollWidth / 3 / images.length;
		slider1.scrollLeft = 0;
		if (!isMobile) {
			const slider2 = slider2Ref.current;
			slider2.scrollLeft = 6.5 * imageWidth;
		}
	}, [images, isMobile]);

	useEffect(() => {
		if (isMobile) return;
		const slider1 = slider1Ref.current;
		const slider2 = slider2Ref.current;
		const maxScrollLeft = slider1.scrollWidth / 3;

		const handleInfiniteScroll = (slider) => {
			if (slider.scrollLeft >= maxScrollLeft * 2) {
				slider.scrollLeft -= maxScrollLeft;
			} else if (slider.scrollLeft <= 0) {
				slider.scrollLeft += maxScrollLeft;
			}
		};

		const handlePageScroll = () => {
			const scrollDelta = window.scrollY - lastScrollY;
			slider1.scrollLeft += scrollDelta;
			slider2.scrollLeft += scrollDelta;
			[slider1, slider2].forEach((slider) => {
				if (slider.scrollLeft >= maxScrollLeft * 2) {
					slider.scrollLeft -= maxScrollLeft;
				} else if (slider.scrollLeft <= 0) {
					slider.scrollLeft += maxScrollLeft;
				}
			});
			setLastScrollY(window.scrollY);
		};

		const syncScroll = (source, target, isSourceSlider1) => {
			if (syncingRef.current) return;
			syncingRef.current = true;
			const oneSetWidth = slider1.scrollWidth / 3;
			const imageWidth = oneSetWidth / images.length;
			const staggerOffset = 6.5 * imageWidth;
			if (isSourceSlider1) {
				target.scrollLeft = source.scrollLeft + staggerOffset;
			} else {
				target.scrollLeft = source.scrollLeft - staggerOffset;
			}
			setTimeout(() => {
				syncingRef.current = false;
			}, 0);
		};

		const s1ScrollHandler = () => {
			handleInfiniteScroll(slider1);
			syncScroll(slider1, slider2, true);
		};

		const s2ScrollHandler = () => {
			handleInfiniteScroll(slider2);
			syncScroll(slider2, slider1, false);
		};

		slider1.addEventListener("scroll", s1ScrollHandler);
		slider2.addEventListener("scroll", s2ScrollHandler);
		window.addEventListener("scroll", handlePageScroll);

		return () => {
			slider1.removeEventListener("scroll", s1ScrollHandler);
			slider2.removeEventListener("scroll", s2ScrollHandler);
			window.removeEventListener("scroll", handlePageScroll);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastScrollY, isMobile]);

	useEffect(() => {
		if (!isMobile) return;
		const slider1 = slider1Ref.current;
		if (!slider1) return;
		const handlePageScrollMobile = () => {
			const scrollDelta = window.scrollY - lastScrollY;
			slider1.scrollLeft += scrollDelta;
			setLastScrollY(window.scrollY);
		};
		window.addEventListener("scroll", handlePageScrollMobile);
		return () =>
			window.removeEventListener("scroll", handlePageScrollMobile);
	}, [lastScrollY, isMobile]);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (isModalOpen) {
				if (e.key === "ArrowLeft") {
					setCurrentImageIndex((prevIndex) =>
						getIndex(prevIndex - 1)
					);
				} else if (e.key === "ArrowRight") {
					setCurrentImageIndex((prevIndex) =>
						getIndex(prevIndex + 1)
					);
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown, true);
		return () => {
			window.removeEventListener("keydown", handleKeyDown, true);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isModalOpen]);

	return (
		<>
			<div className="image-slider" ref={slider1Ref}>
				{renderImages()}
			</div>
			{!isMobile && (
				<div className="image-slider" ref={slider2Ref}>
					{renderImages()}
				</div>
			)}

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
