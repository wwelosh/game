/// Начальные параметры
let eco = 50,
	money = 50,
	trust = 50;
let step = 0;
let correctAnswers = 0; // Количество правильных ответов

// Сценарии игры
const scenarios = [
	{
		question:
			"Вода в озере начала мутнеть. Жители жалуются на загрязнение. Как ты решишь проблему?",
		choices: [
			{
				text: "Провести расследование и установить очистные сооружения",
				effects: { eco: +20, money: -20, trust: +15 },
				correct: true,
			},
			{
				text: "Запустить пиар-кампанию, что всё в порядке",
				effects: { eco: -15, money: -5, trust: -10 },
				correct: false,
			},
			{
				text: "Проигнорировать жалобы, это природное явление",
				effects: { eco: -20, money: 0, trust: -15 },
				correct: false,
			},
		],
	},
	{
		question: "Старые угольные котельные загрязняют воздух. Что ты выберешь?",
		choices: [
			{
				text: "Запретить использование угля и перейти на газ",
				effects: { eco: +20, money: -20, trust: +5 },
				correct: true,
			},
			{
				text: "Усилить контроль за выбросами",
				effects: { eco: +10, money: -10, trust: +5 },
				correct: true,
			},
			{
				text: "Оставить всё как есть ради экономии",
				effects: { eco: -10, money: +10, trust: -5 },
				correct: false,
			},
		],
	},
	{
		question:
			"Твои инженеры предлагают построить дамбу, но это повредит экосистеме. Что делать?",
		choices: [
			{
				text: "Искать альтернативные способы управления водными ресурсами",
				effects: { eco: +15, money: -10, trust: +10 },
				correct: true,
			},
			{
				text: "Построить дамбу, потому что это выгодно экономически",
				effects: { eco: -10, money: +20, trust: -5 },
				correct: false,
			},
			{
				text: "Проигнорировать проблему, пока не станет хуже",
				effects: { eco: -15, money: 0, trust: -10 },
				correct: false,
			},
		],
	},
	{
		question:
			"На окраине города начали появляться стихийные свалки. Что предпримешь?",
		choices: [
			{
				text: "Создать систему штрафов и усилить контроль",
				effects: { eco: +15, money: +5, trust: +10 },
				correct: true,
			},
			{
				text: "Организовать волонтёрские уборки без штрафов",
				effects: { eco: +10, money: -10, trust: +5 },
				correct: true,
			},
			{
				text: "Не вмешиваться, люди сами разберутся",
				effects: { eco: -20, money: 0, trust: -15 },
				correct: false,
			},
		],
	},
];

// Обновление статистики
function updateStats() {
	document.getElementById("eco").textContent = eco;
	document.getElementById("money").textContent = money;
	document.getElementById("trust").textContent = trust;
}

// Загрузка сценария
function loadScenario(index) {
	const scenario = scenarios[index];
	document.getElementById("question").textContent = scenario.question;
	const choicesContainer = document.getElementById("choices");
	choicesContainer.innerHTML = "";

	scenario.choices.forEach((choice, i) => {
		const card = document.createElement("div");
		card.className = "card";
		card.textContent = choice.text;
		card.onclick = () => makeChoice(i, card);
		choicesContainer.appendChild(card);
	});
}

// Обработка выбора игрока
function makeChoice(choiceIndex, card) {
	const choice = scenarios[step].choices[choiceIndex];

	// Подсветка карточек
	if (choice.correct) {
		card.style.backgroundColor = "green";
		correctAnswers++; // Учитываем правильный ответ
	} else {
		card.style.backgroundColor = "red";
	}

	// Применяем эффекты
	eco += choice.effects.eco;
	money += choice.effects.money;
	trust += choice.effects.trust;
	updateStats();

	// Переход к следующему вопросу
	setTimeout(() => {
		step++;
		if (step < scenarios.length) {
			loadScenario(step);
		} else {
			endGame();
		}
	}, 1000);
}

// Завершение игры
function endGame() {
	if (correctAnswers >= 3) {
		showKeyModal(); // Выдаем ключ, если минимум 3 правильных ответа
	} else {
		alert(
			"Ты сделал слишком много ошибок, ключ от города не получен! Попробуй снова."
		);
		restartGame();
	}
}

// Показ окна с ключом
function showKeyModal() {
	document.getElementById("keyModal").style.display = "flex";
	document.body.style.overflow = "hidden";
}

// Перезапуск игры
function restartGame() {
	step = 0;
	correctAnswers = 0;
	eco = 50;
	money = 50;
	trust = 50;
	updateStats();
	loadScenario(step);
}

// Закрытие инвентаря и запуск игры
function closeInventory() {
	document.getElementById("inventoryModal").style.display = "none";
	document.getElementById("game").style.display = "block";
	updateStats();
	loadScenario(step);
	document.body.style.overflow = "auto";
}

// Открытие записной книжки мудрости
function openWisdom() {
	document.getElementById("wisdomModal").style.display = "flex";
	document.body.style.overflow = "hidden";
}

// Закрытие записной книжки мудрости
function closeWisdom() {
	document.getElementById("wisdomModal").style.display = "none";
	document.body.style.overflow = "auto";
}

// Отображение информации об Эко‑бейдже
function showEcoBadgeInfo() {
	alert(
		"Эко‑бейдж Каракола – символ твоей приверженности экологической гармонии и заботы о природе."
	);
}

// Запуск инвентаря после пробуждения
window.onload = function () {
	setTimeout(() => {
		document.getElementById("awakening").style.display = "none";
		document.getElementById("inventoryModal").style.display = "flex";
	}, 3000);
};
