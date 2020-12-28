module.exports = (response, message, aditionalData, success = true) => {
  return response.send({
    success,
    message: message || 'success',
    ...aditionalData
  })
}
