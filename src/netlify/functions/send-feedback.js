const emailjs = require('@emailjs/browser');

exports.handler = async function(event, context) {
  // Xử lý CORS cho local development
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({})
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Phương thức không được hỗ trợ' })
    };
  }
  
  try {
    const { message } = JSON.parse(event.body);
    
    if (!message) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Vui lòng nhập nội dung phản hồi' })
      };
    }
    
    console.log('Gửi email với nội dung:', message);
    console.log('Sử dụng Service ID:', process.env.EMAILJS_SERVICE_ID);
    console.log('Sử dụng Template ID:', process.env.EMAILJS_TEMPLATE_ID);

    // Kiểm tra biến môi trường có tồn tại không
    if (!process.env.EMAILJS_SERVICE_ID || !process.env.EMAILJS_TEMPLATE_ID || !process.env.EMAILJS_PUBLIC_KEY) {
      console.error('Thiếu biến môi trường cần thiết');
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Cấu hình EmailJS không đầy đủ' })
      };
    }
    
    // Sử dụng thư viện EmailJS
    const result = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      { to_email: 'nghthai02@gmail.com', message },
      process.env.EMAILJS_PUBLIC_KEY
    );
    
    console.log('Kết quả gửi email:', result);
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ success: true, message: 'Phản hồi đã được gửi thành công' })
    };
  } catch (error) {
    console.error('Lỗi chi tiết khi gửi email:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: `Đã xảy ra lỗi: ${error.message}` })
    };
  }
};