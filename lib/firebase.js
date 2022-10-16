import { db } from "../firebase.config"
import { updateDoc, doc, getDoc, arrayUnion, onSnapshot } from "firebase/firestore"
import useUser from "./useUser"

export async function __removeTagByName(tagName, docId) {
    const ref = doc(db, 'tracks', docId)
    await getDoc(ref)
        .then(res => {
            const { tags } = res.data()
            const foundedTagRemovedArr = tags.filter((T) => T.name !== tagName)
            updateDoc(ref, { tags: foundedTagRemovedArr }).then(() => console.log('DB : deletion & updation of tag sucessfully'))

        }).catch(err => console.log(err))
}


export async function __publishTag(tagData, docId, callback) {
    const ref = doc(db, 'tracks', docId)
    await updateDoc(ref, { tags: arrayUnion(tagData) })
        .then(callback())
        .catch(err => console.log(err))
}

export async function __storeHourTrack(tagData, docId, callback) {
    const ref = doc(db, 'tracks', docId)

    function generateDate() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = dd + '-' + mm + '-' + yyyy;
        return today
    }

    const dd_mm_yyyyy = generateDate()


    await getDoc(ref)
        .then(async (res) => {

            const { tracks } = res.data();

            let payload = [...tracks]
            const filterTrackfromTrackswithCurrentDate = tracks.filter((ele) => ele.date == dd_mm_yyyyy)
            const isCurrentDateIsInTracks = filterTrackfromTrackswithCurrentDate.length !== 0;

            if (isCurrentDateIsInTracks) {
                const indexOfCurrentDateBlock = tracks.findIndex(object => object.date === dd_mm_yyyyy);
                const isCurrentHourIsAlreadyPresentInTrackedHours = isCurrentDateIsInTracks
                    ? filterTrackfromTrackswithCurrentDate[0].trackedHours.filter((ele) => ele.hour === tagData.hour).length !== 0
                    : undefined; // unsolved!

                if (!isCurrentHourIsAlreadyPresentInTrackedHours) {
                    payload[indexOfCurrentDateBlock] = {
                        ...payload[indexOfCurrentDateBlock],
                        trackedHours: [...tracks[indexOfCurrentDateBlock].trackedHours, tagData]
                    }
                } else {
                    return console.log('already present in trackedHours');
                }

            }
            else {
                payload = [...tracks, { date: dd_mm_yyyyy, trackedHours: [tagData] }]
            }

            await updateDoc(ref, { tracks: payload })
                .then(callback())
                .catch(err => console.log(err))
        })
}
