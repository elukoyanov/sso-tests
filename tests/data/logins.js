module.exports = {
  "userCorrect": {
    "phone": process.env.TEST_PHONE_NUMBER,
    "password": process.env.TEST_PASSWORD,
  },
  "userWithWrongPass": {
    "phone": process.env.TEST_PHONE_NUMBER,
    "password": "wrong password",
  }
}
