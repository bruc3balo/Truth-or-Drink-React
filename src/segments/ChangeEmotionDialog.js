import Dialog from "@mui/material/Dialog";
import {DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import ProfileRiv from "./ProfileRiv";
import useLocal from "../hooks/useLocal";
import {sendFetchRequest, todApi} from "../constants/constants";
import {Emotion} from "../models/models";

const ChangeEmotionDialog = ({open, closeDialog, emotion}) => {

    const[newEmotion, setNewEmotion] = useState(new Emotion(1, "Happiness", 0))
    const {isDBLoading, getError, setOperation, getResult} = useLocal();
    const[allEmotions, setAllEmotions] = useState([]);
    const token = useRef(null);

    const handleClose = (changed) => {
        closeDialog(changed)
    };

    function changeEmotion(emotion) {
        setNewEmotion(emotion)
        console.log("New emotion : "+emotion)
    }

   async function setInitialEmotion (emotionList) {
        if(emotion !== null) {
            let original = emotionList.find(e => e.description === emotion)
            if (original) changeEmotion(original)
        }
        setAllEmotions(emotionList)
    }

    function getEmotions () {
        setOperation({method: "get", collection: "auth"}).then(() => {
            token.current = getResult()
            if(!token.current) {
                console.log("Token missing")
                return;
            }
            token.current = token.current.token;
            sendFetchRequest({
                url: todApi("auth/emotions"),
                method: "GET",
                extraHeaders:  {'Authorization': "Bearer " +token.current}
            }).then(async ({data: apiResponse, error}) => {
                await setInitialEmotion(Emotion.listFromApiResponse(apiResponse))
            })
        })
    }

    useEffect(() => {
        getEmotions()
    }, [])

    function updateEmotion() {
        sendFetchRequest({
            url: todApi("auth/emotion?emotion_id="+newEmotion.id),
            method: "PUT",
            extraHeaders:  {'Authorization': "Bearer " +token.current}
        }).then(async ({data: apiResponse, error}) => {
            setOperation({
                method: "get",
                collection: "user"
            }).then(() => {
                let user = getResult();
                user.emotion = newEmotion.description
                setOperation({
                    method: "put",
                    collection: "user",
                    data: user
                }).then(() => {
                    emotion = newEmotion.description
                    handleClose(true)
                })
            })
        })
    }

    function emotionItem (e) {
        let selected = newEmotion.description.toUpperCase() === e.description.toUpperCase();
        return (
            <div style={{backgroundColor: selected ? "purple" : "white"}} className="emotion-grid-item" key={e.id} onClick={() => changeEmotion(e)}>
                <ProfileRiv width={100} height={100} loop={true} emotion={e.description}/>
                <h5 style={{color: selected ? "white" : "black"}}>{e.description}</h5>
            </div>
        )
    }

    return (
        <div>
            <Dialog PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                }
            }} open={open} onClose={handleClose} fullWidth={true}>
                <div className="center-column" style={{backgroundColor: "white"}}>
                    <DialogTitle><h1>Change emotion</h1></DialogTitle>
                    <DialogContent>
                        <div className="emotion-grid">
                            {allEmotions.map((e, i) => emotionItem(e, i))}
                        </div>
                    </DialogContent>

                    <DialogActions>
                        <div className="center-row">
                            <img onClick={handleClose} src="https://img.icons8.com/color/48/null/delete-sign--v1.png" alt="Close dialog"/>
                            <div style={{margin: 50}}/>
                            <img onClick={updateEmotion} src="https://img.icons8.com/fluency/48/null/checkmark.png" alt="Select emotion"/>
                        </div>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    )
}

export default ChangeEmotionDialog