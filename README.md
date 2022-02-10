# eamisAutoClicker

> NKU EAMIS AutoClicker 南开大学教务系统选课抢课脚本

## 如何使用

1. 打开 [`clicker.js`](./blob/master/clicker.js) ，将代码复制或git clone到本地。
2. 仔细阅读开头的注释，修改候选课程列表。
3. 复制修改后的代码。
4. 打开浏览器，进入eamis教务系统的选课页面，按下F12（有些电脑需要Fn+F12）打开浏览器的开发人员工具。
   ![F12在这里](img/keyboard.png)
5. 在开发人员工具顶端找到控制台标签，点击切换过去。
   ![控制台在这里](img/console.png)
6. 在控制台粘贴代码，然后回车。
7. 挂着，别关浏览器，脚本会运行到所有要抢的课都成功后才会结束。

## 注意
- 建议使用 `Chrome` 或 `Firefox` 或 `Edge` 浏览器！！！ 使用其他浏览器不保证能正常运行
- 每次尝试抢哪个课的哪个分组由随机数确定，如果此课无分组,输出时会显示undefined，是正常的
- sleepTime由随机数确定，如果你想让刷新频率更快，修改cliker.js:16即可，但是请自觉调低频率，不要给学校服务器带来过多压力。
- 所有课程均抢到后才有窗口提示。抢到其中某一门课只会在console输出一条成功的log
- 抢到课后不会在课表中立即显示出来，需要刷新选课页面

## LOG
- 2022.02.10 自动获取当前选课页面的profileId，面向无代码经验的使用者优化了注释和使用说明
- 2021.05.13 重新格式化代码，修改了一些不太合理的写法
- 2021.01.14 2021春季学期正选
- 2020.08-30 2020年秋季学期正选
- 2020.01.10 抢多个课程的时候，从每次随机选一个，变成轮询列表中没选到的课程。
- 2020.01.08 2019-2020学年度第二学期正选
- 2019.06.19 2019-2020学年度第一学期正选
- 2019.06.13 2019-2020学年度第一学期预选
- 2019.02.27 profileId改为18-19第二学期第二次补退选
- 2019.02.22 现在可以一次抢多个课的多个不同分组了
- 2019.02.19 现在可以一次抢两个课了；profileId改为18-19第二学期补退选；sleeptime现在由随机数决定，此功能由 lost222 的 pull request 实现
- 2019.01.19 First Editon，只支持抢一个课的单一分组
