import { useRive } from '@rive-app/react-canvas';
import todRive from '../static/tod.riv';
import React from 'react';


const Cheers = ({width, height, loop = false}) => {
    const { rive, RiveComponent } = useRive({
        src: todRive,
        autoplay: true,
    });

    return (
        <div className="parent">
            <div className="splash">
                <RiveComponent
                    style={{width: width ?? 433.988, height: height ?? 387.212}}
                    onMouseEnter={() => rive && rive.play()}
                    onMouseLeave={() => rive && (loop ? rive.play() : rive.pause())}
                />
            </div>
        </div>
    );
}

export default Cheers;

