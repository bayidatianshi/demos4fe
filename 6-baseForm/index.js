/**
 *  表单验证功能
 */
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
const form = $('.form');
const input = $$('.form input');
const submitBtn = $('.submit-btn');
// 在HTML元素的原型上绑定一个判断是否有对应class的方法，通过前后加空格保证匹配到的是整个class而不是class的一部分
// 其实该方法并不是必要的，因为有el.classList.contains()内置函数
HTMLElement.prototype.hasClass = function (className) {
    return new RegExp(" " + className + " ").test(' ' + this.className + ' ');
}
/**
 * 显示成功
 * @param {*} el 
 */
function showSuccess(el) {
    let parentElement = el.parentElement;
    if (parentElement.hasClass('error')) {
        parentElement.classList.replace('error', 'success');
    } else {
        parentElement.classList.add('success');
    }
    el.nextElementSibling.style.visibility = 'hidden';
}
/**
 * 显示错误
 *
 * @param {*} el
 * @param {*} msg
 */
function showError(el, msg) {
    let parentElement = el.parentElement;
    if (parentElement.hasClass('success')) {
        parentElement.classList.replace('success', 'error');
    } else {
        parentElement.classList.add('error');
    }
    el.nextElementSibling.style.visibility = 'visible';
    el.nextElementSibling.innerHTML = msg;
}
/**
 * 获取字段名
 * @param {*} el
 * @returns
 */
function getFieldName(el) {
    // 感觉字段名应该存到表单项里面，而不是去找表单项对应的标签，而且这种找法要求标签一定是表单项的前一个兄弟元素
    let text = el.previousElementSibling.innerHTML;
    return text.slice(0, text.indexOf(':'));
}
/**
 * 检查不能输入为空
 * @param {*} el 
 */
function allCheck(el) {
    return new Promise(resolve => {
        // 因为传过来的el是类数组，要用call调用slice然后复制，其实也可以改成Array.from(el).forEach
        [].slice.call(el).forEach((item, index) => {
            checkDetail(item, index);
        });
        // 这样写的话，下面的resolve都会执行，然后检验表单的逻辑留到了回调函数
        // 更合理的做法应该是在该promise里面完成整体检验，然后处理resolve或reject
        resolve();
    })
}
/**
 * 详情检查
 * @param {*} item 
 * @param {*} index 
 */
function checkDetail(item, index) {
    // 这种case索引值的方式不太好，如果在中间添加了一个表单项，要修改后续代码，可以改成case 字段名
    if (!item.value.trim()) {
        showError(item, getFieldName(item) + '不能为空!');
    } else {
        showSuccess(item);
        switch (index) {
            case 0:
                checkLength(item, 3, 20);
                break;
            case 1:
                let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (regEmail.test(item.value)) {
                    showSuccess(item);
                } else {
                    showError(item, '输入的' + getFieldName(item) + '格式有误!');
                }
                break
            case 2:
                checkLength(item, 6, 20);
                break;
            case 3:
                checkLength(item, 6, 20);
                break;
        }
    }
}
/**
 * 检查输入的字符数
 * @param {*} el 
 * @param {*} min 
 * @param {*} max 
 */
function checkLength(el, min, max) {
    if (el.value.length < min) {
        showError(el, '输入的' + getFieldName(el) + '字符长度不能低于' + min + '个');
    } else if (el.value.length > max) {
        showError(el, '输入的' + getFieldName(el) + '字符长度不能高于' + max + '个');
    } else {
        showSuccess(el);
    }
}
// 点击提交
submitBtn.addEventListener('click', function () {
    allCheck(input).then(_ => {
        if (form.querySelectorAll('.success').length === form.querySelectorAll('.form-control').length) {
            if(input[2].value === input[3].value){
                // ewConfirm是一种API组件，详情见modal.js
                ewConfirm({
                    title:"温馨提示",
                    content:"验证成功",
                    showCancel:false
                });
            }else{
                showError(input[3],'两次密码不一致');
            }
        }
    })
}, false);