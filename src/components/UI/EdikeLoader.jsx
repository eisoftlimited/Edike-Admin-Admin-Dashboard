import './EdikeLoader.scss';
import e from './fade/e.svg';
import d from './fade/d.svg';
import i from './fade/i.svg';
import k from './fade/k.svg';
import e_small from './fade/e_small.svg';

import e_fill from './filled/e.svg';
import d_fill from './filled/d.svg';
import i_fill from './filled/i.svg';
import k_fill from './filled/k.svg';
import e_small_fill from './filled/e_small.svg';
import { useState } from "react";

function EdukeLoader() {

    // const images = useState([
    //     {type: 'fade', img: 'e'},
    //     {type: 'fade', img: 'd'},
    //     {type: 'fade', img: 'i'},
    //     {type: 'fade', img: 'k'},
    //     {type: 'fade', img: 'e_small'}
    // ]);

    const images = useState([e,d,i,k,e_small]);

    const getImageUrl = (type, imgPath) => {
        // return new URL(`./${type}/${imgPath}.svg`, import.meta.url).href
        return e;
    }


    return (  <div className='eduke-loader'>
        <div className='eduke-loader__inner'>
            <img src={e} />
            {images.map((image,i) => {
                return <img key={image} src={image} alt={i} />
            })}
        </div>
    </div>);
}

export default EdukeLoader;

/*
const getImageUrl = (type:string, imgPath:string) => {
    return new URL(`../../assets/img/illustrations/loader/${type}/${imgPath}.svg`, import.meta.url).href
}

const clearLoader = () => {
	for (let i = 0; i < img.value.length; i++) {
		img.value[i].type = 'fade'
	}
}

const recurse = () => {
	if(index.value > 4) {
		clearLoader()
		setTimeout(() => {
			index.value = 0
			recurse()
		}, 1000);
	} else {
		img.value[index.value].type = 'filled'
		setTimeout(() => {
			index.value++
			recurse(const recurse = () => {
	if(index.value > 4) {
		clearLoader()
		setTimeout(() => {
			index.value = 0
			recurse()
		}, 1000);
	} else {
		img.value[index.value].type = 'filled'
		setTimeout(() => {
			index.value++
			recurse()
		}, 1000);
	}
}

*/