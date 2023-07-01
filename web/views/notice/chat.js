/*
 * @Description: 
 * @Version: 
 * @Author: Humbert Cheung
 * @Date: 2023-07-01 15:41:56
 * @LastEditors: [Humbert Cheung]
 * @LastEditTime: 2023-07-01 18:31:41
 * @FilePath: /spark-chat/web/views/notice/chat.js
 * Copyright (C) 2023 syzhang. All rights reserved.
 */
$(window).on("load", () => {
  let date = new Date();
  let time = dateFormat("YYYY-mm-dd HH:MM", date);
  let str = `
      <div class="item item-center"><span>${time}</span></div>
      <div class="item item-center"><span>暂无对话</span></div>
  `;
  $($(".content")[0]).append(str);
});
function send() {
  // 构造问题内容
  let words = $("#textarea").val();
  let time = dateFormat("YYYY-mm-dd HH:MM", new Date());
  let str = `
      <div class="item item-center"><span>${time}</span></div>
      <div class="item item-right">
          <div class="bubble bubble-right">${words}</div>
          <div class="avatar">
              <img src="/static/user.jpg" />
          </div>
      </div>
  `;
  $($(".content")[0]).append(str);

  // 清空问题输入框
  $("#textarea").val("");

  // 发起请求，构造答案的内容
  $.ajax({
    type: "post",
    url: "/chat",
    data: {
      question: words,
    },
    dataType: "json",
    success: (res) => {
      console.log(res);
      let str = `
              <div class="item item-center"><span>${time}</span></div>
              <div class="item item-left">
                  <div class="avatar">
                      <img src="/static/robot.png" />
                  </div>
                  <div class="bubble bubble-left">${res}</div>
              </div>
          `;
      $($(".content")[0]).append(str);
    },
    error: (err) => {
      console.log(err);
    },
  });
}
// 时间格式化函数
function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}