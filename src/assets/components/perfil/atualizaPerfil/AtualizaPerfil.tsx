import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Usuario } from '../../../../model/Usuario'
import { buscaId, put } from '../../../../service/service'
import "./Perfil.css";
import {
  Grid,
  Typography,
  Avatar,
  Box,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TokenState } from "../../../../store/tokens/tokensReducer";

function AtualizaPerfil() {
    const token = useSelector<TokenState, TokenState["tokens"]>(
      (state) => state.tokens
    );

    const userId = useSelector<TokenState, TokenState["id"]>(
      (state) => state.id
    );

    const [usuario, setUsuario] = useState<Usuario>({
      id: +userId,
      nome: "",
      usuario: "",
      foto: "",
      senha: "",
    });

    function updateModel(event: ChangeEvent<HTMLInputElement>) {
      setUsuario({
        ...usuario,
        [event.target.name]: event.target.value,
      });
    }

  async function atualizar(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (usuario.senha === confirmarSenha && usuario.senha.length >= 8) {
      try {
        await put("/usuarios/atualizar", usuario, setUsuario, {
          headers: {
            Authorization: token,
          },
        });
        alert("Usuário cadastrado com sucesso");
        setUsuario({ ...usuario, senha: "" });
        setConfirmarSenha("");
      } catch (error) {
        alert("Falha ao cadastrar o usuário, verifique os campos");
      }
    } else {
      alert("Os campos de Senha e Confirmar Senha estão diferentes");
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }
  }

  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  function confirmSenha(event: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(event.target.value);
  }

  return (
    <>
      <div className="perfilUpdate">
        <form onSubmit={atualizar}>
          <Box display={"flex"} width={"100%"} flexDirection={"column"}>
            <TextField
              name="nome"
              label="Nome completo"
              value={usuario.nome}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
            />
            <TextField
              name="usuario"
              label="Endereço de e-mail"
              disabled
              value={usuario.usuario}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
            />
            <TextField
              name="foto"
              label="URL da foto"
              value={usuario.foto}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
            />
            <TextField
              name="senha"
              label="Senha"
              type="password"
              value={usuario.senha}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
            />
            <TextField
              name="confirmarSenha"
              label="Confirmar senha"
              type="password"
              value={confirmarSenha}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                confirmSenha(event)
              }
            />
            <Button fullWidth variant={"contained"} type="submit">
              Atualizar
            </Button>
          </Box>
        </form>
      </div>
    </>
  );
}

export default AtualizaPerfil;
