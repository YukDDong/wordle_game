const answer = "APPLE";

let attempts = 0;
let index = 0;
let correctText = 0;

const appStart = () => {
  const nextLine = () => {
    attempts += 1;
    index = 0;
    correctText = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
  };
  const handleEnterKey = () => {
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
    if (index === 5) {
      if (event.key === "Enter") {
        handleEnterKey();
      } else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      currentBlock.innerText = key;
      index += 1;
    }
  };
  window.addEventListener("keydown", handleKeydown);
};

appStart();
