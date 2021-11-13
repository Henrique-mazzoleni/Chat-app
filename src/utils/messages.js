const generateMessage = (text, username) => {
  return {
    username,
    text,
    createdAt: new Date().getTime(),
  };
};

const generateLocationMessage = ({ latitude, longitude }, username) => {
  const url = `https://google.com/maps?q=${latitude},${longitude}`;
  return {
    username,
    url,
    createdAt: new Date().getTime(),
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage,
};
