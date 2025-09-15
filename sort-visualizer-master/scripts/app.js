"use strict";

const start = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  let speedValue = Number(document.querySelector(".speed-menu").value);

  if (speedValue === 0) {
    speedValue = 1;
  }
  if (algoValue === 0) {
    alert("No Algorithm Selected");
    return;
  }
  // yha app.js call sortAlgorithm class and have speed value with the help of constructor 
  // and sortAlgorithm class call Helper class from help.js and gave time and list through constructor 
  let algorithm = new sortAlgorithms(speedValue);
  if (algoValue === 1) await algorithm.BubbleSort();
  if (algoValue === 2) await algorithm.SelectionSort();
  if (algoValue === 3) await algorithm.InsertionSort();
  if (algoValue === 4) await algorithm.MergeSort();
  if (algoValue === 5) await algorithm.QuickSort();
};

// randerScreen is call to generate the array (by onclick event)
// yai function RenderList() function ko call karta hai jo actual bars create karta hai.
const RenderScreen = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  await RenderList();  // algo-menu akh class hai jo algorithm wale button per lgi hai 
};

const RenderList = async () => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();   // size-menu class hai jo ki size of array kai option per hai 

  let list = await randomList(sizeValue);  // randomList() function ek random array banata hai size ke according (jaise [12, 45, 32, 60]). 
  const arrayNode = document.querySelector(".array");
  console.log(arrayNode);     
  console.log(list);  
  /*   1 const node = document.createElement("div");
        Ek naya div element banate hain — ye ek bar hoga (ek rectangle).

  2.node.className = "cell";
     CSS class "cell" lagayi ja rahi hai — isse styling milegi.
      CSS mein "cell" class height, width, color define karegi.

3. node.setAttribute("value", String(element));
    Ye bar ka value store karta hai.
    Sorting ke time pe is value ka use hoga (compare/swap ke liye).

4. node.style.height = \${3.8 * element}px`;`
  Bar ki height number ke proportional set hoti hai.
   3.8 se multiply karke uski height dikhayi ja rahi hai.

 5.arrayNode.appendChild(node);
   Ye bar DOM mein div.array ke andar add kar diya jata hai. */
  for (const element of list) {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));   // ha per div kuch iss parkar bnega   : <div class ="cell" value="(element value like 1,2,78,23)"> </div>
    node.style.height = `${3.8 * element}px`;
    arrayNode.appendChild(node);
  }
};

const RenderArray = async (sorted) => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  if (sorted) list.sort((a, b) => a - b);

  const arrayNode = document.querySelector(".array");
  const divnode = document.createElement("div");
  divnode.className = "s-array";

  for (const element of list) {
    const dnode = document.createElement("div");
    dnode.className = "s-cell";
    dnode.innerText = element;
    divnode.appendChild(dnode);
  }
  arrayNode.appendChild(divnode);
};

const randomList = async (Length) => {
  let list = new Array();
  let lowerBound = 1;
  let upperBound = 100;

  for (let counter = 0; counter < Length; ++counter) {
    let randomNumber = Math.floor(
      Math.random() * (upperBound - lowerBound + 1) + lowerBound
    );
    list.push(parseInt(randomNumber));
  }
  return list;
};

const clearScreen = async () => {
  document.querySelector(".array").innerHTML = "";
};

const response = () => {
  let Navbar = document.querySelector(".navbar");
  if (Navbar.className === "navbar") {
    Navbar.className += " responsive";
  } else {
    Navbar.className = "navbar";
  }
};

document.querySelector(".icon").addEventListener("click", response);
document.querySelector(".start").addEventListener("click", start);
document.querySelector(".size-menu").addEventListener("change", RenderScreen);
document.querySelector(".algo-menu").addEventListener("change", RenderScreen);
window.onload = RenderScreen;
