let attempts = 0;
let index = 0;
let correctText = 0;
let timer;

const appStart = () => {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display: flex; justify-content: center; align-items: center; position: absolute; top: 40vh; left: 35vw; background-color: white; width: 200px; height: 100px;";
    document.body.appendChild(div);
  };
  const nextLine = () => {
    if (attempts === 6) {
      gameover();
      return;
    }
    attempts += 1;
    index = 0;
    correctText = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preblock = document.querySelector(
        `.board-block[data-index="${attempts}${index - 1}"]`
      );
      preblock.innerText = "";
      index -= 1;
    }
  };
  const handleEnterKey = async () => {
    const response = await fetch("/answer");
    const { answer } = await response.json();
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index="${attempts}${i}"]`
      );
      const blockText = block.innerText;
      const answerText = answer[i];

      if (blockText === answerText) {
        block.style.background = "#6AAA64";
        correctText += 1;
      } else if (answer.includes(blockText)) {
        block.style.background = "#C9B458";
      } else {
        block.style.background = "#787C7E";
      }
      block.style.color = "white";
    }
    if (correctText === 5) {
      gameover();
    } else {
      nextLine();
    }
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const currentBlock = document.querySelector(
      `.board-block[data-index="${attempts}${index}"]`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") {
        handleEnterKey();
      } else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      currentBlock.innerText = key;
      index += 1;
    }
  };
  const startTimer = () => {
    const startTime = new Date();

    const setTime = () => {
      const currentTime = new Date();
      const passingTime = new Date(currentTime - startTime);
      const minutes = passingTime.getMinutes().toString().padStart(2, "0");
      const seconds = passingTime.getSeconds().toString().padStart(2, "0");
      const time = document.querySelector(".time");
      time.innerText = `${minutes}:${seconds}`;
    };

    timer = setInterval(setTime, 1000);
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
};

appStart();
