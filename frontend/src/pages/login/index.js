import React, { useState } from 'react'
import api from '../../service/api'
import './styles.css'
import logo from '../../img/logo-netflix-256.png'
import Swal from 'sweetalert2'

function LoginScreen({ history }) {
    const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    const [user, setUser] = useState(false);
    const [password, setPassword] = useState(false);
    const [userValue, setUserValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    if (localStorage.getItem('netflix_token'))
        history.push('/main');
    return (
        <div className="fundo">
            <div>
                <div className="cabecalho">
                    <img src={logo} alt="" />
                </div>
            </div>
            <div className="Entrar">
                <form>
                    <h1>Entrar</h1>
                    <input placeholder='Email ou número de telefone' type='email' onChange={e => {
                        setUserValue(e.target.value)
                        if (user)
                            setUser(false);
                    }} />
                    {user && (
                        <p>
                            Informe um email ou número de telefone válido.
                        </p>
                    )}
                    <input placeholder='Senha' type='senha' onChange={e => {
                        setPasswordValue(e.target.value)
                        if (password)
                            setPassword(false);
                    }} />
                    {password && (
                        <p>
                            A senha deve ter entre 4 e 60 caracteres.
                        </p>
                    )}
                    <button onClick={async e => {
                        e.preventDefault();
                        if (!userValue || userValue.length < 3 || !regex.test(userValue)) {
                            setUser(true);
                            return
                        }
                        else {
                            setUser(false);
                        }
                        if (!passwordValue || passwordValue.length < 3) {
                            setPassword(true);
                            return
                        }
                        else {
                            setPassword(false);
                        }
                        if (!user && !password) {
                            const token = await api.get('/user/login', {
                                
                                headers:
                                {
                                    email: userValue,
                                    password: passwordValue
                                }
                            })
                            if (token.data === 'Login realizado com sucesso!') {
                                localStorage.setItem('netflix_token', userValue)
                                Swal.fire({
                                    icon: 'success',
                                    title: token.data,
                                    timer: 1000,
                                    showConfirmButton: false
                                })
                                history.push('/main')
                            }
                            
                            else {
                                setUser(true);
                                Swal.fire({
                                    icon: 'error',
                                    title: token.data,
                                    timer: 1000,
                                    showConfirmButton: false
                                })
                            }
                        }
                    }
                    } >Entrar</button>

                    <ul>
                        <li>
                            <input type='checkbox' />
                            <p>Lembre-se de mim</p>
                        </li>
                        <li>
                            <a>Precisa de ajuda?</a>
                        </li>
                    </ul>
                    <span>
                        <img src='https://assets.nflxext.com/ffe/siteui/login/images/FB-f-Logo__blue_57.png' alt='facebook' />
                        <p>Conectar com o Facebook</p>
                    </span>
                    <span>
                        <p>Novo por aqui?</p>
                        <a onClick={async e => {
                            e.preventDefault();
                            history.push('/cadastro')
                        }}>Cadastre-se aqui </a>
                    </span>
                    <span>
                        <p>Esta página é protegida pelo Google reCAPTCHA</p>
                    </span>
                    <span>
                        <p>para garantir que você não é um robô.</p>
                        <a className='saiba_mais'>Saiba mais.</a>
                    </span>
                </form>
            </div>
        </div >
    )

}

export default LoginScreen