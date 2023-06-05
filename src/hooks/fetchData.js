import {collection, getDocs, db} from '../firebase.js';

export const fetchdata = async () => {
    const doc_refs = await getDocs(collection(db, "products"))
    const res = []

    doc_refs.forEach(country => {
        res.push({
            id: country.id,
            ...country.data()
        })
    })
    return res
}