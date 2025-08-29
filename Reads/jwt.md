# JWT is Handled in a Real Web App
1. Store the Token in Local Storage or Session Storage (Client-Side JavaScript)
After login, the frontend app stores the token in:

localStorage: survives page refreshes.

sessionStorage: clears when the tab is closed.

Example:
// On successful login
localStorage.setItem('token', response.token);
Then, for every request:

const token = localStorage.getItem('token');

fetch('/api/protected', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
✅ Good for single-page apps (SPA) like React, Vue, Angular.