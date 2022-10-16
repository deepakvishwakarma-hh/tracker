import React from 'react'
import Head from 'next/head';
import useUser from '../lib/useUser';
import getDate from "../lib/dd_mm_yy"
import { db } from "../firebase.config"
import { useRouter } from 'next/router';
import fetchJson from '../lib/fetchJson';
import Popup from '../components/track-popup';
import { AnimatePresence } from "framer-motion"
import { FullPage } from '../components/Loadings';
import Component from '../components/tracks/track';
import { withSessionSsr } from "../lib/withSession"
import SleepingHour from "../components/SleepigHour"
import FloatingBtn from '../components/floatingBtn';
import { onSnapshot, doc } from "firebase/firestore";
import CurrentDayAlert from '../components/alerts/currentDate';
import CurrentHourAlert from '../components/alerts/currentHour';
export const { Consumer, Provider } = React.createContext({} as any)

export default function MyPage(props: any) {

    const router = useRouter()
    const { mutateUser } = useUser()

    const [document, storeDocument] = React.useState<any>(false)
    const [trackerPopup, setTrackerPopup] = React.useState(false)

    function opposeTrackerPopupVisiblity() {
        setTrackerPopup(p => !p)
    }

    React.useEffect(() => {
        (async function () {
            onSnapshot(doc(db, 'tracks', props.ssr.docId), (document) => {
                if (!document.exists()) {
                    // handler logout while document is'nt in firestore
                    mutateUser(fetchJson('/api/logout'))
                        .then(() => router.push("/auth"))
                    return
                };
                const value = { ...document.data() }
                value.tracks = document.data().tracks.filter((track: any) => track.date === getDate())
                storeDocument(value)
            })
        })()
    }, [props])

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

export const getServerSideProps = withSessionSsr(async function ({ req, res }: any) {
    const user = req.session.user;
    console.log(user)
    if (user === undefined) {
        res.setHeader("location", "/auth");
        res.statusCode = 302;
        res.end();
        return {
            props: { isLoggedIn: false },
        };
    }
    return {
        props: { ssr: user },
    };
})
