# cubos-agenda

Tem problemas de organização na sua clinica? Cansado de não entender sua letra quando escreve na agenda de papel?
Seus problemas acabaram...
Com essa api você vai conseguir cadastrar os horários das consultas sem se preocupar com conflito de horários :)

Stacks usadas aqui: NodeJs, Express, MomentJs, Celebrate, Lodash, Nodemon e o Jest

#### O que é preciso para utilizar a api?
[Postman Collection](https://drive.google.com/drive/folders/1kV8XlGZ7jT4lYwCJ4xY3Y69blQgf6hKr?usp=sharing)

Primeiro é necessário fazer o clone do projeto aqui: [GitHub](https://github.com/daltibamilena/cubos-agenda)

Depois você precisa instalar as dependências usando:
``` npm install ```

E assim poder iniciar o servidor com o comando: 
``` npm run agenda ```

O servidor por padrão vai ser servido na porta [3000](http://localhost:3000/)

#### Como usar a API?

Para ter acesso a todos os horários cadastrados é preciso fazer um request do método ```GET``` para a rota ``` / ```

Para cadastrar um novo horário é preciso fazer um request do método ```POST``` para a rota ``` / ```
###### Formato:
DD-MM-YYYY = Dia-Mês-Ano
HH:MM = Hora:Minuto | string
``` 
{ 
    day: <DD-MM-YYYY>,
    start: <HH:MM>,
    end: <HH:MM>,
}
```

Para cadastrar um novo horário para todos os dias é preciso fazer um request do método ```POST``` para a rota ``` /daily ```
###### Formato:
HH:MM = Hora:Minuto | string
``` 
{ 
    start: <HH:MM>,
    end: <HH:MM>,
}
```

Para cadastrar um novo horário semanalmente é preciso fazer um request do método ```POST``` para a rota ``` /weekly ```
###### Formato:
dias_da_semana = ["seg", "ter", "qua", "qui", "sex", "sáb", "dom"] | array
HH:MM = Hora:Minuto | string
``` 
{ 
    daysWeek: [<dias_da_semana>],
    start: <HH:MM>,
    end: <HH:MM>,
}
```

Para excluir um horário é preciso fazer um request do método ```DELETE``` para a rota ``` / ```
###### Formato:
DD-MM-YYYY = Dia-Mês-Ano
HH:MM = Hora:Minuto | string
``` 
{ 
    day: <DD-MM-YYYY>,
    start: <HH:MM>,
    end: <HH:MM>,
}
```

Para excluir um horário para todos os dias é preciso fazer um request do método ```DELETE``` para a rota ``` /daily ```
###### Formato:
HH:MM = Hora:Minuto | string
``` 
{ 
    start: <HH:MM>,
    end: <HH:MM>,
}
```

Para excluir um horário semanalmente é preciso fazer um request do método ```DELETE``` para a rota ``` /weekly ```
###### Formato:
dias_da_semana = ["seg", "ter", "qua", "qui", "sex", "sáb", "dom"] | array
HH:MM = Hora:Minuto | string
``` 
{ 
    daysWeek: [<dias_da_semana>],
    start: <HH:MM>,
    end: <HH:MM>,
}
```

Para exibir todos os horário em um intervalo de tempo é preciso fazer um request do método ```POST``` para a rota ``` /interval ```
###### Formato:
DD-MM-YYYY = Dia-Mês-Ano
``` 
{ 
    start: <DD-MM-YYYY>,
    end:  <DD-MM-YYYY>,
}
```

Testes o/

Para executar os testes execute o seguinte comando:
``` npm test ```
