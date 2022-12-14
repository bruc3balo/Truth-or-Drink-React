import { useRive } from '@rive-app/react-canvas';
import todRive from './static/tod.riv';
import React  from 'react';


const Cheers = () => {
    const { rive, RiveComponent } = useRive({
        src: todRive,
        autoplay: true,
    });



    return (
        <div className="rivDiv">
            <RiveComponent
                style={{width: 433.988, height: 387.212}}
                onMouseEnter={() => rive && rive.play()}
                onMouseLeave={() => rive && rive.pause()}
            />
        </div>
);
}

export default Cheers;

