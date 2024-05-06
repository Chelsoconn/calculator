document.addEventListener('DOMContentLoaded', () => {

  let display = document.getElementById('display');
  [solved, second, answer, problem, operation] = [false, false, undefined, [], undefined];
  
  function solveProblem() {
    problem.push(display.value);
    display.value = eval(problem.join(''));
    solved = true ;
    answer = display.value;
  }

  document.body.addEventListener('click', event => {
    if (solved) {
      display.value = '';
      solved = false;
    }
    if (String(Number(event.target.id)) === event.target.id || (event.target.id === 'dot' && (!display.value.includes('.') || problem.length !== 0))) {
      if (event.target.id === '0' && display.value === '') return;
      if (problem.length === 2 && second) {
        display.value = '';
      }
      second = false;
      display.value += event.target.innerText;
    } else if (event.target.id === 'c') {
      display.value = '';
      problem = [];
      [operation, answer] = [undefined, undefined];
    } else if (['div','mul','sub','add'].includes(event.target.id)) {
      operation = event.target.innerText;
      if (problem.length ===2 && display.value !== '') {
        solveProblem();
      }
      problem = [answer||display.value, operation];
      second = true;
    } else if (event.target.id === 'equals' && problem.length === 2 && display.value !== '') {
      solveProblem();
    }
  })

})