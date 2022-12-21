import {useEffect, useState} from "react";
import ProfileRiv from "../../segments/ProfileRiv";
import useLocal from "../../hooks/useLocal";
import MyEditValueDialog from "../../segments/MyEditValueDialog";
import ChangeEmotionDialog from "../../segments/ChangeEmotionDialog";
import {sendFetchRequest, todApi} from "../../constants/constants";
import {emailHasError, gamerTagHasError} from "../../validations/validations";
import {useNavigate} from "react-router-dom";


const ProfilePage = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const {isDBLoading, getError, setOperation, getResult} = useLocal();
    const [dialog, setDialog] = useState({open: false, closeDialog: setClose, title: null, message: null, hint: null, onChangeFunction: null, okText: null, okFunction: null})
    const [emotionDialog, setEmotionDialog] = useState({open: false, closeDialog: setCloseEmotionDialog, changed: false})

    function setClose () {
        setDialog({
            open: false
        })


    }
    function setCloseEmotionDialog (changed) {
       let reload = changed ?? false;
        console.log("Reload : "+reload)
        setEmotionDialog({
                open: false,
                changed: false
            })
        if(reload) {
            // window.location.reload()
            window.location.href = window.location.href;
        }
        //navigate("/profile", {replace: true})
    }
    function showGamerTagChangeDialog () {
        setDialog({
            open: true,
            closeDialog: setClose,
            title: "Changing gamer tag",
            message: "Enter new gamer tag below",
            hint: "How others will see you",
            onChangeFunction: () => {},
            okText: "Change gamer tag",
            okFunction: updateGamerTag
        })
    }
    function updateGamerTag(gamerTag) {
        let error = gamerTagHasError(gamerTag)
        if(error) return

        setOperation({
            method: "get",
            collection : "auth"
        }).then(() => {
            let token = getResult()
            if(!token) {
                console.log("Token missing")
                return;
            }
            token = token.token;
            sendFetchRequest({
                url: todApi("auth/name?gamer_tag="+gamerTag),
                method:"PUT",
                extraHeaders: {'Authorization' : "Bearer "+token},
            }).then(({data: apiResponse, error}) => {
                if(apiResponse.statusCode === 200) {
                    user.gamerTag = gamerTag
                    setOperation({
                        method: "put",
                        collection: "user",
                        data: user
                    }).then(() => {
                        setUser(user)
                        setClose()
                    })
                }
            })
        })
    }
    function updateEmail(email) {
        let error = emailHasError(email, {skip: false})
        if(error) return

        setOperation({
            method: "get",
            collection : "auth"
        }).then(() => {
            let token = getResult()
            if(!token) {
                console.log("Token missing")
                return;
            }
            token = token.token;
            sendFetchRequest({
                url: todApi("auth/email"),
                method:"PUT",
                body: {"old_email": user.email, "new_email": email},
                extraHeaders: {'Authorization' : "Bearer "+token},
            }).then(({data: apiResponse, error}) => {
                if(apiResponse.statusCode === 200) {
                    user.email = email
                    setOperation({
                        method: "put",
                        collection: "user",
                        data: user
                    }).then(() => {
                        setUser(user)
                        setClose()
                    })
                }
            })
        })
    }
    function showEmailChangeDialog () {
        setDialog({
            open: true,
            closeDialog: setClose,
            title: "Changing email",
            message: "Enter new email address below",
            hint: "Required if you forget your account",
            onChangeFunction: () => {},
            okText: "Change email",
            okFunction: updateEmail
        })
    }
    function showChangeEmotionDialog () {
        setEmotionDialog({
            open: true,
            closeDialog: setCloseEmotionDialog,
            changed: true
        })
    }

    function sendVerificationEmail () {
        if(!user.email) return

        setOperation({
            method: "get",
            collection : "auth"
        }).then(() => {
            let token = getResult()
            if(!token) {
                console.log("Token missing")
                return;
            }
            token = token.token;
            sendFetchRequest({
                url: todApi("auth/sendVerify"),
                method:"POST",
                extraHeaders: {'Authorization' : "Bearer "+token},
            }).then(({data: apiResponse, error}) => {

            })
        })
    }

    useEffect(() => {
        setOperation({
            method: "get",
            collection: "user"
        }).then(() => {
            setUser(getResult())
        })
    }, [])

    return (
        <div>
            <div style={{display: "flex", alignItems: "start", flexDirection: "column", justifyContent: "center"}}>
                <img onClick={() => navigate(-1)} src="https://img.icons8.com/sf-black-filled/64/null/long-arrow-left.png" alt="go back"/>
            </div>
            <div className="center-column">
                {emotionDialog.open && <ChangeEmotionDialog open={emotionDialog.open} closeDialog={emotionDialog.closeDialog} emotion={user.emotion}/>}
                {dialog.open && <MyEditValueDialog open={dialog.open} closeDialog={dialog.closeDialog} title={dialog.title} message={dialog.message} hint={dialog.hint} onChangeFunction={dialog.onChangeFunction} okText={dialog.okText} okFunction={dialog.okFunction}/>}

                {user && user.emotion && <ProfileRiv loop={true} emotion={user.emotion}/>}
                <img onClick={showChangeEmotionDialog} width={20} height={20} src="https://img.icons8.com/material-sharp/24/000000/pencil--v2.png" alt="change gamer tag"/>


                <div style={{margin: 20}}/>

                <div className="inner-parent">

                    {user && user.username && <div className="inner-parent">
                        <h2 className="field-title">Username:</h2>
                        <div className="center-row">
                            <h4>{user.username}</h4>
                        </div>
                    </div>}

                    {user && user.gamerTag && <div className="inner-parent">
                        <h2 className="field-title">Gamer tag:</h2>
                        <div className="center-row">
                            <h4>{user.gamerTag}</h4>
                            <img onClick={showGamerTagChangeDialog} width={20} height={20} src="https://img.icons8.com/material-sharp/24/000000/pencil--v2.png" alt="change gamer tag"/>
                        </div>
                    </div>}

                    {user && user.email && <div className="inner-parent">
                        <div className="center-row">
                            <h2 className="field-title">Email address:</h2>
                            {(user.verified) && <img width={20} height={20} src="https://img.icons8.com/color-glass/48/null/double-tick--v1.png" alt="email verified"/>}
                            {(!user.verified) && <img onClick={sendVerificationEmail} width={20} height={20} src="https://img.icons8.com/color/48/null/irritant.png" alt="email not verified"/>}
                        </div>
                        <div className="center-row">
                            <h4>{user.email}</h4>
                            <img onClick={showEmailChangeDialog} width={20} height={20} src="https://img.icons8.com/material-sharp/24/000000/pencil--v2.png" alt="change gamer tag"/>
                        </div>
                    </div>}

                    {user && user.createdAt && <div className="inner-parent">
                        <h2 className="field-title">Member of the club since:</h2>
                        <div className="center-row">
                            <h4>{new Date(user.createdAt).toGMTString()}</h4>
                        </div>
                    </div>}

                </div>

            </div>
        </div>
    );
}

export default ProfilePage;