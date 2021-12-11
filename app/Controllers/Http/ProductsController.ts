import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import ProductValidator from 'App/Validators/ProductValidator'
import Application from '@ioc:Adonis/Core/Application'

export default class ProductsController {
    public async delProductPage({view}: HttpContextContract) {

        const products = await Product.all()

        return view.render('editProduct',{products: products})
    }


    public async delProduct({params, response}: HttpContextContract){

        const product_id = params.id
  
        console.log(typeof(product_id));
        
        
  
        const ticket = await Product.query().where('id',product_id).firstOrFail()


        await ticket?.delete()
  
        response.redirect().toRoute('delProductPage')
    }


    public async createProductPage({view}: HttpContextContract) {


        return view.render('createProduct')
    }

    public async createProduct({request,response}: HttpContextContract) {
        
        const product = await request.validate(ProductValidator)

        const postImage = request.file('file', {
            size: '100mb',
            extnames: ['jpg', 'png'],
          })

          let date_ob = new Date();

          const name = ("0" + date_ob.getDate()).slice(-2)+("0" + (date_ob.getMonth() + 1)).slice(-2)+date_ob.getFullYear()+date_ob.getHours()+date_ob.getMinutes()+date_ob.getSeconds()+date_ob.getMilliseconds()+'.'+postImage?.subtype



          if (!postImage) {
            return
          }
          if (!postImage.isValid) {
            return postImage.errors
          }
          if (postImage) {
            await postImage.move(Application.publicPath('pictures'), {
              name: name,
              overwrite: true, 
            })
          }

        const newProduct = await Product.create({name: product.name, detail: product.detail, image: name })

        response.redirect().toRoute('admin')
    }

    public async editProductPage({params,view}: HttpContextContract){

        const product_id = params.id
        
  


        const products = await Product.query()
                                    .where('id',product_id)
                                    .firstOrFail()
  
        return view.render('createProduct',{product: products, cbutton: true})
      }


      public async editProduct({params,response,request}: HttpContextContract){

        const product_id = params.id

        const product = await request.validate(ProductValidator)


        const postImage = request.file('file', {
            size: '100mb',
            extnames: ['jpg', 'png'],
          })

          let date_ob = new Date();

          const name = ("0" + date_ob.getDate()).slice(-2)+("0" + (date_ob.getMonth() + 1)).slice(-2)+date_ob.getFullYear()+date_ob.getHours()+date_ob.getMinutes()+date_ob.getSeconds()+date_ob.getMilliseconds()+'.'+postImage?.subtype


          if (!postImage) {
            return
          }
          if (!postImage.isValid) {
            return postImage.errors
          }
          if (postImage) {
            await postImage.move(Application.publicPath('pictures'), {
              name: name,
              overwrite: true, 
            })
          }


        const newProduct = await Product.query()
                                        .where('id',product_id)
                                        .update({ name: product.name, detail: product.detail, image: name })

                                        response.redirect().toRoute('admin')
      }
}
