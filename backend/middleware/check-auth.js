/*
 * License: The MIT License (MIT)
 * Author:E-bank IT team
 * Author email: @ebanka-it.com
 * Date: Fri Aug 23 2019
 * Description: 
 * Acts as a middleman - it compares retreived token
 * form frontend with the private key on server (actually checks
 * wether retrieved token was generated with server's private key
 * or wasn't). If token was genereted on server (and isn't expired)
 * it allows access to requested server recource. 
 * *
 */

const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {  

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "MK@#E3neUXNyQCB%NwPj$W_Apa=uB^^Ebkh7&vVL4v@a8JR^&?@HqSy?XCkr+XkeD^dxQWXD^$t?MbT5VxTP?uUU@PUhZ+q$MHxJBMdafehExnwgDwDvnnSSRqCPxgG!hcPRkgvj6u?ua$-S*yJM63%r9Gf2q$t-GhtP?QRgUSpdCQ5@*KL?Dzxs7mH&dhs-6_m7KzWk_vg5#8c=DS*=WA#e4&KxFet3v7_*3E@W@3B@59Ts_RwUW^CursCCJY7C9X!kyxGy-LN!T");
    req.userData = {email: decodedToken.email, userId: decodedToken.userId}; 
    next()
  } catch (error) {
    res.status(401).json({ message: 'Authentication unsuccessful!' });
  }
};
