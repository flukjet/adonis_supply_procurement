import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany ,manyToMany, ManyToMany, BelongsTo, belongsTo} from '@ioc:Adonis/Lucid/Orm'
import Ticketdetail from './Ticketdetail'
import User from './User'
import Ticketstatus from './Ticketstatus'
import Product from './Product'

export default class Ticket extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number 

  @column()
  public note: string

  @column()
  public ticketstatusId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Ticketdetail)
  public ticketdetails: HasMany<typeof Ticketdetail>

  @manyToMany(()=>Product,{
    pivotTable: 'ticketdetails',
  })
  public products: ManyToMany<typeof Product>

  @belongsTo(()=> User)
  public user: BelongsTo<typeof User>

  @belongsTo(()=> Ticketstatus)
  public ticketstatus: BelongsTo<typeof Ticketstatus>

}
