// ==UserScript==
// @name         Gitlab issue board width
// @version      0.3
// @description  展开时宽度 250px，折叠时宽度 55px
// @author       Sang
// @match        https://gitlab.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 定义展开和折叠时的宽度
    const expandedWidth = '250px';
    const collapsedWidth = '55px';

    // 处理所有看板列表宽度的函数
    function setBoardListWidths() {
        // 查找所有具有 data-testid="board-list" 属性的元素
        const elements = document.querySelectorAll('[data-testid="board-list"]');

        elements.forEach(element => {
            // 检查是否为折叠状态
            if (element.classList.contains('is-collapsed')) {
                element.style.width = collapsedWidth;
            } else {
                // 展开状态
                element.style.width = expandedWidth;
            }
        });
    }

    // 初始执行
    setBoardListWidths();

    // 使用 MutationObserver 监听 DOM 变化和属性变化
    const observer = new MutationObserver(mutations => {
        let shouldProcess = false;

        mutations.forEach(mutation => {
            // 监听属性变化（类名变化，特别是 is-collapsed 类）
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (mutation.target.matches && mutation.target.matches('[data-testid="board-list"]')) {
                    shouldProcess = true;
                }
            }
            // 监听子节点变化（新元素添加）
            else if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        // 检查被添加的节点本身是否匹配
                        if (node.matches && node.matches('[data-testid="board-list"]')) {
                            shouldProcess = true;
                        }
                        // 检查被添加节点内部的子元素是否匹配
                        const subElements = node.querySelectorAll ? node.querySelectorAll('[data-testid="board-list"]') : [];
                        if (subElements.length > 0) {
                            shouldProcess = true;
                        }
                    }
                });
            }
        });

        // 如果有相关变化，重新处理所有元素
        if (shouldProcess) {
            setTimeout(setBoardListWidths, 0);
        }
    });

    // 开始观察 document.body 的变化
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
    });

    // 监听点击事件，因为用户可能通过点击来展开/折叠
    document.addEventListener('click', function(event) {
        // 如果点击的是展开/折叠按钮
        if (event.target.closest('[data-testid="board-title-caret"]')) {
            // 等待 DOM 更新后重新应用宽度设置
            setTimeout(setBoardListWidths, 100);
        }
    });
})();
