const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {

  constructor(){
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }


  async deleteItem(data){
    const newItem = await models.OrderProduct.delete(data);
    return newItem;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });
    return orders;
  }

  async deleteOrder(orderId) {
    // Buscar la orden por su ID
    const order = await models.Order.findByPk(orderId);

    // Si la orden no existe, lanzar un error
    if (!order) {
      throw new Error('La orden no existe');
    }

    // Eliminar la orden y las filas correspondientes en la tabla orders_products
    await models.OrderProduct.destroy({
      where: {
        orderId: order.id
      }
    });

    await order.destroy();
  }



  async deleteItem(data) {
    const { orderId, productId, amount } = data;

    // Busca la fila en la tabla 'orders_products' que corresponda a la orden y el producto dados
    const orderProduct = await models.OrderProduct.findOne({
      where: {
        orderId,
        productId
      }
    });

    // Si no se encuentra la relación entre la orden y el producto, lanza un error
    if (!orderProduct) {
      throw new Error('El producto no está asociado con esta orden');
    }

    // Verifica si la cantidad a eliminar es menor o igual a la cantidad en la orden
    if (orderProduct.amount >= amount) {
      // Si es así, reduce la cantidad del producto en la orden
      await orderProduct.decrement('amount', { by: amount });
      // Devuelve un mensaje de éxito
      return { message: `Se eliminaron ${amount} unidades del producto de la orden` };
    } else {
      // Si la cantidad a eliminar es mayor que la cantidad en la orden, lanza un error
      throw new Error('No hay suficientes unidades del producto en la orden para eliminar');
    }
  }



  async find() {
    const orders = await models.Order.findAll({
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    return orders;
  }



  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
