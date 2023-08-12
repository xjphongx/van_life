import bcrypt from "bcrypt"

export function hashPassword(password){
  //return a Promise to hash the password
  return new Promise((resolve, reject)=>{
    bcrypt.genSalt(10,(err, salt)=>{
      if(err){//reject if there is an error with the salt generation
        reject(err)
      }
      //hash password with salt, and passes it into a function to reject or resolve the promise
      bcrypt.hash(password, salt, (err,hash)=>{
        if(err){
          reject(err)
        }
        resolve(hash)//This gets returned as a resolved promise
      })
    })
  })
}

//compare the two passwords to see if it matches
export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password,hashedPassword)
}