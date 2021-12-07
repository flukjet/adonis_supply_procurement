import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class SuppliesController {

    public async index({view}: HttpContextContract) {
        const products = await Product.all()
        return view.render('supply',{products: products})
    }
  
    public async history({view}: HttpContextContract) {

        return view.render('history')
    }

    public async order({view}: HttpContextContract) {

        return view.render('order')
    }

    public async orderAdd({request, params, response }:HttpContextContract){
        const order = request.cookie('order',[])
        const product_id = params.id 
  
        const product = { id: product_id, quantity: 1} 
        order.push(product)
        response.cookie('order', order)
  
        response.redirect().toRoute('home')
    }
}
