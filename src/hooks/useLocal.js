import {Dexie} from "dexie";
import {appName} from "../constants/constants";
import {useEffect, useRef, useState} from "react";



const useLocal = () => {


    //db and collections
    const db = useRef(new Dexie(appName))
    const dbMeta = {version : 2, schema: {
            auth: 'token',
            user: 'username, gamerTag, emotion, email, verified, createdAt'
        }}

    const error = useRef(null)
    const loading = useRef(true)
    const result = useRef(null)

    const setup = useRef(false);
    const operation = useRef({method: null, data: null, collection: null})

    function setUpDb () {
        if(setup.current) return;
        db.current.version(dbMeta.version).stores(dbMeta.schema)
        db.current.open().then(() => console.log("Db open")).catch((e) => console.error("Db failed to open: "+e))
        setup.current = true
        loading.current = false
    }

    // db

    function getResult () {
        return result.current;
    }
    function setResult (res) {
        result.current = res
    }

    function setLoading (err) {
        loading.current = err
    }
    function isDBLoading() {
        return loading.current
    }

    function setError (err) {
        error.current = err
    }
    function getError() {
        return error.current
    }

    async function deleteData() {
        await db.clear()
    }
    async function performOperation() {
        if(!operation.current.collection || !operation.current.method) return;
        console.log(operation.current)
        resetData()
        setLoading(true)
        switch (operation.current.collection) {
            case "auth":
                await doAuthOperation()
                break;

            case "user":
                await doUserOperation()
                break;

            default:
                setResult(false)
                break
        }
        setLoading(false)
    }
    async function setOperation({method, data, collection}) {
        operation.current = {method: method, data: data, collection: collection}
        await performOperation()
    }

    function resetData () {
        result.current = null
        error.current = null
    }

    //auth
    async function doAuthOperation() {
        switch (operation.current.method) {
            case "get":
                await getAuthData();
                break

            case "post":
            case "put":
                await saveAuthData(operation.current.data);
                break

            case "delete":
                await deleteData()
                break
        }
    }
    async function saveAuthData(token) {
        db.current.auth.clear().then(async () => await db.current.auth.add({token: token}).then(() => setResult(true)).catch(e => {setError(e); setResult(false)}))
    }
    async function getAuthData() {
        let result = await db.current.auth.toArray()
        setResult(result.length > 0 ? result[0] : null)
    }

    //user
    async function doUserOperation() {
        switch (operation.current.method) {
            case "get":
                await getUserData();
                break

            case "post":
            case "put":
                await saveUserData(operation.current.data);
                break

            case "delete":
                await deleteData()
                break
        }
    }
    async function saveUserData(myUser) {
        db.current.user.clear().then(async () => await db.current.user.add({username: myUser.username, gamerTag: myUser.gamerTag, emotion: myUser.emotion, email: myUser.email, verified: myUser.verified, createdAt: myUser.createdAt}).then(() => setResult(true)).catch(e => {setError(e); setResult(false)}))
    }
    async function getUserData() {
        let result = await db.current.user.toArray()
        setResult(result.length > 0 ? result[0] : null)
    }

    useEffect(() => setUpDb(), [])

    return {getResult,  isDBLoading, getError, setOperation};
}


export default useLocal;