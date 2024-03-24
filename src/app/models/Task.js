import Sequelize, { Model } from 'sequelize'

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        name_task: Sequelize.STRING,
        date_begin: Sequelize.DATE,
        date_finish: Sequelize.DATE,
        frequency: Sequelize.STRING,
        description: Sequelize.STRING,
        box_color: Sequelize.STRING,
        text_color: Sequelize.STRING,
      },
      {
        sequelize,
      },
    )
  }
}

export default Task
