import todRive from '../static/tod.riv';
import angerRive from '../static/anger.riv';
import contemptRive from '../static/contempt.riv';
import disgustRive from '../static/disgust.riv';
import happyRive from '../static/happy.riv';
import fearRive from '../static/fear.riv';
import sadRive from '../static/sad.riv';
import surprisedRive from '../static/surprised.riv';
import personRive from '../static/person.riv';
import userIcon from '../static/user.png';


export function angerRiv() {
    return angerRive
}

export function contemptRiv() {
    return contemptRive
}

export function disgustRiv() {
    return disgustRive
}

export function fearRiv() {
    return fearRive
}

export function happyRiv() {
    return happyRive
}

export function personRiv() {
    return personRive
}

export function sadRiv() {
    return sadRive;
}

export function surprisedRiv() {
    return surprisedRive
}

export function todRiv () {
    return todRive
}

export function userPng () {
    return userIcon
}

export function getRiveFromEmotion(emotion) {
    switch (emotion.toUpperCase()) {
        case "HAPPINESS":
            return happyRiv()
        case "CONTEMPT":
            return contemptRiv()
        case "ANGER":
            return angerRiv()
        case "DISGUST":
            return disgustRiv()
        case "FEAR":
            return fearRiv()
        case "SADNESS":
            return sadRiv()
        case "SURPRISE":
            return surprisedRiv()
        default:
            return userPng()
    }
}

export const allEmotions = [
    "HAPPINESS", "CONTEMPT", "ANGER" , "DISGUST", "FEAR", "SADNESS", "SURPRISE"
]