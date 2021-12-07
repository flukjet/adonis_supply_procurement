import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'


export default class UsersController {


    async loginpage({view}: HttpContextContract) {

        return view.render('login')
    }

    async login({auth,request,session,response}: HttpContextContract) {
        const username = request.input('username')
        const password = request.input('password')
        console.log('login process')

        try{
            await auth.attempt(username,password)
            console.log('login successfull')
            response.redirect().toRoute('home')
        }
        catch(error) {
            session.flash('error','This user is not authorized!')
            console.log('login failure')
            response.redirect().toRoute('login')
        }
    }

    async registerpage({view}: HttpContextContract) {

        return view.render('register')
    }

    async register({request,response}: HttpContextContract) {
        
        // const name =  request.input('name')
        // const username =  request.input('username')
        // const password =  request.input('password')

        // const user = new User()

        // user.name = name
        // user.username = username
        // user.password = password
        const load = await request.validate(RegisterUserValidator)

        const user = await User.create({username: load.username, password: load.password, name: load.name })

        response.redirect().toRoute('loginpage')
    }

    async logout({auth, response}:HttpContextContract){
        await auth.use('web').logout()
        response.redirect().toRoute('login')
    }
}
