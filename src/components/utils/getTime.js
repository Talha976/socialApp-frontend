export const extractTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = padZero(date.getMinutes());
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12; 
    hours = hours ? hours : 12; 
  
    return `${hours}:${minutes} ${ampm}`;
  };
  
  function padZero(num) {
    return num.toString().padStart(2, '0');
  }
  