import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ticket from 'App/Models/Ticket'
import Ticketdetail from 'App/Models/Ticketdetail'

export default class AdminsController {

    public async admin({request,response,view}: HttpContextContract) {

        const ticketdetails = await Ticketdetail.query().preload('product').preload('ticket')
        
        const tickets = await Ticket.query().preload('user')
                                                .preload('ticketstatus')
    return view.render('admin', {tickets: tickets, ticketdetails: ticketdetails} )
    }

    public async approveStatus({params,request, session, response}: HttpContextContract){


        const ticket_id = params.id
        const user = session.get('user')

        const tickets = await Ticket.query()
                                    .where('id',ticket_id)
                                    .firstOrFail()
  
        tickets!.ticketstatusId = 2
  
        await tickets?.save()
      
        response.redirect().toRoute('admin')
      }

      
    public async rejectStatus({params, session, response}: HttpContextContract){


        const ticket_id = params.id
        const user = session.get('user')

        const tickets = await Ticket.query()
                                    .where('id',ticket_id)
                                    .firstOrFail()
  
        tickets!.ticketstatusId = 3
  
        await tickets?.save()
      
        response.redirect().toRoute('admin')
      }


}
