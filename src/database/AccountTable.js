const { db } = require("./dbInit");

const recover = [
  "TAGBALAYHxarb1v1doRKybhbakdzb6bfq714dQe8ZwE3",
  "TAGBALAYASofRZ0l1q83S4Xui6I38c051b1U4dW7dxa8",
  "TAGBALAY8OZefjIWex9z0UdF5A5Z52aVsN3g097aa0ba",
  "TAGBALAYGob5IeeZ804di0Xmb0dXh2hjardAEdWK7dg1",
  "TAGBALAYoce91p0ZdcfiD8a00dKR71d3W4Hqh3C766a4",
  "TAGBALAY2a8DjZEe8PIBU84bcbHN9l370dCANbVaTIle",
];

const init = async () => {
  try {
    await db.execute(`CREATE TABLE IF NOT EXISTS Accounts (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  uid TEXT NOT NULL UNIQUE,
                  email TEXT NOT NULL,
                  password TEXT
                  )`);
  } catch (error) {
    console.error("[AccountTable DB ERROR]", error.message);
  }

  try {
    const res = await db.execute(
      `INSERT INTO Accounts (uid, email, password) VALUES (?, ?, ?)`,
      [recover[0], "developer", "TagbalayDeveloper2022!"]
    );
    const testingAcc = await db.execute(
      `INSERT INTO Accounts (uid, email, password) VALUES (?, ?, ?)`,
      [recover[1], "admin", "TagbalayAdmin2022!"]
    );
    const test = await db.execute(
      `INSERT INTO Accounts (uid, email, password) VALUES (?, ?, ?)`,
      [recover[2], "admin", "123!"]
    );
  } catch (error) {}
};

export const INSERT_ADMIN_ACCOUNT = async (data) => {
  try {
    await init();
    const res = await db.execute(
      `INSERT INTO Accounts (uid, email, password) VALUES (?, ?, ?)`,
      [data.uid.trim(), data.email.trim(), data.password.trim()]
    );
    return { success: res };
  } catch (error) {
    console.error("[INSERT_ADMIN_ACCOUNT DB ERROR]", error.message);
    return { failed: error };
  }
};

export const ADMIN_LOGIN = async (data) => {
  try {
    await init();
    const res = await db.execute(
      `SELECT * FROM Accounts WHERE email=? AND password=?`,
      [data.email, data.password]
    );
    if (res?.rows.length > 0) {
      return { success: res };
    } else {
      return { failed: { error: "Incorrect username or password" } };
    }
  } catch (error) {
    console.log("[ADMIN_LOGIN DB ERROR]", error.message);
    return { failed: error };
  }
};

export const CHECK_ADMIN_QR = async (data) => {
  try {
    await init();
    const res = await db.execute(`SELECT * FROM Accounts WHERE uid=?`, [
      data.qr,
    ]);
    if (res?.rows.length > 0) {
      return { success: res };
    } else {
      return { failed: { error: "Not an Admin" } };
    }
  } catch (error) {
    console.log("[LOGIN_QR DB ERROR]", error.message);
    return { failed: error };
  }
};

export const GET_ALL_ADMIN_ACCOUNTS = async () => {
  try {
    await init();
    const res = await db.execute(`SELECT * FROM Accounts`);
    return { success: res };
  } catch (error) {
    console.error("[GET_ALL_ADMIN_ACCOUNTS DB ERROR]", error.message);
    return { failed: error };
  }
};

export const LOGIN_QR = async (data) => {
  try {
    await init();
    const res = await db.execute(
      `SELECT * FROM Accounts WHERE uid=? AND password=?`,
      [data.uid, data.password]
    );
    if (res?.rows.length > 0) {
      return { success: res };
    } else {
      return { failed: { error: "QR login failed" } };
    }
  } catch (error) {
    console.log("[LOGIN_QR DB ERROR]", error.message);
    return { failed: error };
  }
};

export const DELETE_ALL_ADMIN_ACCOUNTS = async () => {
  try {
    await init();

    const res = await db.execute(`DELETE FROM Accounts`);
  } catch (error) {
    return { failed: error };
  }
};
