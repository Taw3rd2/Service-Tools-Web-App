import { useState, useEffect } from 'react'
import { firestore } from '../firebase/firebase.utils'

const useFirestore = (collection) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore.collection(collection)
        .onSnapshot((snap) => {
            let documents = [];
            snap.forEach(doc => {
                documents.push({...doc.data(), id: doc.id})
            })
            setDocs(documents)
        })
        return () => unsubscribe();
    }, [collection])

    return {docs};
}

export default useFirestore;