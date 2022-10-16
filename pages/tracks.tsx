import React from 'react'
import Tracks from "../components/tracks"
import Popup from '../components/track-popup';
import { onSnapshot, doc } from "firebase/firestore";
import { AnimatePresence } from 'framer-motion';
import { FullPage } from "../components/Loadings"
import { withSessionSsr } from "../lib/withSession"
import { db } from "../firebase.config"

export const { Consumer, Provider } = React.createContext({} as any)

export default function MyPage(props: any) {

  const [document, storeDocument] = React.useState<any>(false)
  const [trackerPopup, setTrackerPopup] = React.useState(false)

  function opposeTrackerPopupVisiblity() {
    setTrackerPopup(p => !p)
  }

  React.useEffect(() => {
    (async function () {
      onSnapshot(doc(db, 'tracks', props.ssr.docId), (document) => {
        storeDocument(document.data());
      });
    })()
  }, [props])

  if (!document) return <FullPage />

  return (
    <Provider value={{ store: document }}>
      <main>
        <AnimatePresence>
          {trackerPopup && <Popup close={opposeTrackerPopupVisiblity} />}
        </AnimatePresence>
        <Tracks />
      </main>
    </Provider >
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