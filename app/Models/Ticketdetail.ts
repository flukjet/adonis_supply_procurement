import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Ticketdetail extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ticketId: number
  
  @column()
  public productId: number
  
  @column()
  public quantity: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
