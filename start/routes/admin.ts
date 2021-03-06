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
    Route.get('/admin','AdminsController.admin').as('admin')
    Route.get('/admin/:id/approve','AdminsController.approveStatus').as('admin.approve')
    Route.get('/admin/:id/reject','AdminsController.rejectStatus').as('admin.reject')
    Route.get('/admin/:id/view','AdminsController.adminView').as('admin.view')
}).middleware('auth')

