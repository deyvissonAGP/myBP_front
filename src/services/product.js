import { http } from './config'

export default	{

	salvar:(product)=>{
		return http.post('products',product);
  },
    
	atualizar:(product)=>{
		return http.put('products',product);
  },

  	listar:()=>{
		return http.get('products')
  },
    
	apagar:(product)=>{
		return http.delete('products', { data: product })
	}
}