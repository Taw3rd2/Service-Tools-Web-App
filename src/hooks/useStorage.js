import { useState, useEffect } from "react";
import { projectStorage, firestore } from "../firebase/firebase.utils";

const useStorage = (file, partSelected) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        //references
        const storageRef = projectStorage.ref(file.name);

        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err)
        }, async () => {
            const url = await storageRef.getDownloadURL();
            console.log('partSelected: ', partSelected.id);
            firestore.collection("parts").doc(`${partSelected.id}`).update({ url })
            setUrl(url)
        })
    }, [file, partSelected]);

    return { progress, url, error }
}

export default useStorage;