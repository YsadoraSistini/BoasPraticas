import React, { useEffect, useState } from "react";
import { Container, Form, Label, Right, Section, Mask, ContainerCard, Img, Description, Itens, Message } from "./Styles";
import Input from "../../components/Input";
import api, { urlApi } from "../../services/Api";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { Wrapper } from "../../pages/CadImovel/Styles";
import { Div } from "../../pages/CadImovel/Styles";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GetLocalStorage } from "../../context/utils";

export function Card({ thumb, predio, logradouro, price, slug }) {
    return (
        <ContainerCard>
            <Img>
                <img src={`${urlApi}/uploads/${thumb}`} alt="" />
            </Img>
            <Description>
                <h4>{predio}</h4>
                <Itens>
                    <span><FaMapMarkerAlt />{logradouro}</span>
                    <span>R$ {price} / mês</span>
                </Itens>
                <Link to={`/imovel/${slug}`}>Detalhes <FaArrowRight /></Link>
            </Description>
        </ContainerCard>
    )
}

function CadImovel() {
    const [imobi, setImobi] = useState([]);
    const [thumb, setThumb] = useState('');
    const [predio, setPredio] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [area, setArea] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState([]);

    const user = GetLocalStorage();
    const userId = user.id;
    
    const checkCep = (cepValue) => {
        const cleanedCep = cepValue.replace(/\D/g, '');
        if (cleanedCep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`)
                .then((res) => res.json())
                .then((data) => {
                    if (!data.erro) {
                        setLogradouro(data.logradouro);
                        setCidade(data.localidade);
                        setUf(data.uf);
                        setBairro(data.bairro);
                        setNumero(data.numero);
                    } else {
                        toast.error("CEP não encontrado.");
                    }
                })
                .catch((error) => {
                    console.error("Erro ao buscar o CEP:", error);
                    toast.error("Erro ao buscar o CEP.");
                });
        } else {
            toast.error("CEP inválido.");
        }
    };

    const handleSubmit = async (e) => {

        // Recupera o userId do localStorage
        const data = new FormData();
        data.append('thumb', thumb);
        data.append('predio', predio);
        data.append('description', description);
        data.append('price', price);
        data.append('cep', cep);
        data.append('logradouro', logradouro);
        data.append('complemento', complemento);
        data.append('bairro', bairro);
        data.append('numero', numero);
        data.append('cidade', cidade);
        data.append('uf', uf);
        data.append('area', area);
        data.append('bedrooms', bedrooms);
        data.append('bathrooms', bathrooms);
        data.append('name', name);
        data.append('phone', phone);
        data.append('email', email);
        data.append('userId', userId); // Adiciona o userId aqui

        try {
            const response = await api.post('/createimobi', data);
            toast.success('Imóvel cadastrado com sucesso!');

            setThumb('');
            setPredio('');
            setDescription('');
            setPrice('');
            setCep('');
            setLogradouro('');
            setNumero('');
            setBairro('');
            setComplemento('');
            setCidade('');
            setUf('');
            setArea('');
            setBedrooms('');
            setBathrooms('');
            setName('');
            setPhone('');
            setEmail('');
        } catch (error) {
            toast.error('Erro ao cadastrar o imóvel.');
            console.log(error.response?.data?.message || error);
        }
    };

    useEffect(() => {
        api.get(`/listimobi`)
            .then((response) => setImobi(response.data))
            .catch(() => console.log('Erro ao buscar os imóveis'));
    }, []);

    useEffect(() => {
        api.get(`/listmessage/${userId}`)
            .then((response) => {
                setMessage(response.data.messagem);
            })
            .catch(() => {
                console.log("Erro: Erro ao listar mensagens");
            });
    }, [userId]);
    return (
        <Container>
            <Div>
                {message && message.length > 0 && message.map((item, index) => (
                    <Message key={index}>
                        <span>Nome: {item.client_name}</span>
                        <span>Email: {item.client_email}</span>
                        <p>{item.client_mensagem}</p>
                    </Message>
                ))}

                <Wrapper>
                    {imobi.map((item) => (
                        <Card
                            key={item.id}
                            thumb={item.thumb}
                            title={item.title}
                            location={item.location}
                            price={item.price}
                            slug={item.slug}
                        />
                    ))}
                </Wrapper>
            </Div>
            <Right>
                <Form onSubmit={handleSubmit} autoComplete="off">

                    {/* Seção de Imagem */}
                    <Section>
                        <h3>Imagem</h3>
                        <Label>Capa do Anúncio:</Label>
                        <Input
                            type="file"
                            name="thumb"
                            onChange={(e) => setThumb(e.target.files[0])}
                        />
                    </Section>

                    {/* Seção de Descrições */}
                    <Section>
                        <h3>Descrições</h3>
                        <Label>Nome do Prédio:</Label>
                        <Input
                            type="text"
                            name="predio"
                            placeholder="Informe o Prédio ou Condominio"
                            onChange={(e) => setPredio(e.target.value)}
                        />
                        <Label>Descrição do Imóvel:</Label>
                        <Input
                            type="text"
                            name="description"
                            placeholder="Informe a descrição do imóvel"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Label>Valor:</Label>
                        <Input
                            type="text"
                            name="price"
                            placeholder="Informe o valor do imóvel"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <Label>Área:</Label>
                        <Input
                            type="text"
                            name="area"
                            maxLength="3"
                            placeholder="Informe a área total do imóvel"
                            onChange={(e) => setArea(e.target.value)}
                        />
                        <Label>Quantidade de Quartos:</Label>
                        <Input
                            type="text"
                            name="bedrooms"
                            placeholder="Informe a quantidade de quartos"
                            onChange={(e) => setBedrooms(e.target.value)}
                        />
                        <Label>Quantidade de Banheiros:</Label>
                        <Input
                            type="text"
                            name="bathrooms"
                            placeholder="Informe a quantidade de banheiros"
                            onChange={(e) => setBathrooms(e.target.value)}
                        />

                    </Section>

                    {/* Seção de Endereço */}
                    <Section>
                        <h3>Endereço</h3>
                        <Label>CEP:</Label>
                        <Mask
                            mask={"99999-999"}
                            type="text"
                            name="cep"
                            placeholder="Informe o CEP"
                            onChange={(e) => setCep(e.target.value)}
                            onBlur={() => checkCep(cep)}
                        />
                        <Label>Logradouro:</Label>
                        <Input
                            type="text"
                            name="logradouro"
                            placeholder="Informe o logradouro"
                            value={logradouro}
                            onChange={(e) => setLogradouro(e.target.value)}
                        />
                        <Label>Número:</Label>
                        <Input
                            type="text"
                            name="numero"
                            placeholder="Informe o número"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                        />
                        <Label>Bairro:</Label>
                        <Input
                            type="text"
                            name="bairro"
                            placeholder="Informe o bairro"
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                        />
                        <Label>Complemento:</Label>
                        <Input
                            type="text"
                            name="complemento"
                            placeholder="Informe o complemento"
                            onChange={(e) => setComplemento(e.target.value)}
                        />
                        <Label>Cidade:</Label>
                        <Input
                            type="text"
                            name="cidade"
                            placeholder="Informe a cidade"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                        />
                        <Label>Estado:</Label>
                        <Mask
                            mask={"AA"}
                            type="text"
                            name="uf"
                            placeholder="Informe o estado"
                            value={uf}
                            onChange={(e) => setUf(e.target.value)}
                        />
                    </Section>

                    {/* Seção de Contato */}
                    <Section>
                        <h3>Contato</h3>
                        <Label>Nome:</Label>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Informe seu nome"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Label>Telefone:</Label>
                        <Mask
                            mask={"(99) 99999-9999"}
                            type="text"
                            name="phone"
                            placeholder="Informe seu telefone"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <Label>Email:</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Informe seu email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Section>

                    <Button type="submit">Cadastrar Imóvel</Button>
                </Form>
            </Right>
        </Container>
    );
}

export default CadImovel;
