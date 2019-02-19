var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  userId: {
    type: String,
    unique: true,
    trim: true
  },
  _id: {
    type: Schema.ObjectId,
    unique: true,
    trim: true
  },
  userName: String,
  password: {
    type: String,
    required: true
  },
  lastLogin: Number,
  registeredAt: Number,
  updatedAt: Number,
  verifyToken: String
})

// authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return callback(err)
    } else if (!user) {
      err = new Error('User not found.')
      err.status = 401
      return callback(err)
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return callback(err)
      }
      if (result === true && user.status === 'ACTIVATED') {
        User.findOneAndUpdate({email: email}, {lastLogin: Date.now()}, (err, user) => {
          if (err) {
            console.log('update last login failed')
          }
        })
        return callback(null, user)
      } else {
        return callback()
      }
    })
  })
}
// resetPassword input against database
UserSchema.statics.resetPassword = function (verifyToken, password, callback) {
  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      console.log(err)
    }
    User.update({verifyToken: verifyToken}, {password: hash.toString()}, (err, successNum) => {
      if (err) {
        console.log(err)
        callback(err)
      }
      callback()
    })
  })
}

UserSchema.post('findOneAndUpdate', function (doc) {
  User.update({_id: mongoose.Types.ObjectId(doc.userId)}, {updatedAt: Date.now()}, (err, user) => {
    if (err) {
      console.log(err)
    }
  })
})

// hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this
  var id = new mongoose.mongo.ObjectId()
  user._id = id
  user.userId = id
  user.userType = 'RECRUITER'
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})

var User = mongoose.model('User', UserSchema)
module.exports = User
