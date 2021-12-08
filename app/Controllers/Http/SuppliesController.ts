import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Ticket from 'App/Models/Ticket'
import Ticketdetail from 'App/Models/Ticketdetail'
import Ticketdetail from 'App/Models/Ticketdetail'
import Database from '@ioc:Adonis/Lucid/Database'

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

    public async order({request,response,view}: HttpContextContract) {

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
        
        response.cookie('orders', orderDetailSort)
        
        
        return view.render('order', {orders: orderDetailSort, order: orderDetail})
    }

    public async orderAdd({request, params, response }:HttpContextContract){
        const order = request.cookie('order',[])
        const product_id = params.id
  
        const product = { id: product_id, quantity: 1} 
        order.push(product)
        response.cookie('order', order)


        
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

    public async genTicket({request, session, response}: HttpContextContract){

      const orders = request.cookie('orders')
      const user = session.get('user')
      const note = request.input('note')

      
      // insert ticket table

      const ticket = new Ticket()
      
      ticket.userId = user.id
      ticket.note = note 

      await ticket.save() 



      // insert ticketdetail table


      const ticket_id =  await Ticket.query()
                                  .where('created_at', 
                                    Ticket.query()
                                    .max('created_at'))
      
      
      for (let i = 0; i < orders.length; i++) {
        

        const ticketdetail = new Ticketdetail()

        ticketdetail.ticketId = ticket_id[0].id
        ticketdetail.productId = orders[i].id;
        ticketdetail.quantity = orders[i].quantity;

        await ticketdetail.save();

      }


      response.cookie('order', [])
      response.cookie('orders', [])
      response.redirect().toRoute('home')

    }
}
