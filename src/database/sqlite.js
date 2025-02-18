import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    { name: 'chat.db', location: 'default' },
    () => console.log("Database connected"),
    error => console.log(error)
);

db.transaction(tx => {
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS user_to_user_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chatId Text,
        senderId Text,
        receiverId Text,
        message Text,
        sender_id Text,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
        [],
        () => console.log("Table created"),
        error => console.log(error)
    );
});

/* db.transaction(tx => {
    tx.executeSql(`
        ALTER TABLE user_to_user_messages ADD COLUMN isSent INTEGER DEFAULT 0;
    `, [], () => console.log("Column added"), error => console.log("Column exists", error));
}); */

export default db;