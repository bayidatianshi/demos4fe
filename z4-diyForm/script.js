window.onload = function () {
  // selectOptionData可以从接口获取
  let selectOptionData = ["选项A", "选项B", "选项C", "选项D"];
  selectHandle($(".select-container"), selectOptionData);
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
