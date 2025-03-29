const emailjs = require('@emailjs/browser');

exports.handler = async function(event, context) {
  // Kiểm tra phương thức
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Phương thức không được hỗ trợ' })
    };
  }
  
  try {
    const { message } = JSON.parse(event.body);
    
    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Vui lòng nhập nội dung phản hồi' })
      };
    }
    
    // Sử dụng biến môi trường để lưu trữ các khóa API
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      { to_email: 'nghthai02@gmail.com', message },
      process.env.EMAILJS_PUBLIC_KEY
    );
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Phản hồi đã được gửi thành công' })
    };
  } catch (error) {
    console.log('Lỗi khi gửi email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Đã xảy ra lỗi khi gửi phản hồi' })
    };
  }
};