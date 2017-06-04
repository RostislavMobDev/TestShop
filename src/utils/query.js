import {
  API_QUERY,
  API_IMAGES,
  REGISTER,
  LOGIN,
  PRODUCTS,
  REVIEWS
} from '../constants/config';

export async function loginQuery(username, password) {
  try {
    const userData = {
      "username": username,
      "password": password
    }
    let response = await fetch(`${API_QUERY}${LOGIN}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    let responseJson = false; 
    try {
      responseJson = await response.json();
    } catch (error) {
      return false;
    }
    return responseJson;
  } catch(error) {
    console.log('error ', error);
  }
}

export async function registrationQuery(username, password) {
  try {
    const userData = {
      "username": username,
      "password": password
    }
    let response = await fetch(`${API_QUERY}${REGISTER}`, {
      method: 'POST',
      headers: {  
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    let responseJson = false;
    try {
      responseJson = await response.json();
    } catch (error) {
      console.log('Error ', error);
      return false;
    }
    return responseJson;
  } catch(error) {
    console.log('Resfd', error);
  }
}

export async function productsQuery(token) {
  try {
    let response = await fetch(`${API_QUERY}${PRODUCTS}`, {
      method: 'GET',
      headers: {  
        Authorization: `${token}`,
      }, 
    });
    let responseJson = false;
    try {
      responseJson = await response.json();
    } catch (error) {
      return false;
    }
    return responseJson;
  } catch(error) {
    console.log(error);
  }
}

export async function postReviewQuery(token, product_id, data) {
  try {
    let response = await fetch(`${API_QUERY}${REVIEWS}${product_id}`, {
      method: 'POST',
      headers: {  
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    });
    let responseJson = false;
    try {
      responseJson = await response.json();
    } catch (error) {
      return false;
    }
    return responseJson;
  } catch(error) {
    console.log(error);
  }
}

export async function getReviewQuery(token, product_id) {
  try { 
    let response = await fetch(`${API_QUERY}${REVIEWS}${product_id}`, {
      method: 'GET',
      headers: {  
        Authorization: token,
      }, 
    });
    let responseJson = false;

    try {
      responseJson = await response.json();
    } catch (error) {
      return false;
    }
    return responseJson;
  } catch(error) {
    console.log(error);
  }
}