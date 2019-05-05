const {VK} = require('vk-io');
const {Keyboard} = require('vk-io');
const vk = new VK();
const {updates} = vk;
const {api} = vk;
const cheerio = require('cheerio')
const request = require('request')
const Intl = require('intl')
const google = require('google') 
const webshot = require('webshot')
const gm = require('gm').subClass({imageMagick: true});
const fs = require('fs')
var moment = require('moment');

moment().format();

//Не трогать
const TOKEN = YOUR_TOKEN

vk.setOptions({
	token: f2a651dc27d8794f68887d7898155fc3c9e5fae45c92ebdfc0d5904a48fdee28e306170f7518332f7705a,
	pollingGroupId: 176974582,
	peer_id: 2000000001
})

//Святыня
require('https').createServer().listen(process.env.PORT || 5000).on('request', function(request, res){
	res.end('')
});




api.baseUrl = 'https://api.vk.com/method/'
updates.startPolling()

//Святыня 2
updates.use(async (context, next) => {
	if (context.is('message')) {
		const { messagePayload } = context;

		context.state.command = messagePayload && messagePayload.command
			? messagePayload.command
			: null;
	}

	await next();
});

const hearCommand = (name, conditions, handle) => {
	if (typeof handle !== 'function') {
		handle = conditions;
		conditions = [`/${name}`];
	}

	if (!Array.isArray(conditions)) {
		conditions = [conditions];
	}

	updates.hear(
		[
			(text, { state }) => (
				state.command === name
			),
			...conditions
		],
		handle
	);
};


//Команды
vk.updates.hear('/start', async(context) => {
	context.send({
		message: `Привет! 
Я - Бот, созданный специально для 5-А класса  хуй знает какой школы. К черту эту прелюдию, я могу еще долго распинаться, но вот мой список команд:
/дз - ДОМАШКА
/lesson - оповещает тебя, какой сейчас урок
/уроки - получи расписание на сегодняшний день
/game - не знаю зачем, но у меня есть игры (Я сам в шоке)
/гдз - гугли гдз и я постараюсь прислать его тебе
/insert - добавляй в бота домашку, если ты его знаешь, а другие - нет
/insert ? - справка по команде /insert
/дата - узнай дз на конкретный день
/отзыв - напиши отзыв, и Саша его увидит. ВАЖНО: отзыв анонимен, честное слово
/завтра - узнаешь расписание на завтрашний день
/неделя - расписание на всю неделю
/рожа - смехуечки
/citgen - еще одни смехуечки
/help - моя документация`})
})


hearCommand('game', async (context) => {
	await context.send({
		message: 'Вот список моих игр',
		keyboard: Keyboard.keyboard([
			[
				Keyboard.textButton({
				label: 'Шар Вероятностей',
				payload: {
					command: 'ball'
				},
				color: Keyboard.POSITIVE_COLOR
			}),
                Keyboard.textButton({
				label: 'Что-то еще...',
				payload: {
					command: 'else'
				},
				color: Keyboard.POSITIVE_COLOR
			})],
                Keyboard.textButton({
				label: 'Закрыть клавиатуру',
				payload: {
					command: 'cancel'
				},
				color: Keyboard.NEGATIVE_COLOR
			})
		],
		{
			oneTime: true
		})
	});
})

hearCommand('ball', async(context) => {
	await context.send('Как играть в эту игру? Очень просто! Ты пишешь "шанc" и свое утверждение, а я отвечаю вероятностью.\nПример:\n- шанc, что Мы - дружный класс\n- Вероятность - 100%') 
	updates.hear(/шанс/i, async(context) => {		
	var chances = new Array(6)		
  chances[0] = "Вероятность близка к нулю :("
  chances[1] = "Я считаю, что 50 на 50"
  chances[2] = "Вероятность - 100%"
  chances[3] = "Я полагаю, что вероятность близка к 100%"
  chances[4] = "Маловероятно, но шанс есть" 
  chances[5] = "Вероятность нулевая, ничего не поделать"
  var m = chances[Math.floor(Math.random() * chances.length)]
	await context.send(m)
})
})

hearCommand('else', async(context) => {
	await context.send('Раз эта кнопка у вас все еще есть, значит я страдаю от острой игровой недостаточности. Если у вас есть идеи, которые может реализовать этот бот в игровой форме - пишите Саше, он сможет :)')
})

hearCommand('cancel', async(context) => {
	await context.send('Хорошо, я выключу клавиатуру!')
})

const Time = new Date()
var Schedule = new Array(6)
Schedule[0] = new Array(6)											
Schedule[0][0] = "1. NAME_LESSON\n"
Schedule[0][1] = "2. NAME_LESSON\n"
Schedule[0][2] = "3. NAME_LESSON\n"
Schedule[0][3] = "4. NAME_LESSON\n"
Schedule[0][4] = "5. NAME_LESSON\n"
Schedule[0][5] = "6. NAME_LESSON\n"

Schedule[1] = new Array(7)
Schedule[1][0] = "1. NAME_LESSON\n"
Schedule[1][1] = "2. NAME_LESSON\n"
Schedule[1][2] = "3. NAME_LESSON\n"
Schedule[1][3] = "4. NAME_LESSON\n"
Schedule[1][4] = "5. NAME_LESSON\n"
Schedule[1][5] = "6. NAME_LESSON\n"
Schedule[1][6] = "7. NAME_LESSON\n"

Schedule[2] = new Array(7)
Schedule[2][0] = "1. NAME_LESSON\n"
Schedule[2][1] = "2. NAME_LESSON\n"
Schedule[2][2] = "3. NAME_LESSON\n"
Schedule[2][3] = "4. NAME_LESSON\n"
Schedule[2][4] = "5. NAME_LESSON\n"
Schedule[2][5] = "6. NAME_LESSON\n"
Schedule[2][6] = "7. NAME_LESSON\n"

Schedule[3] = new Array(6)
Schedule[3][0] = "1. NAME_LESSON\n"
Schedule[3][1] = "2. NAME_LESSON\n"
Schedule[3][2] = "3. NAME_LESSON\n"
Schedule[3][3] = "4. NAME_LESSON\n"
Schedule[3][4] = "5. NAME_LESSON\n"
Schedule[3][5] = "6. NAME_LESSON\n"


Schedule[4] = new Array(6)
Schedule[4][0] = "1. NAME_LESSON\n"
Schedule[4][1] = "2. NAME_LESSON\n"
Schedule[4][2] = "3. NAME_LESSON\n"
Schedule[4][3] = "4. NAME_LESSON\n"
Schedule[4][4] = "5. NAME_LESSON\n"
Schedule[4][5] = "6. NAME_LESSON\n"

Schedule[5] = new Array(6)
Schedule[5][0] = "1. NAME_LESSON\n"
Schedule[5][1] = "2. NAME_LESSON\n"
Schedule[5][2] = "3. NAME_LESSON\n"
Schedule[5][3] = "4. NAME_LESSON\n"
Schedule[5][4] = "5. NAME_LESSON\n"
Schedule[5][5] = "6. NAME_LESSON\n"


updates.hear('/завтра', async(context) => {
	if(moment().day() === 0)
	{
		context.send(`Расписание на завтра: \n ${Schedule[0].join(' ')}`)
	}
	if(moment().day() === 1)
	{
		context.send(`Расписание на завтра: \n ${Schedule[1].join(' ')}`)
	}
	if(moment().day() === 2)
	{
		context.send(`Расписание на завтра: \n ${Schedule[2].join(' ')}`)
	}
	if(moment().day() === 3)
	{
		context.send(`Расписание на завтра: \n ${Schedule[3].join(' ')}`)
	}
	if(moment().day() === 4)
	{
		context.send(`Расписание на завтра: \n ${Schedule[4].join(' ')}`)
	}
	if(moment().day() === 5)
	{
		context.send(`Расписание на завтра: \n ${Schedule[5].join(' ')}`)
	}
	if(moment().day() === 6)
	{
		context.send(`Завтра неучебный день - кайфуйте`)
	}
})


/*сonst newDay = new Date()
var greeting = new Array(4)
greeting[0] = "Итак, мои дорогие, начался новый учебный день. Я желаю вам всем хороших оценок по всем предметам, удачи :)\n Расписание на сегодня:\n"
greeting[1] = "И снова всем приветик, господа. Скучали? Я знаю, что нет. Вот вам расписание на сегодня: \n"
greeting[2] = "Шалом, дамы и пацаны. Возможно, мои ежедневные напоминая о расписании вам надоели, но я ничего поделать не могу - я создан для выполнения конкретных задач. Кстати, вот сегодняшнее расписание: \n"
greeting[3] = "Привет. Без лишних слов. Расписание на сегодня:\n"
var random_greeting = greeting[Math.floor(Math.random() * greeting.length)]
if(newDay.getHours() === 8 && newDay.getMinutes() === 00) 
{
	if(newDay.getDay() === 1)
	{
		api.messages.send({
			message: random_greeting + Schedule[0],
			peer_id: 2000000001
		})
	}
	if(newDay.getDay() === 2)
	{
		api.messages.send({
			message: random_greeting + Schedule[1],
			peer_id: 2000000001
		})
	}
	if(newDay.getDay() === 3)
	{
		api.messages.send({
			message: random_greeting + Schedule[2],
			peer_id: 2000000001
		})
	}
	if(newDay.getDay() === 4)
	{
		api.messages.send({
			message: random_greeting + Schedule[3],
			peer_id: 2000000001
		})	
	}
	if(newDay.getDay() === 5)
	{
		api.messages.send({
			message: random_greeting + Schedule[4],
			peer_id: 2000000001
		})
	}
	if(newDay.getDay() === 6)
	{
		api.messages.send({
			message: random_greeting + Schedule[5],
			peer_id: 2000000001
		})
	}
}*/

updates.hear('/lesson', async(context) => {
	//Первый урок
	for(i = 30; i < 59; i++)
	{
		if(Time.getHours() === 8 & Time.getDay() === 1 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[0][0])
		}
		break
	}
	for(i = 0; i < 10; i++)
	{
		if(Time.getHours() === 8 & Time.getDay() === 1 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[0][0])
		}
		break
	}


	//Второй урок
	for(i = 20; i < 59; i++)
	{
		if(Time.getHours() === 9 & Time.getDay() === 1 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[0][1])
		}
		break
	}
	while(i = 0)
	{
		if(Time.getHours() === 9 & Time.getDay() === 1 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[0][1])
		}
		break
	}


	//Третий урок
	for(i = 15; i < 55; i++)
	{
		if(Time.getHours() === 10 & Time.getDay() === 1 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[0][2])
		}
		break
	}


	//Четвертый урок
	for(i = 15; i < 55; i++)
	{
		if(Time.getHours() === 11 & Time.getDay() === 1 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[0][3])
		}
		break
	}


	//Пятый урок
	for(i = 10; i < 50; i++)
	{
		if(Time.getHours() === 12 & Time.getDay() === 1 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[0][4])
		}
		break
	}


	//Шестой урок
	for(i = 10; i < 50; i++)
	{
		if(Time.getHours() === 13 & Time.getDay() === 1 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[0][5])
		}
		break
	}


	//Седьмой урок
	for(i = 10; i < 50; i++)
	{
		if(Time.getHours() === 14 & Time.getDay() === 1 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[0][6])
		}
		break
	}





	//Первый урок
	for(i = 30; i < 59; i++)
	{
		if(Time.getHours() === 8 & Time.getDay() === 2 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[1][0])
		}
		break
	}
	for(i = 0; i < 10; i++)
	{
		if(Time.getHours() === 8 & Time.getDay() === 2 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[1][0])
		}
		break
	}


	//Второй урок
	for(i = 20; i < 59; i++)
	{
		if(Time.getHours() === 9 & Time.getDay() === 2 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[1][1])
		}
		break
	}
	while(i = 0)
	{
		if(Time.getHours() === 9 & Time.getDay() === 2 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[1][1])
		}
		break
	}


	//Третий урок
	for(i = 15; i < 55; i++)
	{
		if(Time.getHours() === 10 & Time.getDay() === 2 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[1][2])
		}
		break
	}


	//Четвертый урок
	for(i = 15; i < 55; i++)
	{
		if(Time.getHours() === 11 & Time.getDay() === 2 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[1][3])
		}
		break
	}


	//Пятый урок
	for(i = 10; i < 50; i++)
	{
		if(Time.getHours() === 12 & Time.getDay() === 2 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[1][4])
		}
		break
	}


	//Шестой урок
	for(i = 10; i < 50; i++)
	{
		if(Time.getHours() === 13 & Time.getDay() === 2 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[1][5])
		}
		break
	}


	//Седьмой урок
	for(i = 10; i < 50; i++)
	{
		if(Time.getHours() === 14 & Time.getDay() === 2 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[1][6])
		}
		break
	}

	



	//Первый урок
	for(i = 30; i < 59; i++)
	{
		if(Time.getHours() === 8 & Time.getDay() === 3 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[2][0])
		}
		break
	}
	for(i = 0; i < 10; i++)
	{
		if(Time.getHours() === 8 & Time.getDay() === 3 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[2][0])
		}
		break
	}


	//Второй урок
	for(i = 20; i < 59; i++)
	{
		if(Time.getHours() === 9 & Time.getDay() === 3 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[2][1])
		}
		break
	}
	while(i = 0)
	{
		if(Time.getHours() === 9 & Time.getDay() === 3 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[2][1])
		}
		break
	}


	//Третий урок
	for(i = 15; i < 55; i++)
	{
		if(Time.getHours() === 10 & Time.getDay() === 3 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[2][2])
		}
		break
	}


	//Четвертый урок
	for(i = 15; i < 55; i++)
	{
		if(Time.getHours() === 11 & Time.getDay() === 3 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[2][3])
		}
		break
	}


	//Пятый урок
	for(i = 10; i < 50; i++)
	{
		if(Time.getHours() === 12 & Time.getDay() === 3 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[2][4])
		}
		break
	}


	//Шестой урок
	for(i = 10; i < 50; i++)
	{
		if(Time.getHours() === 13 & Time.getDay() === 3 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[2][5])
		}
		break
	}


	//Седьмой урок
	for(i = 10; i < 50; i++)
	{
		if(Time.getHours() === 14 & Time.getDay() === 3 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[2][6])
		}
		break
	}


	//Первый урок
	for(i = 30; i < 59; i++)
	{
		if(Time.getHours() === 8 & Time.getDay() === 4 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[3][0])
		}
		break
	}
	for(i = 0; i < 10; i++)
	{
		if(Time.getHours() === 8 & Time.getDay() === 4 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[3][0])
		}
		break
	}


	//Второй урок
	for(i = 20; i < 59; i++)
	{
		if(Time.getHours() === 9 & Time.getDay() === 4 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[3][1])
		}
		break
	}
	while(i = 0)
	{
		if(Time.getHours() === 9 & Time.getDay() === 4 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[3][1])
		}
		break
	}


	//Третий урок
	for(i = 15; i < 55; i++)
	{
		if(Time.getHours() === 10 & Time.getDay() === 4 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[3][2])
		}
		break
	}


	//Четвертый урок
	for(i = 15; i < 55; i++)
	{
		if(Time.getHours() === 11 & Time.getDay() === 4 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[3][3])
		}
		break
	}


	//Пятый урок
	for(i = 10; i < 50; i++)
	{
		if(Time.getHours() === 12 & Time.getDay() === 4 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[3][4])
		}
		break
	}


	//Шестой урок
	for(i = 10; i < 50; i++)
	{
		if(Time.getHours() === 13 & Time.getDay() === 4 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[3][5])
		}
		break
	}


	//Седьмой урок
	for(i = 10; i < 50; i++)
	{
		if(Time.getHours() === 14 & Time.getDay() === 4 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[3][6])
		}
		break
	}





	//Первый урок
	for(i = 30; i < 59; i++)
	{
		if(Time.getHours() === 8 & Time.getDay() === 5 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[4][0])
		}
		break
	}
	for(i = 0; i < 10; i++)
	{
		if(Time.getHours() === 8 & Time.getDay() === 5 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[4][0])
		}
		break
	}


	//Второй урок
	for(i = 20; i < 59; i++)
	{
		if(Time.getHours() === 9 & Time.getDay() === 5 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[4][1])
		}
		break
	}
	while(i = 0)
	{
		if(Time.getHours() === 9 & Time.getDay() === 5 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[4][1])
		}
		break
	}


	//Третий урок
	for(i = 15; i < 55; i++)
	{
		if(Time.getHours() === 10 & Time.getDay() === 5 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[4][2])
		}
		break
	}


	//Четвертый урок
	for(i = 15; i < 55; i++)
	{
		if(Time.getHours() === 11 & Time.getDay() === 5 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[4][3])
		}
		break
	}


	//Пятый урок
	for(i = 10; i < 50; i++)
	{
		if(Time.getHours() === 12 & Time.getDay() === 5 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[4][4])
		}
		break
	}


	//Шестой урок
	for(i = 10; i < 50; i++)
	{
		if(Time.getHours() === 13 & Time.getDay() === 5 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[4][5])
		}
		break
	}


	//Седьмой урок
	for(i = 10; i < 50; i++)
	{
		if(Time.getHours() === 14 & Time.getDay() === 5 & Time.getMinutes(i)) 
		{
			context.send('В данный момент проходит ' + Schedule[4][6])
		}
		break
	}


//Первый урок
for(i = 30; i < 59; i++)
{
	if(Time.getHours() === 8 & Time.getDay() === 6 & Time.getMinutes(i)) 
	{
		context.send('В данный момент проходит ' + Schedule[5][0])
	}
	break
}
for(i = 0; i < 10; i++)
{
	if(Time.getHours() === 8 & Time.getDay() === 6 & Time.getMinutes(i)) 
	{
		context.send('В данный момент проходит ' + Schedule[5][0])
	}
	break
}


//Второй урок
for(i = 20; i < 59; i++)
{
	if(Time.getHours() === 9 & Time.getDay() === 6 & Time.getMinutes(i)) 
	{
		context.send('В данный момент проходит ' + Schedule[5][1])
	}
	break
}
while(i = 0)
{
	if(Time.getHours() === 9 & Time.getDay() === 6 & Time.getMinutes(i)) 
	{
		context.send('В данный момент проходит ' + Schedule[5][1])
	}
	break
}


//Третий урок
for(i = 15; i < 55; i++)
{
	if(Time.getHours() === 10 & Time.getDay() === 6 & Time.getMinutes(i)) 
	{
		context.send('В данный момент проходит ' + Schedule[5][2])
	}
	break
}


//Четвертый урок
for(i = 15; i < 55; i++)
{
	if(Time.getHours() === 11 & Time.getDay() === 6 & Time.getMinutes(i)) 
	{
		context.send('В данный момент проходит ' + Schedule[5][3])
	}
	break
}


//Пятый урок
for(i = 10; i < 50; i++)
{
	if(Time.getHours() === 12 & Time.getDay() === 6 & Time.getMinutes(i)) 
	{
		context.send('В данный момент проходит ' + Schedule[5][4])
	}
	break
}


//Шестой урок
for(i = 10; i < 50; i++)
{
	if(Time.getHours() === 13 & Time.getDay() === 6 & Time.getMinutes(i)) 
	{
		context.send('В данный момент проходит ' + Schedule[5][5])
	}
	break
}


//Седьмой урок
for(i = 10; i < 50; i++)
{
	if(Time.getHours() === 14 & Time.getDay() === 6 & Time.getMinutes(i)) 
	{
		context.send('В данный момент проходит ' + Schedule[5][6])
	}
	break
}

await context.send('Сейчас урока нет. Ураааааа!')
})


updates.hear('/уроки', async(context) => {
	if(moment().day() === 1)
	{
		await context.send('Расписание на сегодня:\n' + Schedule[0].join(' '))
	}
	if(moment().day() === 2)
	{
		await context.send('Расписание на сегодня:\n' + Schedule[1].join(' '))
	}
	if(moment().day() === 3)
	{
		await context.send('Расписание на сегодня:\n' + Schedule[2].join(' '))
	}
	if(moment().day() === 4)
	{
		await context.send('Расписание на сегодня:\n' + Schedule[3].join(' '))
	}
	if(moment().day() === 5)
	{
		await context.send('Расписание на сегодня:\n' + Schedule[4].join(' '))
	}
	if(moment().day() === 6)
	{
		await context.send('Расписание на сегодня:\n' + Schedule[5].join(' '))
	}
})


const url = 'https://github.com/FloydReme/bot631/blob/master/domashka.txt'
request(url, async function(error, res, body) {
	const $ = cheerio.load(body)
	const predmeti = new Array(16)
	predmeti[0] = $('#LC1').text() //English
	predmeti[1] = $('#LC4').text() //Russian
	predmeti[2] = $('#LC7').text() //Literature
	predmeti[3] = $('#LC10').text() //German
	predmeti[4] = $('#LC13').text() //French
	predmeti[5] = $('#LC16').text() //Algebra
	predmeti[6] = $('#LC19').text() //Geometry
	predmeti[7] = $('#LC22').text() //Biology
	predmeti[8] = $('#LC25').text() //Сhemistry
	predmeti[9] = $('#LC28').text() //Physics
	predmeti[10] = $('#LC31').text() //СompScience
	predmeti[11] = $('#LC34').text() //Geography
	predmeti[12] = $('#LC37').text() //Mhk
	predmeti[13] = $('#LC40').text() //History
	predmeti[14] = $('#LC43').text() //Society
	predmeti[15] = $('#LC46').text() // OBJ
	predmeti[16] = $('#LC49').text() // ДПУ Алгебра

	const Englishdz = $('#LC2').text()
	const Russiandz = $('#LC5').text()
	const Literaturedz=  $('#LC8').text()
	const Germandz = $('#LC11').text()
	const Frenchdz = $('#LC14').text()
	const Algebradz = $('#LC17').text()
	const Geometrydz = $('#LC20').text()
	const Biologydz = $('#LC23').text()
	const Physicsdz = $('#LC29').text()
	const Chemistrydz = $('#LC26').text()
	const CompSciencedz= $('#LC32').text()
	const Geographydz = $('#LC35').text()
	const Mhkdz = $('#LC38').text()
	const History_dz = $('#LC41').text()
	const Societydz = $('#LC44').text()
	const OBJdz = $('#LC47').text()
	const DPUAlgebra = $('#LC50').text()

	const line = $('#LC3').text() 

	const Monday = new Array(4)
	Monday[0] = predmeti[13] + History_dz + `\n${line}`
	Monday[1] = predmeti[1] + Russiandz + `\n${line}`
	Monday[2] = predmeti[8] + Chemistrydz + `\n${line}`
	Monday[3] = predmeti[0] + Englishdz + `\n${line}`

	const Tuesday = new Array(5)
	Tuesday[0] = predmeti[2] + Literaturedz + `\n${line}`
	Tuesday[1] = predmeti[7] + Biologydz + `\n${line}`
	Tuesday[2] = predmeti[1] + Russiandz + `\n${line}`
	Tuesday[3] = predmeti[14] + Societydz + `\n${line}`
	Tuesday[4] = predmeti[5] + Algebradz + `\n${line}`

	const Wednesday = new Array(5)
	Wednesday[0] = predmeti[6] + Geometrydz + `\n${line}`
	Wednesday[1] = predmeti[0] + Englishdz + `\n${line}`
	Wednesday[2] = predmeti[12] + Mhkdz + `\n${line}`
	Wednesday[3] = predmeti[9] + Physicsdz + `\n${line}`
	Wednesday[4] = predmeti[4] + Frenchdz + `\n${line}`

	const Thursday = new Array(5)
	Thursday[0] = predmeti[15] + OBJdz + `\n${line}`
	Thursday[0] = predmeti[9] + Physicsdz + `\n${line}`
	Thursday[1] = predmeti[10] + CompSciencedz + `\n${line}`
	Thursday[2] = predmeti[5] + Algebradz + `\n${line}`
	Thursday[3] = predmeti[13] + History_dz + `\n${line}`
	Thursday[4] = predmeti[16] + DPUAlgebra + `\n${line}`

	const Friday = new Array(4)
	Friday[0] = `\n` + predmeti[11] + Geographydz + `\n${line}`
	Friday[1] = `\n` + predmeti[2] + Literaturedz + `\n${line}`
	Friday[2] = `\n` + predmeti[1] + Russiandz + `\n${line}`
	Friday[3] = `\n` + predmeti[0] + Englishdz + `\n${line}`

	const Saturday = new Array(5)
	Saturday[0] = predmeti[5] + Algebradz + `\n${line}`
	Saturday[1] = predmeti[14] + Societydz + `\n${line}`
	Saturday[2] = predmeti[4] + Frenchdz + `\n${line}`
	Saturday[3] = predmeti[13] + History_dz + `\n${line}`
	Saturday[4] = predmeti[6] + Geometrydz + `\n${line}`
	
	const preds = new Array(17)
	preds[0] = {
		namesubj: predmeti[0],
		dz: Englishdz 
	}
	preds[1] = {
		namesubj: predmeti[1],
		dz: Russiandz
	}
	preds[2] = {
		namesubj: predmeti[2],
		dz: Literaturedz 
	}
	preds[3] = {
		namesubj: predmeti[3],
		dz: Germandz
	}
	preds[4] = {
		namesubj: predmeti[4],
		dz: Frenchdz
	}
	preds[5] = {
		namesubj: predmeti[5],
		dz: Algebradz
	}
	preds[6] = {
		namesubj: predmeti[6],
		dz: Geometrydz
	}
	preds[7] = {
		namesubj: predmeti[7],
		dz: Biologydz 
	}
	preds[8] = {
		namesubj: predmeti[8],
		dz: Chemistrydz
	}
	preds[9] = {
		namesubj: predmeti[9],
		dz: Physicsdz
	}
	preds[10] = {
		namesubj: predmeti[10],
		dz: CompSciencedz 
	}
	preds[11] = {
		namesubj: predmeti[11],
		dz: Geographydz 
	}
	preds[12] = {
		namesubj: predmeti[12],
		dz: Mhkdz
	}
	preds[13] = {
		namesubj: predmeti[13],
		dz: History_dz 
	}
	preds[14] = {
		namesubj: predmeti[14],
		dz: Societydz
	}
	preds[15] = {
		namesubj: predmeti[15],
		dz: OBJdz 
	}
	preds[16] = {
		namesubj: predmeti[16],
		dz: DPUAlgebra
	}


	const Sunday = new Array(17)
	Sunday[0] = predmeti[0] + preds[0].dz + `\n${line}`
	Sunday[1] = predmeti[1] + preds[1].dz + `\n${line}`
	Sunday[2] = predmeti[2] + preds[2].dz + `\n${line}`
	Sunday[3] = predmeti[13] + preds[13].dz + `\n${line}`
	Sunday[4] = predmeti[10] + preds[10].dz + `\n${line}`
	Sunday[5] = predmeti[7] + preds[7].dz + `\n${line}`
	Sunday[6] = predmeti[5] + preds[5].dz + `\n${line}`
	Sunday[7] = predmeti[11] + preds[11].dz + `\n${line}`
	Sunday[8] = predmeti[6] + preds[6].dz + `\n${line}`
	Sunday[9] = predmeti[14] + preds[14].dz + `\n${line}`
	Sunday[10] = predmeti[9] + preds[9].dz + `\n${line}`
	Sunday[11] = predmeti[8]+ preds[8].dz + `\n${line}`
	Sunday[12] = predmeti[12] + preds[12].dz + `\n${line}`
	Sunday[13] = predmeti[4] + preds[4].dz + `\n${line}`
	Sunday[14] = predmeti[3] + preds[3].dz + `\n${line}`
	Sunday[15] = predmeti[15] + preds[15].dz + `\n${line}`
	Sunday[16] = predmeti[16] + preds[16].dz + `\n${line}`
	
	

updates.hear(/^\/insert ([а-я.]+) (.+)/i, async(context) => {
	const Subject = new RegExp(context.$match[1],'i') 
	const homeWork = context.$match[2]
	const subjects = []
	$('td').each(function(i, elem) {
		subjects[i] = $(this).text();
	});

	//Прохожусь по всем тегам td и нахожу, есть ли там регулярка с каким-нибудь предметом, если да, то выполняю следующее:
	//Прохожусь по массиву предметов и нахожу, есть ли там совпадение с найденным предметом среди них, то делаю следующее:
	//Нахожу нужный объект с предметом и вставляю homework в dz.
	for(var j = 0; j < subjects.length; j++)
	{
		if(subjects[j].match(Subject))
		{
			for(var i = 0; i < predmeti.length; i++)
			{
				if(predmeti[i] === subjects[j])
				{
					for (var g = 0; g  < preds.length; g++)
					{
						if(predmeti[i] === preds[g].namesubj)
						{
							preds[g].dz = homeWork
							await context.send(`ВАЖНО: Главный список по команде /дз останется старым.
📌 НОВОЕ ДЗ: ${preds[g].namesubj + homeWork} 📌`) 
						}
					}	
				}
			}
		}
	}
})

var formatter = new Intl.DateTimeFormat("ru", {
	month: "long",
	day: "numeric"
});
const asks = new Array(2)
asks[0] = new RegExp(/задано/i)
asks[1] = new RegExp(/задали/i)
updates.hear(asks, async(context) => {
	await context.send({
		message: 'Я тут увидел, что кто-то из вас спрашивает ДЗ. Выберите, какой день вам нужен:',
		keyboard: Keyboard.keyboard([
			[
				Keyboard.textButton({
				label: `Понедельник`,
				payload: {
					command: 'monday'
				},
				color: Keyboard.POSITIVE_COLOR
			}),
                Keyboard.textButton({
				label: `Вторник`,
				payload: {
					command: 'tuesday'
				},
				color: Keyboard.POSITIVE_COLOR,
			}), 
			    Keyboard.textButton({
				label: `Среда`,
				payload: {
					command: 'wednesday'
				},
				color: Keyboard.POSITIVE_COLOR
			})],
			[
				Keyboard.textButton({
					label: `Четверг`,
					payload: {
						command: 'thursday'
					},
					color: Keyboard.POSITIVE_COLOR}),
				Keyboard.textButton({
					label: `Пятница`,
					payload: {
						command: 'friday'
					},
					color: Keyboard.POSITIVE_COLOR}),
				Keyboard.textButton({
					label: `Суббота`,
					payload: {
						command: 'saturday'
					},
					color: Keyboard.POSITIVE_COLOR})
				],
                Keyboard.textButton({
				label: `Закрыть клавиатуру`,
				payload: {
					command: 'cancel'
				},
				color: Keyboard.NEGATIVE_COLOR
			})
		],
		{
			oneTime: true
		})
	})

})

updates.hear('/дата', async(context) => {
	await context.send({
		message: 'Выберите, какой день вам нужен:',
		keyboard: Keyboard.keyboard([
			[
				Keyboard.textButton({
				label: `Понедельник`,
				payload: {
					command: 'monday'
				},
				color: Keyboard.POSITIVE_COLOR
			}),
                Keyboard.textButton({
				label: `Вторник`,
				payload: {
					command: 'tuesday'
				},
				color: Keyboard.POSITIVE_COLOR,
			}), 
			    Keyboard.textButton({
				label: `Среда`,
				payload: {
					command: 'wednesday'
				},
				color: Keyboard.POSITIVE_COLOR
			})],
			[
				Keyboard.textButton({
					label: `Четверг`,
					payload: {
						command: 'thursday'
					},
					color: Keyboard.POSITIVE_COLOR}),
				Keyboard.textButton({
					label: `Пятница`,
					payload: {
						command: 'friday'
					},
					color: Keyboard.POSITIVE_COLOR}),
				Keyboard.textButton({
					label: `Суббота`,
					payload: {
						command: 'saturday'
					},
					color: Keyboard.POSITIVE_COLOR})
				],
                Keyboard.textButton({
				label: `Закрыть клавиатуру`,
				payload: {
					command: 'cancel'
				},
				color: Keyboard.NEGATIVE_COLOR
			})
		],
		{
			oneTime: true
		})
	})

})

hearCommand('monday', async(context) => {
	await context.send(`
	Итак, вот домашка на понедельник
${Monday.join('\n')}`)
})

hearCommand('tuesday', async(context) => {
	await context.send(`
	Итак, вот домашка на вторник 
${Tuesday.join('\n')}`)
})

hearCommand('wednesday', async(context) => {
	await context.send(`
	Итак, вот домашка на среду 
${Wednesday.join('\n')}`)
})

hearCommand('thursday', async(context) => {
	await context.send(`
	Итак, вот домашка на четверг
${Thursday.join('\n')}`)
})

hearCommand('friday', async(context) => {
	await context.send(`
	Итак, вот домашка на пятницу
${Friday.join('\n')}`)
})

hearCommand('saturday', async(context) => {
	await context.send(`
	Итак, вот домашка на субботу 
${Saturday.join('\n')}`)
})


updates.hear(/^\/понедельник/i, async(context) => {
	context.send(`Господа, кто-то из вас не может выучить мои команды. Мне жаль, но я вас могу понять, поэтому держите 
домашку на понедельник:
${Monday.join('\n')}`)
})

updates.hear(/^\/вторник/i, async(context) => {
	context.send(`Господа, кто-то из вас не может выучить мои команды. Мне жаль, но я вас могу понять, поэтому держите 
домашку на вторник:
${Tuesday.join('\n')}`)
})

updates.hear(/^\/среда/i, async(context) => {
	context.send(`Господа, кто-то из вас не может выучить мои команды. Мне жаль, но я вас могу понять, поэтому держите 
домашку на среду:
${Wednesday.join('\n')}`)
})

updates.hear(/^\/четверг/i, async(context) => {
	context.send(`Господа, кто-то из вас не может выучить мои команды. Мне жаль, но я вас могу понять, поэтому держите 
домашку на четверг:
${Thursday.join('\n')}`)
})

updates.hear(/^\/пятница/i, async(context) => {
	context.send(`Господа, кто-то из вас не может выучить мои команды. Мне жаль, но я вас могу понять, поэтому держите 
домашку на пятницу:
${Friday.join('\n')}`)
})

updates.hear(/^\/суббота/i, async(context) => {
	context.send(`Господа, кто-то из вас не может выучить мои команды. Мне жаль, но я вас могу понять, поэтому держите 
домашку на cубботу:
${Saturday.join('\n')}`)
})


updates.hear('/insert ?', async(context) => {
	await context.send(`
Справка по команде /insert.
Она позволяет добавлять домашнее задание для каждого предмета моментально (На самом деле Захар не хочет все вводить вручную, процесс нужно автоматизировать)
Итак, как она работает?
Вы пишите: /insert название_предмета сама_домашка
Затем бот отправит вам обновленное дз по вашему предмету, и все будут счастливы!
Всем мир`)
})

updates.hear('/дз все', async(context) =>{
	await context.send(Sunday.join('\n'))
})

updates.hear('/дз', async(context) => {
	if(moment().day() === 1)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Monday.join('\n')
		context.send('Домашка с понедельника ' + formatter.format(Time) + ' \n'  + x)
	}
	if(moment().day() === 2)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Tuesday.join('\n')
		context.send('Домашка со вторника '+ formatter.format(Time) + ' \n'  + x)
	}
	if(moment().day() === 3)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Wednesday.join('\n')
		context.send('Домашка со среды '+ formatter.format(Time) + ' \n'  + x)
	}
	if(moment().day() === 4)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Thursday.join('\n')
		context.send('Домашка с четверга '+ formatter.format(Time) + ' \n' + x)
	}
	if(moment().day() === 5)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Friday.join('\n')
		сontext.send('Домашка с пятницы '+ formatter.format(Time) + ' \n'  + x)
	}
	if(moment().day() === 6)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Saturday.join('\n')
		context.send('Домашка с субботы ' + formatter.format(Time) + ' \n' + x)
	}
	if(moment().day() === 0)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Sunday.join('\n')
		context.send('Поздравляю с единственным выходным. Проведите его с пользой. Домашка на всю неделю: ' + formatter.format(Time) + ' \n'  + x)
	}})
updates.hear('/дз завтра', async(context) => {
	if(moment().day() === 1)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Tuesday.join('\n')
		context.send('Домашка на завтра. Сегодня ' + formatter.format(Time) + ' \n'  + x)
	}
	if(moment().day() === 2)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Wednesday.join('\n')
		context.send('Домашка на завтра. Сегодня '+ formatter.format(Time) + ' \n'  + x)
	}
	if(moment().day() === 3)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Thursday.join('\n')
		context.send('Домашка на завтра. Сегодня '+ formatter.format(Time) + ' \n'  + x)
	}
	if(moment().day() === 4)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Friday.join('\n')
		context.send('Домашка на завтра. Сегодня '+ formatter.format(Time) + ' \n' + x)
	}
	if(moment().day() === 5)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Saturday.join('\n')
		context.send('Домашка на завтра. Сегодня '+ formatter.format(Time) + ' \n'  + x)
	}
	if(moment().day() === 6)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Sunday.join('\n')
		context.send(x)
	}
	if(moment().day() === 0)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Monday.join('\n')
		context.send('Домашка на завтра. Сегодня '+ formatter.format(Time) + ' \n'  + x)
}})	
})



updates.hear('/help', async(context) => {
	await context.send(`Итак, вот вам более-менее краткая документация.
	
Краткая сводка по моим командам: /start

Ответы на те или иные сообщения вызваны регулярными выражениями. Как это работает? Просто! 
Я делаю триггер на то или иное слово, а бот на него отвечает.

КАК РАБОТАЕТ /гдз:
Вы пишите команду "/гдз" и следом текст задачи. Пример:
/гдз Из двух городов одновременно на встречу друг другу отправились два поезда. 

Со временем команды будут увеличиваться, если вы об этом меня попросите и если в этом будет вообще всякий смысл`)
})

updates.hear(/^\/гдз (.+)/i, async (context) => {
	const textUser = context.$match[1];
	google.resultsPerPage = 3;
	context.send('Я нашел тут пару ГДЗ по твоему запросу, глянь их:')
	google(textUser, function (error,res) {
    const settings = {
	    streamType: 'png',
		windowSize: {
			width: '1000',
			height: '1400'
		},
		shotSize: {
			width: '1000',
			height: '1400'
		},
		userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)' + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
		}

		const link1 = res.links[0]
        const link2 = res.links[1]
        const link3 = res.links[2]
		
		Promise.all([
		webshot(link1.href, 'images/GDZ1.png', settings, function(err) 
		{
			context.send('ГДЗ номер 1:\n' + link1.href)
			context.sendPhoto('images/GDZ1.png')
			if(Object)
		{
			context.send('Простите, у меня случилась ошибка :с')
		}
		}),
		webshot(link2.href, 'images/GDZ2.png', settings, function(error) 
		{
			context.send('ГДЗ номер 2:\n' + link2.href) 
			context.sendPhoto('images/GDZ2.png')
			if(Object)
		{
			context.send('Простите, у меня случилась ошибка :с')
		}
		}),
		webshot(link3.href, 'images/GDZ3.png', settings, function(error) 
		{
			context.send('ГДЗ номер 3:\n' + link3.href)
			context.sendPhoto('images/GDZ3.png')
			if(Object)
		{
			context.send('Простите, у меня случилась ошибка :с')
		}
		})
		])
		if(Object)
		{
			context.send('Простите, у меня случилась ошибка :с')
		}
	})
})


updates.hear(/^\/отзыв (.+)/i, async(context) => {
	const feedback = context.$match[1]
	await context.send('Хорошо, твой отзыв будет отправлен Захару, спасибо :)')
	api.messages.send({
		message: 'НОВЫЙ ОТЗЫВ: ' + feedback,
		domain: 'egoromanov'
	})
})


updates.hear('/неделя', async(context) => {
	await context.send(`РАСПИСАНИЕ НА ВСЮ НЕДЕЛЮ:
ПОНЕДЕЛЬНИК:
${Schedule[0].join(' ')}

ВТОРНИК:
${Schedule[1].join(' ')}

СРЕДА:
${Schedule[2].join(' ')}

ЧЕТВЕРГ:
${Schedule[3].join(' ')}

ПЯТНИЦА:
${Schedule[4].join(' ')}

СУББОТА:
${Schedule[5].join(' ')}`)
})


const reg2 = new Array(10)
reg2[0] = new RegExp(/ганц/i)
reg2[1] = new RegExp(/ганца/i)
reg2[2] = new RegExp(/ганцу/i)
reg2[3] = new RegExp(/ганце/i)
reg2[4] = new RegExp(/ганцем/i)
reg2[5] = new RegExp(/богдан/i)
reg2[6] = new RegExp(/богдану/i)
reg2[7] = new RegExp(/богдана/i)
reg2[8] = new RegExp(/богданом/i)
reg2[9] = new RegExp(/богдане/i)
const answers2 = new Array(3)
answers2[0] = "Ruhm der Ukraine"
answers2[1] = "Bogdan ist der Sinn des Lebens"
answers2[2] = "der beste Mann Kappa"
const random2 = answers2[Math.floor(Math.random() * answers2.length)]
updates.hear(reg2, async(context) => {
	await context.send(random2)
})

/*updates.hear(/спасибо/i, async(context) =>  {
	await context.send('Не за что! Рад помочь')
})*/

const rozhi = new Array(46)
rozhi[0] = LINK_PHOTO
rozhi[1] = LINK_PHOTO
rozhi[2] = LINK_PHOTO
rozhi[3] = LINK_PHOTO
rozhi[4] = LINK_PHOTO
rozhi[5] = LINK_PHOTO
rozhi[6] = LINK_PHOTO
rozhi[7] = LINK_PHOTO
rozhi[8] = LINK_PHOTO
rozhi[9] = LINK_PHOTO
rozhi[10] = LINK_PHOTO
rozhi[11] = LINK_PHOTO
rozhi[12] = LINK_PHOTO
rozhi[13] = LINK_PHOTO
rozhi[14] = LINK_PHOTO
rozhi[15] = LINK_PHOTO

updates.on('message', async(context,next) => {
	if((context.isInbox || context.isOutbox) && context.text === '/рожа' )
	{
		await context.send({
			message: 'Cколько лиц ты хочешь получить, мой юный извращенец?',
			keyboard: Keyboard.keyboard([
					[
						Keyboard.textButton({
						label: `1`,
						payload: {
							command: 'one'
						},
						color: Keyboard.POSITIVE_COLOR
					}),
						Keyboard.textButton({
						label: `2`,
						payload: {
							command: 'two'
						},
						color: Keyboard.POSITIVE_COLOR,
					}), 
						Keyboard.textButton({
						label: `3`,
						payload: {
							command: 'three'
						},
						color: Keyboard.POSITIVE_COLOR
					})],
					[
						Keyboard.textButton({
							label: `4`,
							payload: {
								command: 'four'
							},
							color: Keyboard.POSITIVE_COLOR}),
						Keyboard.textButton({
							label: `5`,
							payload: {
								command: 'five'
							},
							color: Keyboard.POSITIVE_COLOR}),
						Keyboard.textButton({
							label: `10`,
							payload: {
								command: 'ten'
							},
							color: Keyboard.POSITIVE_COLOR})
						],
						Keyboard.textButton({
						label: `Закрыть клавиатуру`,
						payload: {
							command: 'cancel'
						},
						color: Keyboard.NEGATIVE_COLOR
					})
				],
			{
				oneTime: true
			})
		})

		hearCommand('one', async(context) => {
			await context.send({
				attachment: rozhi[Math.floor(Math.random() * rozhi.length)]
			})
		})
		hearCommand('two', async(context) => {
			await context.send({
				attachment: `${rozhi[Math.floor(Math.random() * rozhi.length)]},${rozhi[Math.floor(Math.random() * rozhi.length)]}`
			})
		})
		hearCommand('three', async(context) => {
			await context.send({
				attachment: `${rozhi[Math.floor(Math.random() * rozhi.length)]},${rozhi[Math.floor(Math.random() * rozhi.length)]},${rozhi[Math.floor(Math.random() * rozhi.length)]}`
			})
		})
		hearCommand('four', async(context) => {
			await context.send({
				attachment:`${rozhi[Math.floor(Math.random() * rozhi.length)]},${rozhi[Math.floor(Math.random() * rozhi.length)]},${rozhi[Math.floor(Math.random() * rozhi.length)]},${rozhi[Math.floor(Math.random() * rozhi.length)]}`
			})
		})
		hearCommand('five', async(context) => {
			await context.send({
				attachment: `${rozhi[Math.floor(Math.random() * rozhi.length)]},${rozhi[Math.floor(Math.random() * rozhi.length)]},${rozhi[Math.floor(Math.random() * rozhi.length)]},${rozhi[Math.floor(Math.random() * rozhi.length)]},${rozhi[Math.floor(Math.random() * rozhi.length)]}`
			})
		})
		hearCommand('ten', async(context) => {
			await context.send({
				attachment: `${rozhi[Math.floor(Math.random() * rozhi.length)]},${rozhi[Math.floor(Math.random() * rozhi.length)]},${rozhi[Math.floor(Math.random() * rozhi.length)]},${rozhi[Math.floor(Math.random() * rozhi.length)]},${rozhi[Math.floor(Math.random() * rozhi.length)]},${rozhi[Math.floor(Math.random() * rozhi.length)]},${rozhi[Math.floor(Math.random() * rozhi.length)]},${rozhi[Math.floor(Math.random() * rozhi.length)]},${rozhi[Math.floor(Math.random() * rozhi.length)]},${rozhi[Math.floor(Math.random() * rozhi.length)]}`
			})
		})
	}
	else
	{
		await next()
		return 
	}
})


updates.hear(/^\/вгулаг (.+)/i, async(context) => {
	const victim = context.$match[1]
	if(context.senderId === YOUR_ID)
	{
		if(isNaN(victim))
		{
			const [user] = await api.users.get({
				user_ids: victim,
				name_case: 'nom'
			});
			await context.send('ГУЛАГ тебя ждет, братишка')
			await context.kickUser(user.id)
		}
		else
		{
			await context.send('ГУЛАГ тебя ждет, братишка')
			await context.kickUser(victim)
		}
	}
	else
	{
		await context.send(`Упс, ошибочка. У вас нет доступа к этой команде`)
	}
})


updates.hear('/citgen', async(context) => {
	await context.send('Citgen accepted')
	var text = []
	if(context.hasForwards)
	{
		imagekek = []

		if(context.forwards.length === 1)
		{
			text[0] = context.forwards[0].text
		}
		for(var i = 0; i < context.forwards.length; i++)
		{
			for(var j = 1; j < context.forwards.length; j++)
			{
				
				if (context.forwards[i].from_id === context.forwards[j].from_id)
				{
					text[i] = context.forwards[i].text
				}
				else {
					text = ''
					await context.send('Так! Ошибка! Рофляночка должна принадлежать одному человеку, а не разным')
					break
				}
			}
			imagekek[i] = await api.users.get({
				user_ids: context.forwards[i].from_id,
				fields: 'photo_100',
				name_case: 'nom'
			})
		}


		var download = function(uri, filename, callback){
			request.head(uri, function(err, res, body){
			  console.log('content-type:', res.headers['content-type']);
			  console.log('content-length:', res.headers['content-length']);
			  request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
			});
		};

		download(imagekek[0][0].photo_100, 'ava.png', function(){
			console.log('done');
		});

		gm(640,400, "#000000")
		.fill('#FFFFFF')
		.font('HelveticaNeue.ttf')
		.fontSize(30)
		.drawText(30,42,'Цитаты великих людей')
		.drawText(30,110,`«${text.join('\n')}»`)
		.drawText(30,370, `© ${imagekek[0][0].first_name} ${imagekek[0][0].last_name}`)
		.write('rofl.png', async function(err) {
			if(err)
			{
				console.log(err)
			}
			await context.sendPhoto('rofl.png')
			await fs.unlink('rofl.png')
		})
	}
})


//TO-DO
if(Time.getDay() === 1 && Time.getHours() === 15 && Time.getMinutes() === 30)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Tuesday.join('\n')
		setInterval(function() {
			context.send('Домашка на завтра. Сегодня ' + formatter.format(Time) + ' \n'  + x)
		}, 86400000)
	}
	if(Time.getDay() === 2 && Time.getHours() === 15 && Time.getMinutes() === 30)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Wednesday.join('\n')
		setInterval(function() {
			context.send('Домашка на завтра. Сегодня ' + formatter.format(Time) + ' \n'  + x)
		}, 86400000)
	}
	if(Time.getDay() === 3 && Time.getHours() === 15 && Time.getMinutes() === 30)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Thursday.join('\n')
		setInterval(function() {
			context.send('Домашка на завтра. Сегодня ' + formatter.format(Time) + ' \n'  + x)
		}, 86400000)
	}
	if(Time.getDay() === 4 && Time.getHours() === 15 && Time.getMinutes() === 30)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Friday.join('\n')
		setInterval(function() {
			context.send('Домашка на завтра. Сегодня ' + formatter.format(Time) + ' \n'  + x)
		}, 86400000)
	}
	if(Time.getDay() === 5 && Time.getHours() === 15 && Time.getMinutes() === 30)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Saturday.join('\n')
		setInterval(function() {
			context.send('Домашка на завтра. Сегодня ' + formatter.format(Time) + ' \n'  + x)
		}, 86400000)
	}
	if(Time.getDay() === 6 && Time.getHours() === 15 && Time.getMinutes() === 30)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Sunday.join('\n')
		setInterval(function() {
			context.send('Домашка на завтра. Сегодня ' + formatter.format(Time) + ' \n'  + x)
		}, 86400000)
	}
	if(Time.getDay() === 0 && Time.getHours() === 15 && Time.getMinutes() === 30)
	{
		var formatter = new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric"
		  });
		const x = Monday.join('\n')
		setInterval(function() {
			context.send('Домашка на завтра. Сегодня ' + formatter.format(Time) + ' \n'  + x)
		}, 86400000)
	}
