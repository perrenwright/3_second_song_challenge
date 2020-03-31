var local_token = '';

function setLocalToken(new_token) {
  local_token = new_token;
}

function getLocalToken() {
  return local_token;
}

export { setLocalToken, getLocalToken };
