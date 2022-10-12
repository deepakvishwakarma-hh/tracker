import React from 'react'
import { ref } from "../lib/firebase"
import Tracks from "../components/tracks"
import Popup from '../components/track-popup';
import { onSnapshot } from "firebase/firestore";
import { AnimatePresence } from 'framer-motion';
import { FullPage } from "../components/Loadings"

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
        storeDocument(doc.data());
      });
    })()
  }, [])

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

