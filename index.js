const {select, input, checkbox} = require ('@inquirer/prompts')

let meta = {
    value: 'Tomar 3L de água por dia',
    checked: false,
}

let metas=[meta]

let mensagem = "Bem vindo ao App de Metas!"

const cadastrarMeta = async () =>{
    const meta = await input ({ message:"Digite a meta:"})
    if(meta.length==0){

        mensagem = "Você precisa escrever uma meta."
        return

        

    }
    metas.push(
        {value: meta, checked: false }
    )
    
mensagem= "Meta(s) cadastrada(s)"
} 
const listarMetas = async () =>{
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions:false,
    })
    metas.forEach((m) => {
        m.checked=false
        
            }
        
        )
    if (respostas.length==0){
        mensagem = "Nenhuma meta selecionada!"
        return
    }
 

    respostas.forEach((resposta) => { 
        const meta = metas.find((m) => {
            return m.value ==resposta
        })
        meta.checked = true
    }
) 

mensagem= "Meta(s) concluída(s)"
}
const metasRealizadas = async () =>{
     const realizadas = metas.filter((meta) => {
        return meta.checked
     })
if (realizadas.length == 0){
    mensagem='Nenhuma meta foi realizada! :('
}
await select ({message: realizadas.length + " Metas realizadas ",
choices: [...realizadas]

})


}

const metasAbertas = async () => {
    const abertas = metas.filter ((meta) => {
        return !meta.checked
    })
if (abertas.length == 0){
    mensagem= "Todas metas cumpridas ou nenhuma meta cadastrada"
    return
}
    await select ({message: abertas.length + " Metas abertas",
    choices: [...abertas]

    })

    

}

const metasDeletadas = async () => {
    const metasDesmarcadas = metas.map((meta)=>{
        return{value:meta.value,checked:false}
    })

    const itensadeletar = await checkbox( {
        message:"Selecione os itens para deletar",
        choices:[...metasDesmarcadas]
    })
    if(itensadeletar==0){
        mensagem= 'Nenhum item selecionado'
        return
    }
    itensadeletar.forEach((item)=>{
        metas = metas.filter((meta)=>{
            return meta.value != item

        })

    })
    mensagem= "Itens deletados com sucesso!"


    
   
}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != ""){
        console.log (mensagem)
        console.log("")
        mensagem = ""
    }
}

 
const start = async () => {

while(true){
    mostrarMensagem()

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
                name: "Metas realizadas",
                value: "realizadas"
            },
            {
                name: "Metas abertas",
                value: "abertas"
            },
            {
                name: "Deletar metas",
                value: "deletadas"
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
                break
                case "listar":
                await listarMetas()
                break
                case "realizadas":
                await metasRealizadas()
                break
                case "abertas":
                await metasAbertas()
                break
                case "deletadas":
                await metasDeletadas()
                break
            case "sair":
                console.log("Até a próxima!")
                return
}
        
    }
}

start()