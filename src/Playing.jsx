import classes from './Playing.scss';
// import dfade from './fade/d.svg';
// import e_smallfade from './fade/e_small.svg';
// import efade from './fade/e.svg';
// import ifade from './fade/i.svg';
// import kfade from './fade/k.svg';
// import dfilled from './filled/d.svg';
// import e_smallfilled from './filled/e_small.svg';
// import efilled from './filled/e.svg';
// import ifilled from './filled/i.svg';
// import kfilled from './filled/k.svg';
import { useState, 
    // useRef 
} from 'react';
// import { useEffect } from 'react';
// import { useCallback } from 'react';


function PlayingScreen() {

    const [index, setIndex] = useState(0);
    // const [imagesObj, setImagesObj] = useState([
    //     { type: 'fade', img: 'fade', imgFade: efade, imgFilled: efilled },
    //     { type: 'fade', img: 'fade', imgFade: dfade, imgFilled: dfilled },
    //     { type: 'fade', img: 'fade', imgFade: ifade, imgFilled: ifilled },
    //     { type: 'fade', img: 'fade', imgFade: kfade, imgFilled: kfilled },
    //     { type: 'fade', img: 'fade', imgFade: e_smallfade, imgFilled: e_smallfilled }
    // ]);

    // const getImageUrl = (type, index) => {
    //     if (type === 'fade') {
    //         return imagesObj[index].imgFade
    //     } else if (type === 'filled') {
    //         return imagesObj[index].imgFilled;
    //     }
    // }

    // const clearLoader = () => {
    //     for (let i = 0; i < imagesObj.length; i++) {
    //         setImagesObj(prevData => {
    //             const data = [...prevData];
    //             data[i] = { type: 'fade', imgFade: data[i].imgFade, imgFilled: data[i].imgFilled };
    //             return [data]
    //         });
    //     }
    // };

    // const intervalRef = useRef();

    // const recurse = useCallback(() => {
    //     if (index > 4) {
    //         clearLoader()
    //         intervalRef.current = setTimeout(() => {
    //             setIndex(0);
    //             recurse()
    //         }, 1000);
    //     } else {
    //         setImagesObj(prevData => {

    //             const data = [...prevData];
    //             data[index] = { type: 'filled', imgFade: data[index].imgFade, imgFilled: data[index].imgFilled };
    //             return [data]
    //             // return [data, { type: 'fade', imgFade: ifade, imgFilled: ifilled }]
    //         });
    //         setTimeout(() => {
    //             intervalRef.current = setIndex(prevIndex => prevIndex + 1);
    //             recurse()
    //         }, 1000);
    //     }
    // }, [index, clearLoader]);

    // useEffect(() => {

    //     return () => {
    //         setIndex(0);
    //         recurse();

    //         clearTimeout(intervalRef.current);
    //     }
    // }, [index, recurse, intervalRef]);



    return (
        <div className={classes['loading-screen']}>
            <div className="w-fit flex items-end">
                {[1,2,3,4,5].map((item, i) => {
                    return (
                        <img key={i} 
                        src={''} 
                        className="w-[30px] md:w-auto" alt="" />
                    );
                })}
                {/* {imagesObj.map((item, i) => {
                    return (
                        <img key={i} 
                        src={
                            // getImageUrl(item.type, i)
                            ''
                        } 
                        className="w-[30px] md:w-auto" alt="" />
                    );
                })} */}
            </div>
        </div>
    );
}

export default PlayingScreen;