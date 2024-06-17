
/** 
 * @param {Array} arrPessoas  
 * @param {VoidFunction} callback
 * 
 * */
function somenteAdultos(arrPessoas , callback) {
  for (let i = 0; i < arrPessoas.length; i++){
    const pessoa = arrPessoas[i] 
    if (pessoa.idade >= 18) {
      callback(pessoa)
    }
  }
}

function aguardarTimer(callback) {
  setTimeout(() => {
    callback()
  }, 3000)
}

module.exports = {
  aguardarTimer, somenteAdultos
}