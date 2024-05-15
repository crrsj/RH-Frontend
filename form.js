function enviarFormulario() {
    // Obtém os valores dos campos do formulário
    var nome = document.getElementById("nome").value;
    var telefone = document.getElementById("telefone").value;
    var cpf = document.getElementById("cpf").value;
    var email = document.getElementById("email").value;
    var cargo = document.getElementById("cargo").value;
    var dataAdmissao = document.getElementById("dataAdmissao").value;    
    var dataDemissao = document.getElementById("dataDemissao").value;    
    var salario = document.getElementById("salario").value;
    var status= document.getElementById("status").value;

    
    // Constrói o objeto JSON com os valores dos campos do formulário
    var dadosFormulario = {
        nome: nome,
        telefone: telefone,
        cpf: cpf,
        email: email,
        cargo: cargo,
        dataAdmissao: dataAdmissao, 
        dataDemissao: dataDemissao,        
        salario: salario,
        status: status
        
    };
    
    
    fetch("http://localhost:8080/funcionario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosFormulario)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Dados enviados:", data);
        alert("dados cadastrados com sucesso !")        
       
    })
    .catch(error => {
        console.error("Erro ao enviar os dados:", error);
        
    });
}

/*function formatarData(data) {
    const partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}
*/
 


function exibirFuncionarios() {
    fetch("http://localhost:8080/funcionario")
    .then(response => response.json())
    .then(data => {
        const tabela = document.getElementById("tabelaFuncionarios");
        const tbody = tabela.querySelector("tbody");
       
        data.forEach(funcionario => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${funcionario.id}</td>
                <td>${funcionario.nome}</td>
                <td>${funcionario.telefone}</td>
                <td>${funcionario.cpf}</td>
                <td>${funcionario.email}</td>
                <td>${funcionario.cargo}</td>
                <td>R$:${funcionario.salario}</td>
                <td>${funcionario.dataAdmissao}</td>
                <td>${funcionario.dataDemissao}</td>
                <td>${funcionario.status}</td>
                <td><button class="btn btn-success" onClick="buscarPorId(${funcionario.id})">Editar</button></td>
                <td><button class="btn btn-danger" onClick="deletarRegistro(${funcionario.id})">Excluir</button></td>
            `;
            tbody.appendChild(row);
        });
        atualizarPaginacao(data.length);
    })
    .catch(error => {
        console.error("Erro ao buscar os dados dos funcionários:", error);
    });

    
}
  document.addEventListener("DOMContentLoaded", exibirFuncionarios);

  /* function aplicarEstiloStatus() {
    const tabela = document.getElementById("tabelaFuncionarios");
    const linhas = tabela.getElementsByTagName("tr");
    
    for (let i = 1; i < linhas.length; i++) {
        const statusCell = linhas[i].getElementsByTagName("td")[9]; 
        
        if (statusCell) {
            const status = statusCell.textContent.trim().toLowerCase();
            
            if (status === "ativo") {
                statusCell.classList.add("ativo");
                statusCell.classList.remove("inativo");
            } else if (status === "inativo") {
                statusCell.classList.add("inativo");
                statusCell.classList.remove("ativo");
            }
        }
    }
}
document.addEventListener("DOMContentLoaded", function() {
    aplicarEstiloStatus();
    
   
    document.getElementById("tabelaFuncionarios").addEventListener("change", function(event) {
        const target = event.target;
        if (target.tagName.toLowerCase() === "select" && target.classList.contains("status")) {
            aplicarEstiloStatus();
        }
    });
});

*/
function showModal() {
    var myModal = document.getElementById('myModal');
    if (myModal) {
        var myInput = document.getElementById('myInput');
        if (myInput) {
            myModal.addEventListener('shown.bs.modal', function () {
                myInput.focus();
            });
            var modalInstance = new bootstrap.Modal(myModal);
            modalInstance.show();
        } else {
            console.error("Elemento 'myInput' não encontrado.");
        }
    } else {
        console.error("Elemento 'myModal' não encontrado.");
    }
}
  function buscarPorId(id) {
    fetch('http://localhost:8080/funcionario/' + id)
     .then(response => response.json())    
     .then(user => {
       preencherFormulario(user) ;
       showModal();
     
     })
     .catch(error => console.error('Error fetching user data:', error));
 }
 
   function preencherFormulario(user) {
   document.getElementById('id').value = user.id;
   document.getElementById('nome').value = user.nome;
   document.getElementById('telefone').value = user.telefone;
   document.getElementById('cpf').value = user.cpf;
   document.getElementById('email').value = user.email;
   document.getElementById('cargo').value = user.cargo;
   document.getElementById('salario').value = user.salario;
   document.getElementById('dataAdmissao').value = user.dataAdmissao;
   document.getElementById('dataDemissao').value = user.dataDemissao;
   document.getElementById('status').value = user.status;
 }

 async function deletarRegistro(id) {
    try {
        
        const url = `http://localhost:8080/funcionario/${id}`;
  
        
        const confirmacao = confirm("Tem certeza que deseja excluir o funcionário?");
  
        
        if (confirmacao) {
            const options = {
                method: 'DELETE'
            };
  
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Erro ao deletar o registro');
            }
  
            alert('Registro deletado com sucesso');
            location.reload();

        } else {
            console.log('Exclusão cancelada pelo usuário');
            
        }
    } catch (error) {
        console.error('Erro:', error);
        
    }
    
  }


  async function updateUserData() {    
    const idInput =  document.getElementById("id");
    const nomeInput = document.getElementById("nome");   
    const telefoneInput = document.getElementById("telefone");
    const cpfInput = document.getElementById("cpf");
    const emailInput = document.getElementById("cpf");
    const cargoInput = document.getElementById("cargo");    
    const salarioInput = document.getElementById("salario");
    const dataAdmissaoInput = document.getElementById("dataAdmissao");
    const dataDemissaoInput = document.getElementById("dataDemissao");
    const statusInput = document.getElementById("status");       
       
      
    const updateId =  idInput.value    
    const updateNome = nomeInput.value
    const updateTelefone = telefoneInput.value
    const updateCpf = cpfInput.value
    const updateEmail = emailInput.value
    const updateCargo = cargoInput.value 
    const updateSalario = salarioInput.value
    const updateDataAdmissao = dataAdmissaoInput.value
    const updateDataDemissao = dataDemissaoInput.value
    const updateStatus = statusInput.value
   
  
    try {
      const response =  await fetch(`http://localhost:8080/funcionario` , {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: updateId,
          nome: updateNome,         
          telefone:updateTelefone ,
          cpf: updateCpf,
          email: updateEmail,
          cargo: updateCargo,
          salario: updateSalario,
          dataAdmissao: updateDataAdmissao,
          dataDemissao: updateDataDemissao,
          status: updateStatus,
          
          
          
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }
  
      alert('Dados do usuário atualizados com sucesso!');
      location.reload();
    } catch (error) {
      console.error(`Erro durante a atualização dos dados: ${error.message}`);
    }
    
    
  }
 

  

  
 