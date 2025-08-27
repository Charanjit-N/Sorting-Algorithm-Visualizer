const start = async () =>{
    let algo = Number(document.querySelector(".algo-menu").value);
    let speed = Number(document.querySelector(".speed-menu").value);

    if (speed === 0) {
        speed = 1;
    }

    if(algo === 0){
        alert("Please select an Algorithm");
        return;
    }

    let algorithm = new SortingAlgorithms(speed);
    if (algo === 1) await algorithm.InsertionSort();
    if (algo === 2) await algorithm.BubbleSort();
    if (algo === 3) await algorithm.SelectionSort();
    if (algo === 4) await algorithm.MergeSort();
    if (algo === 5) await algorithm.QuickSort();

};


const RenderScreen =async () =>{
    let algoValue = Number(document.querySelector(".algo-menu").value);
    await RenderList();
};

const RenderList = async () =>{
    let sizeValue = Number(document.querySelector(".size-menu").value);
    await clearScreen();

    let list = await randomList(sizeValue);
    const bars = document.querySelector(".bars");
    console.log(bars);
    console.log(list);
    for(const element of list){
        const bar =document.createElement("div");
        bar.className = "bar";
        bar.setAttribute("value", String(element));
        bar.style.height = `${4.0 * element}px`;
        bars.appendChild(bar);
    }
};




const randomList = async (size) => {
  let list = new Array();
  let lowerBound = 1;
  let upperBound = 100;

  for (let counter = 0; counter < size; ++counter) {
    let randomNumber = Math.floor(
      Math.random() * (upperBound - lowerBound + 1) + lowerBound
    );
    list.push(parseInt(randomNumber));
  }
  return list;
};





const clearScreen =async() => {
    document.querySelector(".bars").innerHTML ="";
}

document.querySelector(".sort").addEventListener("click", start);
document.querySelector(".size-menu").addEventListener("change", RenderScreen);
document.querySelector(".algo-menu").addEventListener("change", RenderScreen);
window.onload = RenderScreen;
