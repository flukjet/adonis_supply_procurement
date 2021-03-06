/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{
    Route.get('/index','SuppliesController.index').as('home')
    Route.get('/history','SuppliesController.history').as('history')
    Route.get('/order','SuppliesController.order').as('order')
    Route.get('/order/:id/add','SuppliesController.orderAdd').as('order.add')
    Route.get('/order/:id/delete','SuppliesController.orderDelete').as('order.delete')
    Route.get('/order/genticket','SuppliesController.genTicket').as('ticket.gen')
    Route.get('/edit/:id','SuppliesController.edit').as('ticket.edit')
    Route.get('/ticket/updateticket','SuppliesController.updateTicket').as('ticket.update')
    Route.get('/ticket/view/:id','SuppliesController.ticketView').as('ticket.view')
    Route.get('/delete/:id','SuppliesController.delete').as('ticket.delete')


}).middleware('auth')

