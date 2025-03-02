import { toast } from "react-toastify";

export const checkCep = async (cep, setLogradouro, setCidade, setUf, setBairro, setNumero) => {
    const cleanedCep = cep.replace(/\D/g, '');
    if (cleanedCep.length === 8) {
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
            const data = await res.json();
            if (!data.erro) {
                setLogradouro(data.logradouro);
                setCidade(data.localidade);
                setUf(data.uf);
                setBairro(data.bairro);
                setNumero(data.numero || '');
            } else {
                toast.error("CEP não encontrado.");
            }
        } catch (error) {
            toast.error("Erro ao buscar o CEP.");
        }
    } else {
        toast.error("CEP inválido.");
    }
};