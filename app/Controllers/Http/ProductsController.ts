import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
    public async delProductPage({view}: HttpContextContract) {

        const products = await Product.all()

        
        return view.render('delProduct',{products: products})
    }


    async delProduct({params, response}: HttpContextContract){

        const product_id = params.id
  
        console.log(product_id);
        
  
        // const ticket = await Product.query().where('id',product_id).firstOrFail()


        // await ticket?.delete()
  
        response.redirect().toRoute('delProduct')
    }
}
