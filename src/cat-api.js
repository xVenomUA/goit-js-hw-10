const api_key =
  'live_bKkP5sdqYhKCDOuk3F9zZUnhE0OowjsU0wDLGPCIIPurZptzPaUesVO0tQ9QBS2v';
function fetchBreeds(URL_BREED) {
  return fetch(URL_BREED, {
    headers: {
      'x-api-key': api_key,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error('Mistake');
    }
    return response.json();
  });
}
export { fetchBreeds };
