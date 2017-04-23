import dialog from 'art-dialog';
import 'bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.scss';
import 'icheck/skins/all.css';
import 'icheck';
// import echarts from 'echarts';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'flatpickr';
import _ from 'lodash';

import l10n from 'flatpickr/dist/l10n/zh';
import 'flatpickr/dist/flatpickr.css';
import '../../styles/test1.scss';
import Comp1 from '../components/comp1';


$(function () {
  Comp1.output();
  const array = [1];
  const other = _.concat(array, 2, [3], [[4]]);
  console.log(other);
  const myChart = echarts.init(document.getElementById('main'));
  // 绘制图表
  myChart.setOption({
    title   : { text: 'ECharts 入门示例' },
    tooltip : {},
    xAxis   : {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis  : {},
    series : [{
      name : '销量',
      type : 'bar',
      data : [5, 20, 36, 10, 10, 20],
    }],
  });

  $('input[type=checkbox]').each(function () {
    const self = $(this);
    const label = self.next();
    // const label_text = label.text();

    label.remove();
    self.iCheck({
      checkboxClass : 'icheckbox_polaris',
      radioClass    : 'iradio_polaris',
      increaseArea  : '-10%', // optional
    });
  });

  $('#modal').on('click', () => {
    const d = dialog({
      title   : '欢迎',
      content : '欢迎使用 artDialog 对话框！',
    });
    d.show();
  });


  $('#dialog').on('click', () => {
    const d = dialog({
      title   : '欢迎',
      content : '欢迎使用 artDialog 模态框！',
    });
    d.showModal();
  });

  $('#carousel-example-generic').carousel({
    interval: 2000,
  });

  $('#demo').daterangepicker({
    showCustomRangeLabel : true,
    locale               : {
      format           : 'YYYY-MM-DD',
      separator        : ' 至 ',
      applyLabel       : '确定',
      cancelLabel      : '取消',
      fromLabel        : '从',
      toLabel          : '到',
      customRangeLabel : 'Custom',
      weekLabel        : '周',
      daysOfWeek       : [
        '日',
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
      ],
      monthNames: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ],
      firstDay: 1,
    },
    parentEl  : 'test',
    startDate : '2017-04-14',
    endDate   : '2017-04-20',
  }, function (start, end, label) {
    console.log(`New date range selected: ${start.format('YYYY-MM-DD')} to ${end.format('YYYY-MM-DD')} (predefined range: ${label})`);
  });

  $('#flatDemo').flatpickr({
    locale : l10n.zh,
    mode   : 'range',
  });
  $('body').append($('<h2>这是JS添加的文字 - Page1</h2>'));
  console.log(111);
});

