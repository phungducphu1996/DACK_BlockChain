/**
 * Created by Day on 10/05/2017.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var WalletSchema = Schema(
 walletid: {
    type: String,
    unique: true,
    required: true
  },
  balance: Number,
  privateKey: String,
  userId: String,
  publicKey: String
);

//Export model
module.exports = mongoose.model('Wallet', WalletSchema);