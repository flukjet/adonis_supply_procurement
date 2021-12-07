import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, beforeSave} from '@ioc:Adonis/Lucid/Orm'
import Ticket from 'App/Models/Ticket'
import Hash from '@ioc:Adonis/Core/Hash'


export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  
  @column()
  public username: string

  @column()
  public password: string

  @column()
  public roleId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Ticket)
  public tickets: HasMany<typeof Ticket>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
