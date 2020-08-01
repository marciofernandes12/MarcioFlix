/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };
  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {
    // chave: nome, descricao, bla, bli
    setValues({
      ...values,
      [chave]: valor, // nome: 'valor'
    });
  }

  function handleChange(infosDoEvento) {
    setValue(
      infosDoEvento.target.getAttribute('name'),
      infosDoEvento.target.value,
    );
  }
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Ok Ok');
    const URL_TOP = 'http://localhost:8080/categorias';
    fetch(URL_TOP)
      .then(async (respostaDoServidor) => {
        const resposta = await respostaDoServidor.json();
        setCategorias([
          ...resposta,
        ]);
      });
    /* setTimeout(() => {
      setCategorias([
        ...categorias,
        {
          id: 1,
          nome: 'Front End',
          descricao: 'Uma categoria bacanudassa',
          cor: '#cbd1ff',
        },
        {
          id: 2,
          nome: 'Back End',
          descricao: 'Uma outra categoria bacanudassa',
          cor: '#cbd1ff',
        },

      ]);
    }, 4 * 1000);
  }, */ });

  return (
    <PageDefault>
      <Link to="/">Ir para a home</Link>
      <h1>
        Cadastro de Categoria:
        {values.nome}
      </h1>

      <form onSubmit={function handleSubmit(infosDoEvento) {
        infosDoEvento.preventDefault();
        setCategorias([
          ...categorias,
          values,
        ]);

        setValues(valoresIniciais);
      }}
      >
        <FormField
          label="Nome da Categoria"
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />
        <FormField
          label="Descrição da Categoria"
          type="textarea"

          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />
        <FormField
          label="Cor da Categoria"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        {/*  <div>
          <label>
            Descrição:
            <textarea
              type="text"
              value={values.descricao}
              name="descricao"
              onChange={handleChange}

            />
          </label>
      <label> */}
        {/* Cor:
            <input
              type="color"
              value={values.cor}
              name="cor"
              onChange={handleChange}
            />
          </label>
        </div> */}
        <Button>Cadastrar</Button>
      </form>
      {categorias.length === 0 && (
      <div>
        Loading....
      </div>
      )}
      <ul>
        {categorias.map((categoria) => <li key={`${categoria.nome}`}>{categoria.nome}</li>)}
      </ul>

    </PageDefault>
  );
}

export default CadastroCategoria;
