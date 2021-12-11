import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ticket from 'App/Models/Ticket'
import Ticketdetail from 'App/Models/Ticketdetail'

export default class AdminsController {

    public async admin({view}: HttpContextContract) {

        const ticketdetails = await Ticketdetail.query().preload('product').preload('ticket')
        
        const tickets = await Ticket.query().preload('user')
                                                .preload('ticketstatus')
    return view.render('admin', {tickets: tickets, ticketdetails: ticketdetails} )
    }

    public async approveStatus({params, session, response}: HttpContextContract){


        const ticket_id = params.id

        const tickets = await Ticket.query()
                                    .where('id',ticket_id)
                                    .firstOrFail()
  
        tickets!.ticketstatusId = 2
  
        await tickets?.save()
      
        response.redirect().toRoute('admin')
      }

      
    public async rejectStatus({params, response}: HttpContextContract){


        const ticket_id = params.id

        const tickets = await Ticket.query()
                                    .where('id',ticket_id)
                                    .firstOrFail()
  
        tickets!.ticketstatusId = 3
  
        await tickets?.save()
      
        response.redirect().toRoute('admin')
      }

      public async adminView({params,view}: HttpContextContract) {


        let ticket_id = params.id 
    
        
    
        const productdetail = await Ticketdetail.query()
                                                .where('ticket_id',ticket_id)
                                                .preload('product')
                                                .preload('ticket')
        
        console.log(productdetail[1].product);
        
                                              
        return view.render('productview',{products: productdetail})
      }

}
