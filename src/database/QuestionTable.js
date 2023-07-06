const { db } = require("./dbInit");

const init = async () => {
  try {
    await db.execute(`CREATE TABLE IF NOT EXISTS Questions (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  Question TEXT,
                  WithRating INT,
                  MaxRating FLOAT,
                  WithInput INT,
                  InputTittle TEXT,
                  DateUpdated TEXT
                  )`);
  } catch (error) {
    console.log("🚀 ~ file: QuestionTable.js:21 ~ init ~ error", error);
  }
};

export const INSERT_QUESTION = async (data) => {
  try {
    await init();
    const res = await db.execute(
      `INSERT INTO Questions (Question, WithRating, MaxRating, WithInput, InputTittle, DateUpdated) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.Question,
        data.WithRating,
        data.MaxRating,
        data.WithInput,
        data.InputTittle,
        new Date().toISOString(),
      ]
    );
    return { success: res };
  } catch (error) {
    console.log(
      "🚀 ~ file: QuestionTable.js:25 ~ constINSERT_QUESTION= ~ error",
      error
    );
    return { failed: error };
  }
};

export const GET_ALL_QUESTION = async (id) => {
  try {
    await init();
    if (id) {
      const res = await db.execute(`SELECT * FROM Questions WHERE id = ?`, [
        id,
      ]);
      return { success: res };
    } else {
      const res = await db.execute(`SELECT * FROM Questions`);
      return { success: res };
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: QuestionTable.js:40 ~ constGET_ALL_QUESTION= ~ error",
      error
    );
    return { failed: error };
  }
};

export const DELETE_QUESTION = async (id, deleteAll) => {
  try {
    await init();
    if (id) {
      const res = await db.execute(`DELETE FROM Questions WHERE id=?`, [id]);
    } else if (deleteAll) {
      const res = await db.execute(`DELETE FROM Questions`);
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: QuestionTable.js:60 ~ constDELETE_QUESTION= ~ error",
      error
    );
    return { failed: error };
  }
};

export const UPDATE_QUESTIONS = async (data) => {
  try {
    await init();

    const res = await db.execute(
      `UPDATE Questions SET Question=?, WithRating=?, MaxRating=?, WithInput=?, InputTittle=?, InputTittle=?  WHERE id=?`,
      [
        data.Question,
        data.WithRating,
        data.MaxRating,
        data.WithInput,
        data.InputTittle,
        new Date().toISOString(),
        data.id,
      ]
    );
    return { success: res };
  } catch (error) {
    console.log(
      "🚀 ~ file: QuestionTable.js:87 ~ constUPDATE_QUESTIONS= ~ error",
      error
    );
    return { failed: error };
  }
};
