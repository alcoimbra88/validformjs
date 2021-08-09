class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    };


    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    };

    camposSaoValidos() {
        let valid = true;


        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        };

        for (let campo of this.formulario.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.innerText;
            if (!campo.value) {
                this.criaErro(campo, `Campo "${label}" nao pode estar em branco`);
                valid = false;
            };

            if (campo.classList.contains('cpf')) {
                if (!this.validaCPf(campo)) valid = false;
            };

            if (campo.classList.contains('usuario')) {
                if (!this.validaUsuario(campo)) valid = false;
            };
        };

        return valid;
    };

    senhasSaoValidas(){
        let valid = true;

        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha');

        if(senha.value !== repetirSenha.value){
            valid = false;
            this.criaErro(senha, 'Campos "Senha" e "Repetir Senha" precisam ser iguais');
            this.criaErro(repetirSenha, 'Campos "Senha" e "Repetir Senha" precisam ser iguais');
        };

        if(senha.length<6 || senha.length>12){
            valid = false;
            this.criaErro(senha, 'A "Senha" precisa ter entre 6 e 12 caracteres');

        }

        return valid;
    };

    validaCPf(campo) {
        const cpf = new ValidaCPF(campo.value);

        if (!cpf.valida()) {
            this.criaErro(campo, 'CPF Invalido');

            return false;
        };

        return true;
    };

    validaUsuario(campo) {
        let valid = true;
        const usuario = campo.value;

        if (usuario.length > 12 || usuario.length < 3) {
            this.criaErro(campo, 'Usuario precisa ter entre 3 e 12 caracteres');
            valid = false;
        };

        if(!usuario.match(/[a-zA-Z0-9]+/g)){
            this.criaErro(campo, 'Usuario precisa conter apenas letras e/ou numeros');
        };
        
        return valid;
    };

    handleSubmit(e) {
        e.preventDefault();
        const camposValidos = this.camposSaoValidos();
        const senhasValidas = this.senhasSaoValidas();

        if(camposValidos && senhasValidas){
            alert('Formulario Enviado com Sucesso!');
            this.formulario.submit();
        };
    };

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    };
};

const valida = new ValidaFormulario();