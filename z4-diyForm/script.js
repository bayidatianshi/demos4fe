//
window.onload = function () {
  // 处理下拉框：selectOptionData可以从接口获取
  let selectOptionData = ["选项A", "选项B", "选项C", "选项D"];
  selectHandle($(".select-container"), selectOptionData);

  // 监听页面大小变化事件
  window.onresize = function () {
    setHeight();
  };

  // 监听pc端键盘输入事件
  let isMobile = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
  if (!isMobile) {
    window.addEventListener("keydown", (e) => {
      // 字母键的keyCode值在65到90之间
      if (e.keyCode >= 65 && e.keyCode <= 90) {
        console.log(e.key);
      }
    });
  }

  //
};

// 辅助函数
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
function handleClass(el) {
  // 自定函数链式调用，实现el.remove().addClass()的写法
  let methods = {
    addClass: (c) => {
      el.classList.add(c);
      return methods;
    },
    removeClass: (c) => {
      el.classList.remove(c);
      return methods;
    },
  };
  return methods;
}

// 功能函数

// 页面大小发生变化时
function setHeight() {
  // 例如 $('.content').style.height = (window.innerHeight - $('.main .header').offsetHeight) + 'px';
}

// 下拉框
function selectHandle(selectContainer, optData) {
  // 该下拉框默认为块级元素，可以通过设置display让下拉框变成行内块元素
  // selectContainer.style.display = 'inline-block';

  // 获取DOM：这种写法要求下拉框元素的相对位置不能乱动
  let selectTitle = selectContainer.firstElementChild;
  let selectUl = selectContainer.lastElementChild;
  let selectContent = selectTitle.firstElementChild;
  let selectIcon = selectTitle.lastElementChild;
  // 支持通过数据渲染下拉选项
  Array.isArray(optData) && optData.length && renderSelectOption(optData);
  function renderSelectOption(optData) {
    let lis = "";
    optData.forEach((text) => {
      lis += `<li class="select-li">${text}</li>`;
    });
    selectUl.innerHTML = lis;
  }
  // 事件监听：改变class触发视图更新
  let selectFlag = false;
  let selectOptionArr = [].slice.call(selectUl.children); // 类数组转数组，也可以用Array.from()
  let showSelect = (show) => {
    selectUl.style.display = show ? "block" : "none";
    handleClass(selectIcon)[show ? "addClass" : "removeClass"]("select-icon-up");
  };
  selectTitle.onclick = () => {
    selectFlag = !selectFlag;
    showSelect(selectFlag);
  };
  selectContent.onblur = () => {
    // 可以通过设置tabindex属性让div也能触发失焦事件(点击该元素会聚焦，再点击其他元素就失焦)
    // 由于可能是通过点击下列选项触发的失焦，这时候，失焦先触发>下列框隐藏>下列选项的点击事件无法触发
    // 所以要把失焦的处理变成异步操作，并且等待一段时间，保证让下列选项的点击事件先触发
    setTimeout(() => {
      selectFlag = false;
      showSelect(selectFlag);
    }, 300);
  };
  selectOptionArr.forEach((item, index) => {
    item.onclick = function () {
      selectFlag = false;
      selectContent.textContent = item.textContent;
      selectOptionArr
        .filter((option) => option !== item)
        .forEach((otherItem) => {
          otherItem.classList.remove("selected-li");
        });
      item.classList.add("selected-li");
      showSelect(false);
    };
  });
}

// toggle按钮：通常用来控制显示隐藏导航栏，特别是移动端适配情况下默认隐藏导航栏
$(".toggle").addEventListener(
  "click",
  () => {
    $(".toggle").classList.toggle("toggle-active");
  },
  false
);

// api组件
$(".register-button").onclick = function () {
  // 弹窗message
  $message.info("欢迎使用消息弹窗!");

  // 对话框modal
  ewConfirm({
    title: "注册用户",
    content: `
            <p>向我们注册以获得更多信息，更多支持等</p>
            <form class="modal-form">
                <div>
                    <label>姓名:</label>
                    <input type="text" placeholder="请输入姓名">
                </div>
                <div>
                    <label>邮箱:</label>
                    <input type="email" placeholder="请输入邮箱">
                </div>
                <div>
                    <label>密码:</label>
                    <input type="password" placeholder="请输入密码">
                </div>
                <div>
                    <label>确认密码:</label>
                    <input type="password" placeholder="请输入密码">
                </div>
            </form>
        `,
    showCancel: true,
    sureText: "注册",
    cancelText: "取消注册",
    footerAlign: "center",
    isClickModal: false,
    sure: (context) => {
      context.close(1000);
      // 还可以写更加复杂的逻辑实现更多功能
    },
  });
};
