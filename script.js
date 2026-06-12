// ======================
// DISPLAY
// ======================

const display = document.getElementById("display");

// ======================
// BASIC FUNCTIONS
// ======================

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// ======================
// HISTORY FUNCTION
// ======================

function addToHistory(expression, result) {

    const history =
        document.getElementById("history");

    if (!history) return;

    const li =
        document.createElement("li");

    li.textContent =
        expression + " = " + result;

    history.prepend(li);
}

// ======================
// CALCULATE
// ======================

function calculate() {

    try {

        const expression =
            display.value;

        const result =
            eval(expression);

        display.value =
            result;

        addToHistory(
            expression,
            result
        );

    }

    catch {

        display.value =
            "Error";

    }

}

// ======================
// SCIENTIFIC FUNCTIONS
// ======================

function percentage() {

    if (display.value === "")
        return;

    const original =
        display.value;

    const result =
        Number(display.value) / 100;

    display.value =
        result;

    addToHistory(
        original + "%",
        result
    );
}

function square() {

    if (display.value === "")
        return;

    const original =
        display.value;

    const result =
        Math.pow(
            Number(display.value),
            2
        );

    display.value =
        result;

    addToHistory(
        original + "²",
        result
    );
}

function squareRoot() {

    if (display.value === "")
        return;

    const original =
        display.value;

    const result =
        Math.sqrt(
            Number(display.value)
        );

    display.value =
        result;

    addToHistory(
        "√" + original,
        result
    );
}

// ======================
// DATE & TIME
// ======================

function updateTime() {

    const now =
        new Date();

    const dateTime =
        now.toLocaleDateString() +
        " | " +
        now.toLocaleTimeString();

    document.getElementById(
        "datetime"
    ).innerHTML =
        dateTime;
}

updateTime();

setInterval(
    updateTime,
    1000
);

// ======================
// DARK MODE
// ======================

const themeBtn =
    document.getElementById(
        "themeBtn"
    );

themeBtn.addEventListener(
    "click",
    () => {

        document.body
            .classList
            .toggle("dark");

        if (
            document.body
                .classList
                .contains("dark")
        ) {

            themeBtn.innerHTML =
                "☀️ Light Mode";

        } else {

            themeBtn.innerHTML =
                "🌙 Dark Mode";

        }

    }
);

// ======================
// KEYBOARD SUPPORT
// ======================

document.addEventListener(
    "keydown",
    function (event) {

        const key =
            event.key;

        if (
            (key >= "0" &&
                key <= "9") ||
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/" ||
            key === "."
        ) {

            appendValue(key);

        }

        else if (
            key === "Enter"
        ) {

            calculate();

        }

        else if (
            key === "Backspace"
        ) {

            deleteLast();

        }

        else if (
            key === "Escape"
        ) {

            clearDisplay();

        }

    }
);

// ======================
// BUTTON SOUND
// ======================

const sound =
    document.getElementById(
        "clickSound"
    );

document
    .querySelectorAll("button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                if (sound) {

                    sound.currentTime =
                        0;

                    sound.play()
                        .catch(() => { });

                }

            }
        );

    });

// ======================
// STARTUP
// ======================

console.log(
    "Advanced Calculator Loaded Successfully 🚀"
);