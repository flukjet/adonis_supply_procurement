import BaseSchema from '@ioc:Adonis/Lucid/Schema'


export default class Tickets extends BaseSchema {
  protected tableName = 'tickets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
      table.string('note')
      table.integer('ticketstatus_id').defaultTo(1).notNullable().unsigned().references('id').inTable('ticketstatuses').onDelete('CASCADE').onUpdate('CASCADE')


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

