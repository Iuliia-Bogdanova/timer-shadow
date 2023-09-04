// пользовательский элемент timer-view: создала класс, указала функциональность, прикрепила Shadow DOM, определила slot
class MyElement extends HTMLElement {
    connectedCallback() {
        this._shadow = this.attachShadow({ mode: "closed" });
        
        const div = document.createElement("div");
        const slot = document.createElement("slot");
        slot.name = "timer-view";
        this._shadow.prepend(slot);

        this.timerView = this._shadow.querySelector(".timer-view");
    }
}

// определила переменные
let timerInput = document.querySelector(".timer-input");
const startBtn = document.querySelector(".startBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const resetBtn = document.querySelector(".resetBtn");
const errorDiv = document.querySelector(".error");
let interval;

// очистила значение timerInput по умолчанию
timerInput.addEventListener('focus', () => {
    if (timerInput.value === "0") {
        timerInput.value = "";
    }
});

// функция обратного отсчета + форматирование времени из секунд в мм:сс или чч:мм:сс
const countDown = function() {
    let seconds = parseInt(timerInput.value);
    if (!isNaN(seconds)) {
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        seconds = seconds % 60;

        if (hours === 0) {
            this.timerView.innerHTML =
                formatTime(minutes) + ":" + formatTime(seconds);
            } else {
            this.timerView.innerHTML = formatTime(hours) + ":" + formatTime(minutes) +
                ":" + formatTime(seconds);
            }

        if (seconds > 0 || minutes > 0 || hours > 0) {
        timerInput.value = seconds + minutes * 60 + hours * 3600 - 1;
        } else {
            clearInterval(interval);

            this.timerView.dispatchEvent(new CustomEvent("endTimer"));
            console.log("Timer has expired");
        }
    }
}.bind(this);

// установила двузначный формат времени
function formatTime(time) {
    if (time < 10) {
        return '0' + time;
    }
    return time;
}

// функционал startBtn - запуск таймера, замена инпута timerInput на элемент timerView - не работает
startBtn.addEventListener('click', () => {
    if (!/^\d+$/.test(timerInput.value)) {
        errorDiv.style.display = "flex";
        return;
        } else {
        errorDiv.style.display = "none";
    }

    clearInterval(interval);
    interval = setInterval(countDown, 1000);

    this.timerView.style.display = "flex";
    timerInput.style.display = "none";

    const event = new CustomEvent("startTimer");
    this.timerView.addEventListener("startTimer", handleStartTimer);
    this.timerView.dispatchEvent(event);

    function handleStartTimer() {
        console.log("Timer started counting down");
    }
});

// pauseBtn
pauseBtn.addEventListener('click', () => {
    clearInterval(interval);

    const event = new CustomEvent("pauseTimer");
    this.timerView.addEventListener("pauseTimer", handlePauseTimer);
    this.timerView.dispatchEvent(event);

    function handlePauseTimer() {
        console.log("Timer paused");
    }
});

// resetBtn - перезагрузка
resetBtn.addEventListener('click', () => {
    location.reload();
        
    const event = new CustomEvent("resetTimer");
        this.timerView.addEventListener("resetTimer", handleResetTimer);
        this.timerView.dispatchEvent(event);

        function handleResetTimer() {
            console.log("Timer reset");
        }
});

// зарегистрировала пользовательский элемент
customElements.define("my-element", MyElement);