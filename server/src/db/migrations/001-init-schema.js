module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      first_name: { type: Sequelize.STRING(120), allowNull: false },
      last_name: { type: Sequelize.STRING(120), allowNull: false },
      email: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      password_hash: { type: Sequelize.STRING(255), allowNull: false },
      phone: { type: Sequelize.STRING(30) },
      city: { type: Sequelize.STRING(120) },
      country: { type: Sequelize.STRING(120) },
      profile_pic: { type: Sequelize.STRING(500) },
      bio: { type: Sequelize.TEXT },
      role: { type: Sequelize.STRING(20), allowNull: false, defaultValue: 'user' },
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('trips', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      title: { type: Sequelize.STRING(255), allowNull: false },
      place: { type: Sequelize.STRING(255), allowNull: false },
      start_date: { type: Sequelize.DATEONLY, allowNull: false },
      end_date: { type: Sequelize.DATEONLY, allowNull: false },
      status: { type: Sequelize.STRING(20), allowNull: false, defaultValue: 'upcoming' },
      total_budget: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('trip_sections', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      trip_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'trips', key: 'id' }, onDelete: 'CASCADE' },
      title: { type: Sequelize.STRING(255), allowNull: false },
      description: { type: Sequelize.TEXT },
      section_order: { type: Sequelize.INTEGER, allowNull: false },
      start_date: { type: Sequelize.DATEONLY, allowNull: false },
      end_date: { type: Sequelize.DATEONLY, allowNull: false },
      budget: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('activities', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      section_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'trip_sections', key: 'id' }, onDelete: 'CASCADE' },
      name: { type: Sequelize.STRING(255), allowNull: false },
      type: { type: Sequelize.STRING(100), allowNull: false },
      description: { type: Sequelize.TEXT },
      expense: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0 },
      activity_date: { type: Sequelize.DATEONLY, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('notes', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      trip_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'trips', key: 'id' }, onDelete: 'CASCADE' },
      title: { type: Sequelize.STRING(255), allowNull: false },
      body: { type: Sequelize.TEXT, allowNull: false },
      note_date: { type: Sequelize.DATEONLY, allowNull: false },
      attachment: { type: Sequelize.STRING(500) },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('checklist_items', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      trip_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'trips', key: 'id' }, onDelete: 'CASCADE' },
      category: { type: Sequelize.STRING(100), allowNull: false },
      item_name: { type: Sequelize.STRING(255), allowNull: false },
      is_packed: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('invoices', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      trip_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'trips', key: 'id' }, onDelete: 'CASCADE' },
      invoice_number: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      generated_at: { type: Sequelize.DATE, allowNull: false },
      payment_status: { type: Sequelize.STRING(20), allowNull: false, defaultValue: 'pending' },
      subtotal: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      tax: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      discount: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      grand_total: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('invoice_items', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      invoice_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'invoices', key: 'id' }, onDelete: 'CASCADE' },
      category: { type: Sequelize.STRING(100), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      quantity: { type: Sequelize.INTEGER, defaultValue: 1 },
      unit_cost: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0 },
      amount: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0 },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('community_posts', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      trip_id: { type: Sequelize.INTEGER, references: { model: 'trips', key: 'id' }, onDelete: 'SET NULL' },
      content: { type: Sequelize.TEXT, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('destinations', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      country: { type: Sequelize.STRING(100), allowNull: false },
      description: { type: Sequelize.TEXT },
      image_url: { type: Sequelize.STRING(500) },
      is_popular: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('refresh_tokens', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      token_hash: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      expires_at: { type: Sequelize.DATE, allowNull: false },
      revoked_at: { type: Sequelize.DATE },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: async (queryInterface) => {
    const tables = [
      'refresh_tokens',
      'destinations',
      'community_posts',
      'invoice_items',
      'invoices',
      'checklist_items',
      'notes',
      'activities',
      'trip_sections',
      'trips',
      'users'
    ];

    for (const table of tables) {
      await queryInterface.dropTable(table);
    }
  }
};
