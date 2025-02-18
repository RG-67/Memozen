import db from "./sqlite"


export const saveMessage = (chatId, senderId, receiverId, message, sender_id, isSent) => {
    db.transaction(tx => {
        tx.executeSql(`
            INSERT INTO user_to_user_messages(chatId, senderId, receiverId, message, sender_id, isSent)
            SELECT ?, ?, ?, ?, ?, ?
            WHERE NOT EXISTS (
                SELECT 1 FROM user_to_user_messages WHERE chatId = ? AND message = ? AND sender_id = ?
            );
        `,
            [chatId, senderId, receiverId, message, sender_id, isSent, chatId, message, sender_id],
            () => console.log("Message stored"),
            error => console.log("Message store error", error)
        );
    });
};




export const getMessage = (chatId, callback) => {
    db.transaction(tx => {
        tx.executeSql(`
            SELECT * FROM user_to_user_messages WHERE chatId = ? ORDER BY timestamp ASC`, [chatId], (_, results) => {
            let messages = [];
            for (let i = 0; i < results.rows.length; i++) {
                messages.push(results.rows.item(i));
            }
            callback(messages);
        }, error => console.log("GetMessageError ==>", error));
    });
}