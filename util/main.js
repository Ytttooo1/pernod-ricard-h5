// 加密手机号
function EncryptedPhone(phone = "") {
  let newPhone = phone.split("")
  newPhone.splice(3,4,"****")
  newPhone = newPhone.join("")
  return newPhone
}


export default{
  EncryptedPhone
}