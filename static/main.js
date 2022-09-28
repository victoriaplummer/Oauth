const URL_PARAMS = new URLSearchParams(window.location.search); // Get the querystring (anything after the "?"") of the current URL in the browser
const TOKEN = URL_PARAMS.get('token'); // get the "token" parameter from the query string

// Show an element
const show = (selector) => {
  document.querySelector(selector).style.display = 'block';
};

// Hide an element
const hide = (selector) => {
  document.querySelector(selector).style.display = 'none';
};

if (TOKEN) {
  hide('.content.unauthorized');
  show('.content.authorized');
}