import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MyAuth {
  public async handle({session, response, view}: HttpContextContract, next: () => Promise<void>){
    const user =session.get('user')
    if(user) {
      view.share({
        currentUser: user.name,
        currentUserrole: user.role_id

      })
        await next()

    } 
    else {
      response.redirect().toRoute('login')
    }
  }
}
