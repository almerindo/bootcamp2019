import React, { Component } from 'react';

import TechItem from  '../components/TechItem';

class TechList extends Component {
  state = {
    newTech: '',
    techs: []
  };

  //Executado assim que aparece em tela.
  componentDidMount() {
    const techs = localStorage.getItem('techs');
    if (techs) {
      this.setState({techs: JSON.parse(techs)});
    }
  }

  /*Executado sempre que houver alteracoes nas props ou estado
  Recebe props e state antigos, antes da alteração
  e pode ser acessado as atuais por this.props e this.state */
  componentDidUpdate(prevProps, prevState) {
    //Só armazena no banco de dados quando o estado de techs alterar,
    //e não toda vez que o usuário digita
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs));
    }
  }

  //Executado no momento que o componente deixar de existir
  componentWillUnmount(){

  }

  handleInputChange = e => {
    this.setState({newTech: e.target.value});

  }

  handleSubmit = e => {
    //Evita que recarregue a página toda. Altera o comportamento padrão do form
    e.preventDefault();
    //A função setState sempre cria um novo estado, não altera um existente.
    //Cria um novo array e adiciona o que deseja. Pq os estados são imutáveis
    this.setState({techs: [... this.state.techs, this.state.newTech ]});

    this.setState({newTech: ''});
  }

  handleDelete = (tech) => {
    this.setState({techs: this.state.techs.filter( t=> t !== tech )});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <h1>{this.state.newTech}</h1>
      <ul>
        {this.state.techs.map(tech => (
          <TechItem
            key={tech}
            tech={tech}
            onDelete={() => this.handleDelete(tech)}
          />
        ))}
      </ul>
      <input
        type="text"
        onChange={this.handleInputChange}
        value={this.state.newTech}
      />
      <button type="submit">Enviar</button>
      </form>
    );
  }
}


export default TechList;
