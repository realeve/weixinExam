var SPORT = require('./sport.js');

var exam = {
	loadComplete: false,
	total: 0, //总分
	error: [], //错误题目（原顺序）
	answerList: [], //乱序后的答案顺序
	isAnswered: [], //题目回答状态
	timeReleased: false, //时间用尽
	isStarted: false, //活动是否开始
	timeLength: 0, //启用时间限制 0为不限制
	sourceList: [], //原题目顺序
	scoresPerAnswer: 0, //每道题目分数
	isSubmit: false, //数据是否提交
	isLogin: false, //是否登录
	loginData: {}, //用户登录信息
	maxAnswerNum: 20, //最大抽取多少道题目
	answerTimes: 1, //每个用户最多回答几次
	examPaper: "cost", //试卷文件
	sportDate: "8月24日至8月31日",
	sportid: SPORT.GREATWALL,
	editAnswer: false, //允许修改答案
	curID: 0, //当前答题数
	realMatch: false, //实时提交分数，用于比赛中用户成绩获取
	showTips: false,
	lastPage: 0,
	secColor: []
};

module.exports = exam;