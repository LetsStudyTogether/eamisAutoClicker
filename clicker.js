// 把下面的数组元素修改为你想选的课程序号（不是课程代码，是选课页面最左侧那一列的数值）
// 注意格式，每个课程序号用英文单引号括起来，多个课程之间用英文逗号分割。比如这里是要选课0416文科概率统计和0428高等数学（B类）II
const courseId = ['0416', '0428'];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function mainFunction(courseId) {
  const eamisUrl = window.location.href
  const profileId = eamisUrl.substring(eamisUrl.search(/[0-9]+/), eamisUrl.length)
  
  let idInd = 0;
  while (courseId.length > 0) {
    // 如有需要，在这里修改随机等待时长的计算规则（不建议修改）
    const sleepTime = Math.ceil(Math.random() * 200) + 300;
    const id = courseId[idInd++];
    idInd %= courseId.length;
    $("input[name='electableLesson.no']").val(id);
    $('#electableLessonList_filter_submit').click();
    const targetId = $("tr[class='electGridTr electGridTr-even']").attr('id');
    if (targetId == null) {
      courseId.splice($.inArray(id, courseId), 1);
      console.log(`Failed... Id: ${id}, course unavailable!`);
      continue;
    }
    const shortId = targetId.substr(6, 6);
    const expLesson = `#expLessonGroups_${targetId.substr(6, 6)}`;
    let groupId;
    if ($(expLesson).attr('value')) {
      groupId = $(expLesson).attr('value');
      const expLessonArray = document.getElementsByName(`expLessonGroups_${targetId.substr(6, 6)}`);
      if (expLessonArray.length > 1) {
        const lessonRandom = Math.floor(Math.random() * expLessonArray.length);
        groupId = $(expLessonArray[lessonRandom]).attr('value');
      }
    } else {
      groupId = 'undefined';
    }
    let getData;
    $.ajax({
      type: 'POST',
      url: `http://eamis.nankai.edu.cn/eams/stdElectCourse!batchOperator.action?profileId=${profileId}`,
      data: `optype=true&operator0=${shortId}%3Atrue%3A0&lesson0=${shortId}&expLessonGroup_${shortId}=${groupId}`,
      async: false,
      dataType: 'json',
      complete: data => {
        getData = eval(data).responseText;
      },
    });
    // 其实这里不太合理，应该是用一个Promise去post请求，然后在then里面处理返回值
    // 现在这样写居然还能用纯粹是因为sleepTime设定值比较高
    await sleep(sleepTime);
    if (getData.indexOf('成功') >= 0) {
      courseId.splice($.inArray(id, courseId), 1);
      console.log(`Success! Id: ${id} Group:${groupId}`);
    } else {
      console.log(`Failed...Try again...Last try Id: ${id}, groupId: ${groupId}, Last interval: ${sleepTime}`);
    }
  }
  alert('All Succeeded!');
}

mainFunction(courseId);
