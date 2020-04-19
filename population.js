let population = [];

let popSize = 100;
let elderPercentage = 30;
let initialMortalityYoung, initialMortalityElder;
let infectionRadius;
let counter = 0;

let socialDistancing = true;
let testing = true;

let testRate = 5;
let elderRate = 0.5;
let SD = 30;
let elderIsolation = false;

let mortalityYoung, mortalityElder;

let startButton, restartButton, SDChoice, elderChoice, testChoice, infectionChoice, elderPerChoice;



let init = false;
let days = 0;

let infectionCounter;
let deadCounter
let cureCounter;

// let isolationLeftArea;

function setup() {
  canvas = createCanvas(400, 400);
  canvas.position(20, 20);
  createButtons();
  // isolationLeftArea = createVector
  for (let i = 0; i < popSize; i++) {
    population[i] = new Person();
    population[0].infected = true;
  }
}

function draw() {
  console.log(mouseX, mouseY);
  checkButtons();
  counter++;
  background(220);

  if (init) {
    infectionCounter = 0;
    deadCounter = 0;
    cureCounter = 0;
    for (var p of population) {
      p.show();
      p.move();
      p.endInfection();
      p.isolateMe();
      if (elderIsolation) {
        p.elderIsolation();
      }
      if (testing){
        p.testMe();
      }
      for (var other of population) {
        if (p !== other) {
          p.infect(other);
          if (socialDistancing) {
            p.distancing(other);
          }
        }
      }
      countData(p);
    }
    feedData();
  }
  fill(255);
  noStroke();
  rect(0, 400, width, 50);
  rect(width/2 - 25, 400, 50, 200);

  if(infectionCounter > popSize/6){
    fill(255, 0, 0, 100);
    textSize(20);
    textStyle(BOLD);
    text("SISTEMA DE SAÚDE EM COLAPSO!", 20, 50);
    mortalityYoung = 2*initialMortalityYoung;
    mortalityElder = 2*initialMortalityElder;
  }
  if(infectionCounter > popSize/2){
    mortalityYoung = 3*initialMortalityYoung;
    mortalityElder = 3*initialMortalityElder;
  }
}

function addData(chart, data1, data2, data3) {
  chart.data.labels.push('dia ' + days);
  chart.data.datasets[0].data.push(data1);
  chart.data.datasets[1].data.push(data2);
  chart.data.datasets[2].data.push(data3);
  chart.data.datasets[3].data.push(popSize/6);
  chart.update();
}

function reset() {
  init = true;
  for (let i = 0; i < popSize; i++) {
    population[i] = new Person();
    population[0].infected = true;
    population[1].infected = true;
  }
  days = 0;

  for(var u = 0; u < chart.data.labels.length*100; u++){
    chart.data.labels.pop();
    chart.data.datasets[0].data.pop();
    chart.data.datasets[1].data.pop();
    chart.data.datasets[2].data.pop();
  }
}

function startIt(){
  init = true;
}


function countData(t){
  if (t.infected == true) {
    infectionCounter++;
  }
  if (!t.alive) {
    deadCounter++;
  }
  if (t.imune) {
    cureCounter++
  }
}

function createButtons(){
  // pushMatrix();
  startButton = createButton("Iniciar simulação");
  startButton.position(450, 50);

  restartButton = createButton("Reiniciar simulação");
  restartButton.position(600, 50);

  elderChoice = createCheckbox("Isolamento de idosos");
  elderChoice.position(450, 80);

  let SDtxt = createDiv('Distanciamento social: ');
  SDtxt.position(450, 120);
  SDChoice = createSlider(0, 50, 0);
  SDChoice.position(450, 140);

  let ICtxt = createDiv('Contagiosidade:');
  ICtxt.position(450, 170);
  infectionChoice = createSlider(10, 29, 20);
  infectionChoice.position(450, 190);

  let TCtxt = createDiv('Testagem:');
  TCtxt.position(450, 220);
  testChoice = createSlider(0, 4, 0);
  testChoice.position(450, 240);

  let Tjtxt = createDiv('Mortalidade em jovens:');
  Tjtxt.position(450, 290);
  initialMortalityYoung = createInput(2);
  initialMortalityYoung.position(620, 290);
  initialMortalityYoung.size(30);

  let Tytxt = createDiv('Mortalidade em idosos:');
  Tytxt.position(450, 340);
  initialMortalityElder = createInput(16);
  initialMortalityElder.position(620, 340);
  initialMortalityElder.size(30);
}

function checkButtons(){
  if (SDChoice.value() > 0) {
    socialDistancing = true;
  } else {
    socialDistancing = false;
  }
  if (elderChoice.checked()) {
    elderIsolation = true;
  } else {
    elderIsolation = false;
  }
  if (testChoice.value() > 0){
    testing = true;
  } else {
    testing = false;
  }
  startButton.mousePressed(startIt);
  restartButton.mousePressed(reset);
  mortalityYoung = initialMortalityYoung.value();
  mortalityElder = initialMortalityElder.value();

  infectionRadius = infectionChoice.value();
  SD = SDChoice.value();
  testRate = testChoice.value();
}

function feedData(){
//   if(infectionCounter > popSize/3){
//     mortalityYoung = 20;
//     mortalityElder = 60;
//   }
  if (days < 100 && infectionCounter > 0) {
    if (counter % 33 == 0) {
      days++;
      addData(chart, infectionCounter, deadCounter, cureCounter);
    }
  }
}
