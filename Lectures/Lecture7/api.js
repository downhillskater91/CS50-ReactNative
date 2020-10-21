const processContact = (contact) => ({
  name: `${contact.name.first} ${contact.name.last}`,
  phone: contact.phone,
});

export const fetchContacts = async () => {
  const response = await fetch('https://randomuser.me/api?results=50&nat=us');
  const {results} = await response.json();

  return results.map((result) => processContact(result));
}

export const login = async (username, password) => {
  const response = await fetch('http://192.168.0.14:8000', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
      })
    });

  // Log the user in if the User/Pass is valid
  if(response.ok) {
    return true;
  }

  // Response was not OK, so return the error
  const errMessage = await response.text();
  throw new Error(errMessage);
}