import {Dexie} from "dexie";
import {appName} from "../constants/constants";
import {useEffect, useRef, useState} from "react";



const useLocal = () => {

    //db and collections
    const db = useRef(new Dexie(appName))
    const dbMeta = {version : 1, schema: {
            auth: 'token'
        }}

    const error = useRef(null)
    const loading = useRef(true)
    const result = useRef(null)

    const setup = useRef(false);
    const operation = useRef({method: null, data: null, collection: null})

    function setUpDb () {
        if(setup.current) return;
        db.current.version(dbMeta.version).stores(dbMeta.schema)
        setup.current = true
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
        setLoading(true)
        switch (operation.current.collection) {
            case "auth":
                await doAuthOperation()
                break;
        }
        setLoading(false)
    }
    async function setOperation({method, data, collection}) {
        operation.current = {method: method, data: data, collection: collection}
        await performOperation()
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

    useEffect(() => setUpDb(), [])

    return {getResult,  isDBLoading, getError, setOperation};
}


export default useLocal;