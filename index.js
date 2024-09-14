const {select, input} = require ('@inquirer/prompts')

let meta = {
    value: 'Tomar 3L de água por dia',
    checked: false,
}

let metas=[meta]

const cadastrarMeta = async () =>{
    const meta = await input ({ message:"Digite a meta:"})
    if(meta.length==0){

        console.log("Você precisa escrever uma meta.")
        return

        

    }
    metas.push(
        {value: meta, checked: false }
    )
    

} 

const start = async () => {

while(true){
    const opcao = await select ({
        message: "Menu>",
        choices:[
            {
                name:"Cadastrar meta",
                value: "cadastrar"
            },
            {
                name:"Listar metas",
                value:"listar"
            },
            {
                name: "Marcar metas como concluídas",
                value: "marcar"
            },
            {
                name:"Sair",
                value: "sair"
            },
            
        ]
    })
switch (opcao){
    case "cadastrar":
       await cadastrarMeta()
       console.log(metas)
        break
        case "listar":
            console.log ("vamos listar")
            break
            case "marcar":
                console.log ("vamos marcar metas como concluídas")
                break
            case "sair":
                console.log("Até a próxima!")
                return
}
        
    }
}

start()