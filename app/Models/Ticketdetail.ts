import { DateTime } from 'luxon'
import { BaseModel, column , BelongsTo, belongsTo} from '@ioc:Adonis/Lucid/Orm'
import Ticket from './Ticket'
import Product from './Product'


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

  @belongsTo(()=> Ticket)
  public ticket: BelongsTo<typeof Ticket>

  @belongsTo(()=> Product)
  public product: BelongsTo<typeof Product>


}
