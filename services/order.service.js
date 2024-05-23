const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class OrderService {
  constructor() {}

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async deleteItem(data) {
    const { orderId, productId, amount } = data;

    const orderProduct = await models.OrderProduct.findOne({
      where: {
        orderId,
        productId,
      },
    });

    if (!orderProduct) {
      throw new Error('El producto no está asociado con esta orden');
    }

    if (orderProduct.amount >= amount) {
      await orderProduct.decrement('amount', { by: amount });
      return {
        message: `Se eliminaron ${amount} unidades del producto de la orden`,
      };
    } else {
      throw new Error(
        'No hay suficientes unidades del producto en la orden para eliminar'
      );
    }
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
        },
        'items' // Incluir los detalles de los artículos asociados con cada orden
      ]
    });
    return orders;
  }
  async deleteOrder(orderId) {
    const order = await models.Order.findByPk(orderId);

    if (!order) {
      throw new Error('La orden no existe');
    }

    await models.OrderProduct.destroy({
      where: {
        orderId: order.id,
      },
    });

    await order.destroy();
  }

  async find() {
    const orders = await models.Order.findAll({
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
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
