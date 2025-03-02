import React, { useEffect, useState } from "react";
import { Container, Right, Div } from "./Styles";
import api from "../../services/Api";
import { GetLocalStorage } from "../../context/utils";
import cadastroImoveis from "./cadastroImoveis";
import listaImoveis_msg from "./listaImoveis_msg";

function CadImovel() {
    const [imoveis, setImoveis] = useState([]);
    const [mensagens, setMensagens] = useState([]);
    const usuario = GetLocalStorage();

    useEffect(() => {
        api.get("/listimobi").then(res => setImoveis(res.data)).catch(() => console.log("Erro ao buscar imóveis"));
        api.get(`/listmessage/${usuario.id}`).then(res => setMensagens(res.data.mensagens)).catch(() => console.log("Erro ao buscar mensagens"));
    }, [usuario.id]);

    return (
        <Container>
            <Div>
                <listaImoveis_msg imoveis={imoveis} mensagens={mensagens} />
            </Div>
            <Right>
                <cadastroImoveis usuarioId={usuario.id} />
            </Right>
        </Container>
    );
}
export default CadImovel;