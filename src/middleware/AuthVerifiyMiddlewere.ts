import jwt from 'jsonwebtoken';

export default (req: any, res: any, next: any) => {
    let Token = req.headers['token-key'];
    jwt.verify(Token, "nawaNoor", (err: any, decoded: any) => {
        if (err) {
            res.status(401).json({status: "unauthorized", data: err});
        } else {
            let UserName = decoded['data']['UserName'];
            req.headers.username = UserName;
            next();
        }
    });
};