import { useRive } from '@rive-app/react-canvas';
import {getRiveFromEmotion} from '../static/static';
import React, {useState} from 'react';


const ProfileRiv = ({width, height, loop = false, emotion}) => {



    const { rive, RiveComponent } = useRive({
        src: getRiveFromEmotion(emotion),
        autoplay: true,
    });

    return (
        <div className="center-column">
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

export default ProfileRiv;