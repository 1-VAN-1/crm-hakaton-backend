const { Schema, model } = require("mongoose");

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  refreshToken: { type: String, required: true, unique: true },
  expireAt: { type: Date, required: true },
  ip: { type: String, required: true },
});

TokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
TokenSchema.index({ user: 1, ip: 1 }, { unique: true });

module.exports = model("Token", TokenSchema);
