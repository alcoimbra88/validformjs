class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            value: cpfEnviado.replace(/\D+/g, ''),
            writable: false,
            configurable: false,
            enumerable: false
        });
    };

    geraDigito(cpfSemDigitos) {
        let total = 0;
        let reverso = cpfSemDigitos.length + 1;
        for (let numero of cpfSemDigitos) {
            total += reverso * Number(numero);
            reverso--;
        };

        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';
    };

    isSequence() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    };

    geraNovoCpf() {
        const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
        const digito1 = this.geraDigito(cpfSemDigitos);
        const digito2 = this.geraDigito(cpfSemDigitos + digito1)
        this.cpfGerado = cpfSemDigitos + digito1 + digito2;
    };


    valida() {
        if (!this.cpfLimpo) return;
        if (typeof this.cpfLimpo !== 'string') return;
        if (this.cpfLimpo.length !== 11) return;
        if (this.isSequence()) return false;
        this.geraNovoCpf();

        return this.cpfLimpo === this.cpfGerado ;
    };
};


// const validacpf = new ValidaCPF('070.987.720-03');

// validacpf.valida();

// if (!validacpf){
//     console.log('CPF INVALIDO')
// }else{
//     console.log('CPF VALIDO')
// }