import React, { useState } from "react";
import { Form, Label, Section } from "./Styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import api from "../../services/Api";
import { toast } from "react-toastify";
import { checkCep } from "./funcoesAUX";

function cadastroImoveis({ usuarioId }) {
    // Estado para armazenar os dados do formulário
    const [form, setForm] = useState({
        thumb: '', predio: '', descricao: '', preco: '', cep: '', logradouro: '', numero: '', bairro: '', complemento: '', cidade: '', uf: '', area: '', quartos: '', banheiros: '', nome: '', telefone: '', email: ''
    });

    // Função para atualizar o estado do formulário quando um campo é alterado
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        // Cria um objeto FormData e adiciona os campos do formulário
        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => data.append(key, value));
        data.append("usuarioId", usuarioId);

        try {
            // Faz a requisição POST para cadastrar o imóvel
            await api.post("/createimobi", data);
            toast.success("Imóvel cadastrado com sucesso!"); 
            setForm({});
        } catch (error) {
            toast.error("Erro ao cadastrar o imóvel."); 
        }
    };

    return (
        <Form onSubmit={handleSubmit} autoComplete="off">
            <Section>
                <h3>Imagem</h3>
                <Label>Capa do Anúncio:</Label>
                <Input type="file" name="thumb" onChange={(e) => setForm({ ...form, thumb: e.target.files[0] })} />
            </Section>
            <Button type="submit">Cadastrar Imóvel</Button>
        </Form>
    );
}

export default cadastroImoveis;