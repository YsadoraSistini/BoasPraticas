import React from "react";
import { Message, ContainerCard, Img, Description, Itens } from "./Styles";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { urlApi } from "../../services/Api";

const DETAILS_LINK_TEXT = "Detalhes";

// Componente Card: Exibe as informações de um imóvel
export function Card({ thumb, predio, logradouro, preco, slug }) {
    return (
        <ContainerCard>
            <Img>
                <img src={`${urlApi}/uploads/${thumb}`} alt="Imagem do imóvel" />
            </Img>
            <Description>
                <h4>{predio}</h4>
                <Itens>
                    <span><FaMapMarkerAlt /> {logradouro}</span>
                    <span>R$ {preco} / mês</span>
                </Itens>
                <Link to={`/imovel/${slug}`}>{DETAILS_LINK_TEXT} <FaArrowRight /></Link>
            </Description>
        </ContainerCard>
    );
}

// Função para renderizar a lista de mensagens
const renderMessages = (mensagens) => {
    return mensagens.map((item, index) => (
        <Message key={index}>
            <span>Nome: {item.client_name}</span>
            <span>Email: {item.client_email}</span>
            <p>{item.client_mensagem}</p>
        </Message>
    ));
};

// Função para renderizar a lista de imóveis
const renderImoveis = (imoveis) => {
    return imoveis.map((item) => (
        <Card key={item.id} thumb={item.thumb} predio={item.titulo} logradouro={item.localizacao} preco={item.preco} slug={item.slug} />
    ));
};

// Componente listaImoveis_msg: Exibe uma lista de mensagens e uma lista de imóveis
function listaImoveis_msg({ imoveis, mensagens }) {
    return (
        <div>
            {renderMessages(mensagens)}
            {renderImoveis(imoveis)}
        </div>
    );
}
export default listaImoveis_msg;