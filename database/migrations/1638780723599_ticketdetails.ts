import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Ticketdetails extends BaseSchema {
  protected tableName = 'ticketdetails'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('ticket_id').notNullable().unsigned().references('id').inTable('tickets').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('product_id')
      table.integer('quantity')
      

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
