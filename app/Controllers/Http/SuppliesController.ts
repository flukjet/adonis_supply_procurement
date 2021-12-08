import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class SuppliesController {

    public async index({request,view,session}: HttpContextContract) {
        const order = request.cookie('order',[])
        const user = session.get('user')
        const products = await Product.all()
        
        
        return view.render('supply',{products: products, order:order})
    }
  
    public async history({request,view}: HttpContextContract) {

        const order = request.cookie('order',[])

        return view.render('history', {order:order})
    }

    public async order({request,view}: HttpContextContract) {

        const orders = request.cookie('order',[])
        const orderDetail = []
        for(let product of orders){
          const productdetail = await Product.query()
                                        .where('id',product.id)
                                        .first()
  
          orderDetail.push({id: product.id,
                            name: productdetail?.name,
                            quantity:  product.quantity})
        }


        let holder = {};

        orderDetail.forEach(function(d) {
          if (holder.hasOwnProperty(d.name)) {
            holder[d.name] = holder[d.name] + d.quantity;
          } else {
            holder[d.name] = d.quantity;
          }
        });
        



        let orderDetailSort = [];



        for (let prop in holder) {

          let product_id = await Product.query()
                                  .where('name',prop)
                                  .first()

          orderDetailSort.push({   
                                  id: product_id.id,
                                  name: prop,
                                  quantity: holder[prop],
                                });
        }
        

        
        
        return view.render('order', {orders: orderDetailSort, order: orderDetail})
    }

    public async orderAdd({request, params, response }:HttpContextContract){
        const order = request.cookie('order',[])
        const product_id = params.id
  
        const product = { id: product_id, quantity: 1} 
        order.push(product)
        response.cookie('order', order)
        console.log(product);
        
        
        response.redirect().toRoute('home')
    }


    public async orderDelete({request, params, response}: HttpContextContract){
      const order = request.cookie('order',[])
      const product_id = params.id 
      for(let i=0; i<order.length ;i++){
        if(order[i].id == product_id){
          order.splice(i,1) 
          response.cookie('order',order)
          break 
        }
      }

      response.redirect().toRoute('order')
}

