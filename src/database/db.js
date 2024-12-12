const initSqlJs = require('sql.js');
let db;

async function initializeDatabase() {
  if (!db) {
    const SQL = await initSqlJs();
    db = new SQL.Database();
    
    // Create tables
    db.run(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        title VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        due_date DATETIME,
        status VARCHAR(20) DEFAULT 'OPEN' CHECK(
          status IN ('OPEN', 'WORKING', 'PENDING_REVIEW', 'COMPLETED', 'OVERDUE', 'CANCELLED')
        )
      );

      CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50) UNIQUE NOT NULL
      );

      CREATE TABLE IF NOT EXISTS todo_tags (
        todo_id INTEGER,
        tag_id INTEGER,
        PRIMARY KEY (todo_id, tag_id),
        FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
      );
    `);
  }
  return db;
}

function query(sql, params = []) {
  const stmt = db.prepare(sql);
  return stmt.getAsObject(params);
}

function queryAll(sql, params = []) {
  const stmt = db.prepare(sql);
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

function run(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.run(params);
  stmt.free();
  return {
    lastInsertRowid: db.exec('SELECT last_insert_rowid()')[0].values[0][0],
    changes: db.exec('SELECT changes()')[0].values[0][0]
  };
}

module.exports = {
  initializeDatabase,
  query,
  queryAll,
  run
};