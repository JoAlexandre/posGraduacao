function getRole(username) {
  if (username == 'admin') {
    return 'admin'
  }
  return 'role1'
}

function authorize(...allowed) {
  const isAllowed = (role) => allowed.indexOf(role) > -1

  const urlLocation = (role, method, url) => {

    /**
     * Usuário role1 pode
     * 1 - Atualização de um cliente PUT /cliente
     * 2 - Consultar os livros (cadastrados, por id do livro e por autor)
     * 3 - Cadastrar uma avaliação
     */

    if (role == 'admin') return true
    
    if (method == 'PUT') {
      if (['/cliente'].includes(url)) return true  
      return false

    } else if (method == 'GET') {
      if (url.includes('/livro')) return true  
      if (url.includes('/venda')) return true  
      return false

    }
    else if (method == 'POST') {
      if (url.includes('/livro') && url.includes('/avaliacao')) return true  
      if (url.includes('/venda')) return true  
      return false

    }
    return false
  }

  return (req, res, next) => {
    const role = getRole(req.auth.user)
    
    if (req.auth.user) { 
      if (isAllowed(role) && urlLocation(role, req.method.trim(), req.originalUrl.trim())) {
        next()
      } else {
        res.status(401).send('Função bloqueda para esta rota')
      }
    } else {
      res.status(403).send("Usuário não encontrado")
    }
  
  }

}

export default authorize