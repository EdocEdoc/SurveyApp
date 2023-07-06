import { uid } from "uid";

function makeId(length, added) {
  var result = "";
  var characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789${added}`;
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const generateUid = () => {
  return `SURVEY${makeId(12, uid(36))}`;
};
