import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';

export default function SignUp() {
  return (
    <>
      <img src={logo} alt="GoBarber" />

      <form>
        <input placeholder="Nome completo" />
        <input type="email" placeholder="Seu e-mail" />
        <input type="password" placeholder="Sua senha" />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </form>
    </>
  );
}
