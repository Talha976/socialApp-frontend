
import Toaster from "../commonComponents/Toaster";


export const postData = async ({ url, formData }) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        Toaster({ status: 'error', message: data.message });
      } else {
        Toaster({ status: 'success', message: data.message });
      }
    } catch (error) {
      Toaster({ status: 'error', message: 'Server Error' });
    }
  };
export const updateData = async ({ url, formData }) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      Toaster({ status: 'error', message: data.message });
    } else {
      Toaster({ status: 'success', message: data.message });
    }
  } catch (error) {
    Toaster({ status: 'error', message: 'Server Error' });
  }
};

 
export const fetchData = async({url})=>{
  try {
    const response = await fetch(url,{
      method: 'GET',
      'content-type' : 'application/json'
    })
    const data = await response.json()
    if(response.ok){
      // setData(data)
    }
  } catch (error) {
    Toaster({ status: 'error', message: 'Server Error' });
  }
}

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const day = date.getUTCDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getUTCFullYear();

  return `${month} ${year}`;
};