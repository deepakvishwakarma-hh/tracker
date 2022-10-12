import React from 'react'
import Head from 'next/head';
import { ref } from "../lib/firebase"
import getDate from "../lib/dd_mm_yy"
import Popup from '../components/track-popup';
import { onSnapshot } from "firebase/firestore";
import { AnimatePresence } from "framer-motion"
import { FullPage } from '../components/Loadings';
import Component from '../components/tracks/track';
import FloatingBtn from '../components/floatingBtn';
import SleepingHour from "../components/SleepigHour"
import CurrentDayAlert from '../components/alerts/currentDate';
import CurrentHourAlert from '../components/alerts/currentHour';
export const { Consumer, Provider } = React.createContext({} as any)

export default function MyPage() {

    const [document, storeDocument] = React.useState<any>(false)
    const [trackerPopup, setTrackerPopup] = React.useState(false)

    function opposeTrackerPopupVisiblity() {
        setTrackerPopup(p => !p)
    }

    React.useEffect(() => {
        (async function () {
            onSnapshot(ref, (doc) => {
                if (!doc.exists()) return null;
                const value = { ...doc.data() }
                value.tracks = doc.data().tracks.filter((track: any) => track.date === getDate())
                storeDocument(value)
            })
        })()
    }, [])

    if (!document) return <FullPage />

    return (
        <>
            <Head>
                <title>Tracker</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
            </Head>
            <Provider value={{ store: document }}>
                <main>
                    <CurrentHourAlert tracks={document.tracks} />
                    <CurrentDayAlert tracks={document.tracks} />
                    <AnimatePresence>
                        {trackerPopup && <Popup store={document} />}
                    </AnimatePresence>

                    <div>
                        {document.tracks.map((track: any, index: number) => <Component home key={index} data={track} />)}
                    </div>

                    <SleepingHour store={document} />

                    <FloatingBtn onClick={opposeTrackerPopupVisiblity} state={trackerPopup} />


                </main>
            </Provider >
        </>

    )

}

// Start from describing from sleep time