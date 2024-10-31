import axios from "axios";

const updateData = async (type, id, updatedData) => {
  try {
    const response = await axios.put(
      `http://localhost:5002/api/${type}/update/${id}`,
      updatedData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Server responded with status: ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      // الخادم رد بحالة خارج نطاق 2xx
      throw new Error(`Server error: ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      // لم يتم استلام رد من الخادم
      throw new Error('No response received from server');
    } else {
      // حدث خطأ أثناء إعداد الطلب
      throw new Error(`Error: ${error.message}`);
    }
  }
};

export default updateData;