## AGORA O BIXO PEGA HUHUUU

segue o fluxo ein

# PRIMEIRA REQUISIÇÃO

{
  url: '/startChat',
  params: {},
  return: {
    userId: int,
    question: text,
    questionId: integer,
    format: text || number || options,
    options: {1: Opção, 2: Opção, 3: Opção ... },
    delay: number,
  }
}


# aplicativo recebeu essa resposta da api

# agora o aplicativo vai devolver a resposta para a api

{
  url: '/reply',
  params: {
    userId: integer,
    questionId: integer,
    reply: "////VARIA DE ACORDO COM AS OPCÕES OFERECIDAS"
  },
  return: {
    userId: int,
    question: text,
    questionId: integer,
    format: text || number || options,
    options: {1: Opção, 2: Opção, 3: Opção ... },
    delay: number
  }
}




