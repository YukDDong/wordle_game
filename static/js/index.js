let attempts = 0;
let index = 0;
let correctText = 0;
let timer;

const appStart = () => {
  const keyboardBlocks = document.querySelectorAll(".keyboard-block");
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
    keyboardBlocks.forEach((i) => {
      i.removeEventListener("click", handleClickKey);
    });
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
    // const response = await fetch("/answer");
    // const { answer } = await response.json();
    const answer = "APPLE";
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index="${attempts}${i}"]`
      );
      const blockText = block.innerText;
      const keboardBlock = document.querySelector(
        `.keyboard-block[data-key="${blockText}"]`
      );
      const answerText = answer[i];

      if (blockText === answerText) {
        block.style.background = "#6AAA64";
        keboardBlock.style.background = "#6AAA64";
        correctText += 1;
      } else if (answer.includes(blockText)) {
        block.style.background = "#C9B458";
        keboardBlock.style.background = "#C9B458";
      } else {
        block.style.background = "#787C7E";
        keboardBlock.style.background = "#787C7E";
      }
      block.style.color = "white";
      keboardBlock.style.color = "white";
    }
    if (correctText === 5) {
      const correctDiv = document.createElement("div");
      correctDiv.style =
        "display: flex; justify-content: center; align-items: center; position: absolute; top: 25vh; left: 35vw; background-color: pink; width: 200px; height: 100px;";
      correctDiv.className = "swashIn";
      correctDiv.innerText = "정답입니다!!";
      document.body.appendChild(correctDiv);
      gameover();
    } else {
      const totalBlock = document.querySelector(`.row-${attempts}`);
      totalBlock.style = "position: relative;";
      totalBlock.classList.add("leftRight");
      nextLine();
    }
  };

  const handleKeydown = (event) => {
    const key = event.key;
    const keyCode = event.keyCode;
    const currentBlock = document.querySelector(
      `.board-block[data-index="${attempts}${index}"]`
    );

    if (key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (key === "Enter") {
        handleEnterKey();
      } else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      currentBlock.innerText = key.toUpperCase();
      index += 1;
    }
  };

  const handleClickKey = (event) => {
    const key = event.currentTarget.dataset.key;
    const currentBlock = document.querySelector(
      `.board-block[data-index="${attempts}${index}"]`
    );
    if (key === "BACKSPACE") handleBackspace();
    else if (index === 5) {
      if (key === "ENTER") {
        handleEnterKey();
      } else return;
    } else if (event.target.className === "keyboard-block") {
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
  keyboardBlocks.forEach((i) => {
    i.addEventListener("click", handleClickKey);
  });
};

appStart();
