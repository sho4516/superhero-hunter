const CryptoJS = require("crypto-js");

const generateHash = (publicKey, privateKey) => {
  const ts = new Date().getTime().toString();

  const toHash = ts + privateKey + publicKey;

  const hash = CryptoJS.MD5(toHash).toString();

  const authData = {
    hash: hash,
    timestamp: ts,
  };

  return authData;
};

export default generateHash;
