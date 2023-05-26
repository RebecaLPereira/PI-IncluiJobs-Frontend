import { Box, Card, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Postagem from "../../../../model/Postagem";
import { busca } from "../../../../service/service";
import { TokenState } from "../../../../store/tokens/tokensReducer";

function ListaPostagem() {
    const [posts, setPosts] = useState<Postagem[]>([])
    let navigate = useNavigate();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    useEffect(() => {
        if (token == '') {
            alert("Você precisa estar logado")
            navigate("/login")
        }
    }, [token])

    async function getPost() {
        await busca("/postagens", setPosts, {
            headers: {
                "Authorization": token
            }
        })
    }

    useEffect(() => {
        getPost()
    }, [posts.length])

    return (
        <>
            {
                posts.map(post => (
                    <Box m={2} >
                        <Card variant="outlined">
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Postagens
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {post.titulo}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {post.descricao}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {post.tema?.descricao}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Box display="flex" justifyContent="center" mb={1.5}>

                                    <Link to={`/cadastrarPostagem/${post.id}`} className="text-decorator-none" >
                                        <Box mx={1}>
                                            <Button variant="contained" className="marginLeft" size='small' color="primary" >
                                                Atualizar
                                            </Button>
                                        </Box>
                                    </Link>
                                    <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
                                        <Box mx={1}>
                                            <Button variant="contained" size='small' color="secondary">
                                                Deletar
                                            </Button>
                                        </Box>
                                    </Link>
                                </Box>
                            </CardActions>
                        </Card>
                    </Box>
                ))
            }

        </>)
}

export default ListaPostagem;