import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'
import hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {


    async loginpage({view}: HttpContextContract) {

        return view.render('login')
    }

    async login({request,session,response}: HttpContextContract) {
        
        const username = request.input('username')
        const password = request.input('password')



        try{
            const user = await User.findByOrFail('username', username)

            if (user) {
                if (await hash.verify(user.password,password)){
                    session.put('user',{id: user.id, username: username, name: user.name, role_id: user.roleId})
                    response.redirect().toRoute('switchpage')
                } else {
                    throw 'Your username or password is wrong!'
                }
            }
        }
        catch(error) {
            session.flash('error','Your username or password is wrong!')
            response.redirect().toRoute('login')
        }


    }



    async registerpage({view}: HttpContextContract) {

        return view.render('register')
    }

    async register({request,response}: HttpContextContract) {

        const load = await request.validate(RegisterUserValidator)

        const user = await User.create({username: load.username, password: load.password, name: load.name })

        response.redirect().toRoute('login')
    }



    async logout({session, response}:HttpContextContract){
        session.clear()
        response.redirect().toRoute('login')
    }




    async switchPage({session, response}:HttpContextContract){
        const user = session.get('user')
        
        if(user.role_id == 2){
            response.redirect().toRoute('admin')
        } else {
            response.redirect().toRoute('home')
        }
        
    }
}
