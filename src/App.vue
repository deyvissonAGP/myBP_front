<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Cadastro de Produtos</a>
      </div>
    </nav>

    <div class="container">

      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
        </li>
      </ul>


      <form @submit.prevent="salvar">

          <label>Nome</label>
            <input type="text" placeholder="Nome" v-model="product.nome" >
          <label>Preço</label>
            <input type="text" placeholder="preco" v-model="product.preco" >
          <label>Categoria</label>
            <input type="text" placeholder="categoria" v-model="product.categoria_id" >
        
          <br><br><br><button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>categoria</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>

          <tr v-for="product of products" v-bind:key="product.id">
            
            <td>{{ product.nome }}</td>
            <td>{{ product.preco }}</td>
            <td>{{ product.categoria_id }}</td>
            <td>
              <button @click="editar(product)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(product)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

import Product from './services/product'

export default {
  name: 'app',
  data () {
    return {
      product:{
        id: '',
        nome: '',
        preco: '',
        categoria_id: '',
      },
      products: [],
      errors: []
    }
  },

  mounted(){
    this.listar()
  },

  methods:{

    listar(){
      Product.listar().then(resposta => {
        this.products = resposta.data
      }).catch(e => {
        console.log(e)
      })
    },

    salvar(){

      if(!this.product.id){
        Product.salvar(this.product).then(resposta => {
          this.product = {}
          alert('Cadastrado com sucesso!')
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }else{

        Product.atualizar(this.product).then(resposta => {
          this.product = {}
          this.errors = {}
          alert('Atualizado com sucesso!')
          this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }
      
    },

    editar(product){
      this.product = product
    },

    remover(product){

      if(confirm('Deseja excluir este Produto ?')){
        Product.apagar(product).then(resposta => {
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }

    }
  }

}
</script>

<style>

</style>
