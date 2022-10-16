import { db } from "../../firebase.config"
import { ironOptions } from "../../lib/iron";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { withIronSessionApiRoute } from "iron-session/next";

async function loginRoute(req, res) {
    const body = await req.body
    const ref = doc(db, 'tracks', `${body.email}`)

    try {
        await getDoc(ref).then(async (user) => {
            if (user.exists()) {

                req.session.user = {
                    docId: body.email,
                };

                await req.session.save();
                res.status(200).json({ message: 'already in db' })
            } else {

                await setDoc(ref, {
                    name: 'defaultUser',
                    tags: [
                        { name: 'sleeping', message: 'sleeping' } // default [pre-build] tags 
                    ],
                    tracks: []
                }).then(async () => {
                    req.session.user = {
                        docId: body.email,
                    };
                    await req.session.save();
                    res.status(200).json({ message: 'newly in db' })
                })
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default withIronSessionApiRoute(loginRoute, ironOptions);


