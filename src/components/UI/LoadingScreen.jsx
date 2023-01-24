// import './EdikeLoader.scss';
import classes from './LoadingScreen.module.scss';
import { useEffect, useState } from "react";

function EdukeLoader() {

	const [images, setImages] = useState([
		{ type: 'fade', img: 'e' },
		{ type: 'fade', img: 'd' },
		{ type: 'fade', img: 'i' },
		{ type: 'fade', img: 'k' },
		{ type: 'fade', img: 'e_small' }
	]);

	const [index, setIndex] = useState(0);

	const clearLoader = () => {
		for (let i = 0; i < images.length; i++) {
			// img.value[i].type = 'fade'
			setImages(prevImgs => {
				prevImgs[i] = { ...prevImgs[i], type: 'fade' };
				return prevImgs
			});
		}
	};

	const recurse = () => {
		if (index > 4) {
			clearLoader()
			setTimeout(() => {
				setIndex(0);
				recurse()
			}, 1000);
		} else {
			setImages(prevImgs => {
				prevImgs[index] = { ...prevImgs[index], type: 'filled' };
				return prevImgs
			});

			setTimeout(() => {
				setIndex(index => index + 1);
				recurse()
			}, 1000);
		}
	};

	useEffect(() => {
		return () => {
			setIndex(0);
			recurse()
		}
	}, [recurse]);




	return (
		<div className={classes['eduke-loader']}>
			<div className={classes['eduke-loader__inner']}>
				{images.map((image, i) => {
					return <img key={image.img} src={`${process.env.PUBLIC_URL}/assets/images/${image.type}/${image.img}.svg`} alt='' />
				})}
			</div>
		</div>
	);
}

export default EdukeLoader;