import { getSession } from "next-auth/react";

export const isAdmin =
  ( handler ) =>
  async (req, res) => {
    const session = await getSession({ req });

    console.log('header.cookies:',req.headers.cookie);
    console.log('req.cookies:',req.cookies);
    console.log('session:',session);

    if (!session || session?.user?.isAdmin === false) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    return handler(req, res);
  };
