let attempts = 0;
let index = 0;

const appStart = () => {
  const handleEnterKey = () => {
    console.log("엔터키");
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const currentBlock = document.querySelector(
      `.board-block[data-index="${attempts}${index}"]`
    );
    if (event.key === "Enter") {
      handleEnterKey();
    }
    if (index === 5) return;
    if (keyCode >= 65 && keyCode <= 90) {
      currentBlock.innerText = key;
      index += 1;
    }
  };
  window.addEventListener("keydown", handleKeydown);
};

appStart();
