const createRequest = async (options = {}) => {
  let url = `http://localhost:3000?method=${options.method}&id=${options.id}`;
  let response = await fetch(url, options.params);
  let result = await response.json();
  return result;
};
export default createRequest;
