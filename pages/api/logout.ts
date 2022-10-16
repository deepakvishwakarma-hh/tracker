import { NextApiHandler } from "next";
import { ironOptions } from "../../lib/iron";
import { withIronSessionApiRoute } from "iron-session/next";
const logoutRoute: NextApiHandler = (req, res) => {
    req.session.destroy();
    res.send({ ok: true });
}
export default withIronSessionApiRoute(logoutRoute, ironOptions);
