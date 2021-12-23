//引入模块 nodemailer
const nodemailer = require("nodemailer");

// 验证码随机书
let code = Math.random().toString().substr(2, 4);

// 创建一个SMTP客户端配置
const config = {
  service: "QQ",
  auth: {
    // 发件人邮箱账号
    user: "2765700620@qq.com",
    //发件人邮箱的授权码 这里可以通过qq邮箱配置里面获取 并且不唯一
    pass: "cqyvycklhwljdfgh", //授权码生成之后，要等一会才能使用，否则验证的时候会报错，但是不要慌张哦
  },
};

//创建一个SMTP客户端配置对象
const transporter = nodemailer.createTransport(config);

//创建一个收件人对象
const mail = {
  // 发件人 邮箱  '昵称<发件人邮箱>'
  from: `"auto-mailer"<2765700620@qq.com>`,
  // 主题
  subject: "【auto-mailer】激活验证码",
  // 收件人 的邮箱 可以是其他邮箱 不一定是qq邮箱
  to: "qmail1474369@qq.com",
  //这里可以添加html标签
  html: `<b>您的激活验证码为：${code}, 24小时内有效，请谨慎保管。</b>`,
};

//  发送邮件 调用transporter.sendMail(mail, callback)
// transporter.sendMail(mail, function (error, info) {
//   if (error) {
//     return console.log(error);
//   }
//   transporter.close();
//   console.log("mail sent:", info.response);
// });

// 延迟发送
let delay_time = 30000; // 也可以通过计算得出
setTimeout(function () {
  transporter.sendMail(mail, function (error, info) {
    if (error) {
      return console.log(error);
    }
    transporter.close();
    console.log("mail sent:", info.response);
  });
}, delay_time);
